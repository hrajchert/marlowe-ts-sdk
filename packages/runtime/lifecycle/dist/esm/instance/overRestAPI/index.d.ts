import { RuntimeLifecycle } from "../../apis/runtimeLifecycle.js";
import { WalletAPI } from "@marlowe.io/wallet/api";
import { RestAPI } from "@marlowe.io/runtime-rest-client";
export declare function mkRuntimeLifecycle(restAPI: RestAPI, wallet: WalletAPI): RuntimeLifecycle;
