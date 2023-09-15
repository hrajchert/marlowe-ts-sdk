import * as t from "io-ts/lib/index.js";
import { TokenName } from "../token.js";
import { AddressBech32 } from "../address.js";
import { pipe } from "fp-ts/lib/function.js";
import * as A from "fp-ts/lib/Array.js";
export const Address = t.type({ address: AddressBech32 });
export const role = (roleToken) => ({ role_token: roleToken });
export const Role = t.type({ role_token: TokenName });
export const party = (party) => party;
export const Party = t.union([Address, Role]);
export const partiesToStrings = (parties) => pipe(parties, A.map(partyToString));
export const partyToString = (party) => isRole(party) ? party.role_token : party.address;
export function isRole(party) {
    return party.role_token !== undefined;
}
export function isAddress(party) {
    return party.address !== undefined;
}
