import { l as lib } from './index-ca7ac053.js';
import { a as TokenName } from './token-e1a1eafb.js';

const AddressBech32 = lib.string;

const Address = lib.type({ address: AddressBech32 });
const role = (roleToken) => ({ role_token: roleToken });
const Role = lib.type({ role_token: TokenName });
const Party = lib.union([Address, Role]);

export { Party as P, role as r };
