import * as t from "io-ts/lib/index.js";
export type InputDeposit = t.TypeOf<typeof InputDeposit>;
export declare const InputDeposit: t.TypeC<{
    input_from_party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    that_deposits: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>;
