import * as t from "io-ts/lib/index.js";
import { ChoiceId, Value } from "./value.js";
export type And = {
    both: Observation;
    and: Observation;
};
export declare const And: t.Type<And>;
export type Or = {
    either: Observation;
    or: Observation;
};
export declare const Or: t.Type<Or>;
export type Not = {
    not: Observation;
};
export declare const Not: t.Type<Not>;
export type Chose = {
    chose_something_for: ChoiceId;
};
export declare const Chose: t.Type<Chose>;
export type Equal = {
    value: Value;
    equal_to: Value;
};
export declare const Equal: t.Type<Equal>;
export type Greater = {
    value: Value;
    gt: Value;
};
export declare const Greater: t.Type<Greater>;
export type GreaterOrEqual = {
    value: Value;
    ge_than: Value;
};
export declare const GreaterOrEqual: t.Type<GreaterOrEqual>;
export type Lower = {
    value: Value;
    lt: Value;
};
export declare const Lower: t.Type<Lower>;
export type LowerOrEqual = {
    value: Value;
    le_than: Value;
};
export declare const LowerOrEqual: t.Type<LowerOrEqual>;
export type Observation = And | Or | Not | Chose | Equal | Greater | GreaterOrEqual | Lower | LowerOrEqual | boolean;
export declare const Observation: t.Type<Observation>;
