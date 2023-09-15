import * as t from "io-ts/lib/index.js";
import { Choice } from "./choice.js";
import { Deposit } from "./deposit.js";
import { Notify } from "./notify.js";
export const Action = t.recursion("Action", () => t.union([Deposit, Choice, Notify]));
