import * as t from "io-ts/lib/index.js";
import { TxOutRef } from "@marlowe.io/runtime-core";
import { ContractId } from "@marlowe.io/runtime-core";
import { TransactionId } from "./id.js";
export type Header = t.TypeOf<typeof Header>;
export declare const Header: t.TypeC<{
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
    utxo: import("io-ts-types").OptionFromNullableC<t.Type<TxOutRef, string, unknown>>;
}>;
