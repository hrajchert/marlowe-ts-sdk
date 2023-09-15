import { Contract } from "../semantics/contract/index.js";
import { Timeout } from "../semantics/contract/when/index.js";
/**
 * Marlowe Example : A contract with One Step (one true notify)
 */
export declare const oneNotifyTrue: (notifyTimeout: Timeout) => Contract;
