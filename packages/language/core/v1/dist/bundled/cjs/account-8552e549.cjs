'use strict';

var index = require('./index-d60f2db2.cjs');
var party = require('./party-234e637f.cjs');
var token = require('./token-fb2fc15b.cjs');

const Constant = index.lib.bigint;
const TimeIntervalStart = index.lib.literal("time_interval_start");
const TimeIntervalEnd = index.lib.literal("time_interval_end");
const NegValue = index.lib.recursion("NegValue", () => index.lib.type({ negate: Value }));
const AddValue = index.lib.recursion("AddValue", () => index.lib.type({ add: Value, and: Value }));
const SubValue = index.lib.recursion("SubValue", () => index.lib.type({ value: Value, minus: Value }));
const MulValue = index.lib.recursion("MulValue", () => index.lib.type({ multiply: Value, times: Value }));
const DivValue = index.lib.recursion("DivValue", () => index.lib.type({ divide: Value, by: Value }));
const ChoiceName = index.lib.string;
const ChoiceId = index.lib.recursion("ChoiceId", () => index.lib.type({ choice_name: ChoiceName, choice_owner: party.Party }));
const ChoiceValue = index.lib.recursion("ChoiceValue", () => index.lib.type({ value_of_choice: ChoiceId }));
const ValueId = index.lib.string;
const UseValue = index.lib.recursion("UseValue", () => index.lib.type({ use_value: ValueId }));
const Cond = index.lib.recursion("Cond", () => index.lib.type({ if: Observation, then: Value, else: Value }));
const Value = index.lib.recursion("Value", () => index.lib.union([
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

const And = index.lib.recursion("And", () => index.lib.type({ both: Observation, and: Observation }));
const Or = index.lib.recursion("Or", () => index.lib.type({ either: Observation, or: Observation }));
const Not = index.lib.recursion("Not", () => index.lib.type({ not: Observation }));
const Chose = index.lib.recursion("Chose", () => index.lib.type({ chose_something_for: ChoiceId }));
const Equal = index.lib.recursion("Equal", () => index.lib.type({ value: Value, equal_to: Value }));
const Greater = index.lib.recursion("Greater", () => index.lib.type({ value: Value, gt: Value }));
const GreaterOrEqual = index.lib.recursion("GreaterOrEqual", () => index.lib.type({ value: Value, ge_than: Value }));
const Lower = index.lib.recursion("Lower", () => index.lib.type({ value: Value, lt: Value }));
const LowerOrEqual = index.lib.recursion("LowerOrEqual", () => index.lib.type({ value: Value, le_than: Value }));
const Observation = index.lib.recursion("Observation", () => index.lib.union([
    And,
    Or,
    Not,
    Chose,
    Equal,
    Greater,
    GreaterOrEqual,
    Lower,
    LowerOrEqual,
    index.lib.boolean,
]));

const AccountId = party.Party;
const Account = index.lib.tuple([index.lib.tuple([AccountId, token.Token]), index.lib.bigint]);
const Accounts = index.lib.array(Account);

exports.AccountId = AccountId;
exports.Accounts = Accounts;
exports.ChoiceId = ChoiceId;
exports.Observation = Observation;
exports.Value = Value;
exports.ValueId = ValueId;
