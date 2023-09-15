import { AxiosInstance } from "axios";
import * as TE from "fp-ts/lib/TaskEither.js";
export declare const Get: (request: AxiosInstance) => (url: string, config?: import("axios").AxiosRequestConfig<any> | undefined) => TE.TaskEither<Error, any>;
export declare const GetWithDataAndHeaders: (request: AxiosInstance) => (url: string, config?: import("axios").AxiosRequestConfig<any> | undefined) => TE.TaskEither<Error, any>;
export declare const Post: (request: AxiosInstance) => (url: string, data?: unknown, config?: import("axios").AxiosRequestConfig<unknown> | undefined) => TE.TaskEither<Error, any>;
export declare const Put: (request: AxiosInstance) => (url: string, data?: unknown, config?: import("axios").AxiosRequestConfig<unknown> | undefined) => TE.TaskEither<Error, any>;
