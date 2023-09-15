'use strict';

var TaskEither = require('./TaskEither-90491bc1.cjs');
var Either = require('./Either-e3415b14.cjs');
var fs = require('fs');
var util = require('util');

const readFromFile = util.promisify(fs.readFile);
const getFileContents = (path) => TaskEither.TaskEither.tryCatch(() => readFromFile(path, "utf-8"), Either.Either.toError);

exports.getFileContents = getFileContents;
