'use strict';

var index = require('./index-d60f2db2.cjs');
var account = require('./account-8552e549.cjs');

const Bound = index.lib.recursion("Bound", () => index.lib.type({ from: index.lib.bigint, to: index.lib.bigint }));
const Choice = index.lib.recursion("Choice", () => index.lib.type({ choose_between: index.lib.array(Bound), for_choice: account.ChoiceId }));

exports.Bound = Bound;
exports.Choice = Choice;
