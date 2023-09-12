import { C } from 'lucid-cardano';
import { unTxOutRef, addressBech32, txOutRef, lovelaces, token, assetId, mkPolicyId } from '@marlowe.io/runtime-core';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dist = {};

var b64$1 = {};

var base64 = {};

// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(base64, "__esModule", { value: true });
/**
 * Package base64 implements Base64 encoding and decoding.
 */
// Invalid character used in decoding to indicate
// that the character to decode is out of range of
// alphabet and cannot be decoded.
var INVALID_BYTE = 256;
/**
 * Implements standard Base64 encoding.
 *
 * Operates in constant time.
 */
var Coder = /** @class */ (function () {
    // TODO(dchest): methods to encode chunk-by-chunk.
    function Coder(_paddingCharacter) {
        if (_paddingCharacter === void 0) { _paddingCharacter = "="; }
        this._paddingCharacter = _paddingCharacter;
    }
    Coder.prototype.encodedLength = function (length) {
        if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
        }
        return (length + 2) / 3 * 4 | 0;
    };
    Coder.prototype.encode = function (data) {
        var out = "";
        var i = 0;
        for (; i < data.length - 2; i += 3) {
            var c = (data[i] << 16) | (data[i + 1] << 8) | (data[i + 2]);
            out += this._encodeByte((c >>> 3 * 6) & 63);
            out += this._encodeByte((c >>> 2 * 6) & 63);
            out += this._encodeByte((c >>> 1 * 6) & 63);
            out += this._encodeByte((c >>> 0 * 6) & 63);
        }
        var left = data.length - i;
        if (left > 0) {
            var c = (data[i] << 16) | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte((c >>> 3 * 6) & 63);
            out += this._encodeByte((c >>> 2 * 6) & 63);
            if (left === 2) {
                out += this._encodeByte((c >>> 1 * 6) & 63);
            }
            else {
                out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
        }
        return out;
    };
    Coder.prototype.maxDecodedLength = function (length) {
        if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
        }
        return length / 4 * 3 | 0;
    };
    Coder.prototype.decodedLength = function (s) {
        return this.maxDecodedLength(s.length - this._getPaddingLength(s));
    };
    Coder.prototype.decode = function (s) {
        if (s.length === 0) {
            return new Uint8Array(0);
        }
        var paddingLength = this._getPaddingLength(s);
        var length = s.length - paddingLength;
        var out = new Uint8Array(this.maxDecodedLength(length));
        var op = 0;
        var i = 0;
        var haveBad = 0;
        var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
        for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = (v0 << 2) | (v1 >>> 4);
            out[op++] = (v1 << 4) | (v2 >>> 2);
            out[op++] = (v2 << 6) | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
        }
        if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = (v0 << 2) | (v1 >>> 4);
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
        }
        if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = (v1 << 4) | (v2 >>> 2);
            haveBad |= v2 & INVALID_BYTE;
        }
        if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = (v2 << 6) | v3;
            haveBad |= v3 & INVALID_BYTE;
        }
        if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
        }
        return out;
    };
    // Standard encoding have the following encoded/decoded ranges,
    // which we need to convert between.
    //
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +   /
    // Index:   0 - 25                    26 - 51              52 - 61   62  63
    // ASCII:  65 - 90                    97 - 122             48 - 57   43  47
    //
    // Encode 6 bits in b into a new character.
    Coder.prototype._encodeByte = function (b) {
        // Encoding uses constant time operations as follows:
        //
        // 1. Define comparison of A with B using (A - B) >>> 8:
        //          if A > B, then result is positive integer
        //          if A <= B, then result is 0
        //
        // 2. Define selection of C or 0 using bitwise AND: X & C:
        //          if X == 0, then result is 0
        //          if X != 0, then result is C
        //
        // 3. Start with the smallest comparison (b >= 0), which is always
        //    true, so set the result to the starting ASCII value (65).
        //
        // 4. Continue comparing b to higher ASCII values, and selecting
        //    zero if comparison isn't true, otherwise selecting a value
        //    to add to result, which:
        //
        //          a) undoes the previous addition
        //          b) provides new value to add
        //
        var result = b;
        // b >= 0
        result += 65;
        // b > 25
        result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
        // b > 51
        result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
        // b > 61
        result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 43);
        // b > 62
        result += ((62 - b) >>> 8) & ((62 - 43) - 63 + 47);
        return String.fromCharCode(result);
    };
    // Decode a character code into a byte.
    // Must return 256 if character is out of alphabet range.
    Coder.prototype._decodeChar = function (c) {
        // Decoding works similar to encoding: using the same comparison
        // function, but now it works on ranges: result is always incremented
        // by value, but this value becomes zero if the range is not
        // satisfied.
        //
        // Decoding starts with invalid value, 256, which is then
        // subtracted when the range is satisfied. If none of the ranges
        // apply, the function returns 256, which is then checked by
        // the caller to throw error.
        var result = INVALID_BYTE; // start with invalid character
        // c == 43 (c > 42 and c < 44)
        result += (((42 - c) & (c - 44)) >>> 8) & (-INVALID_BYTE + c - 43 + 62);
        // c == 47 (c > 46 and c < 48)
        result += (((46 - c) & (c - 48)) >>> 8) & (-INVALID_BYTE + c - 47 + 63);
        // c > 47 and c < 58
        result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
        // c > 64 and c < 91
        result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
        // c > 96 and c < 123
        result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
        return result;
    };
    Coder.prototype._getPaddingLength = function (s) {
        var paddingLength = 0;
        if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] !== this._paddingCharacter) {
                    break;
                }
                paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
                throw new Error("Base64Coder: incorrect padding");
            }
        }
        return paddingLength;
    };
    return Coder;
}());
base64.Coder = Coder;
var stdCoder = new Coder();
function encode$1(data) {
    return stdCoder.encode(data);
}
base64.encode = encode$1;
function decode$1(s) {
    return stdCoder.decode(s);
}
base64.decode = decode$1;
/**
 * Implements URL-safe Base64 encoding.
 * (Same as Base64, but '+' is replaced with '-', and '/' with '_').
 *
 * Operates in constant time.
 */
