import * as t from "io-ts/lib/index.js";
import * as T from "./token.js";
export declare const toString: (token: TokenValue) => string;
export type TokenValue = t.TypeOf<typeof TokenValue>;
export declare const TokenValue: t.TypeC<{
    amount: t.BigIntC;
    token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
}>;
export declare const tokenValue: (amount: bigint) => (token: T.Token) => TokenValue;
export declare const lovelaceValue: (lovelaces: bigint) => TokenValue;
export declare const adaValue: (adaAmount: bigint) => TokenValue;
