import * as t from "io-ts/lib/index.js";
import { Bound } from "../../contract/when/action/choice.js";
import { ChoiceId } from "../../contract/common/value.js";
import { IsMerkleizedContinuation } from "../common/IsMerkleizedContinuation.js";
import { CaseIndex } from "../common/caseIndex.js";
export const CanChoose = t.type({
    case_index: CaseIndex,
    for_choice: ChoiceId,
    can_choose_between: t.array(Bound),
    is_merkleized_continuation: IsMerkleizedContinuation,
});
export const toInput = (canChoose) => (chosenNum) => ({
    for_choice_id: canChoose.for_choice,
    input_that_chooses_num: chosenNum,
});
