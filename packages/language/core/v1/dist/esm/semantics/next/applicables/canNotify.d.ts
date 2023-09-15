import * as t from "io-ts/lib/index.js";
import { InputNotify } from "../../contract/when/input/notify.js";
export type CanNotify = t.TypeOf<typeof CanNotify>;
export declare const CanNotify: t.TypeC<{
    case_index: t.BigIntC;
    is_merkleized_continuation: t.BooleanC;
}>;
export declare const toInput: (canNotify: CanNotify) => InputNotify;
