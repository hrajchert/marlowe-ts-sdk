import { WalletAPI } from "@marlowe.io/wallet/api";
import { CreateRequest, ProvideInput } from "./tx.js";
import { AssetId, ContractId, PayoutAvailable, PayoutId, PayoutWithdrawn } from "@marlowe.io/runtime-core";
/**
 * TODO: comment
 */
export interface ContractsAPI {
    /**
     * TODO: comment
     * @throws DecodingError
     */
    create(req: CreateRequest): Promise<ContractId>;
    /**
     * TODO: comment
     * @throws DecodingError
     */
    applyInputs(contractId: ContractId, provideInput: ProvideInput): Promise<ContractId>;
}
export interface PayoutsAPI {
    /**
     * TODO: comment
     * @throws DecodingError
     */
    available(filters?: Filters): Promise<PayoutAvailable[]>;
    /**
     * TODO: comment
     * @throws DecodingError
     */
    withdraw(payoutIds: PayoutId[]): Promise<void>;
    /**
     * TODO: comment
     * @throws DecodingError
     */
    withdrawn(filters?: Filters): Promise<PayoutWithdrawn[]>;
}
export type RuntimeLifecycle = {
    wallet: WalletAPI;
    contracts: ContractsAPI;
    payouts: PayoutsAPI;
};
export declare const onlyByContractIds: (contractIds: ContractId[]) => Filters;
export type Filters = {
    byContractIds: ContractId[];
    byMyRoleTokens: (myRolesOnWallet: AssetId[]) => AssetId[];
};
