'use strict';

var index = require('./index-d60f2db2.js');
var account = require('./account-4a932762.js');

const Bound = index.lib.recursion("Bound", () => index.lib.type({ from: index.lib.bigint, to: index.lib.bigint }));
const Choice = index.lib.recursion("Choice", () => index.lib.type({ choose_between: index.lib.array(Bound), for_choice: account.ChoiceId }));

exports.Bound = Bound;
exports.Choice = Choice;
