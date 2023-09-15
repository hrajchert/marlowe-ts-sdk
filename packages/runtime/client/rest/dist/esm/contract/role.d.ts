import * as t from "io-ts/lib/index.js";
import { AddressBech32 } from "@marlowe.io/runtime-core";
export type RoleName = string;
export declare const RoleName: t.StringC;
export type UsePolicy = t.TypeOf<typeof UsePolicy>;
export declare const UsePolicy: t.StringC;
export type RoleTokenSimple = t.TypeOf<typeof RoleTokenSimple>;
export declare const RoleTokenSimple: t.Type<AddressBech32, string, unknown>;
export type TokenMetadataFile = t.TypeOf<typeof TokenMetadataFile>;
export declare const TokenMetadataFile: t.TypeC<{
    name: t.StringC;
    src: t.StringC;
    mediaType: t.StringC;
}>;
export type TokenMetadata = t.TypeOf<typeof TokenMetadata>;
export declare const TokenMetadata: t.TypeC<{
    name: import("io-ts-types").OptionFromNullableC<t.StringC>;
    image: import("io-ts-types").OptionFromNullableC<t.StringC>;
    mediaType: t.StringC;
    description: t.StringC;
    files: t.ArrayC<t.TypeC<{
        name: t.StringC;
        src: t.StringC;
        mediaType: t.StringC;
    }>>;
}>;
export type RoleTokenAdvanced = t.TypeOf<typeof RoleTokenAdvanced>;
export declare const RoleTokenAdvanced: t.TypeC<{
    address: t.Type<AddressBech32, string, unknown>;
    metadata: t.TypeC<{
        name: import("io-ts-types").OptionFromNullableC<t.StringC>;
        image: import("io-ts-types").OptionFromNullableC<t.StringC>;
        mediaType: t.StringC;
        description: t.StringC;
        files: t.ArrayC<t.TypeC<{
            name: t.StringC;
            src: t.StringC;
            mediaType: t.StringC;
        }>>;
    }>;
}>;
export type RoleTokenConfig = t.TypeOf<typeof RoleTokenConfig>;
export declare const RoleTokenConfig: t.UnionC<[t.Type<AddressBech32, string, unknown>, t.TypeC<{
    address: t.Type<AddressBech32, string, unknown>;
    metadata: t.TypeC<{
        name: import("io-ts-types").OptionFromNullableC<t.StringC>;
        image: import("io-ts-types").OptionFromNullableC<t.StringC>;
        mediaType: t.StringC;
        description: t.StringC;
        files: t.ArrayC<t.TypeC<{
            name: t.StringC;
            src: t.StringC;
            mediaType: t.StringC;
        }>>;
    }>;
}>]>;
export type Mint = t.TypeOf<typeof Mint>;
export declare const Mint: t.RecordC<t.StringC, t.UnionC<[t.Type<AddressBech32, string, unknown>, t.TypeC<{
    address: t.Type<AddressBech32, string, unknown>;
    metadata: t.TypeC<{
        name: import("io-ts-types").OptionFromNullableC<t.StringC>;
        image: import("io-ts-types").OptionFromNullableC<t.StringC>;
        mediaType: t.StringC;
        description: t.StringC;
        files: t.ArrayC<t.TypeC<{
            name: t.StringC;
            src: t.StringC;
            mediaType: t.StringC;
        }>>;
    }>;
}>]>>;
export type RolesConfig = t.TypeOf<typeof RolesConfig>;
export declare const RolesConfig: t.UnionC<[t.StringC, t.RecordC<t.StringC, t.UnionC<[t.Type<AddressBech32, string, unknown>, t.TypeC<{
    address: t.Type<AddressBech32, string, unknown>;
    metadata: t.TypeC<{
        name: import("io-ts-types").OptionFromNullableC<t.StringC>;
        image: import("io-ts-types").OptionFromNullableC<t.StringC>;
        mediaType: t.StringC;
        description: t.StringC;
        files: t.ArrayC<t.TypeC<{
            name: t.StringC;
            src: t.StringC;
            mediaType: t.StringC;
        }>>;
    }>;
}>]>>]>;
