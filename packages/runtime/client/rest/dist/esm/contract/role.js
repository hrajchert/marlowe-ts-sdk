import * as t from "io-ts/lib/index.js";
import { optionFromNullable } from "io-ts-types";
import { PolicyId } from "@marlowe.io/language-core-v1";
import { AddressBech32 } from "@marlowe.io/runtime-core";
export const RoleName = t.string;
export const UsePolicy = PolicyId;
export const RoleTokenSimple = AddressBech32;
export const TokenMetadataFile = t.type({
    name: t.string,
    src: t.string,
    mediaType: t.string,
});
export const TokenMetadata = t.type({
    name: optionFromNullable(t.string),
    image: optionFromNullable(t.string),
    mediaType: t.string,
    description: t.string,
    files: t.array(TokenMetadataFile),
});
export const RoleTokenAdvanced = t.type({
    address: AddressBech32,
    metadata: TokenMetadata,
});
export const RoleTokenConfig = t.union([RoleTokenSimple, RoleTokenAdvanced]);
export const Mint = t.record(RoleName, RoleTokenConfig);
export const RolesConfig = t.union([UsePolicy, Mint]);
