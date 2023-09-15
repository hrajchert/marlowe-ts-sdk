import * as t from "io-ts/lib/index.js";
export const TxStatus = t.union([
    t.literal("unsigned"),
    t.literal("submitted"),
    t.literal("confirmed"),
]);
