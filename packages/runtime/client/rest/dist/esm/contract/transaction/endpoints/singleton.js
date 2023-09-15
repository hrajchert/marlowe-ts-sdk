import * as TE from "fp-ts/lib/TaskEither.js";
import * as E from "fp-ts/lib/Either.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts/lib/index.js";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import * as HTTP from "@marlowe.io/adapter/http";
import { transactionWitnessSetTextEnvelope, } from "@marlowe.io/runtime-core";
import { Details } from "../details.js";
import { unContractId } from "@marlowe.io/runtime-core";
import { unTransactionId } from "../id.js";
const GETPayload = t.type({ links: t.type({}), resource: Details });
export const getViaAxios = (axiosInstance) => (contractId, transactionId) => pipe(HTTP.Get(axiosInstance)(endpointURI(contractId, transactionId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(GETPayload.decode(data)))), TE.map((payload) => payload.resource));
export const putViaAxios = (axiosInstance) => (contractId, transactionId, hexTransactionWitnessSet) => pipe(HTTP.Put(axiosInstance)(endpointURI(contractId, transactionId), transactionWitnessSetTextEnvelope(hexTransactionWitnessSet), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}));
const endpointURI = (contractId, transactionId) => `/contracts/${pipe(contractId, unContractId, encodeURIComponent)}/transactions/${pipe(transactionId, unTransactionId, encodeURIComponent)}`;
