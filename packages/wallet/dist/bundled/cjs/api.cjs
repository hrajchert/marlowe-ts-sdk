'use strict';

/**
 * Utility function to access common features required to balance a transaction
 * @param walletAPI An WalletAPI instance
 * @returns Address and collateral information
 */
async function getAddressesAndCollaterals(walletAPI) {
    const changeAddress = await walletAPI.getChangeAddress();
    const usedAddresses = await walletAPI.getUsedAddresses();
    const collateralUTxOs = await walletAPI.getCollaterals();
    return {
        changeAddress,
        usedAddresses,
        collateralUTxOs,
    };
}

exports.getAddressesAndCollaterals = getAddressesAndCollaterals;