var URLSafeCoder = /** @class */ (function (_super) {
    __extends(URLSafeCoder, _super);
    function URLSafeCoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // URL-safe encoding have the following encoded/decoded ranges:
    //
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  -   _
    // Index:   0 - 25                    26 - 51              52 - 61   62  63
    // ASCII:  65 - 90                    97 - 122             48 - 57   45  95
    //
    URLSafeCoder.prototype._encodeByte = function (b) {
        var result = b;
        // b >= 0
        result += 65;
        // b > 25
        result += ((25 - b) >>> 8) & ((0 - 65) - 26 + 97);
        // b > 51
        result += ((51 - b) >>> 8) & ((26 - 97) - 52 + 48);
        // b > 61
        result += ((61 - b) >>> 8) & ((52 - 48) - 62 + 45);
        // b > 62
        result += ((62 - b) >>> 8) & ((62 - 45) - 63 + 95);
        return String.fromCharCode(result);
    };
    URLSafeCoder.prototype._decodeChar = function (c) {
        var result = INVALID_BYTE;
        // c == 45 (c > 44 and c < 46)
        result += (((44 - c) & (c - 46)) >>> 8) & (-INVALID_BYTE + c - 45 + 62);
        // c == 95 (c > 94 and c < 96)
        result += (((94 - c) & (c - 96)) >>> 8) & (-INVALID_BYTE + c - 95 + 63);
        // c > 47 and c < 58
        result += (((47 - c) & (c - 58)) >>> 8) & (-INVALID_BYTE + c - 48 + 52);
        // c > 64 and c < 91
        result += (((64 - c) & (c - 91)) >>> 8) & (-INVALID_BYTE + c - 65 + 0);
        // c > 96 and c < 123
        result += (((96 - c) & (c - 123)) >>> 8) & (-INVALID_BYTE + c - 97 + 26);
        return result;
    };
    return URLSafeCoder;
}(Coder));
base64.URLSafeCoder = URLSafeCoder;
var urlSafeCoder = new URLSafeCoder();
function encodeURLSafe(data) {
    return urlSafeCoder.encode(data);
}
base64.encodeURLSafe = encodeURLSafe;
function decodeURLSafe(s) {
    return urlSafeCoder.decode(s);
}
base64.decodeURLSafe = decodeURLSafe;
base64.encodedLength = function (length) {
    return stdCoder.encodedLength(length);
};
base64.maxDecodedLength = function (length) {
    return stdCoder.maxDecodedLength(length);
};
base64.decodedLength = function (s) {
    return stdCoder.decodedLength(s);
};

