'use strict';

var index = require('./index-d60f2db2.cjs');
var account = require('./account-8552e549.cjs');
require('./party-234e637f.cjs');
require('./token-fb2fc15b.cjs');

const MarloweState = index.lib.type({
    accounts: account.Accounts,
    boundValues: index.lib.array(index.lib.tuple([account.ValueId, index.lib.bigint])),
    choices: index.lib.array(index.lib.tuple([account.ChoiceId, index.lib.bigint])),
    minTime: index.lib.bigint,
});

exports.MarloweState = MarloweState;
