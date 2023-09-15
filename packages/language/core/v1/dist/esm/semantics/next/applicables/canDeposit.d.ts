import * as t from "io-ts/lib/index.js";
import { InputDeposit } from "../../contract/when/input/deposit.js";
export type CanDeposit = t.TypeOf<typeof CanDeposit>;
export declare const CanDeposit: t.TypeC<{
    case_index: t.BigIntC;
    party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    can_deposit: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    is_merkleized_continuation: t.BooleanC;
}>;
export declare const toInput: (canDeposit: CanDeposit) => InputDeposit;
