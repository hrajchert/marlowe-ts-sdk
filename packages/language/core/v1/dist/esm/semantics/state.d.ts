import * as t from "io-ts/lib/index.js";
import { ChoiceId } from "./contract/common/value.js";
export type MarloweState = t.TypeOf<typeof MarloweState>;
export declare const MarloweState: t.TypeC<{
    accounts: t.ArrayC<t.TupleC<[t.TupleC<[t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>, t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>]>, t.BigIntC]>>;
    boundValues: t.ArrayC<t.TupleC<[t.StringC, t.BigIntC]>>;
    choices: t.ArrayC<t.TupleC<[t.Type<ChoiceId, ChoiceId, unknown>, t.BigIntC]>>;
    minTime: t.BigIntC;
}>;
