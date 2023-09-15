import { WalletAPI } from "../api.js";
export type SupportedWallet = "nami" | "eternl";
/**
 * Returns an instance of the browser wallet API for the specified wallet.
 * @param walletName - The name of the wallet to get an instance of.
 * @returns An instance of the BrowserWalletAPI class.
 */
export declare function createBrowserWallet(walletName: SupportedWallet): Promise<WalletAPI>;
/**
 * Get a list of the available wallets installed in the browser
 */
export declare function getAvailableWallets(): SupportedWallet[];
