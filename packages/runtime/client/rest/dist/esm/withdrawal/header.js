import * as t from "io-ts/lib/index.js";
import { TxStatus } from "../contract/transaction/status.js";
import { optionFromNullable } from "io-ts-types/lib/optionFromNullable.js";
import { BlockHeader, WithdrawalId } from "@marlowe.io/runtime-core";
export const WithdrawalHeader = t.type({
    withdrawalId: WithdrawalId,
    status: TxStatus,
    block: optionFromNullable(BlockHeader),
});
