import * as t from "io-ts/lib/index.js";
import { iso } from "newtype-ts";
import { fromNewtype } from "io-ts-types";
import { split } from "fp-ts/lib/string.js";
import { pipe } from "fp-ts/lib/function.js";
import { head } from "fp-ts/lib/ReadonlyNonEmptyArray.js";
import { ContractId } from "../contract/id.js";
import { AssetId, Assets } from "../asset/index.js";
export const PayoutId = fromNewtype(t.string);
export const unPayoutId = iso().unwrap;
export const payoutId = iso().wrap;
export const payoutIdToTxId = (payoutId) => pipe(payoutId, unPayoutId, split("#"), head);
export const WithdrawalId = fromNewtype(t.string);
export const unWithdrawalId = iso().unwrap;
export const withdrawalId = iso().wrap;
export const withdrawalIdToTxId = (withdrawalId) => pipe(withdrawalId, unWithdrawalId);
export const PayoutAvailable = t.type({
    payoutId: PayoutId,
    contractId: ContractId,
    role: AssetId,
    assets: Assets,
});
export const PayoutWithdrawn = t.type({
    withdrawalId: WithdrawalId,
    payoutId: PayoutId,
    contractId: ContractId,
    role: AssetId,
    assets: Assets,
});
