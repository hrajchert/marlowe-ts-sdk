import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts/lib/index.js";
import * as E from "fp-ts/lib/Either.js";
import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import { iso } from "newtype-ts";
import { fromNewtype, optionFromNullable } from "io-ts-types";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import * as HTTP from "@marlowe.io/adapter/http";
import { TextEnvelope, WithdrawalId, unAddressBech32, unTxOutRef, } from "@marlowe.io/runtime-core";
import { WithdrawalHeader } from "../header.js";
export const WithdrawalsRange = fromNewtype(t.string);
export const unWithdrawalsRange = iso().unwrap;
export const contractsRange = iso().wrap;
export const getHeadersByRangeViaAxios = (axiosInstance) => (rangeOption) => pipe(HTTP.GetWithDataAndHeaders(axiosInstance)("/withdrawals", pipe(rangeOption, O.match(() => ({}), (range) => ({ headers: { Range: unWithdrawalsRange(range) } })))), TE.map(([headers, data]) => ({
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
        results: t.array(t.type({
            links: t.type({ contract: t.string, transactions: t.string }),
            resource: WithdrawalHeader,
        })),
    }),
    previousRange: optionFromNullable(WithdrawalsRange),
    nextRange: optionFromNullable(WithdrawalsRange),
});
export const GETByRangeResponse = t.type({
    headers: t.array(WithdrawalHeader),
    previousRange: optionFromNullable(WithdrawalsRange),
    nextRange: optionFromNullable(WithdrawalsRange),
});
export const WithdrawalTextEnvelope = t.type({
    withdrawalId: WithdrawalId,
    tx: TextEnvelope,
});
export const PostResponse = t.type({
    links: t.type({}),
    resource: WithdrawalTextEnvelope,
});
export const postViaAxios = (axiosInstance) => (payoutIds, addressesAndCollaterals) => pipe(HTTP.Post(axiosInstance)("/withdrawals", { payouts: payoutIds }, {
    headers: {
        Accept: "application/vendor.iog.marlowe-runtime.withdraw-tx-json",
        "Content-Type": "application/json",
        "X-Change-Address": unAddressBech32(addressesAndCollaterals.changeAddress),
        "X-Address": pipe(addressesAndCollaterals.usedAddresses, A.map(unAddressBech32), (a) => a.join(",")),
        "X-Collateral-UTxO": pipe(addressesAndCollaterals.collateralUTxOs, A.map(unTxOutRef), (a) => a.join(",")),
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(PostResponse.decode(data)))), TE.map((payload) => payload.resource));
