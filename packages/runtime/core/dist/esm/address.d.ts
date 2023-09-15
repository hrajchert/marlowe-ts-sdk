import * as t from "io-ts/lib/index.js";
import { Newtype } from "newtype-ts";
import { TxOutRef } from "./tx/outRef.js";
export type AddressBech32 = Newtype<{
    readonly AddressBech32: unique symbol;
}, string>;
export declare const AddressBech32: t.Type<AddressBech32, string, unknown>;
export declare const unAddressBech32: (s: AddressBech32) => string;
export declare const addressBech32: (a: string) => AddressBech32;
export type AddressesAndCollaterals = t.TypeOf<typeof AddressesAndCollaterals>;
export declare const AddressesAndCollaterals: t.TypeC<{
    changeAddress: t.Type<AddressBech32, string, unknown>;
    usedAddresses: t.ArrayC<t.Type<AddressBech32, string, unknown>>;
    collateralUTxOs: t.ArrayC<t.Type<TxOutRef, string, unknown>>;
}>;
