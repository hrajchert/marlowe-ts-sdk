'use strict';

var browser = require('@marlowe.io/wallet/browser');
var overRestAPI = require('./overRestAPI.js');
var runtimeRestClient = require('@marlowe.io/runtime-rest-client');
require('./tx-9526045c.js');
require('@marlowe.io/wallet/api');
require('@marlowe.io/runtime-core');
require('@marlowe.io/runtime-rest-client/transaction');
require('@marlowe.io/adapter/fp-ts');
require('@marlowe.io/language-core-v1/environment');

/**
 * Creates an instance of RuntimeLifecycle using the browser wallet.
 * @param options
 */
async function mkRuntimeLifecycle({ runtimeURL, walletName, }) {
    const wallet = await browser.createBrowserWallet(walletName);
    const restClient = runtimeRestClient.mkRestClient(runtimeURL);
    return overRestAPI.mkRuntimeLifecycle(restClient, wallet);
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mkRuntimeLifecycle: mkRuntimeLifecycle
});

exports.index = index;
exports.mkRuntimeLifecycle = mkRuntimeLifecycle;
