import * as t from "io-ts/lib/index.js";
import { ChoiceId } from "../../common/value.js";
export const ChosenNum = t.bigint;
export const InputChoice = t.type({
    for_choice_id: ChoiceId,
    input_that_chooses_num: ChosenNum,
});
