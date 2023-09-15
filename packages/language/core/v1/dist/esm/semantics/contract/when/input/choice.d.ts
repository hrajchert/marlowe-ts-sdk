import * as t from "io-ts/lib/index.js";
import { ChoiceId } from "../../common/value.js";
export type ChosenNum = t.TypeOf<typeof ChosenNum>;
export declare const ChosenNum: t.BigIntC;
export type InputChoice = t.TypeOf<typeof InputChoice>;
export declare const InputChoice: t.TypeC<{
    for_choice_id: t.Type<ChoiceId, ChoiceId, unknown>;
    input_that_chooses_num: t.BigIntC;
}>;
