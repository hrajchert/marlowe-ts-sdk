import * as t from "io-ts/lib/index.js";
export const MetadatumLabel = t.union([t.bigint, t.string]);
export const Metadatum = t.any;
export const Metadata = t.record(MetadatumLabel, Metadatum);
