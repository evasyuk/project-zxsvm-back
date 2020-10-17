const path = require('path');
const os = require('os');
const fs = require('fs');

const Busboy = require('busboy');

const multiPartSupportMiddleware = async function(ctx, next) {
  const finalPromise = new Promise((resolve, reject) => {
    try {
      if (!ctx?.header['content-type']?.startsWith('multipart/form-data;')) {
        return next()
      }

      const { req } = ctx
      const busboy = new Busboy({ headers: ctx.req.headers });
      const tmpdir = os.tmpdir();

      // This object will accumulate all the fields, keyed by their name
      const fields = {};

      // This object will accumulate all the uploaded files, keyed by their name.
      const uploads = {};

      // This code will process each non-file field in the form.
      busboy.on('field', (fieldname, val) => {
        fields[fieldname] = val;
      });

      const fileWrites = [];

      // This code will process each file uploaded.
      busboy.on('file', (fieldname, file, filename) => {
        // Note: os.tmpdir() points to an in-memory file system on GCF
        // Thus, any files in it must fit in the instance's memory.

        const filepath = path.join(tmpdir, filename);
        uploads[fieldname] = filepath;

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        // File was processed by Busboy; wait for it to be written.
        // Note: GCF may not persist saved files across invocations.
        // Persistent files must be kept in other locations
        // (such as Cloud Storage buckets).
        const promise = new Promise((resolve, reject) => {
          file.on('end', () => {
            writeStream.end();
          });
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });
        fileWrites.push(promise);
      });

      // Triggered once all uploaded files are processed by Busboy.
      // We still need to wait for the disk writes (saves) to complete.
      busboy.on('finish', async () => {
        await Promise.all(fileWrites);

        const files = {}
        Object.keys(uploads).forEach((key) => {
          const size = fs.statSync(uploads[key])['size']
          const type = uploads[key].split('.').pop()
          const path = uploads[key]

          files[key] = {
            path,
            size,
            type,
          }
        })

        ctx.body = {
          files,
          fields,
        }

        // Note: Make sure to clean up after yourself in farther handlers
        //
        // for (const file in uploads) {
        //   fs.unlinkSync(uploads[file]);
        // }

        resolve()
      });

      busboy.end(req.rawBody);
    } catch (error) {
      reject(error)
    }
  })
  await finalPromise
  return next()
}

export default multiPartSupportMiddleware
