import * as t from "io-ts/lib/index.js";
export declare const mkEnvironment: (validityStart: Date) => (validityEnd: Date) => Environment;
export type Environment = t.TypeOf<typeof Environment>;
export declare const Environment: t.TypeC<{
    validityStart: t.StringC;
    validityEnd: t.StringC;
}>;
