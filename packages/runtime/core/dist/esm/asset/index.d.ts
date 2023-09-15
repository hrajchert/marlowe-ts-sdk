import * as t from "io-ts/lib/index.js";
import { PolicyId } from "../policyId.js";
import * as Marlowe from "@marlowe.io/language-core-v1/tokenValue";
export type AssetName = t.TypeOf<typeof AssetName>;
export declare const AssetName: t.StringC;
export type AssetQuantity = t.TypeOf<typeof AssetQuantity>;
export declare const AssetQuantity: t.BigIntC;
export type AssetId = t.TypeOf<typeof AssetId>;
export declare const AssetId: t.TypeC<{
    policyId: t.Type<PolicyId, string, unknown>;
    assetName: t.StringC;
}>;
export declare const assetId: (policyId: PolicyId) => (assetName: AssetName) => AssetId;
export type Token = t.TypeOf<typeof Token>;
export declare const Token: t.TypeC<{
    quantity: t.BigIntC;
    assetId: t.TypeC<{
        policyId: t.Type<PolicyId, string, unknown>;
        assetName: t.StringC;
    }>;
}>;
export declare const token: (quantity: AssetQuantity) => (assetId: AssetId) => Token;
export declare const lovelaces: (quantity: AssetQuantity) => Token;
export type Tokens = t.TypeOf<typeof Tokens>;
export declare const Tokens: t.ArrayC<t.TypeC<{
    quantity: t.BigIntC;
    assetId: t.TypeC<{
        policyId: t.Type<PolicyId, string, unknown>;
        assetName: t.StringC;
    }>;
}>>;
export type Assets = t.TypeOf<typeof Assets>;
export declare const Assets: t.TypeC<{
    lovelaces: t.BigIntC;
    tokens: t.ArrayC<t.TypeC<{
        quantity: t.BigIntC;
        assetId: t.TypeC<{
            policyId: t.Type<PolicyId, string, unknown>;
            assetName: t.StringC;
        }>;
    }>>;
}>;
export declare const assetIdToString: (assetId: AssetId) => string;
export declare const runtimeTokenToMarloweTokenValue: (runtimeToken: Token) => Marlowe.TokenValue;
