var sqlite3 = require('sqlite3').verbose()
var path = require('path')
const appDir = path.resolve(__dirname)
var db = new sqlite3.Database(`${appDir}/../../../temp/sqlite`)

// note: create temp file before first run

class DBWrapper {
    up = (upCommands) => {
        db.serialize(function() {
            upCommands.forEach((cmd) => {
                db.run(cmd);
            })
            //
            //
            // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
            // for (var i = 0; i < 10; i++) {
            //     stmt.run("Ipsum " + i);
            // }
            // stmt.finalize();
            //
            // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            //     console.log(row.id + ": " + row.info);
            // });
        });
    }

    run = async (cmd) => {
        return new Promise((acc, rej) => {
            db.all(cmd, (err, data) => {
                if (err) {
                    console.log(err)
                    rej(err)
                }
                acc(data)
            })
        })
    }

    close = () => {
        db.close()
    }
}

export default new DBWrapper()
