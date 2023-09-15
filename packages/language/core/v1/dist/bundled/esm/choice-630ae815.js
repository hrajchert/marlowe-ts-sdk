import { l as lib } from './index-ca7ac053.js';
import { C as ChoiceId } from './account-c787daee.js';

const Bound = lib.recursion("Bound", () => lib.type({ from: lib.bigint, to: lib.bigint }));
const Choice = lib.recursion("Choice", () => lib.type({ choose_between: lib.array(Bound), for_choice: ChoiceId }));

export { Bound as B, Choice as C };
