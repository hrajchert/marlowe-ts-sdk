import * as t from "io-ts/lib/index.js";
import { Action } from "./action/index.js";
import { Contract } from "../index.js";
import { pipe } from "fp-ts/lib/function.js";
import getUnixTime from "date-fns/getUnixTime/index.js";
export const When = t.recursion("When", () => t.type({
    when: t.array(Case),
    timeout: Timeout,
    timeout_continuation: Contract,
}));
export const Case = t.recursion("Case", () => t.type({ case: Action, then: Contract }));
export const Timeout = t.bigint;
export const datetoTimeout = (date) => pipe(date, getUnixTime, (a) => a * 1000, BigInt, (a) => a.valueOf());
