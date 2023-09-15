import * as t from "io-ts/lib/index.js";
import { PolicyId } from "./policyId.js";
export const TokenName = t.string;
export const Token = t.type({
    currency_symbol: PolicyId,
    token_name: TokenName,
});
export const token = (currency_symbol, token_name) => ({
    currency_symbol: currency_symbol,
    token_name: token_name,
});
export const tokenToString = (token) => `${token.currency_symbol}|${token.token_name}`;
export const lovelaceToken = token("", "");
export const adaToken = lovelaceToken;
