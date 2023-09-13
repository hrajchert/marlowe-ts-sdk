'use strict';

var TaskEither = require('./TaskEither-eeafc71f.js');
var Either = require('./Either-e3415b14.js');
var codec = require('@marlowe.io/adapter/codec');

const getOnlyData = TaskEither.TaskEither.bimap((e) => e instanceof Error ? e : new Error(codec.MarloweJSON.stringify(e)), (v) => v.data);
const getWithDataAndHeaders = TaskEither.TaskEither.bimap((e) => (e instanceof Error ? e : new Error(String(e))), (v) => [v.headers, v.data]);
const Get = (request) => Either._function.flow(TaskEither.TaskEither.tryCatchK(request.get, Either._function.identity), getOnlyData);
const GetWithDataAndHeaders = (request) => Either._function.flow(TaskEither.TaskEither.tryCatchK(request.get, Either._function.identity), getWithDataAndHeaders);
const Post = (request) => Either._function.flow(TaskEither.TaskEither.tryCatchK(request.post, Either._function.identity), getOnlyData);
const Put = (request) => Either._function.flow(TaskEither.TaskEither.tryCatchK(request.put, Either._function.identity), getOnlyData);

exports.Get = Get;
exports.GetWithDataAndHeaders = GetWithDataAndHeaders;
exports.Post = Post;
exports.Put = Put;
