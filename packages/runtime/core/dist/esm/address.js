import * as t from "io-ts/lib/index.js";
import { iso } from "newtype-ts";
import { fromNewtype } from "io-ts-types";
import { TxOutRef } from "./tx/outRef.js";
export const AddressBech32 = fromNewtype(t.string);
export const unAddressBech32 = iso().unwrap;
export const addressBech32 = iso().wrap;
export const AddressesAndCollaterals = t.type({
    changeAddress: AddressBech32,
    usedAddresses: t.array(AddressBech32),
    collateralUTxOs: t.array(TxOutRef),
});
