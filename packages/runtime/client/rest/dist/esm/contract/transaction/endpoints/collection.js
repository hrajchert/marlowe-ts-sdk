import * as t from "io-ts/lib/index.js";
import { iso } from "newtype-ts";
import * as E from "fp-ts/lib/Either.js";
import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import { fromNewtype, optionFromNullable } from "io-ts-types";
import { Input } from "@marlowe.io/language-core-v1";
import { MarloweVersion } from "@marlowe.io/language-core-v1/version";
import * as HTTP from "@marlowe.io/adapter/http";
import { ISO8601 } from "@marlowe.io/adapter/time";
import { Metadata, Tags, TextEnvelope, unAddressBech32, unTxOutRef, } from "@marlowe.io/runtime-core";
import { Header } from "../header.js";
import { TransactionId } from "../id.js";
import { ContractId, unContractId } from "@marlowe.io/runtime-core";
export const TransactionsRange = fromNewtype(t.string);
export const unTransactionsRange = iso().unwrap;
export const transactionsRange = iso().wrap;
export const getHeadersByRangeViaAxios = (axiosInstance) => (contractId, rangeOption) => pipe(HTTP.GetWithDataAndHeaders(axiosInstance)(transactionsEndpoint(contractId), pipe(rangeOption, O.match(() => ({}), (range) => ({ headers: { Range: unTransactionsRange(range) } })))), TE.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(GETByRangeRawResponse.decode(data)))), TE.map((rawResponse) => ({
    headers: pipe(rawResponse.data.results, A.map((result) => result.resource)),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
const GETByRangeRawResponse = t.type({
    data: t.type({
        results: t.array(t.type({ links: t.type({}), resource: Header })),
    }),
    previousRange: optionFromNullable(TransactionsRange),
    nextRange: optionFromNullable(TransactionsRange),
});
export const GETByRangeResponse = t.type({
    headers: t.array(Header),
    previousRange: optionFromNullable(TransactionsRange),
    nextRange: optionFromNullable(TransactionsRange),
});
export const TransactionTextEnvelope = t.type({
    contractId: ContractId,
    transactionId: TransactionId,
    tx: TextEnvelope,
});
export const postViaAxios = (axiosInstance) => (contractId, postTransactionsRequest, addressesAndCollaterals) => pipe(HTTP.Post(axiosInstance)(transactionsEndpoint(contractId), postTransactionsRequest, {
    headers: {
        Accept: "application/vendor.iog.marlowe-runtime.apply-inputs-tx-json",
        "Content-Type": "application/json",
        "X-Change-Address": unAddressBech32(addressesAndCollaterals.changeAddress),
        "X-Address": pipe(addressesAndCollaterals.usedAddresses, A.map(unAddressBech32), (a) => a.join(",")),
        "X-Collateral-UTxO": pipe(addressesAndCollaterals.collateralUTxOs, A.map(unTxOutRef), (a) => a.join(",")),
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(PostResponse.decode(data)))), TE.map((payload) => payload.resource));
export const PostTransactionsRequest = t.intersection([
    t.type({
        version: MarloweVersion,
        inputs: t.array(Input),
        metadata: Metadata,
        tags: Tags,
    }),
    t.partial({ invalidBefore: ISO8601 }),
    t.partial({ invalidHereafter: ISO8601 }),
]);
export const PostResponse = t.type({
    links: t.type({ transaction: t.string }),
    resource: TransactionTextEnvelope,
});
const transactionsEndpoint = (contractId) => `/contracts/${encodeURIComponent(unContractId(contractId))}/transactions`;
