'use strict';

var browser = require('./browser.js');
require('@marlowe.io/wallet/browser');
require('./overRestAPI.js');
require('./tx-9526045c.js');
require('@marlowe.io/wallet/api');
require('@marlowe.io/runtime-core');
require('@marlowe.io/runtime-rest-client/transaction');
require('@marlowe.io/adapter/fp-ts');
require('@marlowe.io/language-core-v1/environment');
require('@marlowe.io/runtime-rest-client');



exports.Browser = browser.index;
exports.NodeJS = browser.index;
