import * as t from "io-ts/lib/index.js";
import { ApplicableInputs } from "./applicables/index.js";
export { toInput } from "./applicables/canDeposit.js";
export const Next = t.type({
    can_reduce: t.boolean,
    applicable_inputs: ApplicableInputs,
});
