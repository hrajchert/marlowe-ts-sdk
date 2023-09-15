import * as t from "io-ts/lib/index.js";
import { PolicyId, mkPolicyId, unPolicyId } from "../policyId.js";
export const AssetName = t.string;
export const AssetQuantity = t.bigint;
export const AssetId = t.type({ policyId: PolicyId, assetName: AssetName });
export const assetId = (policyId) => (assetName) => ({
    policyId: policyId,
    assetName: assetName,
});
export const Token = t.type({ quantity: AssetQuantity, assetId: AssetId });
export const token = (quantity) => (assetId) => ({ quantity: quantity, assetId: assetId });
export const lovelaces = (quantity) => token(quantity)(assetId(mkPolicyId(""))(""));
export const Tokens = t.array(Token);
export const Assets = t.type({ lovelaces: AssetQuantity, tokens: Tokens });
export const assetIdToString = (assetId) => `${unPolicyId(assetId.policyId)}|${assetId.assetName}`;
export const runtimeTokenToMarloweTokenValue = (runtimeToken) => ({
    amount: runtimeToken.quantity,
    token: {
        currency_symbol: unPolicyId(runtimeToken.assetId.policyId),
        token_name: runtimeToken.assetId.assetName,
    },
});
