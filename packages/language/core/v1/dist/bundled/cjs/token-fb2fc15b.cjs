'use strict';

var index = require('./index-d60f2db2.cjs');

const PolicyId = index.lib.string;

const TokenName = index.lib.string;
const Token = index.lib.type({
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

exports.PolicyId = PolicyId;
exports.Token = Token;
exports.TokenName = TokenName;
exports.adaToken = adaToken;
exports.lovelaceToken = lovelaceToken;
exports.token = token;
exports.tokenToString = tokenToString;
