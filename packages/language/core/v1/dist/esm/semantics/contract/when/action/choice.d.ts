import * as t from "io-ts/lib/index.js";
import { ChoiceId } from "../../common/value.js";
export type Bound = {
    from: bigint;
    to: bigint;
};
export declare const Bound: t.Type<Bound>;
export type Choice = {
    choose_between: Bound[];
    for_choice: ChoiceId;
};
export declare const Choice: t.Type<Choice>;
