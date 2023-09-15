import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
import { TxId } from "../tx/id.js";
import { ContractId } from "../contract/id.js";
export type PayoutId = Newtype<{
    readonly ContractId: unique symbol;
}, string>;
export declare const PayoutId: t.Type<PayoutId, string, unknown>;
export declare const unPayoutId: (s: PayoutId) => string;
export declare const payoutId: (a: string) => PayoutId;
export declare const payoutIdToTxId: (payoutId: PayoutId) => TxId;
export type WithdrawalId = Newtype<{
    readonly WithdrawalId: unique symbol;
}, string>;
export declare const WithdrawalId: t.Type<WithdrawalId, string, unknown>;
export declare const unWithdrawalId: (s: WithdrawalId) => string;
export declare const withdrawalId: (a: string) => WithdrawalId;
export declare const withdrawalIdToTxId: (withdrawalId: WithdrawalId) => TxId;
export type PayoutAvailable = t.TypeOf<typeof PayoutAvailable>;
export declare const PayoutAvailable: t.TypeC<{
    payoutId: t.Type<PayoutId, string, unknown>;
    contractId: t.Type<ContractId, string, unknown>;
    role: t.TypeC<{
        policyId: t.Type<import("../policyId.js").PolicyId, string, unknown>;
        assetName: t.StringC;
    }>;
    assets: t.TypeC<{
        lovelaces: t.BigIntC;
        tokens: t.ArrayC<t.TypeC<{
            quantity: t.BigIntC;
            assetId: t.TypeC<{
                policyId: t.Type<import("../policyId.js").PolicyId, string, unknown>;
                assetName: t.StringC;
            }>;
        }>>;
    }>;
}>;
export type PayoutWithdrawn = t.TypeOf<typeof PayoutWithdrawn>;
export declare const PayoutWithdrawn: t.TypeC<{
    withdrawalId: t.Type<WithdrawalId, string, unknown>;
    payoutId: t.Type<PayoutId, string, unknown>;
    contractId: t.Type<ContractId, string, unknown>;
    role: t.TypeC<{
        policyId: t.Type<import("../policyId.js").PolicyId, string, unknown>;
        assetName: t.StringC;
    }>;
    assets: t.TypeC<{
        lovelaces: t.BigIntC;
        tokens: t.ArrayC<t.TypeC<{
            quantity: t.BigIntC;
            assetId: t.TypeC<{
                policyId: t.Type<import("../policyId.js").PolicyId, string, unknown>;
                assetName: t.StringC;
            }>;
        }>>;
    }>;
}>;
