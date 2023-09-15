import { createBrowserWallet, } from "@marlowe.io/wallet/browser";
import * as Generic from "../index.js";
import { mkRestClient } from "@marlowe.io/runtime-rest-client";
/**
 * Creates an instance of RuntimeLifecycle using the browser wallet.
 * @param options
 */
export async function mkRuntimeLifecycle({ runtimeURL, walletName, }) {
    const wallet = await createBrowserWallet(walletName);
    const restClient = mkRestClient(runtimeURL);
    return Generic.mkRuntimeLifecycle(restClient, wallet);
}