Object.defineProperty(b64$1, "__esModule", { value: true });
const base64_1 = base64;
const b64 = {
    urlSafe: (str) => str.replace(/\+/g, '-').replace(/\//g, '_'),
    urlUnsafe: (str) => str.replace(/\-/g, '+').replace(/\_/g, '/'),
    encode: function b64Encode(input) {
        if (typeof Buffer !== 'undefined') {
            return b64.urlSafe(Buffer.from(input, 0, input.length).toString('base64'));
        }
        return (0, base64_1.encodeURLSafe)(input);
    },
    decode: function b64Decode(input) {
        if (typeof Buffer !== 'undefined') {
            const buf = Buffer.from(input, 'base64');
            return new Uint8Array(buf, 0, buf.length);
        }
        return (0, base64_1.decodeURLSafe)(b64.urlSafe(input));
    }
};
b64$1.default = b64;

var hex$3 = {};

var hex$2 = {};

// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(hex$2, "__esModule", { value: true });
/**
 * Package hex implements hex encoder and decoder.
 */
//        0123456789  ABCDEF  | abcdef
// Index:    0 - 9    10-15   | 10-15
// ASCII:   48 - 57   65-70   | 97-102
function encodeNibble(b) {
    // b >= 0
    var result = b + 48;
    // b > 9
    result += ((9 - b) >>> 8) & (-48 + 65 - 10);
    return String.fromCharCode(result);
}
function encodeNibbleLower(b) {
    // b >= 0
    var result = b + 48;
    // b > 9
    result += ((9 - b) >>> 8) & (-48 + 97 - 10);
    return String.fromCharCode(result);
}
// Invalid character used in decoding to indicate
// that the character to decode is out of range of
// hex alphabet and cannot be decoded.
var INVALID_HEX_NIBBLE = 256;
function decodeNibble(c) {
    var result = INVALID_HEX_NIBBLE;
    // 0-9: c > 47 and c < 58
    result += (((47 - c) & (c - 58)) >> 8) & (-INVALID_HEX_NIBBLE + c - 48);
    // A-F: c > 64 and c < 71
    result += (((64 - c) & (c - 71)) >> 8) & (-INVALID_HEX_NIBBLE + c - 65 + 10);
    // a-f: c > 96 and c < 103
    result += (((96 - c) & (c - 103)) >> 8) & (-INVALID_HEX_NIBBLE + c - 97 + 10);
    return result;
}
/**
 * Returns string with hex-encoded data.
 */
function encode(data, lowerCase) {
    if (lowerCase === void 0) { lowerCase = false; }
    var enc = lowerCase ? encodeNibbleLower : encodeNibble;
    var s = "";
    for (var i = 0; i < data.length; i++) {
        s += enc(data[i] >>> 4);
        s += enc(data[i] & 0x0f);
    }
    return s;
}
hex$2.encode = encode;
/**
 * Returns Uint8Array with data decoded from hex string.
 *
 * Throws error if hex string length is not divisible by 2 or has non-hex
 * characters.
 */
function decode(hex) {
    if (hex.length === 0) {
        return new Uint8Array(0);
    }
    if (hex.length % 2 !== 0) {
        throw new Error("hex: input string must be divisible by two");
    }
    var result = new Uint8Array(hex.length / 2);
    var haveBad = 0;
    for (var i = 0; i < hex.length; i += 2) {
        var v0 = decodeNibble(hex.charCodeAt(i));
        var v1 = decodeNibble(hex.charCodeAt(i + 1));
        result[i / 2] = v0 << 4 | v1;
        haveBad |= v0 & INVALID_HEX_NIBBLE;
        haveBad |= v1 & INVALID_HEX_NIBBLE;
    }
    if (haveBad !== 0) {
        throw new Error("hex: incorrect characters for decoding");
    }
    return result;
}
hex$2.decode = decode;

Object.defineProperty(hex$3, "__esModule", { value: true });
const hex_1$1 = hex$2;
const hex$1 = {
    encode: function HexEncode(input) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(input, 0, input.length).toString('hex');
        }
        const lowerCase = true;
        return (0, hex_1$1.encode)(input, lowerCase);
    },
    decode: function HexDecode(input) {
        if (input.length % 2 !== 0) {
            input = '0' + input;
        }
        if (typeof Buffer !== 'undefined') {
            const buf = Buffer.from(input, 'hex');
            return new Uint8Array(buf, 0, buf.length);
        }
        return (0, hex_1$1.decode)(input);
    }
};
hex$3.default = hex$1;

