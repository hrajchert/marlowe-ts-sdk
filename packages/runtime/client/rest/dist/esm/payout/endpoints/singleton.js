import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts/lib/index.js";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import * as HTTP from "@marlowe.io/adapter/http";
import { unPayoutId } from "@marlowe.io/runtime-core";
import { PayoutDetails } from "../details.js";
const GETPayload = t.type({ links: t.type({}), resource: PayoutDetails });
export const getViaAxios = (axiosInstance) => (contractId) => pipe(HTTP.Get(axiosInstance)(contractEndpoint(contractId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(GETPayload.decode(data)))), TE.map((payload) => payload.resource));
const contractEndpoint = (payoutId) => `/payouts/${encodeURIComponent(unPayoutId(payoutId))}`;
