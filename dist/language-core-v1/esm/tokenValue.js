import { l as lib } from './index-ca7ac053.js';
import { T as Token, t as tokenToString, c as adaToken } from './token-e1a1eafb.js';

const toString = (tokenValue) => `${tokenValue.amount} - ${tokenToString(tokenValue.token)}`;
const TokenValue = lib.type({ amount: lib.bigint, token: Token });
const tokenValue = (amount) => (token) => ({ amount: amount, token: token });
const lovelaceValue = (lovelaces) => ({ amount: lovelaces, token: adaToken });
const adaValue = (adaAmount) => ({
    amount: adaAmount * 1000000n,
    token: adaToken,
});

export { TokenValue, adaValue, lovelaceValue, toString, tokenValue };
