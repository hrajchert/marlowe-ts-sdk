import * as t from "io-ts/lib/index.js";
export type Tag = t.TypeOf<typeof Tag>;
export declare const Tag: t.StringC;
export type TagContent = t.TypeOf<typeof TagContent>;
export declare const TagContent: t.AnyC;
export type Tags = t.TypeOf<typeof Tags>;
export declare const Tags: t.RecordC<t.StringC, t.AnyC>;
export declare const noTags: Tag[];
