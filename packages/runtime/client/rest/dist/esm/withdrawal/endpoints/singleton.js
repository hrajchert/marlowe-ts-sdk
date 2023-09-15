import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as HTTP from "@marlowe.io/adapter/http";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import { WithdrawalDetails } from "../details.js";
import { transactionWitnessSetTextEnvelope, unWithdrawalId, } from "@marlowe.io/runtime-core";
export const getViaAxios = (axiosInstance) => (withdrawalId) => pipe(HTTP.Get(axiosInstance)(endpointURI(withdrawalId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(WithdrawalDetails.decode(data)))));
export const putViaAxios = (axiosInstance) => (withdrawalId, hexTransactionWitnessSet) => pipe(HTTP.Put(axiosInstance)(endpointURI(withdrawalId), transactionWitnessSetTextEnvelope(hexTransactionWitnessSet), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}));
const endpointURI = (withdrawalId) => `/withdrawals/${encodeURIComponent(unWithdrawalId(withdrawalId))}`;
