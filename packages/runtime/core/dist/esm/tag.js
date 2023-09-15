import * as t from "io-ts/lib/index.js";
export const Tag = t.string;
export const TagContent = t.any;
export const Tags = t.record(Tag, TagContent);
export const noTags = [];
