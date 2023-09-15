import * as t from "io-ts/lib/index.js";
import { Party } from "../common/payee/party.js";
import { Observation } from "./observations.js";
export const constant = (constant) => constant;
export const Constant = t.bigint;
export const TimeIntervalStart = t.literal("time_interval_start");
export const TimeIntervalEnd = t.literal("time_interval_end");
export const NegValue = t.recursion("NegValue", () => t.type({ negate: Value }));
export const AddValue = t.recursion("AddValue", () => t.type({ add: Value, and: Value }));
export const SubValue = t.recursion("SubValue", () => t.type({ value: Value, minus: Value }));
export const mulValue = (multiply, times) => ({
    multiply: multiply,
    times: times,
});
export const MulValue = t.recursion("MulValue", () => t.type({ multiply: Value, times: Value }));
export const DivValue = t.recursion("DivValue", () => t.type({ divide: Value, by: Value }));
export const ChoiceName = t.string;
export const ChoiceId = t.recursion("ChoiceId", () => t.type({ choice_name: ChoiceName, choice_owner: Party }));
export const ChoiceValue = t.recursion("ChoiceValue", () => t.type({ value_of_choice: ChoiceId }));
export const ValueId = t.string;
export const UseValue = t.recursion("UseValue", () => t.type({ use_value: ValueId }));
export const Cond = t.recursion("Cond", () => t.type({ if: Observation, then: Value, else: Value }));
export const Value = t.recursion("Value", () => t.union([
    Constant,
    NegValue,
    AddValue,
    SubValue,
    MulValue,
    DivValue,
    ChoiceValue,
    TimeIntervalStart,
    TimeIntervalEnd,
    UseValue,
    Cond,
]));
