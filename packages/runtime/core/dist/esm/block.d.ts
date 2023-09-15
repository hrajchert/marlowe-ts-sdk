import * as t from "io-ts/lib/index.js";
export declare function isBigIntOrNumber(u: unknown): u is bigint | number;
export declare const bigint: t.Type<number | bigint, bigint, unknown>;
export type BlockHeader = t.TypeOf<typeof BlockHeader>;
export declare const BlockHeader: t.TypeC<{
    slotNo: t.Type<number | bigint, bigint, unknown>;
    blockNo: t.Type<number | bigint, bigint, unknown>;
    blockHeaderHash: t.StringC;
}>;
