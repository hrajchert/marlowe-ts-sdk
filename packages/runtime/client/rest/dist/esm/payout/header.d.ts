import * as t from "io-ts/lib/index.js";
import { ContractId, PayoutId, WithdrawalId } from "@marlowe.io/runtime-core";
export type PayoutHeader = t.TypeOf<typeof PayoutHeader>;
export declare const PayoutHeader: t.TypeC<{
    contractId: t.Type<ContractId, string, unknown>;
    payoutId: t.Type<PayoutId, string, unknown>;
    withdrawalId: import("io-ts-types").OptionFromNullableC<t.Type<WithdrawalId, string, unknown>>;
    role: t.TypeC<{
        policyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
        assetName: t.StringC;
    }>;
    status: t.UnionC<[t.LiteralC<"available">, t.LiteralC<"withdrawn">]>;
}>;
