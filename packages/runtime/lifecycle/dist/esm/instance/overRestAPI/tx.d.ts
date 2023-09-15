import * as TE from "fp-ts/lib/TaskEither.js";
import { RestAPI } from "@marlowe.io/runtime-rest-client";
import { WalletAPI } from "@marlowe.io/wallet/api";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { CreateRequest, ApplyInputsRequest } from "../../apis/tx.js";
import { ContractId, PayoutId } from "@marlowe.io/runtime-core";
export declare const create: (client: RestAPI) => (wallet: WalletAPI) => (payload: CreateRequest) => TE.TaskEither<Error | DecodingError, ContractId>;
export declare const applyInputs: (client: RestAPI) => (wallet: WalletAPI) => (contractId: ContractId) => (payload: ApplyInputsRequest) => TE.TaskEither<Error | DecodingError, ContractId>;
export declare const withdraw: (client: RestAPI) => (wallet: WalletAPI) => (payoutIds: PayoutId[]) => TE.TaskEither<Error | DecodingError, void>;
