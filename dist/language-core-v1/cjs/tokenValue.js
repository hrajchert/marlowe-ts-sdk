'use strict';

var index = require('./index-d60f2db2.js');
var token = require('./token-84874636.js');

const toString = (tokenValue) => `${tokenValue.amount} - ${token.tokenToString(tokenValue.token)}`;
const TokenValue = index.lib.type({ amount: index.lib.bigint, token: token.Token });
const tokenValue = (amount) => (token) => ({ amount: amount, token: token });
const lovelaceValue = (lovelaces) => ({ amount: lovelaces, token: token.adaToken });
const adaValue = (adaAmount) => ({
    amount: adaAmount * 1000000n,
    token: token.adaToken,
});

exports.TokenValue = TokenValue;
exports.adaValue = adaValue;
exports.lovelaceValue = lovelaceValue;
exports.toString = toString;
exports.tokenValue = tokenValue;
