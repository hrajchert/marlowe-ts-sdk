import { T as TaskEither } from './TaskEither-dac321fc.js';
import { _ as _function } from './Either-d9970dbd.js';
import { MarloweJSON } from '@marlowe.io/adapter/codec';

const getOnlyData = TaskEither.bimap((e) => e instanceof Error ? e : new Error(MarloweJSON.stringify(e)), (v) => v.data);
const getWithDataAndHeaders = TaskEither.bimap((e) => (e instanceof Error ? e : new Error(String(e))), (v) => [v.headers, v.data]);
const Get = (request) => _function.flow(TaskEither.tryCatchK(request.get, _function.identity), getOnlyData);
const GetWithDataAndHeaders = (request) => _function.flow(TaskEither.tryCatchK(request.get, _function.identity), getWithDataAndHeaders);
const Post = (request) => _function.flow(TaskEither.tryCatchK(request.post, _function.identity), getOnlyData);
const Put = (request) => _function.flow(TaskEither.tryCatchK(request.put, _function.identity), getOnlyData);

export { Get, GetWithDataAndHeaders, Post, Put };
