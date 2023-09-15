import * as t from "io-ts/lib/index.js";
import { ContractId, AssetId, PayoutId, WithdrawalId, } from "@marlowe.io/runtime-core";
import { PayoutStatus } from "./status.js";
import { optionFromNullable } from "io-ts-types";
export const PayoutHeader = t.type({
    contractId: ContractId,
    payoutId: PayoutId,
    withdrawalId: optionFromNullable(WithdrawalId),
    role: AssetId,
    status: PayoutStatus,
});
