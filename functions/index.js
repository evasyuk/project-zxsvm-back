const functions = require('firebase-functions');

process.env.BABEL_DISABLE_CACHE = '1'
require("@babel/register")({
    extends: './.babelrc',
    ignore: [/node_modules/, /.png/],
    extensions: [".stub.js", ".js"],
  })
require('@babel/polyfill')
const app = require('./src/App').app

exports.api = functions.https.onRequest(app.callback());

exports.info = functions.https.onRequest((req, res) => {
  res.send("/info");
});
