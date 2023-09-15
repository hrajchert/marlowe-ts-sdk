import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
import { TxId } from "@marlowe.io/runtime-core";
export type TransactionId = Newtype<{
    readonly TransactionId: unique symbol;
}, string>;
export declare const TransactionId: t.Type<TransactionId, string, unknown>;
export declare const unTransactionId: (s: TransactionId) => string;
export declare const transactionId: (a: string) => TransactionId;
export declare const idToTxId: (transactionId: TransactionId) => TxId;
