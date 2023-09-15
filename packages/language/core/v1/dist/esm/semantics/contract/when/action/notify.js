import * as t from "io-ts/lib/index.js";
import { Observation } from "../../common/observations.js";
export const Notify = t.recursion("Notify", () => t.type({ notify_if: Observation }));
