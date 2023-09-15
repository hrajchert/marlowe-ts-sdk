import * as t from "io-ts/lib/index.js";
import { Contract } from "@marlowe.io/language-core-v1";
import { ContractId } from "@marlowe.io/runtime-core";
import { TxOutRef, PolicyId } from "@marlowe.io/runtime-core";
export type Payout = t.TypeOf<typeof Payout>;
export declare const Payout: t.TypeC<{
    payoutId: t.Type<TxOutRef, string, unknown>;
    role: t.StringC;
}>;
export type ContractDetails = t.TypeOf<typeof ContractDetails>;
export declare const ContractDetails: t.TypeC<{
    contractId: t.Type<ContractId, string, unknown>;
    roleTokenMintingPolicyId: t.Type<PolicyId, string, unknown>;
    version: t.LiteralC<"v1">;
    status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
    block: import("io-ts-types").OptionFromNullableC<t.TypeC<{
        slotNo: t.Type<number | bigint, bigint, unknown>;
        blockNo: t.Type<number | bigint, bigint, unknown>;
        blockHeaderHash: t.StringC;
    }>>;
    metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
    initialContract: t.Type<Contract, Contract, unknown>;
    currentContract: import("io-ts-types").OptionFromNullableC<t.Type<Contract, Contract, unknown>>;
    state: import("io-ts-types").OptionFromNullableC<t.TypeC<{
        accounts: t.ArrayC<t.TupleC<[t.TupleC<[t.UnionC<[t.TypeC<{
            address: t.StringC;
        }>, t.TypeC<{
            role_token: t.StringC;
        }>]>, t.TypeC<{
            currency_symbol: t.StringC;
            token_name: t.StringC;
        }>]>, t.BigIntC]>>;
        boundValues: t.ArrayC<t.TupleC<[t.StringC, t.BigIntC]>>;
        choices: t.ArrayC<t.TupleC<[t.Type<import("@marlowe.io/language-core-v1/contract/common/value").ChoiceId, import("@marlowe.io/language-core-v1/contract/common/value").ChoiceId, unknown>, t.BigIntC]>>;
        minTime: t.BigIntC;
    }>>;
    txBody: import("io-ts-types").OptionFromNullableC<t.TypeC<{
        type: t.StringC;
        description: t.StringC;
        cborHex: t.StringC;
    }>>;
    utxo: import("io-ts-types").OptionFromNullableC<t.Type<TxOutRef, string, unknown>>;
    unclaimedPayouts: t.ArrayC<t.TypeC<{
        payoutId: t.Type<TxOutRef, string, unknown>;
        role: t.StringC;
    }>>;
}>;
