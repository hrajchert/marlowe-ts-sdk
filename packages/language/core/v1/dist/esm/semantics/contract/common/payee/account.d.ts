import * as t from "io-ts/lib/index.js";
import { Party } from "./party.js";
export type AccountId = t.TypeOf<typeof Party>;
export declare const AccountId: t.UnionC<[t.TypeC<{
    address: t.StringC;
}>, t.TypeC<{
    role_token: t.StringC;
}>]>;
export type Account = t.TypeOf<typeof Account>;
export declare const Account: t.TupleC<[t.TupleC<[t.UnionC<[t.TypeC<{
    address: t.StringC;
}>, t.TypeC<{
    role_token: t.StringC;
}>]>, t.TypeC<{
    currency_symbol: t.StringC;
    token_name: t.StringC;
}>]>, t.BigIntC]>;
export type Accounts = t.TypeOf<typeof Accounts>;
export declare const Accounts: t.ArrayC<t.TupleC<[t.TupleC<[t.UnionC<[t.TypeC<{
    address: t.StringC;
}>, t.TypeC<{
    role_token: t.StringC;
}>]>, t.TypeC<{
    currency_symbol: t.StringC;
    token_name: t.StringC;
}>]>, t.BigIntC]>>;
