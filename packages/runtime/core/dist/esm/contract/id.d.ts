import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
import { TxId } from "../tx/id.js";
export type ContractId = Newtype<{
    readonly ContractId: unique symbol;
}, string>;
export declare const ContractId: t.Type<ContractId, string, unknown>;
export declare const unContractId: (s: ContractId) => string;
export declare const contractId: (a: string) => ContractId;
export declare const contractIdToTxId: (contractId: ContractId) => TxId;
