import * as TE from "fp-ts/lib/TaskEither.js";
import { AxiosInstance } from "axios";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { PayoutId } from "@marlowe.io/runtime-core";
import { PayoutDetails } from "../details.js";
export type GET = (payoutId: PayoutId) => TE.TaskEither<Error | DecodingError, PayoutDetails>;
export declare const getViaAxios: (axiosInstance: AxiosInstance) => GET;
