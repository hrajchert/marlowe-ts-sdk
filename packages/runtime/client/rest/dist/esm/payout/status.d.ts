import * as t from "io-ts/lib/index.js";
export type Available = t.TypeOf<typeof Available>;
export declare const Available: t.LiteralC<"available">;
export type Withdrawn = t.TypeOf<typeof Available>;
export declare const Withdrawn: t.LiteralC<"withdrawn">;
export type PayoutStatus = t.TypeOf<typeof PayoutStatus>;
export declare const PayoutStatus: t.UnionC<[t.LiteralC<"available">, t.LiteralC<"withdrawn">]>;
