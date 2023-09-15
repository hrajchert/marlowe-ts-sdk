import { AxiosInstance } from "axios";
import * as t from "io-ts/lib/index.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as O from "fp-ts/lib/Option.js";
import { Newtype } from "newtype-ts";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { AssetId } from "@marlowe.io/runtime-core";
import { ContractId } from "@marlowe.io/runtime-core";
import { PayoutStatus } from "../status.js";
export interface ContractsRange extends Newtype<{
    readonly ContractsRange: unique symbol;
}, string> {
}
export declare const ContractsRange: t.Type<ContractsRange, string, unknown>;
export declare const unContractsRange: (s: ContractsRange) => string;
export declare const contractsRange: (a: string) => ContractsRange;
export type GETHeadersByRange = (rangeOption: O.Option<ContractsRange>) => (contractIds: ContractId[]) => (roles: AssetId[]) => (statusOption: O.Option<PayoutStatus>) => TE.TaskEither<Error | DecodingError, GETByRangeResponse>;
export declare const getHeadersByRangeViaAxios: (axiosInstance: AxiosInstance) => GETHeadersByRange;
export type GETByRangeRawResponse = t.TypeOf<typeof GETByRangeRawResponse>;
export declare const GETByRangeRawResponse: t.TypeC<{
    data: t.TypeC<{
        results: t.ArrayC<t.TypeC<{
            links: t.TypeC<{
                payout: t.StringC;
            }>;
            resource: t.TypeC<{
                contractId: t.Type<ContractId, string, unknown>;
                payoutId: t.Type<import("@marlowe.io/runtime-core").PayoutId, string, unknown>;
                withdrawalId: import("io-ts-types").OptionFromNullableC<t.Type<import("@marlowe.io/runtime-core").WithdrawalId, string, unknown>>;
                role: t.TypeC<{
                    policyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
                    assetName: t.StringC;
                }>;
                status: t.UnionC<[t.LiteralC<"available">, t.LiteralC<"withdrawn">]>;
            }>;
        }>>;
    }>;
    previousRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
    nextRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
}>;
export type GETByRangeResponse = t.TypeOf<typeof GETByRangeResponse>;
export declare const GETByRangeResponse: t.TypeC<{
    headers: t.ArrayC<t.TypeC<{
        contractId: t.Type<ContractId, string, unknown>;
        payoutId: t.Type<import("@marlowe.io/runtime-core").PayoutId, string, unknown>;
        withdrawalId: import("io-ts-types").OptionFromNullableC<t.Type<import("@marlowe.io/runtime-core").WithdrawalId, string, unknown>>;
        role: t.TypeC<{
            policyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
            assetName: t.StringC;
        }>;
        status: t.UnionC<[t.LiteralC<"available">, t.LiteralC<"withdrawn">]>;
    }>>;
    previousRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
    nextRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
}>;
