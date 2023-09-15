'use strict';

var runtimeRestClient = require('@marlowe.io/runtime-rest-client');
var S = require('@marlowe.io/wallet/nodejs');
var overRestAPI = require('./overRestAPI.cjs');
require('./tx-9526045c.cjs');
require('@marlowe.io/wallet/api');
require('@marlowe.io/runtime-core');
require('@marlowe.io/runtime-rest-client/transaction');
require('@marlowe.io/adapter/fp-ts');
require('@marlowe.io/language-core-v1/environment');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var S__namespace = /*#__PURE__*/_interopNamespaceDefault(S);

async function mkRuntimeLifecycle({ runtimeURL, context, privateKeyBech32, }) {
    const wallet = await S__namespace.SingleAddressWallet.Initialise(context, privateKeyBech32);
    const restClient = runtimeRestClient.mkRestClient(runtimeURL);
    return overRestAPI.mkRuntimeLifecycle(restClient, wallet);
}

exports.mkRuntimeLifecycle = mkRuntimeLifecycle;
