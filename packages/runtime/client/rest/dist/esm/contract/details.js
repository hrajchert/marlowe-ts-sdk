import { optionFromNullable } from "io-ts-types";
import * as t from "io-ts/lib/index.js";
import { Contract } from "@marlowe.io/language-core-v1";
import { MarloweState } from "@marlowe.io/language-core-v1/state";
import { MarloweVersion } from "@marlowe.io/language-core-v1/version";
import { ContractId } from "@marlowe.io/runtime-core";
import { TxStatus } from "./transaction/status.js";
import { RoleName } from "./role.js";
import { TxOutRef, BlockHeader, Metadata, TextEnvelope, PolicyId, } from "@marlowe.io/runtime-core";
export const Payout = t.type({ payoutId: TxOutRef, role: RoleName });
export const ContractDetails = t.type({
    contractId: ContractId,
    roleTokenMintingPolicyId: PolicyId,
    version: MarloweVersion,
    status: TxStatus,
    block: optionFromNullable(BlockHeader),
    metadata: Metadata,
    initialContract: Contract,
    currentContract: optionFromNullable(Contract),
    state: optionFromNullable(MarloweState),
    txBody: optionFromNullable(TextEnvelope),
    utxo: optionFromNullable(TxOutRef),
    unclaimedPayouts: t.array(Payout),
});
