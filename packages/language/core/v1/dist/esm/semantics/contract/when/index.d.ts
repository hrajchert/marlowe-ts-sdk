import * as t from "io-ts/lib/index.js";
import { Action } from "./action/index.js";
import { Contract } from "../index.js";
export type When = {
    when: Case[];
    timeout: Timeout;
    timeout_continuation: Contract;
};
export declare const When: t.Type<When>;
export type Case = {
    case: Action;
    then: Contract;
};
export declare const Case: t.Type<Case>;
export type Timeout = t.TypeOf<typeof Timeout>;
export declare const Timeout: t.BigIntC;
export declare const datetoTimeout: (date: Date) => Timeout;
