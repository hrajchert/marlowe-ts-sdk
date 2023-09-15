import { l as lib } from './index-ca7ac053.js';

const PolicyId = lib.string;

const TokenName = lib.string;
const Token = lib.type({
    currency_symbol: PolicyId,
    token_name: TokenName,
});
const token = (currency_symbol, token_name) => ({
    currency_symbol: currency_symbol,
    token_name: token_name,
});
const tokenToString = (token) => `${token.currency_symbol}|${token.token_name}`;
const lovelaceToken = token("", "");
const adaToken = lovelaceToken;

export { PolicyId as P, Token as T, TokenName as a, token as b, adaToken as c, lovelaceToken as l, tokenToString as t };
