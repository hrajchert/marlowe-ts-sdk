import * as t from "io-ts/lib/index.js";
import { Contract } from "./index.js";
import { ValueId, Value } from "./common/value.js";
export const Let = t.recursion("Let", () => t.type({ let: ValueId, be: Value, then: Contract }));
