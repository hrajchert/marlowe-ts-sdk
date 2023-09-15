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
import { Contract } from "@marlowe.io/language-core-v1";
import { MarloweVersion } from "@marlowe.io/language-core-v1/version";
import * as HTTP from "@marlowe.io/adapter/http";
import { Tags, Metadata, TextEnvelope, unAddressBech32, unTxOutRef, } from "@marlowe.io/runtime-core";
import { Header } from "../header.js";
import { RolesConfig } from "../role.js";
import { ContractId } from "@marlowe.io/runtime-core";
export const ContractsRange = fromNewtype(t.string);
export const unContractsRange = iso().unwrap;
export const contractsRange = iso().wrap;
export const getHeadersByRangeViaAxios = (axiosInstance) => (rangeOption) => (tags) => pipe({
    url: "/contracts?" + stringify({ tag: tags }, { indices: false }),
    configs: pipe(rangeOption, O.match(() => ({}), (range) => ({ headers: { Range: unContractsRange(range) } }))),
}, ({ url, configs }) => HTTP.GetWithDataAndHeaders(axiosInstance)(url, configs), TE.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(GETByRangeRawResponse.decode(data)))), TE.map((rawResponse) => ({
    headers: pipe(rawResponse.data.results, A.map((result) => result.resource), A.filter((header) => eqSetString(new Set(Object.keys(header.tags)), new Set(tags)))),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
const eqSetString = (xs, ys) => xs.size === ys.size && [...xs].every((x) => ys.has(x));
export const GETByRangeRawResponse = t.type({
    data: t.type({
        results: t.array(t.type({
            links: t.type({ contract: t.string, transactions: t.string }),
            resource: Header,
        })),
    }),
    previousRange: optionFromNullable(ContractsRange),
    nextRange: optionFromNullable(ContractsRange),
});
export const GETByRangeResponse = t.type({
    headers: t.array(Header),
    previousRange: optionFromNullable(ContractsRange),
    nextRange: optionFromNullable(ContractsRange),
});
export const PostContractsRequest = t.intersection([
    t.type({
        contract: Contract,
        version: MarloweVersion,
        tags: Tags,
        metadata: Metadata,
        minUTxODeposit: t.number,
    }),
    t.partial({ roles: RolesConfig }),
]);
export const ContractTextEnvelope = t.type({
    contractId: ContractId,
    tx: TextEnvelope,
});
export const PostResponse = t.type({
    links: t.type({ contract: t.string }),
    resource: ContractTextEnvelope,
});
export const postViaAxios = (axiosInstance) => (postContractsRequest, addressesAndCollaterals) => pipe(HTTP.Post(axiosInstance)("/contracts", postContractsRequest, {
    headers: {
        Accept: "application/vendor.iog.marlowe-runtime.contract-tx-json",
        "Content-Type": "application/json",
        "X-Change-Address": unAddressBech32(addressesAndCollaterals.changeAddress),
        "X-Address": pipe(addressesAndCollaterals.usedAddresses, A.map(unAddressBech32), (a) => a.join(",")),
        "X-Collateral-UTxO": pipe(addressesAndCollaterals.collateralUTxOs, A.map(unTxOutRef), (a) => a.join(",")),
    },
}), TE.chainW((data) => TE.fromEither(E.mapLeft(formatValidationErrors)(PostResponse.decode(data)))), TE.map((payload) => payload.resource));
