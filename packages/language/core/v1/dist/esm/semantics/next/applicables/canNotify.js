import * as t from "io-ts/lib/index.js";
import { IsMerkleizedContinuation } from "../common/IsMerkleizedContinuation.js";
import { CaseIndex } from "../common/caseIndex.js";
export const CanNotify = t.type({
    case_index: CaseIndex,
    is_merkleized_continuation: IsMerkleizedContinuation,
});
export const toInput = (canNotify) => "input_notify";
