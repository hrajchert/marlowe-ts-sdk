import * as t from "io-ts/lib/index.js";
import { ChoiceId } from "../../common/value.js";
export const Bound = t.recursion("Bound", () => t.type({ from: t.bigint, to: t.bigint }));
export const Choice = t.recursion("Choice", () => t.type({ choose_between: t.array(Bound), for_choice: ChoiceId }));
