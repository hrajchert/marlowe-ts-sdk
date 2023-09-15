import * as t from "io-ts/lib/index.js";
import { Bound } from "../../contract/when/action/choice.js";
import { ChoiceId } from "../../contract/common/value.js";
import { ChosenNum, InputChoice } from "../../contract/when/input/choice.js";
export type CanChoose = t.TypeOf<typeof CanChoose>;
export declare const CanChoose: t.TypeC<{
    case_index: t.BigIntC;
    for_choice: t.Type<ChoiceId, ChoiceId, unknown>;
    can_choose_between: t.ArrayC<t.Type<Bound, Bound, unknown>>;
    is_merkleized_continuation: t.BooleanC;
}>;
export declare const toInput: (canChoose: CanChoose) => (chosenNum: ChosenNum) => InputChoice;
