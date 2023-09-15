import * as t from "io-ts/lib/index.js";
import { AccountId } from "./common/payee/account.js";
import { Contract } from "./index.js";
import { Payee } from "./common/payee/index.js";
import { Token } from "./common/token.js";
import { Value } from "./common/value.js";
export const pay = (pay, token, from_account, to, then) => ({
    pay: pay,
    token: token,
    from_account: from_account,
    to: to,
    then: then,
});
export const Pay = t.recursion("Pay", () => t.type({
    pay: Value,
    token: Token,
    from_account: AccountId,
    to: Payee,
    then: Contract,
}));
