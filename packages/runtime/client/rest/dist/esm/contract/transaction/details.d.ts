import * as t from "io-ts/lib/index.js";
import { Contract } from "@marlowe.io/language-core-v1";
import { TxOutRef } from "@marlowe.io/runtime-core";
import { ContractId } from "@marlowe.io/runtime-core";
import { TransactionId } from "./id.js";
export type Details = t.TypeOf<typeof Details>;
export declare const Details: t.TypeC<{
    contractId: t.Type<ContractId, string, unknown>;
    transactionId: t.Type<TransactionId, string, unknown>;
    continuations: import("io-ts-types").OptionFromNullableC<t.StringC>;
    tags: t.RecordC<t.StringC, t.AnyC>;
    metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
    status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
    block: import("io-ts-types").OptionFromNullableC<t.TypeC<{
        slotNo: t.Type<number | bigint, bigint, unknown>;
        blockNo: t.Type<number | bigint, bigint, unknown>;
        blockHeaderHash: t.StringC;
    }>>;
    inputUtxo: t.Type<TxOutRef, string, unknown>;
    inputs: t.ArrayC<t.UnionC<[t.UnionC<[t.TypeC<{
        input_from_party: t.UnionC<[t.TypeC<{
            address: t.StringC;
        }>, t.TypeC<{
            role_token: t.StringC;
        }>]>;
        that_deposits: t.BigIntC;
        of_token: t.TypeC<{
            currency_symbol: t.StringC;
            token_name: t.StringC;
        }>;
        into_account: t.UnionC<[t.TypeC<{
            address: t.StringC;
        }>, t.TypeC<{
            role_token: t.StringC;
        }>]>;
    }>, t.TypeC<{
        for_choice_id: t.Type<import("@marlowe.io/language-core-v1/contract/common/value").ChoiceId, import("@marlowe.io/language-core-v1/contract/common/value").ChoiceId, unknown>;
        input_that_chooses_num: t.BigIntC;
    }>, t.LiteralC<"input_notify">]>, t.IntersectionC<[t.UnionC<[t.TypeC<{
        input_from_party: t.UnionC<[t.TypeC<{
            address: t.StringC;
        }>, t.TypeC<{
            role_token: t.StringC;
        }>]>;
        that_deposits: t.BigIntC;
        of_token: t.TypeC<{
            currency_symbol: t.StringC;
            token_name: t.StringC;
        }>;
        into_account: t.UnionC<[t.TypeC<{
            address: t.StringC;
        }>, t.TypeC<{
            role_token: t.StringC;
        }>]>;
    }>, t.TypeC<{
        for_choice_id: t.Type<import("@marlowe.io/language-core-v1/contract/common/value").ChoiceId, import("@marlowe.io/language-core-v1/contract/common/value").ChoiceId, unknown>;
        input_that_chooses_num: t.BigIntC;
    }>, t.LiteralC<"input_notify">]>, t.PartialC<{
        continuation_hash: t.StringC;
        merkleized_continuation: t.Type<Contract, Contract, unknown>;
    }>]>]>>;
    outputUtxo: import("io-ts-types").OptionFromNullableC<t.Type<TxOutRef, string, unknown>>;
    outputContract: import("io-ts-types").OptionFromNullableC<t.Type<Contract, Contract, unknown>>;
    outputState: import("io-ts-types").OptionFromNullableC<t.TypeC<{
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
    consumingTx: import("io-ts-types").OptionFromNullableC<t.StringC>;
    invalidBefore: t.StringC;
    invalidHereafter: t.StringC;
    txBody: import("io-ts-types").OptionFromNullableC<t.TypeC<{
        type: t.StringC;
        description: t.StringC;
        cborHex: t.StringC;
    }>>;
}>;
