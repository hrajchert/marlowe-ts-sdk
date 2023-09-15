'use strict';

var api = require('./api.cjs');
var browser = require('./browser.cjs');
require('lucid-cardano');
require('./index-98a0956f.cjs');
require('@marlowe.io/runtime-core');



exports.getAddressesAndCollaterals = api.getAddressesAndCollaterals;
exports.createBrowserWallet = browser.createBrowserWallet;
exports.getAvailableWallets = browser.getAvailableWallets;
