import * as C from "io-ts/lib/Codec.js";
import JSONbigint from "json-bigint";
export const MarloweJSON = JSONbigint({
    alwaysParseAsBig: true,
    useNativeBigInt: true,
});
export const MarloweJSONDecoder = {
    decode: (data) => (data === "" ? null : MarloweJSON.parse(data)),
};
export const MarloweJSONEncoder = {
    encode: (data) => MarloweJSON.stringify(data),
};
export const MarloweJSONCodec = C.make(MarloweJSONDecoder, MarloweJSONEncoder);
export const minify = (a) => a.replace(/[\n\r\s]/g, "");
