import * as t from "io-ts/lib/index.js";
import { Contract } from "./index.js";
import { ValueId, Value } from "./common/value.js";
export type Let = {
    let: ValueId;
    be: Value;
    then: Contract;
};
export declare const Let: t.Type<Let>;