var utf8$2 = {};

Object.defineProperty(utf8$2, "__esModule", { value: true });
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();
const utf8$1 = {
    decode: function Utf8Decode(input) {
        return utf8Decoder.decode(input);
    },
    encode: function Utf8Encode(input) {
        const buf = utf8Encoder.encode(input);
        return new Uint8Array(buf, 0, buf.length);
    }
};
utf8$2.default = utf8$1;

var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(dist, "__esModule", { value: true });
dist.detectEncoding = dist.decoders = dist.encoders = dist.hexToUTF8 = dist.utf8ToHex = dist.base64toUTF8 = dist.utf8ToBase64 = dist.base64ToHex = dist.hexToBase64url = utf8 = dist.utf8 = dist.b64 = hex = dist.hex = void 0;
const b64_1 = __importDefault(b64$1);
dist.b64 = b64_1.default;
const hex_1 = __importDefault(hex$3);
var hex = dist.hex = hex_1.default;
const utf8_1 = __importDefault(utf8$2);
var utf8 = dist.utf8 = utf8_1.default;
// --
function hexToBase64url(input) {
    return b64_1.default.encode(hex_1.default.decode(input));
}
dist.hexToBase64url = hexToBase64url;
function base64ToHex(base64) {
    return hex_1.default.encode(b64_1.default.decode(base64));
}
dist.base64ToHex = base64ToHex;
function utf8ToBase64(input) {
    return b64_1.default.encode(utf8_1.default.encode(input));
}
dist.utf8ToBase64 = utf8ToBase64;
function base64toUTF8(input) {
    return utf8_1.default.decode(b64_1.default.decode(input));
}
dist.base64toUTF8 = base64toUTF8;
function utf8ToHex(input) {
    return hex_1.default.encode(utf8_1.default.encode(input));
}
dist.utf8ToHex = utf8ToHex;
function hexToUTF8(input) {
    return utf8_1.default.decode(hex_1.default.decode(input));
}
dist.hexToUTF8 = hexToUTF8;
dist.encoders = {
    base64: b64_1.default.encode,
    utf8: utf8_1.default.decode,
    hex: hex_1.default.encode
};
dist.decoders = {
    base64: b64_1.default.decode,
    utf8: utf8_1.default.encode,
    hex: hex_1.default.decode
};
function detectEncoding(input) {
    const hex = /^[\dabcdef]+$/i;
    const b64 = /^[a-z0-9+/]+[=]{0,2}$/i; // RFC3548 Section 3 (uses +/)
    const b64url = /^[\w\-]+[=]{0,2}$/; // // RFC3548 Section 4 (uses -_)
    if (hex.test(input)) {
        return 'hex';
    }
    if (b64url.test(input) || b64.test(input)) {
        return 'base64';
    }
    return 'utf8';
}
dist.detectEncoding = detectEncoding;

