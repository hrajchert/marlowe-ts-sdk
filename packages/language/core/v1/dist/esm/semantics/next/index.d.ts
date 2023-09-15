import * as t from "io-ts/lib/index.js";
export { toInput } from "./applicables/canDeposit.js";
export type Next = t.TypeOf<typeof Next>;
export declare const Next: t.TypeC<{
    can_reduce: t.BooleanC;
    applicable_inputs: t.TypeC<{
        notify: import("io-ts-types").OptionFromNullableC<t.TypeC<{
            case_index: t.BigIntC;
            is_merkleized_continuation: t.BooleanC;
        }>>;
        deposits: t.ArrayC<t.TypeC<{
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
        }>>;
        choices: t.ArrayC<t.TypeC<{
            case_index: t.BigIntC;
            for_choice: t.Type<import("../contract/common/value.js").ChoiceId, import("../contract/common/value.js").ChoiceId, unknown>;
            can_choose_between: t.ArrayC<t.Type<import("../contract/when/action/choice.js").Bound, import("../contract/when/action/choice.js").Bound, unknown>>;
            is_merkleized_continuation: t.BooleanC;
        }>>;
    }>;
}>;
