import * as t from "io-ts/lib/index.js";
import { Party } from "../common/payee/party.js";
import { Observation } from "./observations.js";
export declare const constant: (constant: bigint) => bigint;
export type Constant = t.TypeOf<typeof Constant>;
export declare const Constant: t.BigIntC;
export type TimeIntervalStart = t.TypeOf<typeof TimeIntervalStart>;
export declare const TimeIntervalStart: t.LiteralC<"time_interval_start">;
export type TimeIntervalEnd = t.TypeOf<typeof TimeIntervalEnd>;
export declare const TimeIntervalEnd: t.LiteralC<"time_interval_end">;
export type NegValue = {
    negate: Value;
};
export declare const NegValue: t.Type<NegValue>;
export type AddValue = {
    add: Value;
    and: Value;
};
export declare const AddValue: t.Type<AddValue>;
export type SubValue = {
    value: Value;
    minus: Value;
};
export declare const SubValue: t.Type<SubValue>;
export declare const mulValue: (multiply: Value, times: Value) => {
    multiply: Value;
    times: Value;
};
export type MulValue = {
    multiply: Value;
    times: Value;
};
export declare const MulValue: t.Type<MulValue>;
export type DivValue = {
    divide: Value;
    by: Value;
};
export declare const DivValue: t.Type<DivValue>;
export type ChoiceName = t.TypeOf<typeof ChoiceName>;
export declare const ChoiceName: t.StringC;
export type ChoiceId = {
    choice_name: ChoiceName;
    choice_owner: Party;
};
export declare const ChoiceId: t.Type<ChoiceId>;
export type ChoiceValue = {
    value_of_choice: ChoiceId;
};
export declare const ChoiceValue: t.Type<ChoiceValue>;
export type ValueId = t.TypeOf<typeof ValueId>;
export declare const ValueId: t.StringC;
export type UseValue = {
    use_value: ValueId;
};
export declare const UseValue: t.Type<UseValue>;
export type Cond = {
    if: Observation;
    then: Value;
    else: Value;
};
export declare const Cond: t.Type<Cond>;
export type Value = Constant | NegValue | AddValue | SubValue | MulValue | DivValue | ChoiceValue | TimeIntervalStart | TimeIntervalEnd | UseValue | Cond;
export declare const Value: t.Type<Value>;
