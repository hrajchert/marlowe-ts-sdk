import * as t from "io-ts/lib/index.js";
import * as T from "./token.js";
export const toString = (tokenValue) => `${tokenValue.amount} - ${T.tokenToString(tokenValue.token)}`;
export const TokenValue = t.type({ amount: t.bigint, token: T.Token });
export const tokenValue = (amount) => (token) => ({ amount: amount, token: token });
export const lovelaceValue = (lovelaces) => ({ amount: lovelaces, token: T.adaToken });
export const adaValue = (adaAmount) => ({
    amount: adaAmount * 1000000n,
    token: T.adaToken,
});
