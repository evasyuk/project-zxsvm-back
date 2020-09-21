const functions = require('firebase-functions');

require("@babel/register")({
    extends: './.babelrc',
    ignore: [/node_modules/, /.png/],
    extensions: [".stub.js", ".js"],
  })
require('@babel/polyfill')
const app = require('../index').app

exports.v1 = functions.https.onRequest(app.callback());
