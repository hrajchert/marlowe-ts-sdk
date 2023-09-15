/**
 * This file contains an interface for working with a wallet, which has a Browser and NodeJS implementation in the appropiate modules.
 * @packageDocumentation
 */
import { AddressBech32, AddressesAndCollaterals, HexTransactionWitnessSet, MarloweTxCBORHex, Token, TxOutRef } from "@marlowe.io/runtime-core";
/**
 * Represents the connected network as seen by the CIP30.
 *
 * @remarks
 * The Network Id returned by CIP30 Interface doesn't provide information on which Testnet Network
 *       the extension in configured.
 * {@link https://github.com/cardano-foundation/CIPs/pull/323 | See github issue}
 *
 */
export type CIP30Network = "Mainnet" | "Testnets";
/**
 * The WalletAPI is an interface for interacting with a Cardano wallet.
 */
export interface WalletAPI {
    /**
     * Waits for a transaction to be confirmed.
     * @experimental
     * @param txHash the transaction hash
     * @returns true if the transaction is confirmed, false otherwise
     */
    waitConfirmation(txHash: string): Promise<boolean>;
    /**
     * Ask the wallet to sign a transaction
     * @param tx A CBOR encoded transaction
     * @returns The signed transaction or throws
     * @throws `Error` if there was a problem signing the transaction
     *
     * @experimental
     *
     * @remarks
     * CIP30 expects a CBOR Transaction, which consists of <txBody + witness>. The
     * Marlowe runtime default flow returns just the txBody, to get what CIP30 expects
     * you need to pass an Accept header when creating a contract or applying inputs.
     * The header is `Accept "application/vendor.iog.marlowe-runtime.contract-tx-json"`
     * and it is automatically included in the @marlowe.io/runtime-* packages.
     */
    signTxTheCIP30Way(tx: MarloweTxCBORHex): Promise<HexTransactionWitnessSet>;
    /**
     * Returns an address to be used as Change Address when balancing transactions.
     */
    getChangeAddress(): Promise<AddressBech32>;
    /**
     * Some wallets have a single address and some wallets derive multiple addresses from a single root private key.
     * This method helps to keep track of the used derived addresses.
     */
    getUsedAddresses(): Promise<AddressBech32[]>;
    /**
     * A list of UTXO to use as collaterals
     * @see {@link https://docs.cardano.org/plutus/collateral-mechanism/}
     */
    getCollaterals(): Promise<TxOutRef[]>;
    /**
     * @returns The list of UTXOs available to the wallet.
     */
    getUTxOs(): Promise<TxOutRef[]>;
    /**
     * What type of network is the wallet connected to.
     * @returns The connected network as seen by the CIP30.
     * @experimental
     */
    getCIP30Network(): Promise<CIP30Network>;
    /**
     * Get the tokens available to the wallet.
     * @experimental
     *
     * @remarks
     * The `Token` type here is different from the `Token` type in the language package.
     */
    getTokens(): Promise<Token[]>;
    /**
     * A helper around `getTokens` that returns only the lovelace ammount.
     * @experimental
     */
    getLovelaces(): Promise<bigint>;
}
/**
 * Utility function to access common features required to balance a transaction
 * @param walletAPI An WalletAPI instance
 * @returns Address and collateral information
 */
export declare function getAddressesAndCollaterals(walletAPI: WalletAPI): Promise<AddressesAndCollaterals>;
