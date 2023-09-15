import * as t from "io-ts/lib/index.js";
import { iso } from "newtype-ts";
import { fromNewtype } from "io-ts-types";
import { pipe } from "fp-ts/lib/function.js";
export const TransactionId = fromNewtype(t.string);
export const unTransactionId = iso().unwrap;
export const transactionId = iso().wrap;
export const idToTxId = (transactionId) => pipe(transactionId, unTransactionId);
