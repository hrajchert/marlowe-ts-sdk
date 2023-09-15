import * as t from "io-ts/lib/index.js";
import { AccountId } from "./common/payee/account.js";
import { Contract } from "./index.js";
import { Payee } from "./common/payee/index.js";
import { Token } from "./common/token.js";
import { Value } from "./common/value.js";
export declare const pay: (pay: Value, token: Token, from_account: AccountId, to: Payee, then: Contract) => {
    pay: Value;
    token: {
        currency_symbol: string;
        token_name: string;
    };
    from_account: {
        address: string;
    } | {
        role_token: string;
    };
    to: {
        account: {
            address: string;
        } | {
            role_token: string;
        };
    } | {
        party: {
            address: string;
        } | {
            role_token: string;
        };
    };
    then: Contract;
};
export type Pay = {
    pay: Value;
    token: Token;
    from_account: AccountId;
    to: Payee;
    then: Contract;
};
export declare const Pay: t.RecursiveType<t.Type<Pay, Pay, unknown>, Pay, Pay, unknown>;
