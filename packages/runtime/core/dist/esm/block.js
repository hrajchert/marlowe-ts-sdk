import * as t from "io-ts/lib/index.js";
import { failure, success, Type } from "io-ts/lib/index.js";
export function isBigIntOrNumber(u) {
    return typeof u === "bigint" || typeof u === "number";
}
export const bigint = new Type("bigint", isBigIntOrNumber, (i, c) => (isBigIntOrNumber(i) ? success(i) : failure(i, c)), (number) => BigInt(number));
export const BlockHeader = t.type({
    slotNo: bigint,
    blockNo: bigint,
    blockHeaderHash: t.string,
});
