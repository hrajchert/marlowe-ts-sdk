import * as t from "io-ts/lib/index.js";
import { Contract } from "./index.js";
import { Observation } from "./common/observations.js";
export type If = {
    if: Observation;
    then: Contract;
    else: Contract;
};
export declare const If: t.Type<If>;
