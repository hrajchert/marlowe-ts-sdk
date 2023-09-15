import * as t from "io-ts/lib/index.js";
import { Choice } from "./choice.js";
import { Deposit } from "./deposit.js";
import { Notify } from "./notify.js";
export type Action = Deposit | Choice | Notify;
export declare const Action: t.Type<Action>;
