import * as t from "io-ts/lib/index.js";
export type MetadatumLabel = t.TypeOf<typeof MetadatumLabel>;
export declare const MetadatumLabel: t.UnionC<[t.BigIntC, t.StringC]>;
export type Metadatum = t.TypeOf<typeof MetadatumLabel>;
export declare const Metadatum: t.AnyC;
export type Metadata = t.TypeOf<typeof Metadata>;
export declare const Metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
