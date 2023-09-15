import * as t from "io-ts/lib/index.js";
import { Contract } from "./index.js";
import { Observation } from "./common/observations.js";
export const Assert = t.recursion("Assert", () => t.type({ assert: Observation, then: Contract }));
