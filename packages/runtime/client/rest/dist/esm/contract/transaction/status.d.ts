import * as t from "io-ts/lib/index.js";
export type TxStatus = t.TypeOf<typeof TxStatus>;
export declare const TxStatus: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
