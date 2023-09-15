import * as t from "io-ts/lib/index.js";
export type ISO8601 = t.TypeOf<typeof ISO8601>;
export declare const ISO8601: t.StringC;
export type POSIXTime = t.TypeOf<typeof POSIXTime>;
export declare const POSIXTime: t.NumberC;
export declare const datetoIso8601: (date: Date) => ISO8601;
export declare const datetoIso8601Bis: (date: Date) => ISO8601;
export declare const MINUTES: number;
