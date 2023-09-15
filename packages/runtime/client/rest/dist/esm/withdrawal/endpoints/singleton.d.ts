import { AxiosInstance } from "axios";
import * as TE from "fp-ts/lib/TaskEither.js";
import { WithdrawalDetails } from "../details.js";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { HexTransactionWitnessSet, WithdrawalId } from "@marlowe.io/runtime-core";
export type GET = (withdrawalId: WithdrawalId) => TE.TaskEither<Error | DecodingError, WithdrawalDetails>;
export declare const getViaAxios: (axiosInstance: AxiosInstance) => GET;
export type PUT = (withdrawalId: WithdrawalId, hexTransactionWitnessSet: HexTransactionWitnessSet) => TE.TaskEither<Error, void>;
export declare const putViaAxios: (axiosInstance: AxiosInstance) => PUT;
