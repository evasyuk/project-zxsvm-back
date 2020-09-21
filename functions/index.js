const functions = require('firebase-functions');

process.env.BABEL_DISABLE_CACHE = 1
require("@babel/register")({
    extends: './.babelrc',
    ignore: [/node_modules/, /.png/],
    extensions: [".stub.js", ".js"],
  })
require('@babel/polyfill')
const app = require('../index').app

exports.hello = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.v1 = functions.https.onRequest(app.callback());
