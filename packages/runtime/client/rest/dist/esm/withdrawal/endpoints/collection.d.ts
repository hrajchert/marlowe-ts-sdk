import { AxiosInstance } from "axios";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as t from "io-ts/lib/index.js";
import * as O from "fp-ts/lib/Option.js";
import { Newtype } from "newtype-ts";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { AddressesAndCollaterals, PayoutId, WithdrawalId } from "@marlowe.io/runtime-core";
export interface WithdrawalsRange extends Newtype<{
    readonly WithdrawalsRange: unique symbol;
}, string> {
}
export declare const WithdrawalsRange: t.Type<WithdrawalsRange, string, unknown>;
export declare const unWithdrawalsRange: (s: WithdrawalsRange) => string;
export declare const contractsRange: (a: string) => WithdrawalsRange;
export type GETHeadersByRange = (rangeOption: O.Option<WithdrawalsRange>) => TE.TaskEither<Error | DecodingError, GETByRangeResponse>;
export declare const getHeadersByRangeViaAxios: (axiosInstance: AxiosInstance) => GETHeadersByRange;
export type GETByRangeResponse = t.TypeOf<typeof GETByRangeResponse>;
export declare const GETByRangeResponse: t.TypeC<{
    headers: t.ArrayC<t.TypeC<{
        withdrawalId: t.Type<WithdrawalId, string, unknown>;
        status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
        block: import("io-ts-types").OptionFromNullableC<t.TypeC<{
            slotNo: t.Type<number | bigint, bigint, unknown>;
            blockNo: t.Type<number | bigint, bigint, unknown>;
            blockHeaderHash: t.StringC;
        }>>;
    }>>;
    previousRange: import("io-ts-types").OptionFromNullableC<t.Type<WithdrawalsRange, string, unknown>>;
    nextRange: import("io-ts-types").OptionFromNullableC<t.Type<WithdrawalsRange, string, unknown>>;
}>;
export type POST = (payoutIds: PayoutId[], addressesAndCollaterals: AddressesAndCollaterals) => TE.TaskEither<Error | DecodingError, WithdrawalTextEnvelope>;
export type WithdrawalTextEnvelope = t.TypeOf<typeof WithdrawalTextEnvelope>;
export declare const WithdrawalTextEnvelope: t.TypeC<{
    withdrawalId: t.Type<WithdrawalId, string, unknown>;
    tx: t.TypeC<{
        type: t.StringC;
        description: t.StringC;
        cborHex: t.StringC;
    }>;
}>;
export type PostResponse = t.TypeOf<typeof PostResponse>;
export declare const PostResponse: t.TypeC<{
    links: t.TypeC<{}>;
    resource: t.TypeC<{
        withdrawalId: t.Type<WithdrawalId, string, unknown>;
        tx: t.TypeC<{
            type: t.StringC;
            description: t.StringC;
            cborHex: t.StringC;
        }>;
    }>;
}>;
export declare const postViaAxios: (axiosInstance: AxiosInstance) => POST;
