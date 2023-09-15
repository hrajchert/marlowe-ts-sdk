import * as t from "io-ts/lib/index.js";
export type TextEnvelope = t.TypeOf<typeof TextEnvelope>;
export declare const TextEnvelope: t.TypeC<{
    type: t.StringC;
    description: t.StringC;
    cborHex: t.StringC;
}>;
export type MarloweTxCBORHex = string;
export type HexTransactionWitnessSet = string;
export declare const transactionWitnessSetTextEnvelope: (hexTransactionWitnessSet: HexTransactionWitnessSet) => TextEnvelope;
