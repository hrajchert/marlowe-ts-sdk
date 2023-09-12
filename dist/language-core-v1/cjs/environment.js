'use strict';

var index = require('./index-d60f2db2.js');
var time = require('@marlowe.io/adapter/time');

const mkEnvironment = (start) => (end) => ({
    validityStart: time.datetoIso8601(start),
    validityEnd: time.datetoIso8601(end),
});
const Environment = index.lib.type({
    validityStart: time.ISO8601,
    validityEnd: time.ISO8601,
});

exports.Environment = Environment;
exports.mkEnvironment = mkEnvironment;
