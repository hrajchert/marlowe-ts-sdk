import * as t from "io-ts/lib/index.js";
import { PolicyId } from "./policyId.js";
export type TokenName = t.TypeOf<typeof TokenName>;
export declare const TokenName: t.StringC;
export type Token = t.TypeOf<typeof Token>;
export declare const Token: t.TypeC<{
    currency_symbol: t.StringC;
    token_name: t.StringC;
}>;
export declare const token: (currency_symbol: PolicyId, token_name: TokenName) => {
    currency_symbol: string;
    token_name: string;
};
export declare const tokenToString: (token: Token) => string;
export declare const lovelaceToken: Token;
export declare const adaToken: Token;
