import { Network, PrivateKey, PolicyId, TxSigned, TxComplete, Script } from "lucid-cardano";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as T from "fp-ts/lib/Task.js";
import { AddressBech32, TxOutRef, MarloweTxCBORHex, Token, AssetId } from "@marlowe.io/runtime-core";
import { WalletAPI } from "../api.js";
export type PrivateKeysAsHex = string;
export type Address = string;
export declare class Context {
    projectId: string;
    network: Network;
    blockfrostUrl: string;
    constructor(projectId: string, blockfrostUrl: string, network: Network);
}
/**
 * @hidden
 */
export declare class SingleAddressWallet implements WalletAPI {
    private privateKeyBech32;
    private context;
    private lucid;
    private blockfrostApi;
    address: AddressBech32;
    getChangeAddress: T.Task<AddressBech32>;
    getUsedAddresses: T.Task<AddressBech32[]>;
    getCollaterals: T.Task<TxOutRef[]>;
    private constructor();
    static Initialise(context: Context, privateKeyBech32: string): Promise<SingleAddressWallet>;
    static Random(context: Context): Promise<SingleAddressWallet>;
    private initialise;
    getCIP30Network(): Promise<"Mainnet" | "Testnets">;
    getTokens(): Promise<Token[]>;
    getLovelaces(): Promise<bigint>;
    tokenBalance: (assetId: AssetId) => TE.TaskEither<Error, bigint>;
    provision: (provisionning: [SingleAddressWallet, bigint][]) => TE.TaskEither<Error, Boolean>;
    randomPolicyId(): [Script, PolicyId];
    mintRandomTokens(assetName: string, amount: bigint): Promise<Token>;
    signTxTheCIP30Way(cborHex: MarloweTxCBORHex): Promise<string>;
    sign: (txBuilt: TxComplete) => TE.TaskEither<Error, TxSigned>;
    submit: (signedTx: TxSigned) => TE.TaskEither<Error, string>;
    waitConfirmation(txHash: string): Promise<boolean>;
    signSubmitAndWaitConfirmation: (txBuilt: TxComplete) => TE.TaskEither<Error, boolean>;
    getUTxOs: T.Task<TxOutRef[]>;
}
/**
 * Currently used for testing
 * see [[testing-wallet-discussion]]
 * @hidden
 */
export declare const getPrivateKeyFromHexString: (privateKeyHex: string) => PrivateKey;
