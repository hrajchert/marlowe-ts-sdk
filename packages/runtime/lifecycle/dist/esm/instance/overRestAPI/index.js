import * as Command from "./tx.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as T from "fp-ts/lib/Task.js";
import { pipe } from "fp-ts/lib/function.js";
import * as O from "fp-ts/lib/Option.js";
import { mkEnvironment } from "@marlowe.io/language-core-v1/environment";
import { addMinutes, subMinutes } from "date-fns";
import { tryCatchDefault, unsafeTaskEither } from "@marlowe.io/adapter/fp-ts";
import { assetId, mkPolicyId, token, } from "@marlowe.io/runtime-core";
import { stringify } from "json-bigint";
class ContractLifecycle {
    constructor(wallet, rest) {
        this.wallet = wallet;
        this.rest = rest;
    }
    async create(req) {
        return unsafeTaskEither(Command.create(this.rest)(this.wallet)(req));
    }
    async applyInputs(contractId, provideInput) {
        const contractDetails = await unsafeTaskEither(this.rest.contracts.contract.get(contractId));
        const parties = await getParties(this.wallet)(contractDetails.roleTokenMintingPolicyId)();
        const next = await unsafeTaskEither(this.rest.contracts.contract.next(contractId)(mkEnvironment(pipe(Date.now(), (date) => subMinutes(date, 15)))(pipe(Date.now(), (date) => addMinutes(date, 15))))(parties));
        return unsafeTaskEither(Command.applyInputs(this.rest)(this.wallet)(contractId)(provideInput(next)));
    }
}
class PayoutLifecycle {
    constructor(wallet, rest) {
        this.wallet = wallet;
        this.rest = rest;
    }
    async available(filters) {
        return unsafeTaskEither(availablePayouts(this.rest)(this.wallet)(O.fromNullable(filters)));
    }
    async withdraw(payoutIds) {
        return unsafeTaskEither(Command.withdraw(this.rest)(this.wallet)(payoutIds));
    }
    async withdrawn(filters) {
        return unsafeTaskEither(withdrawnPayouts(this.rest)(this.wallet)(O.fromNullable(filters)));
    }
}
export function mkRuntimeLifecycle(restAPI, wallet) {
    return {
        wallet: wallet,
        contracts: new ContractLifecycle(wallet, restAPI),
        payouts: new PayoutLifecycle(wallet, restAPI),
    };
}
const availablePayouts = (restAPI) => (walletApi) => (filtersOption) => pipe(getAssetIds(walletApi), TE.chain((walletAssetIds) => pipe(restAPI.payouts.getHeadersByRange(O.none)(pipe(filtersOption, O.match(() => [], (filters) => filters.byContractIds)))(pipe(filtersOption, O.match(() => walletAssetIds, (filters) => filters.byMyRoleTokens(walletAssetIds))))(O.some("available")), TE.map((result) => result.headers))), TE.chain((headers) => TE.sequenceArray(headers.map((header) => restAPI.payouts.get(header.payoutId)))), TE.map((payoutsDetails) => payoutsDetails.map((payoutDetails) => ({
    payoutId: payoutDetails.payoutId,
    contractId: payoutDetails.contractId,
    role: payoutDetails.role,
    assets: convertAsset(payoutDetails.assets),
}))));
const withdrawnPayouts = (restAPI) => (walletApi) => (filtersOption) => pipe(getAssetIds(walletApi), TE.chain((walletAssetIds) => pipe(restAPI.payouts.getHeadersByRange(O.none)(pipe(filtersOption, O.match(() => [], (filters) => filters.byContractIds)))(pipe(filtersOption, O.match(() => walletAssetIds, (filters) => filters.byMyRoleTokens(walletAssetIds))))(O.some("withdrawn")), TE.map((result) => result.headers))), TE.chain((headers) => TE.sequenceArray(headers.map((header) => restAPI.payouts.get(header.payoutId)))), TE.map((payoutsDetails) => payoutsDetails.map((payoutDetails) => pipe(payoutDetails.withdrawalId, O.match(() => {
    throw `Rest API Inconsistencies for Payout API (payout withdrawn without a withdrawalID) : ${stringify(payoutDetails)}`;
}, (withdrawalId) => ({
    withdrawalId: withdrawalId,
    payoutId: payoutDetails.payoutId,
    contractId: payoutDetails.contractId,
    role: payoutDetails.role,
    assets: convertAsset(payoutDetails.assets),
}))))));
const convertAsset = (restAssets) => ({
    lovelaces: restAssets.lovelace,
    tokens: convertTokens(restAssets.tokens),
});
const convertTokens = (restTokens) => Object.entries(restTokens)
    .map(([policyId, x]) => Object.entries(x).map(([assetName, quantity]) => token(quantity)(assetId(mkPolicyId(policyId))(assetName))))
    .flat();
const getAssetIds = (walletAPI) => pipe(tryCatchDefault(walletAPI.getTokens), TE.map((tokens) => tokens.map((token) => token.assetId)));
const getParties = (walletAPI) => (roleMintingPolicyId) => T.of([]);
