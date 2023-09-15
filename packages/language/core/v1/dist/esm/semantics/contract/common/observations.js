import * as t from "io-ts/lib/index.js";
import { ChoiceId, Value } from "./value.js";
export const And = t.recursion("And", () => t.type({ both: Observation, and: Observation }));
export const Or = t.recursion("Or", () => t.type({ either: Observation, or: Observation }));
export const Not = t.recursion("Not", () => t.type({ not: Observation }));
export const Chose = t.recursion("Chose", () => t.type({ chose_something_for: ChoiceId }));
export const Equal = t.recursion("Equal", () => t.type({ value: Value, equal_to: Value }));
export const Greater = t.recursion("Greater", () => t.type({ value: Value, gt: Value }));
export const GreaterOrEqual = t.recursion("GreaterOrEqual", () => t.type({ value: Value, ge_than: Value }));
export const Lower = t.recursion("Lower", () => t.type({ value: Value, lt: Value }));
export const LowerOrEqual = t.recursion("LowerOrEqual", () => t.type({ value: Value, le_than: Value }));
export const Observation = t.recursion("Observation", () => t.union([
    And,
    Or,
    Not,
    Chose,
    Equal,
    Greater,
    GreaterOrEqual,
    Lower,
    LowerOrEqual,
    t.boolean,
]));
