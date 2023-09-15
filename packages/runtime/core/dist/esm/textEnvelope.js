import * as t from "io-ts/lib/index.js";
export const TextEnvelope = t.type({
    type: t.string,
    description: t.string,
    cborHex: t.string,
});
export const transactionWitnessSetTextEnvelope = (hexTransactionWitnessSet) => ({
    type: "ShelleyTxWitness BabbageEra",
    description: "",
    cborHex: hexTransactionWitnessSet,
});
