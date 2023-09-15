import { mkRestClient } from "@marlowe.io/runtime-rest-client";
import * as S from "@marlowe.io/wallet/nodejs";
import * as Generic from "../index.js";
export async function mkRuntimeLifecycle({ runtimeURL, context, privateKeyBech32, }) {
    const wallet = await S.SingleAddressWallet.Initialise(context, privateKeyBech32);
    const restClient = mkRestClient(runtimeURL);
    return Generic.mkRuntimeLifecycle(restClient, wallet);
}
