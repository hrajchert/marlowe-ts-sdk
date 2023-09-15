import * as t from "io-ts/lib/index.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as E from "fp-ts/lib/Either.js";
import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import { iso } from "newtype-ts";
import { formatValidationErrors } from "jsonbigint-io-ts-reporters";
import { fromNewtype, optionFromNullable } from "io-ts-types";
import { stringify } from "qs";
import * as HTTP from "@marlowe.io/adapter/http";
import { unPolicyId, unContractId } from "@marlowe.io/runtime-core";
import { PayoutHeader } from "../header.js";
export const ContractsRange = fromNewtype(t.string);
export const unContractsRange = iso().unwrap;
export const contractsRange = iso().wrap;
const roleToParameter = (roleToken) => `${unPolicyId(roleToken.policyId)}.${roleToken.assetName}`;
const contractIdToParameter = (contractId) => unContractId(contractId);
const statusOptionToParameter = (statusOption) => pipe(statusOption, O.match(() => "", (a) => `status=${a}&`));
export const getHeadersByRangeViaAxios = (axiosInstance) => (rangeOption) => (contractIds) => (roles) => (statusOption) => pipe({
    url: "/payouts?" +
        statusOptionToParameter(statusOption) +
        stringify({
            contractId: contractIds.map(contractIdToParameter),
            roleToken: roles.map(roleToParameter),
        }, { indices: false }),
    configs: pipe(rangeOption, O.match(() => ({}), (range) => ({ headers: { Range: unContractsRange(range) } }))),
}, ({ url, configs }) => HTTP.GetWithDataAndHeaders(axiosInstance)(url, configs), TE.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(GETByRangeRawResponse.decode(data)))), TE.map((rawResponse) => ({
    headers: pipe(rawResponse.data.results, A.map((result) => result.resource)),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
export const GETByRangeRawResponse = t.type({
    data: t.type({
        results: t.array(t.type({ links: t.type({ payout: t.string }), resource: PayoutHeader })),
    }),
    previousRange: optionFromNullable(ContractsRange),
    nextRange: optionFromNullable(ContractsRange),
});
export const GETByRangeResponse = t.type({
    headers: t.array(PayoutHeader),
    previousRange: optionFromNullable(ContractsRange),
    nextRange: optionFromNullable(ContractsRange),
});
