import * as t from "io-ts/lib/index.js";
export const Available = t.literal("available");
export const Withdrawn = t.literal("withdrawn");
export const PayoutStatus = t.union([Available, Withdrawn]);
