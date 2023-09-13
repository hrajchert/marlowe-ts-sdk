'use strict';

var lucidCardano = require('lucid-cardano');
var index = require('./index-98a0956f.js');
var runtimeCore = require('@marlowe.io/runtime-core');

class BrowserWalletAPI {
    constructor(extension) {
        this.extension = extension;
    }
    // DISCUSSION: This can currently wait forever. Maybe we should add
    //             an abort controller or a timeout
    waitConfirmation(txHash, checkInterval = 3000) {
        const self = this;
        return new Promise((txConfirm) => {
            const pollingId = setInterval(async () => {
                const utxos = await self.getUTxOs();
                const isConfirmed = utxos.filter((utxo) => runtimeCore.unTxOutRef(utxo).split("#", 2)[0] == txHash)
                    .length > 0;
                if (isConfirmed) {
                    clearInterval(pollingId);
                    // QUESTION @N.H: Why do we need to wait 1 second before returning true?
                    await new Promise((res) => setTimeout(() => res(1), 1000));
                    return txConfirm(true);
                }
            }, checkInterval);
        });
    }
    signTxTheCIP30Way(tx) {
        return this.extension.signTx(tx, true);
    }
    async getChangeAddress() {
        const changeAddress = await this.extension.getChangeAddress();
        return deserializeAddress(changeAddress);
    }
    async getUsedAddresses() {
        const usedAddresses = await this.extension.getUsedAddresses();
        return usedAddresses.map(deserializeAddress);
    }
    async getCollaterals() {
        const collaterals = (await this.extension.experimental.getCollateral()) ?? [];
        return collaterals.map(deserializeTxOutRef);
    }
    async getUTxOs() {
        const utxos = (await this.extension.getUtxos()) ?? [];
        return utxos.map(deserializeTxOutRef);
    }
    async getCIP30Network() {
        const networkId = await this.extension.getNetworkId();
        return networkId == 1 ? "Mainnet" : "Testnets";
    }
    async getTokens() {
        const balances = await this.extension.getBalance();
        return valueToTokens(deserializeValue(balances));
    }
    async getLovelaces() {
        const balances = await this.extension.getBalance();
        return valueToLovelaces(deserializeValue(balances));
    }
}
/**
 * Returns an instance of the browser wallet API for the specified wallet.
 * @param walletName - The name of the wallet to get an instance of.
 * @returns An instance of the BrowserWalletAPI class.
 */
async function createBrowserWallet(walletName) {
    if (getAvailableWallets().includes(walletName)) {
        const extension = await window.cardano[walletName.toLowerCase()].enable();
        return new BrowserWalletAPI(extension);
    }
    else {
        throw new Error(`Wallet ${walletName} is not available in the browser`);
    }
}
/**
 * Get a list of the available wallets installed in the browser
 */
function getAvailableWallets() {
    if ("cardano" in window) {
        // NOTE: it would be nice to have a Type assertion that the supportedWallets array is
        // the same as the SupportedWallets type union. I've tried the other way (infering the type
        // from the array) but the exported documentation doesn't look good
        const supportedWallets = ["nami", "eternl"];
        return supportedWallets.filter((wallet) => wallet in window.cardano);
    }
    else {
        return [];
    }
}
function deserializeAddress(addressHex) {
    return runtimeCore.addressBech32(lucidCardano.C.Address.from_bytes(index.hex.decode(addressHex)).to_bech32(undefined));
}
function deserializeTxOutRef(utxoStr) {
    const utxo = lucidCardano.C.TransactionUnspentOutput.from_bytes(index.hex.decode(utxoStr));
    const input = JSON.parse(utxo.input().to_json());
    return runtimeCore.txOutRef(input.transaction_id + "#" + input.index);
}
const deserializeValue = (value) => lucidCardano.C.Value.from_bytes(index.hex.decode(value));
const valueToTokens = (value) => {
    const tokenValues = [runtimeCore.lovelaces(valueToLovelaces(value))];
    const multiAsset = value.multiasset();
    if (multiAsset !== undefined) {
        const policies = multiAsset.keys();
        for (let i = 0; i < policies.len(); i += 1) {
            const policyId = policies.get(i);
            const policyAssets = multiAsset.get(policyId);
            if (policyAssets !== undefined) {
                const policyAssetNames = policyAssets.keys();
                for (let j = 0; j < policyAssetNames.len(); j += 1) {
                    const assetName = policyAssetNames.get(j);
                    const quantity = policyAssets.get(assetName) ?? lucidCardano.C.BigNum.from_str("0");
                    tokenValues.push(runtimeCore.token(BigInt(quantity.to_str()).valueOf())(runtimeCore.assetId(runtimeCore.mkPolicyId(policyId.to_hex()))(index.utf8.decode(assetName.to_bytes()).substring(1) // N.H : investigate why 1 aditional character is returned
                    )));
                }
            }
        }
    }
    return tokenValues;
};
const valueToLovelaces = (value) => BigInt(value.coin().to_str()).valueOf();

exports.createBrowserWallet = createBrowserWallet;
exports.getAvailableWallets = getAvailableWallets;
