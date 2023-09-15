import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
export type TxOutRef = Newtype<{
    readonly TxOutRef: unique symbol;
}, string>;
export declare const TxOutRef: t.Type<TxOutRef, string, unknown>;
export declare const unTxOutRef: (s: TxOutRef) => string;
export declare const txOutRef: (a: string) => TxOutRef;
