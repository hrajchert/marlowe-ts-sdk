'use strict';

var tx = require('./tx-9526045c.cjs');
require('@marlowe.io/wallet/api');
require('@marlowe.io/runtime-core');
require('@marlowe.io/runtime-rest-client/transaction');
require('@marlowe.io/adapter/fp-ts');



exports.applyInputs = tx.applyInputs;
exports.create = tx.create;
exports.withdraw = tx.withdraw;
