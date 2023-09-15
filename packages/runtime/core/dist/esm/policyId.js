import * as t from "io-ts/lib/index.js";
import { iso } from "newtype-ts";
import { fromNewtype } from "io-ts-types";
export const PolicyId = fromNewtype(t.string);
export const unPolicyId = iso().unwrap;
export const mkPolicyId = iso().wrap;
