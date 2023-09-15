import * as t from "io-ts/lib/index.js";
import { ContractId, PayoutId, AddressBech32, WithdrawalId } from "@marlowe.io/runtime-core";
export type Tokens = t.TypeOf<typeof Tokens>;
export declare const Tokens: t.RecordC<t.StringC, t.RecordC<t.StringC, t.BigIntC>>;
export type Assets = t.TypeOf<typeof Assets>;
export declare const Assets: t.TypeC<{
    lovelace: t.BigIntC;
    tokens: t.RecordC<t.StringC, t.RecordC<t.StringC, t.BigIntC>>;
}>;
export type PayoutDetails = t.TypeOf<typeof PayoutDetails>;
export declare const PayoutDetails: t.TypeC<{
    payoutId: t.Type<PayoutId, string, unknown>;
    contractId: t.Type<ContractId, string, unknown>;
    withdrawalId: import("io-ts-types").OptionFromNullableC<t.Type<WithdrawalId, string, unknown>>;
    role: t.TypeC<{
        policyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
        assetName: t.StringC;
    }>;
    payoutValidatorAddress: t.Type<AddressBech32, string, unknown>;
    status: t.UnionC<[t.LiteralC<"available">, t.LiteralC<"withdrawn">]>;
    assets: t.TypeC<{
        lovelace: t.BigIntC;
        tokens: t.RecordC<t.StringC, t.RecordC<t.StringC, t.BigIntC>>;
    }>;
}>;
