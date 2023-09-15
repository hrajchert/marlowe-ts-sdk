import * as TE from "fp-ts/lib/TaskEither.js";
import * as Payouts from "./payout/endpoints/collection.js";
import * as Payout from "./payout/endpoints/singleton.js";
import * as Withdrawal from "./withdrawal/endpoints/singleton.js";
import * as Withdrawals from "./withdrawal/endpoints/collection.js";
import * as Contract from "./contract/endpoints/singleton.js";
import * as Contracts from "./contract/endpoints/collection.js";
import * as Transaction from "./contract/transaction/endpoints/singleton.js";
import * as Transactions from "./contract/transaction/endpoints/collection.js";
import * as ContractNext from "./contract/next/endpoint.js";
export * from "./contract/index.js";
export * from "./withdrawal/index.js";
export * from "./payout/index.js";
export interface RestAPI {
    healthcheck: () => TE.TaskEither<Error, Boolean>;
    payouts: {
        getHeadersByRange: Payouts.GETHeadersByRange;
        get: Payout.GET;
    };
    withdrawals: {
        getHeadersByRange: Withdrawals.GETHeadersByRange;
        post: Withdrawals.POST;
        withdrawal: {
            get: Withdrawal.GET;
            put: Withdrawal.PUT;
        };
    };
    contracts: {
        getHeadersByRange: Contracts.GETHeadersByRange;
        post: Contracts.POST;
        contract: {
            get: Contract.GET;
            put: Contract.PUT;
            next: ContractNext.GET;
            transactions: {
                getHeadersByRange: Transactions.GETHeadersByRange;
                post: Transactions.POST;
                transaction: {
                    get: Transaction.GET;
                    put: Transaction.PUT;
                };
            };
        };
    };
}
export declare const mkRestClient: (baseURL: string) => RestAPI;
