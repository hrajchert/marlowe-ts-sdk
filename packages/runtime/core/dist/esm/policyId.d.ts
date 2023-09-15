import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
export type PolicyId = Newtype<{
    readonly PolicyId: unique symbol;
}, string>;
export declare const PolicyId: t.Type<PolicyId, string, unknown>;
export declare const unPolicyId: (s: PolicyId) => string;
export declare const mkPolicyId: (a: string) => PolicyId;
