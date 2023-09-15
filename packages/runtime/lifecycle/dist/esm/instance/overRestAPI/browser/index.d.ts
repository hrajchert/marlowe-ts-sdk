import { SupportedWallet } from "@marlowe.io/wallet/browser";
/**
 * Options for creating a RuntimeLifecycle instance using the browser wallet.
 */
export interface BrowserRuntimeLifecycleOptions {
    /**
     * The URL of an available Marlowe runtime.
     */
    runtimeURL: string;
    /**
     * The name of the wallet to connect to.
     */
    walletName: SupportedWallet;
}
/**
 * Creates an instance of RuntimeLifecycle using the browser wallet.
 * @param options
 */
export declare function mkRuntimeLifecycle({ runtimeURL, walletName, }: BrowserRuntimeLifecycleOptions): Promise<import("../../../apis/runtimeLifecycle.js").RuntimeLifecycle>;
