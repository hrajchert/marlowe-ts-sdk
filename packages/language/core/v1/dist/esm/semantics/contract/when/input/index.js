import * as t from "io-ts/lib/index.js";
import { Contract } from "../../index.js";
import { InputChoice } from "./choice.js";
import { InputDeposit } from "./deposit.js";
import { InputNotify } from "./notify.js";
export const BuiltinByteString = t.string;
export const InputContent = t.union([InputDeposit, InputChoice, InputNotify]);
export const NormalInput = InputContent;
export const MerkleizedInput = t.intersection([
    InputContent,
    t.partial({
        continuation_hash: BuiltinByteString,
        merkleized_continuation: Contract,
    }),
]);
export const Input = t.union([NormalInput, MerkleizedInput]);
