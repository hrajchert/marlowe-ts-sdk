import * as t from "io-ts/lib/index.js";
import { WithdrawalId } from "@marlowe.io/runtime-core";
export type WithdrawalDetails = t.TypeOf<typeof WithdrawalDetails>;
export declare const WithdrawalDetails: t.TypeC<{
    withdrawalId: t.Type<WithdrawalId, string, unknown>;
    status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
    block: import("io-ts-types/lib/optionFromNullable.js").OptionFromNullableC<t.TypeC<{
        slotNo: t.Type<number | bigint, bigint, unknown>;
        blockNo: t.Type<number | bigint, bigint, unknown>;
        blockHeaderHash: t.StringC;
    }>>;
    payouts: t.ArrayC<t.TypeC<{
        contractId: t.Type<import("@marlowe.io/runtime-core").ContractId, string, unknown>;
        payoutId: t.Type<import("@marlowe.io/runtime-core").PayoutId, string, unknown>;
        withdrawalId: import("io-ts-types/lib/optionFromNullable.js").OptionFromNullableC<t.Type<WithdrawalId, string, unknown>>;
        role: t.TypeC<{
            policyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
            assetName: t.StringC;
        }>;
        status: t.UnionC<[t.LiteralC<"available">, t.LiteralC<"withdrawn">]>;
    }>>;
}>;
