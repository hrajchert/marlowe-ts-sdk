import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, identity } from "fp-ts/lib/function.js";
import { MarloweJSON } from "@marlowe.io/adapter/codec";
const getOnlyData = TE.bimap((e) => e instanceof Error ? e : new Error(MarloweJSON.stringify(e)), (v) => v.data);
const getWithDataAndHeaders = TE.bimap((e) => (e instanceof Error ? e : new Error(String(e))), (v) => [v.headers, v.data]);
export const Get = (request) => flow(TE.tryCatchK(request.get, identity), getOnlyData);
export const GetWithDataAndHeaders = (request) => flow(TE.tryCatchK(request.get, identity), getWithDataAndHeaders);
export const Post = (request) => flow(TE.tryCatchK(request.post, identity), getOnlyData);
export const Put = (request) => flow(TE.tryCatchK(request.put, identity), getOnlyData);
