'use strict';

var browser = require('./browser.cjs');
require('@marlowe.io/wallet/browser');
require('./overRestAPI.cjs');
require('./tx-9526045c.cjs');
require('@marlowe.io/wallet/api');
require('@marlowe.io/runtime-core');
require('@marlowe.io/runtime-rest-client/transaction');
require('@marlowe.io/adapter/fp-ts');
require('@marlowe.io/language-core-v1/environment');
require('@marlowe.io/runtime-rest-client');



exports.Browser = browser.index;
exports.NodeJS = browser.index;
