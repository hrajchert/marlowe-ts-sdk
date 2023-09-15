import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts/lib/index.js";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import * as HTTP from "@marlowe.io/adapter/http";
import { transactionWitnessSetTextEnvelope, } from "@marlowe.io/runtime-core";
import { ContractDetails } from "../details.js";
import { unContractId } from "@marlowe.io/runtime-core";
const GETPayload = t.type({ links: t.type({}), resource: ContractDetails });
export const getViaAxios = (axiosInstance) => (contractId) => pipe(HTTP.Get(axiosInstance)(contractEndpoint(contractId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(GETPayload.decode(data)))), TE.map((payload) => payload.resource));
export const putViaAxios = (axiosInstance) => (contractId, hexTransactionWitnessSet) => pipe(HTTP.Put(axiosInstance)(contractEndpoint(contractId), transactionWitnessSetTextEnvelope(hexTransactionWitnessSet), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}));
const contractEndpoint = (contractId) => `/contracts/${encodeURIComponent(unContractId(contractId))}`;
