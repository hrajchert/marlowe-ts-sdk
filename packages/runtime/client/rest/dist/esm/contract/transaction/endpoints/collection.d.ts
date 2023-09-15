import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { AxiosInstance } from "axios";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { AddressesAndCollaterals } from "@marlowe.io/runtime-core";
import { TransactionId } from "../id.js";
import { ContractId } from "@marlowe.io/runtime-core";
export interface TransactionsRange extends Newtype<{
    readonly TransactionsRange: unique symbol;
}, string> {
}
export declare const TransactionsRange: t.Type<TransactionsRange, string, unknown>;
export declare const unTransactionsRange: (s: TransactionsRange) => string;
export declare const transactionsRange: (a: string) => TransactionsRange;
export type GETHeadersByRange = (contractId: ContractId, rangeOption: O.Option<TransactionsRange>) => TE.TaskEither<Error | DecodingError, GETByRangeResponse>;
export declare const getHeadersByRangeViaAxios: (axiosInstance: AxiosInstance) => GETHeadersByRange;
export type GETByRangeResponse = t.TypeOf<typeof GETByRangeResponse>;
export declare const GETByRangeResponse: t.TypeC<{
    headers: t.ArrayC<t.TypeC<{
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
        utxo: import("io-ts-types").OptionFromNullableC<t.Type<import("@marlowe.io/runtime-core").TxOutRef, string, unknown>>;
    }>>;
    previousRange: import("io-ts-types").OptionFromNullableC<t.Type<TransactionsRange, string, unknown>>;
    nextRange: import("io-ts-types").OptionFromNullableC<t.Type<TransactionsRange, string, unknown>>;
}>;
export type TransactionTextEnvelope = t.TypeOf<typeof TransactionTextEnvelope>;
export declare const TransactionTextEnvelope: t.TypeC<{
    contractId: t.Type<ContractId, string, unknown>;
    transactionId: t.Type<TransactionId, string, unknown>;
    tx: t.TypeC<{
        type: t.StringC;
        description: t.StringC;
        cborHex: t.StringC;
    }>;
}>;
export type POST = (contractId: ContractId, postTransactionsRequest: PostTransactionsRequest, addressesAndCollaterals: AddressesAndCollaterals) => TE.TaskEither<Error | DecodingError, TransactionTextEnvelope>;
export declare const postViaAxios: (axiosInstance: AxiosInstance) => POST;
export type PostTransactionsRequest = t.TypeOf<typeof PostTransactionsRequest>;
export declare const PostTransactionsRequest: t.IntersectionC<[t.TypeC<{
    version: t.LiteralC<"v1">;
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
        merkleized_continuation: t.Type<import("@marlowe.io/language-core-v1").Contract, import("@marlowe.io/language-core-v1").Contract, unknown>;
    }>]>]>>;
    metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
    tags: t.RecordC<t.StringC, t.AnyC>;
}>, t.PartialC<{
    invalidBefore: t.StringC;
}>, t.PartialC<{
    invalidHereafter: t.StringC;
}>]>;
export type PostResponse = t.TypeOf<typeof PostResponse>;
export declare const PostResponse: t.TypeC<{
    links: t.TypeC<{
        transaction: t.StringC;
    }>;
    resource: t.TypeC<{
        contractId: t.Type<ContractId, string, unknown>;
        transactionId: t.Type<TransactionId, string, unknown>;
        tx: t.TypeC<{
            type: t.StringC;
            description: t.StringC;
            cborHex: t.StringC;
        }>;
    }>;
}>;
