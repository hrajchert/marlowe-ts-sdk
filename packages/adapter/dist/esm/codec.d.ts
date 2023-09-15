import * as C from "io-ts/lib/Codec.js";
import * as D from "io-ts/lib/Decoder.js";
import * as E from "io-ts/lib/Encoder.js";
export type DecodingError = string[];
export declare const MarloweJSON: {
    parse: (text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any;
    stringify: {
        (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
        (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string;
    };
};
export declare const MarloweJSONDecoder: D.Decoder<string, unknown>;
export declare const MarloweJSONEncoder: E.Encoder<string, unknown>;
export declare const MarloweJSONCodec: C.Codec<string, string, unknown>;
export declare const minify: (a: string) => string;
