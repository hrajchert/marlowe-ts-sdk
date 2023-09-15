import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as HTTP from "@marlowe.io/adapter/http";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import { unContractId } from "@marlowe.io/runtime-core";
import { Next } from "@marlowe.io/language-core-v1/next";
import { stringify } from "qs";
export const getViaAxios = (axiosInstance) => (contractId) => (environment) => (parties) => pipe(HTTP.Get(axiosInstance)(contractNextEndpoint(contractId) +
    `?validityStart=${environment.validityStart}&validityEnd=${environment.validityEnd}` +
    stringify({ party: parties }, { indices: false }), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(Next.decode(data)))));
const contractNextEndpoint = (contractId) => `/contracts/${encodeURIComponent(unContractId(contractId))}/next`;
