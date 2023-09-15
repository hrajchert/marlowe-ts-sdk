import { l as lib } from './index-ca7ac053.js';
import { P as Party } from './party-2b7ee6d1.js';
import { T as Token } from './token-e1a1eafb.js';

const Constant = lib.bigint;
const TimeIntervalStart = lib.literal("time_interval_start");
const TimeIntervalEnd = lib.literal("time_interval_end");
const NegValue = lib.recursion("NegValue", () => lib.type({ negate: Value }));
const AddValue = lib.recursion("AddValue", () => lib.type({ add: Value, and: Value }));
const SubValue = lib.recursion("SubValue", () => lib.type({ value: Value, minus: Value }));
const MulValue = lib.recursion("MulValue", () => lib.type({ multiply: Value, times: Value }));
const DivValue = lib.recursion("DivValue", () => lib.type({ divide: Value, by: Value }));
const ChoiceName = lib.string;
const ChoiceId = lib.recursion("ChoiceId", () => lib.type({ choice_name: ChoiceName, choice_owner: Party }));
const ChoiceValue = lib.recursion("ChoiceValue", () => lib.type({ value_of_choice: ChoiceId }));
const ValueId = lib.string;
const UseValue = lib.recursion("UseValue", () => lib.type({ use_value: ValueId }));
const Cond = lib.recursion("Cond", () => lib.type({ if: Observation, then: Value, else: Value }));
const Value = lib.recursion("Value", () => lib.union([
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

const And = lib.recursion("And", () => lib.type({ both: Observation, and: Observation }));
const Or = lib.recursion("Or", () => lib.type({ either: Observation, or: Observation }));
const Not = lib.recursion("Not", () => lib.type({ not: Observation }));
const Chose = lib.recursion("Chose", () => lib.type({ chose_something_for: ChoiceId }));
const Equal = lib.recursion("Equal", () => lib.type({ value: Value, equal_to: Value }));
const Greater = lib.recursion("Greater", () => lib.type({ value: Value, gt: Value }));
const GreaterOrEqual = lib.recursion("GreaterOrEqual", () => lib.type({ value: Value, ge_than: Value }));
const Lower = lib.recursion("Lower", () => lib.type({ value: Value, lt: Value }));
const LowerOrEqual = lib.recursion("LowerOrEqual", () => lib.type({ value: Value, le_than: Value }));
const Observation = lib.recursion("Observation", () => lib.union([
    And,
    Or,
    Not,
    Chose,
    Equal,
    Greater,
    GreaterOrEqual,
    Lower,
    LowerOrEqual,
    lib.boolean,
]));

const AccountId = Party;
const Account = lib.tuple([lib.tuple([AccountId, Token]), lib.bigint]);
const Accounts = lib.array(Account);

export { AccountId as A, ChoiceId as C, Observation as O, ValueId as V, Value as a, Accounts as b };
