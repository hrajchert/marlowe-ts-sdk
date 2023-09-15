import { AxiosInstance } from "axios";
import * as TE from "fp-ts/lib/TaskEither.js";
import { ContractId } from "@marlowe.io/runtime-core";
import { Environment } from "@marlowe.io/language-core-v1/environment";
import { Next } from "@marlowe.io/language-core-v1/next";
import { Party } from "@marlowe.io/language-core-v1/semantics/contract/common/payee/party.js";
import { DecodingError } from "@marlowe.io/adapter/codec";
export type GET = (contractId: ContractId) => (environment: Environment) => (parties: Party[]) => TE.TaskEither<Error | DecodingError, Next>;
export declare const getViaAxios: (axiosInstance: AxiosInstance) => GET;
