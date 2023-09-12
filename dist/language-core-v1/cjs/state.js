'use strict';

var index = require('./index-d60f2db2.js');
var account = require('./account-4a932762.js');
require('./party-f41b74ec.js');
require('./token-84874636.js');

const MarloweState = index.lib.type({
    accounts: account.Accounts,
    boundValues: index.lib.array(index.lib.tuple([account.ValueId, index.lib.bigint])),
    choices: index.lib.array(index.lib.tuple([account.ChoiceId, index.lib.bigint])),
    minTime: index.lib.bigint,
});

exports.MarloweState = MarloweState;