class BrowserWalletAPI {
    constructor(extension) {
        this.extension = extension;
    }
    // DISCUSSION: This can currently wait forever. Maybe we should add
    //             an abort controller or a timeout
    waitConfirmation(txHash, checkInterval = 3000) {
        const self = this;
        return new Promise((txConfirm) => {
            const pollingId = setInterval(async () => {
                const utxos = await self.getUTxOs();
                const isConfirmed = utxos.filter((utxo) => unTxOutRef(utxo).split("#", 2)[0] == txHash)
                    .length > 0;
                if (isConfirmed) {
                    clearInterval(pollingId);
                    // QUESTION @N.H: Why do we need to wait 1 second before returning true?
                    await new Promise((res) => setTimeout(() => res(1), 1000));
                    return txConfirm(true);
                }
            }, checkInterval);
        });
    }
    signTxTheCIP30Way(tx) {
        return this.extension.signTx(tx, true);
    }
    async getChangeAddress() {
        const changeAddress = await this.extension.getChangeAddress();
        return deserializeAddress(changeAddress);
    }
    async getUsedAddresses() {
        const usedAddresses = await this.extension.getUsedAddresses();
        return usedAddresses.map(deserializeAddress);
    }
    async getCollaterals() {
        const collaterals = (await this.extension.experimental.getCollateral()) ?? [];
        return collaterals.map(deserializeTxOutRef);
    }
    async getUTxOs() {
        const utxos = (await this.extension.getUtxos()) ?? [];
        return utxos.map(deserializeTxOutRef);
    }
    async getCIP30Network() {
        const networkId = await this.extension.getNetworkId();
        return networkId == 1 ? "Mainnet" : "Testnets";
    }
    async getTokens() {
        const balances = await this.extension.getBalance();
        return valueToTokens(deserializeValue(balances));
    }
    async getLovelaces() {
        const balances = await this.extension.getBalance();
        return valueToLovelaces(deserializeValue(balances));
    }
}
/**
 * Returns an instance of the browser wallet API for the specified wallet.
 * @param walletName - The name of the wallet to get an instance of.
 * @returns An instance of the BrowserWalletAPI class.
 */
async function createBrowserWallet(walletName) {
    if (getAvailableWallets().includes(walletName)) {
        const extension = await window.cardano[walletName.toLowerCase()].enable();
        return new BrowserWalletAPI(extension);
    }
    else {
        throw new Error(`Wallet ${walletName} is not available in the browser`);
    }
}
/**
 * Get a list of the available wallets installed in the browser
 */
function getAvailableWallets() {
    if ("cardano" in window) {
        // NOTE: it would be nice to have a Type assertion that the supportedWallets array is
        // the same as the SupportedWallets type union. I've tried the other way (infering the type
        // from the array) but the exported documentation doesn't look good
        const supportedWallets = ["nami", "eternl"];
        return supportedWallets.filter((wallet) => wallet in window.cardano);
    }
    else {
        return [];
    }
}
function deserializeAddress(addressHex) {
    return addressBech32(C.Address.from_bytes(hex.decode(addressHex)).to_bech32(undefined));
}
function deserializeTxOutRef(utxoStr) {
    const utxo = C.TransactionUnspentOutput.from_bytes(hex.decode(utxoStr));
    const input = JSON.parse(utxo.input().to_json());
    return txOutRef(input.transaction_id + "#" + input.index);
}
const deserializeValue = (value) => C.Value.from_bytes(hex.decode(value));
const valueToTokens = (value) => {
    const tokenValues = [lovelaces(valueToLovelaces(value))];
    const multiAsset = value.multiasset();
    if (multiAsset !== undefined) {
        const policies = multiAsset.keys();
        for (let i = 0; i < policies.len(); i += 1) {
            const policyId = policies.get(i);
            const policyAssets = multiAsset.get(policyId);
            if (policyAssets !== undefined) {
                const policyAssetNames = policyAssets.keys();
                for (let j = 0; j < policyAssetNames.len(); j += 1) {
                    const assetName = policyAssetNames.get(j);
                    const quantity = policyAssets.get(assetName) ?? C.BigNum.from_str("0");
                    tokenValues.push(token(BigInt(quantity.to_str()).valueOf())(assetId(mkPolicyId(policyId.to_hex()))(utf8.decode(assetName.to_bytes()).substring(1) // N.H : investigate why 1 aditional character is returned
                    )));
                }
            }
        }
    }
    return tokenValues;
};
const valueToLovelaces = (value) => BigInt(value.coin().to_str()).valueOf();

export { createBrowserWallet, getAvailableWallets };
