import * as t from "io-ts/lib/index.js";
export type Payee = t.TypeOf<typeof Payee>;
export declare const Payee: t.UnionC<[t.TypeC<{
    account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>, t.TypeC<{
    party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>]>;
