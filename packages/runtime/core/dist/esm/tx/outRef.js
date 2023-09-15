import * as t from "io-ts/lib/index.js";
import { iso } from "newtype-ts";
import { fromNewtype } from "io-ts-types";
export const TxOutRef = fromNewtype(t.string);
export const unTxOutRef = iso().unwrap;
export const txOutRef = iso().wrap;
