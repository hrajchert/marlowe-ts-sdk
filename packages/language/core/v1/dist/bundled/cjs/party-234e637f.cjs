'use strict';

var index = require('./index-d60f2db2.cjs');
var token = require('./token-fb2fc15b.cjs');

const AddressBech32 = index.lib.string;

const Address = index.lib.type({ address: AddressBech32 });
const role = (roleToken) => ({ role_token: roleToken });
const Role = index.lib.type({ role_token: token.TokenName });
const Party = index.lib.union([Address, Role]);

exports.Party = Party;
exports.role = role;
