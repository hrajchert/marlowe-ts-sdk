import { Contract } from "../../semantics/contract/index.js";
import { TokenValue } from "../../semantics/contract/common/tokenValue.js";
import { Timeout } from "../../semantics/contract/when/index.js";
/**
 * Marlowe Example : Swap
 * Description :
 *      Takes Tokens A from one party and tokens B from another party, and it swaps them atomically.
 */
export type SwapRequest = {
    provider: SwapParty;
    swapper: SwapParty;
};
export type SwapParty = {
    roleName: string;
    depositTimeout: Timeout;
    value: TokenValue;
};
export declare const mkSwapContract: (request: SwapRequest) => Contract;
