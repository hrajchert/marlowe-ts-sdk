import * as t from "io-ts/lib/index.js";
import { Contract } from "./index.js";
import { Observation } from "./common/observations.js";
export const If = t.recursion("If", () => t.type({ if: Observation, then: Contract, else: Contract }));
