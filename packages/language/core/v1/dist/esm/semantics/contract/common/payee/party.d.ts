import * as t from "io-ts/lib/index.js";
import { TokenName } from "../token.js";
export type Address = t.TypeOf<typeof Address>;
export declare const Address: t.TypeC<{
    address: t.StringC;
}>;
export declare const role: (roleToken: TokenName) => {
    role_token: string;
};
export type Role = t.TypeOf<typeof Role>;
export declare const Role: t.TypeC<{
    role_token: t.StringC;
}>;
export declare const party: (party: Role | Address) => {
    address: string;
} | {
    role_token: string;
};
export type Party = t.TypeOf<typeof Party>;
export declare const Party: t.UnionC<[t.TypeC<{
    address: t.StringC;
}>, t.TypeC<{
    role_token: t.StringC;
}>]>;
export declare const partiesToStrings: (parties: Party[]) => string[];
export declare const partyToString: (party: Party) => string;
export declare function isRole(party: Party): party is Role;
export declare function isAddress(party: Party): party is Address;
