import { c as commonjsGlobal, E as Either, _ as _function } from './Either-d9970dbd.js';

var lib = {};

(function (exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.partial = exports.PartialType = exports.type = exports.InterfaceType = exports.array = exports.ArrayType = exports.recursion = exports.RecursiveType = exports.Int = exports.brand = exports.RefinementType = exports.keyof = exports.KeyofType = exports.literal = exports.LiteralType = exports.void = exports.undefined = exports.null = exports.UnknownRecord = exports.AnyDictionaryType = exports.UnknownArray = exports.AnyArrayType = exports.boolean = exports.BooleanType = exports.bigint = exports.BigIntType = exports.number = exports.NumberType = exports.string = exports.StringType = exports.unknown = exports.UnknownType = exports.voidType = exports.VoidType = exports.UndefinedType = exports.nullType = exports.NullType = exports.getIndex = exports.getTags = exports.emptyTags = exports.mergeAll = exports.getDomainKeys = exports.appendContext = exports.getContextEntry = exports.getFunctionName = exports.identity = exports.Type = exports.success = exports.failure = exports.failures = void 0;
	exports.alias = exports.clean = exports.StrictType = exports.dictionary = exports.object = exports.ObjectType = exports.Dictionary = exports.getDefaultContext = exports.getValidationError = exports.interface = exports.Array = exports.taggedUnion = exports.TaggedUnionType = exports.Integer = exports.refinement = exports.any = exports.AnyType = exports.never = exports.NeverType = exports.Function = exports.FunctionType = exports.exact = exports.ExactType = exports.strict = exports.readonlyArray = exports.ReadonlyArrayType = exports.readonly = exports.ReadonlyType = exports.tuple = exports.TupleType = exports.intersection = exports.IntersectionType = exports.union = exports.UnionType = exports.record = exports.DictionaryType = void 0;
	/**
	 * @since 1.0.0
	 */
	var Either_1 = Either;
	/**
	 * @category Decode error
	 * @since 1.0.0
	 */
	exports.failures = Either_1.left;
	/**
	 * @category Decode error
	 * @since 1.0.0
	 */
	var failure = function (value, context, message) {
	    return (0, exports.failures)([{ value: value, context: context, message: message }]);
	};
	exports.failure = failure;
	/**
	 * @category Decode error
	 * @since 1.0.0
	 */
	exports.success = Either_1.right;
	/**
	 * @category Codec
	 * @since 1.0.0
	 */
	var Type = /** @class */ (function () {
	    function Type(
	    /** a unique name for this codec */
	    name, 
	    /** a custom type guard */
	    is, 
	    /** succeeds if a value of type I can be decoded to a value of type A */
	    validate, 
	    /** converts a value of type A to a value of type O */
	    encode) {
	        this.name = name;
	        this.is = is;
	        this.validate = validate;
	        this.encode = encode;
	        this.decode = this.decode.bind(this);
	    }
	    /**
	     * @since 1.0.0
	     */
	    Type.prototype.pipe = function (ab, name) {
	        var _this = this;
	        if (name === void 0) { name = "pipe(".concat(this.name, ", ").concat(ab.name, ")"); }
	        return new Type(name, ab.is, function (i, c) {
	            var e = _this.validate(i, c);
	            if ((0, Either_1.isLeft)(e)) {
	                return e;
	            }
	            return ab.validate(e.right, c);
	        }, this.encode === exports.identity && ab.encode === exports.identity ? exports.identity : function (b) { return _this.encode(ab.encode(b)); });
	    };
	    /**
	     * @since 1.0.0
	     */
	    Type.prototype.asDecoder = function () {
	        return this;
	    };
	    /**
	     * @since 1.0.0
	     */
	    Type.prototype.asEncoder = function () {
	        return this;
	    };
	    /**
	     * a version of `validate` with a default context
	     * @since 1.0.0
	     */
	    Type.prototype.decode = function (i) {
	        return this.validate(i, [{ key: '', type: this, actual: i }]);
	    };
	    return Type;
	}());
	exports.Type = Type;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 1.0.0
	 */
	var identity = function (a) { return a; };
	exports.identity = identity;
	/**
	 * @since 1.0.0
	 */
	function getFunctionName(f) {
	    return f.displayName || f.name || "<function".concat(f.length, ">");
	}
	exports.getFunctionName = getFunctionName;
	/**
	 * @since 1.0.0
	 */
	function getContextEntry(key, decoder) {
	    return { key: key, type: decoder };
	}
	exports.getContextEntry = getContextEntry;
	/**
	 * @since 1.0.0
	 */
	function appendContext(c, key, decoder, actual) {
	    var len = c.length;
	    var r = Array(len + 1);
	    for (var i = 0; i < len; i++) {
	        r[i] = c[i];
	    }
	    r[len] = { key: key, type: decoder, actual: actual };
	    return r;
	}
	exports.appendContext = appendContext;
	function pushAll(xs, ys) {
	    var l = ys.length;
	    for (var i = 0; i < l; i++) {
	        xs.push(ys[i]);
	    }
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function getNameFromProps(props) {
	    return Object.keys(props)
	        .map(function (k) { return "".concat(k, ": ").concat(props[k].name); })
	        .join(', ');
	}
	function useIdentity(codecs) {
	    for (var i = 0; i < codecs.length; i++) {
	        if (codecs[i].encode !== exports.identity) {
	            return false;
	        }
	    }
	    return true;
	}
	function getInterfaceTypeName(props) {
	    return "{ ".concat(getNameFromProps(props), " }");
	}
	function getPartialTypeName(inner) {
	    return "Partial<".concat(inner, ">");
	}
	function enumerableRecord(keys, domain, codomain, name) {
	    if (name === void 0) { name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }"); }
	    var len = keys.length;
	    return new DictionaryType(name, function (u) { return exports.UnknownRecord.is(u) && keys.every(function (k) { return codomain.is(u[k]); }); }, function (u, c) {
	        var e = exports.UnknownRecord.validate(u, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var o = e.right;
	        var a = {};
	        var errors = [];
	        var changed = false;
	        for (var i = 0; i < len; i++) {
	            var k = keys[i];
	            var ok = o[k];
	            var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
	            if ((0, Either_1.isLeft)(codomainResult)) {
	                pushAll(errors, codomainResult.left);
	            }
	            else {
	                var vok = codomainResult.right;
	                changed = changed || vok !== ok;
	                a[k] = vok;
	            }
	        }
	        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)((changed || Object.keys(o).length !== len ? a : o));
	    }, codomain.encode === exports.identity
	        ? exports.identity
	        : function (a) {
	            var s = {};
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                s[k] = codomain.encode(a[k]);
	            }
	            return s;
	        }, domain, codomain);
	}
	/**
	 * @internal
	 */
	function getDomainKeys(domain) {
	    var _a;
	    if (isLiteralC(domain)) {
	        var literal_1 = domain.value;
	        if (exports.string.is(literal_1)) {
	            return _a = {}, _a[literal_1] = null, _a;
	        }
	    }
	    else if (isKeyofC(domain)) {
	        return domain.keys;
	    }
	    else if (isUnionC(domain)) {
	        var keys = domain.types.map(function (type) { return getDomainKeys(type); });
	        return keys.some(undefinedType.is) ? undefined : Object.assign.apply(Object, __spreadArray([{}], keys, false));
	    }
	    return undefined;
	}
	exports.getDomainKeys = getDomainKeys;
	function nonEnumerableRecord(domain, codomain, name) {
	    if (name === void 0) { name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }"); }
	    return new DictionaryType(name, function (u) {
	        if (exports.UnknownRecord.is(u)) {
	            return Object.keys(u).every(function (k) { return domain.is(k) && codomain.is(u[k]); });
	        }
	        return isAnyC(codomain) && Array.isArray(u);
	    }, function (u, c) {
	        if (exports.UnknownRecord.is(u)) {
	            var a = {};
	            var errors = [];
	            var keys = Object.keys(u);
	            var len = keys.length;
	            var changed = false;
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                var ok = u[k];
	                var domainResult = domain.validate(k, appendContext(c, k, domain, k));
	                if ((0, Either_1.isLeft)(domainResult)) {
	                    pushAll(errors, domainResult.left);
	                }
	                else {
	                    var vk = domainResult.right;
	                    changed = changed || vk !== k;
	                    k = vk;
	                    var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
	                    if ((0, Either_1.isLeft)(codomainResult)) {
	                        pushAll(errors, codomainResult.left);
	                    }
	                    else {
	                        var vok = codomainResult.right;
	                        changed = changed || vok !== ok;
	                        a[k] = vok;
	                    }
	                }
	            }
	            return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)((changed ? a : u));
	        }
	        if (isAnyC(codomain) && Array.isArray(u)) {
	            return (0, exports.success)(u);
	        }
	        return (0, exports.failure)(u, c);
	    }, domain.encode === exports.identity && codomain.encode === exports.identity
	        ? exports.identity
	        : function (a) {
	            var s = {};
	            var keys = Object.keys(a);
	            var len = keys.length;
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                s[String(domain.encode(k))] = codomain.encode(a[k]);
	            }
	            return s;
	        }, domain, codomain);
	}
	function getUnionName(codecs) {
	    return '(' + codecs.map(function (type) { return type.name; }).join(' | ') + ')';
	}
	/**
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	function mergeAll(base, us) {
	    var equal = true;
	    var primitive = true;
	    var baseIsNotADictionary = !exports.UnknownRecord.is(base);
	    for (var _i = 0, us_1 = us; _i < us_1.length; _i++) {
	        var u = us_1[_i];
	        if (u !== base) {
	            equal = false;
	        }
	        if (exports.UnknownRecord.is(u)) {
	            primitive = false;
	        }
	    }
	    if (equal) {
	        return base;
	    }
	    else if (primitive) {
	        return us[us.length - 1];
	    }
	    var r = {};
	    for (var _a = 0, us_2 = us; _a < us_2.length; _a++) {
	        var u = us_2[_a];
	        for (var k in u) {
	            if (!hasOwnProperty.call(r, k) || baseIsNotADictionary || u[k] !== base[k]) {
	                r[k] = u[k];
	            }
	        }
	    }
	    return r;
	}
	exports.mergeAll = mergeAll;
	function getProps(codec) {
	    switch (codec._tag) {
	        case 'RefinementType':
	        case 'ReadonlyType':
	            return getProps(codec.type);
	        case 'InterfaceType':
	        case 'StrictType':
	        case 'PartialType':
	            return codec.props;
	        case 'IntersectionType':
	            return codec.types.reduce(function (props, type) { return Object.assign(props, getProps(type)); }, {});
	    }
	}
	function stripKeys(o, props) {
	    var keys = Object.getOwnPropertyNames(o);
	    var shouldStrip = false;
	    var r = {};
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        if (!hasOwnProperty.call(props, key)) {
	            shouldStrip = true;
	        }
	        else {
	            r[key] = o[key];
	        }
	    }
	    return shouldStrip ? r : o;
	}
	function getExactTypeName(codec) {
	    if (isTypeC(codec)) {
	        return "{| ".concat(getNameFromProps(codec.props), " |}");
	    }
	    else if (isPartialC(codec)) {
	        return getPartialTypeName("{| ".concat(getNameFromProps(codec.props), " |}"));
	    }
	    return "Exact<".concat(codec.name, ">");
	}
	function isNonEmpty(as) {
	    return as.length > 0;
	}
	/**
	 * @internal
	 */
	exports.emptyTags = {};
	function intersect(a, b) {
	    var r = [];
	    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
	        var v = a_1[_i];
	        if (b.indexOf(v) !== -1) {
	            r.push(v);
	        }
	    }
	    return r;
	}
	function mergeTags(a, b) {
	    if (a === exports.emptyTags) {
	        return b;
	    }
	    if (b === exports.emptyTags) {
	        return a;
	    }
	    var r = Object.assign({}, a);
	    for (var k in b) {
	        if (hasOwnProperty.call(a, k)) {
	            var intersection_1 = intersect(a[k], b[k]);
	            if (isNonEmpty(intersection_1)) {
	                r[k] = intersection_1;
	            }
	            else {
	                r = exports.emptyTags;
	                break;
	            }
	        }
	        else {
	            r[k] = b[k];
	        }
	    }
	    return r;
	}
	function intersectTags(a, b) {
	    if (a === exports.emptyTags || b === exports.emptyTags) {
	        return exports.emptyTags;
	    }
	    var r = exports.emptyTags;
	    for (var k in a) {
	        if (hasOwnProperty.call(b, k)) {
	            var intersection_2 = intersect(a[k], b[k]);
	            if (intersection_2.length === 0) {
	                if (r === exports.emptyTags) {
	                    r = {};
	                }
	                r[k] = a[k].concat(b[k]);
	            }
	        }
	    }
	    return r;
	}
	// tslint:disable-next-line: deprecation
	function isAnyC(codec) {
	    return codec._tag === 'AnyType';
	}
	function isLiteralC(codec) {
	    return codec._tag === 'LiteralType';
	}
	function isKeyofC(codec) {
	    return codec._tag === 'KeyofType';
	}
	function isTypeC(codec) {
	    return codec._tag === 'InterfaceType';
	}
	function isPartialC(codec) {
	    return codec._tag === 'PartialType';
	}
	// tslint:disable-next-line: deprecation
	function isStrictC(codec) {
	    return codec._tag === 'StrictType';
	}
	function isExactC(codec) {
	    return codec._tag === 'ExactType';
	}
	// tslint:disable-next-line: deprecation
	function isRefinementC(codec) {
	    return codec._tag === 'RefinementType';
	}
	function isIntersectionC(codec) {
	    return codec._tag === 'IntersectionType';
	}
	function isUnionC(codec) {
	    return codec._tag === 'UnionType';
	}
	function isRecursiveC(codec) {
	    return codec._tag === 'RecursiveType';
	}
	var lazyCodecs = [];
	/**
	 * @internal
	 */
	function getTags(codec) {
	    if (lazyCodecs.indexOf(codec) !== -1) {
	        return exports.emptyTags;
	    }
	    if (isTypeC(codec) || isStrictC(codec)) {
	        var index = exports.emptyTags;
	        // tslint:disable-next-line: forin
	        for (var k in codec.props) {
	            var prop = codec.props[k];
	            if (isLiteralC(prop)) {
	                if (index === exports.emptyTags) {
	                    index = {};
	                }
	                index[k] = [prop.value];
	            }
	        }
	        return index;
	    }
	    else if (isExactC(codec) || isRefinementC(codec)) {
	        return getTags(codec.type);
	    }
	    else if (isIntersectionC(codec)) {
	        return codec.types.reduce(function (tags, codec) { return mergeTags(tags, getTags(codec)); }, exports.emptyTags);
	    }
	    else if (isUnionC(codec)) {
	        return codec.types.slice(1).reduce(function (tags, codec) { return intersectTags(tags, getTags(codec)); }, getTags(codec.types[0]));
	    }
	    else if (isRecursiveC(codec)) {
	        lazyCodecs.push(codec);
	        var tags = getTags(codec.type);
	        lazyCodecs.pop();
	        return tags;
	    }
	    return exports.emptyTags;
	}
	exports.getTags = getTags;
	/**
	 * @internal
	 */
	function getIndex(codecs) {
	    var tags = getTags(codecs[0]);
	    var keys = Object.keys(tags);
	    var len = codecs.length;
	    var _loop_1 = function (k) {
	        var all = tags[k].slice();
	        var index = [tags[k]];
	        for (var i = 1; i < len; i++) {
	            var codec = codecs[i];
	            var ctags = getTags(codec);
	            var values = ctags[k];
	            // tslint:disable-next-line: strict-type-predicates
	            if (values === undefined) {
	                return "continue-keys";
	            }
	            else {
	                if (values.some(function (v) { return all.indexOf(v) !== -1; })) {
	                    return "continue-keys";
	                }
	                else {
	                    all.push.apply(all, values);
	                    index.push(values);
	                }
	            }
	        }
	        return { value: [k, index] };
	    };
	    keys: for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
	        var k = keys_1[_i];
	        var state_1 = _loop_1(k);
	        if (typeof state_1 === "object")
	            return state_1.value;
	        switch (state_1) {
	            case "continue-keys": continue keys;
	        }
	    }
	    return undefined;
	}
	exports.getIndex = getIndex;
	// -------------------------------------------------------------------------------------
	// primitives
	// -------------------------------------------------------------------------------------
	/**
	 * @since 1.0.0
	 */
	var NullType = /** @class */ (function (_super) {
	    __extends(NullType, _super);
	    function NullType() {
	        var _this = _super.call(this, 'null', function (u) { return u === null; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'NullType';
	        return _this;
	    }
	    return NullType;
	}(Type));
	exports.NullType = NullType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.nullType = new NullType();
	exports.null = exports.nullType;
	/**
	 * @since 1.0.0
	 */
	var UndefinedType = /** @class */ (function (_super) {
	    __extends(UndefinedType, _super);
	    function UndefinedType() {
	        var _this = _super.call(this, 'undefined', function (u) { return u === void 0; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'UndefinedType';
	        return _this;
	    }
	    return UndefinedType;
	}(Type));
	exports.UndefinedType = UndefinedType;
	var undefinedType = new UndefinedType();
	exports.undefined = undefinedType;
	/**
	 * @since 1.2.0
	 */
	var VoidType = /** @class */ (function (_super) {
	    __extends(VoidType, _super);
	    function VoidType() {
	        var _this = _super.call(this, 'void', undefinedType.is, undefinedType.validate, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'VoidType';
	        return _this;
	    }
	    return VoidType;
	}(Type));
	exports.VoidType = VoidType;
	/**
	 * @category primitives
	 * @since 1.2.0
	 */
	exports.voidType = new VoidType();
	exports.void = exports.voidType;
	/**
	 * @since 1.5.0
	 */
	var UnknownType = /** @class */ (function (_super) {
	    __extends(UnknownType, _super);
	    function UnknownType() {
	        var _this = _super.call(this, 'unknown', function (_) { return true; }, exports.success, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'UnknownType';
	        return _this;
	    }
	    return UnknownType;
	}(Type));
	exports.UnknownType = UnknownType;
	/**
	 * @category primitives
	 * @since 1.5.0
	 */
	exports.unknown = new UnknownType();
	/**
	 * @since 1.0.0
	 */
	var StringType = /** @class */ (function (_super) {
	    __extends(StringType, _super);
	    function StringType() {
	        var _this = _super.call(this, 'string', function (u) { return typeof u === 'string'; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'StringType';
	        return _this;
	    }
	    return StringType;
	}(Type));
	exports.StringType = StringType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.string = new StringType();
	/**
	 * @since 1.0.0
	 */
	var NumberType = /** @class */ (function (_super) {
	    __extends(NumberType, _super);
	    function NumberType() {
	        var _this = _super.call(this, 'number', function (u) { return typeof u === 'number'; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'NumberType';
	        return _this;
	    }
	    return NumberType;
	}(Type));
	exports.NumberType = NumberType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.number = new NumberType();
	/**
	 * @since 2.1.0
	 */
	var BigIntType = /** @class */ (function (_super) {
	    __extends(BigIntType, _super);
	    function BigIntType() {
	        var _this = _super.call(this, 'bigint', 
	        // tslint:disable-next-line: valid-typeof
	        function (u) { return typeof u === 'bigint'; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'BigIntType';
	        return _this;
	    }
	    return BigIntType;
	}(Type));
	exports.BigIntType = BigIntType;
	/**
	 * @category primitives
	 * @since 2.1.0
	 */
	exports.bigint = new BigIntType();
	/**
	 * @since 1.0.0
	 */
	var BooleanType = /** @class */ (function (_super) {
	    __extends(BooleanType, _super);
	    function BooleanType() {
	        var _this = _super.call(this, 'boolean', function (u) { return typeof u === 'boolean'; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'BooleanType';
	        return _this;
	    }
	    return BooleanType;
	}(Type));
	exports.BooleanType = BooleanType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.boolean = new BooleanType();
	/**
	 * @since 1.0.0
	 */
	var AnyArrayType = /** @class */ (function (_super) {
	    __extends(AnyArrayType, _super);
	    function AnyArrayType() {
	        var _this = _super.call(this, 'UnknownArray', Array.isArray, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'AnyArrayType';
	        return _this;
	    }
	    return AnyArrayType;
	}(Type));
	exports.AnyArrayType = AnyArrayType;
	/**
	 * @category primitives
	 * @since 1.7.1
	 */
	exports.UnknownArray = new AnyArrayType();
	exports.Array = exports.UnknownArray;
	/**
	 * @since 1.0.0
	 */
	var AnyDictionaryType = /** @class */ (function (_super) {
	    __extends(AnyDictionaryType, _super);
	    function AnyDictionaryType() {
	        var _this = _super.call(this, 'UnknownRecord', function (u) { return u !== null && typeof u === 'object' && !Array.isArray(u); }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'AnyDictionaryType';
	        return _this;
	    }
	    return AnyDictionaryType;
	}(Type));
	exports.AnyDictionaryType = AnyDictionaryType;
	/**
	 * @category primitives
	 * @since 1.7.1
	 */
	exports.UnknownRecord = new AnyDictionaryType();
	/**
	 * @since 1.0.0
	 */
	var LiteralType = /** @class */ (function (_super) {
	    __extends(LiteralType, _super);
	    function LiteralType(name, is, validate, encode, value) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.value = value;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'LiteralType';
	        return _this;
	    }
	    return LiteralType;
	}(Type));
	exports.LiteralType = LiteralType;
	/**
	 * @category constructors
	 * @since 1.0.0
	 */
	function literal(value, name) {
	    if (name === void 0) { name = JSON.stringify(value); }
	    var is = function (u) { return u === value; };
	    return new LiteralType(name, is, function (u, c) { return (is(u) ? (0, exports.success)(value) : (0, exports.failure)(u, c)); }, exports.identity, value);
	}
	exports.literal = literal;
	/**
	 * @since 1.0.0
	 */
	var KeyofType = /** @class */ (function (_super) {
	    __extends(KeyofType, _super);
	    function KeyofType(name, is, validate, encode, keys) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.keys = keys;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'KeyofType';
	        return _this;
	    }
	    return KeyofType;
	}(Type));
	exports.KeyofType = KeyofType;
	/**
	 * @category constructors
	 * @since 1.0.0
	 */
	function keyof(keys, name) {
	    if (name === void 0) { name = Object.keys(keys)
	        .map(function (k) { return JSON.stringify(k); })
	        .join(' | '); }
	    var is = function (u) { return exports.string.is(u) && hasOwnProperty.call(keys, u); };
	    return new KeyofType(name, is, function (u, c) { return (is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity, keys);
	}
	exports.keyof = keyof;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * @since 1.0.0
	 */
	var RefinementType = /** @class */ (function (_super) {
	    __extends(RefinementType, _super);
	    function RefinementType(name, is, validate, encode, type, predicate) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.type = type;
	        _this.predicate = predicate;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'RefinementType';
	        return _this;
	    }
	    return RefinementType;
	}(Type));
	exports.RefinementType = RefinementType;
	/**
	 * @category combinators
	 * @since 1.8.1
	 */
	function brand(codec, predicate, name) {
	    return refinement(codec, predicate, name);
	}
	exports.brand = brand;
	/**
	 * A branded codec representing an integer
	 *
	 * @category primitives
	 * @since 1.8.1
	 */
	exports.Int = brand(exports.number, function (n) { return Number.isInteger(n); }, 'Int');
	/**
	 * @since 1.0.0
	 */
	var RecursiveType = /** @class */ (function (_super) {
	    __extends(RecursiveType, _super);
	    function RecursiveType(name, is, validate, encode, runDefinition) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.runDefinition = runDefinition;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'RecursiveType';
	        return _this;
	    }
	    return RecursiveType;
	}(Type));
	exports.RecursiveType = RecursiveType;
	Object.defineProperty(RecursiveType.prototype, 'type', {
	    get: function () {
	        return this.runDefinition();
	    },
	    enumerable: true,
	    configurable: true
	});
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function recursion(name, definition) {
	    var cache;
	    var runDefinition = function () {
	        if (!cache) {
	            cache = definition(Self);
	            cache.name = name;
	        }
	        return cache;
	    };
	    var Self = new RecursiveType(name, function (u) { return runDefinition().is(u); }, function (u, c) { return runDefinition().validate(u, c); }, function (a) { return runDefinition().encode(a); }, runDefinition);
	    return Self;
	}
	exports.recursion = recursion;
	/**
	 * @since 1.0.0
	 */
	var ArrayType = /** @class */ (function (_super) {
	    __extends(ArrayType, _super);
	    function ArrayType(name, is, validate, encode, type) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.type = type;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'ArrayType';
	        return _this;
	    }
	    return ArrayType;
	}(Type));
	exports.ArrayType = ArrayType;
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function array(item, name) {
	    if (name === void 0) { name = "Array<".concat(item.name, ">"); }
	    return new ArrayType(name, function (u) { return exports.UnknownArray.is(u) && u.every(item.is); }, function (u, c) {
	        var e = exports.UnknownArray.validate(u, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var us = e.right;
	        var len = us.length;
	        var as = us;
	        var errors = [];
	        for (var i = 0; i < len; i++) {
	            var ui = us[i];
	            var result = item.validate(ui, appendContext(c, String(i), item, ui));
	            if ((0, Either_1.isLeft)(result)) {
	                pushAll(errors, result.left);
	            }
	            else {
	                var ai = result.right;
	                if (ai !== ui) {
	                    if (as === us) {
	                        as = us.slice();
	                    }
	                    as[i] = ai;
	                }
	            }
	        }
	        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(as);
	    }, item.encode === exports.identity ? exports.identity : function (a) { return a.map(item.encode); }, item);
	}
	exports.array = array;
	/**
	 * @since 1.0.0
	 */
	var InterfaceType = /** @class */ (function (_super) {
	    __extends(InterfaceType, _super);
	    function InterfaceType(name, is, validate, encode, props) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.props = props;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'InterfaceType';
	        return _this;
	    }
	    return InterfaceType;
	}(Type));
	exports.InterfaceType = InterfaceType;
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function type(props, name) {
	    if (name === void 0) { name = getInterfaceTypeName(props); }
	    var keys = Object.keys(props);
	    var types = keys.map(function (key) { return props[key]; });
	    var len = keys.length;
	    return new InterfaceType(name, function (u) {
	        if (exports.UnknownRecord.is(u)) {
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                var uk = u[k];
	                if ((uk === undefined && !hasOwnProperty.call(u, k)) || !types[i].is(uk)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        return false;
	    }, function (u, c) {
	        var e = exports.UnknownRecord.validate(u, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var o = e.right;
	        var a = o;
	        var errors = [];
	        for (var i = 0; i < len; i++) {
	            var k = keys[i];
	            var ak = a[k];
	            var type_1 = types[i];
	            var result = type_1.validate(ak, appendContext(c, k, type_1, ak));
	            if ((0, Either_1.isLeft)(result)) {
	                pushAll(errors, result.left);
	            }
	            else {
	                var vak = result.right;
	                if (vak !== ak || (vak === undefined && !hasOwnProperty.call(a, k))) {
	                    /* istanbul ignore next */
	                    if (a === o) {
	                        a = __assign({}, o);
	                    }
	                    a[k] = vak;
	                }
	            }
	        }
	        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(a);
	    }, useIdentity(types)
	        ? exports.identity
	        : function (a) {
	            var s = __assign({}, a);
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                var encode = types[i].encode;
	                if (encode !== exports.identity) {
	                    s[k] = encode(a[k]);
	                }
	            }
	            return s;
	        }, props);
	}
	exports.type = type;
	exports.interface = type;
	/**
	 * @since 1.0.0
	 */
	var PartialType = /** @class */ (function (_super) {
	    __extends(PartialType, _super);
	    function PartialType(name, is, validate, encode, props) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.props = props;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'PartialType';
	        return _this;
	    }
	    return PartialType;
	}(Type));
	exports.PartialType = PartialType;
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function partial(props, name) {
	    if (name === void 0) { name = getPartialTypeName(getInterfaceTypeName(props)); }
	    var keys = Object.keys(props);
	    var types = keys.map(function (key) { return props[key]; });
	    var len = keys.length;
	    return new PartialType(name, function (u) {
	        if (exports.UnknownRecord.is(u)) {
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                var uk = u[k];
	                if (uk !== undefined && !props[k].is(uk)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        return false;
	    }, function (u, c) {
	        var e = exports.UnknownRecord.validate(u, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var o = e.right;
	        var a = o;
	        var errors = [];
	        for (var i = 0; i < len; i++) {
	            var k = keys[i];
	            var ak = a[k];
	            var type_2 = props[k];
	            var result = type_2.validate(ak, appendContext(c, k, type_2, ak));
	            if ((0, Either_1.isLeft)(result)) {
	                if (ak !== undefined) {
	                    pushAll(errors, result.left);
	                }
	            }
	            else {
	                var vak = result.right;
	                if (vak !== ak) {
	                    /* istanbul ignore next */
	                    if (a === o) {
	                        a = __assign({}, o);
	                    }
	                    a[k] = vak;
	                }
	            }
	        }
	        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(a);
	    }, useIdentity(types)
	        ? exports.identity
	        : function (a) {
	            var s = __assign({}, a);
	            for (var i = 0; i < len; i++) {
	                var k = keys[i];
	                var ak = a[k];
	                if (ak !== undefined) {
	                    s[k] = types[i].encode(ak);
	                }
	            }
	            return s;
	        }, props);
	}
	exports.partial = partial;
	/**
	 * @since 1.0.0
	 */
	var DictionaryType = /** @class */ (function (_super) {
	    __extends(DictionaryType, _super);
	    function DictionaryType(name, is, validate, encode, domain, codomain) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.domain = domain;
	        _this.codomain = codomain;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'DictionaryType';
	        return _this;
	    }
	    return DictionaryType;
	}(Type));
	exports.DictionaryType = DictionaryType;
	/**
	 * @category combinators
	 * @since 1.7.1
	 */
	function record(domain, codomain, name) {
	    var keys = getDomainKeys(domain);
	    return keys
	        ? enumerableRecord(Object.keys(keys), domain, codomain, name)
	        : nonEnumerableRecord(domain, codomain, name);
	}
	exports.record = record;
	/**
	 * @since 1.0.0
	 */
	var UnionType = /** @class */ (function (_super) {
	    __extends(UnionType, _super);
	    function UnionType(name, is, validate, encode, types) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.types = types;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'UnionType';
	        return _this;
	    }
	    return UnionType;
	}(Type));
	exports.UnionType = UnionType;
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function union(codecs, name) {
	    if (name === void 0) { name = getUnionName(codecs); }
	    var index = getIndex(codecs);
	    if (index !== undefined && codecs.length > 0) {
	        var tag_1 = index[0], groups_1 = index[1];
	        var len_1 = groups_1.length;
	        var find_1 = function (value) {
	            for (var i = 0; i < len_1; i++) {
	                if (groups_1[i].indexOf(value) !== -1) {
	                    return i;
	                }
	            }
	            return undefined;
	        };
	        // tslint:disable-next-line: deprecation
	        return new TaggedUnionType(name, function (u) {
	            if (exports.UnknownRecord.is(u)) {
	                var i = find_1(u[tag_1]);
	                return i !== undefined ? codecs[i].is(u) : false;
	            }
	            return false;
	        }, function (u, c) {
	            var e = exports.UnknownRecord.validate(u, c);
	            if ((0, Either_1.isLeft)(e)) {
	                return e;
	            }
	            var r = e.right;
	            var i = find_1(r[tag_1]);
	            if (i === undefined) {
	                return (0, exports.failure)(u, c);
	            }
	            var codec = codecs[i];
	            return codec.validate(r, appendContext(c, String(i), codec, r));
	        }, useIdentity(codecs)
	            ? exports.identity
	            : function (a) {
	                var i = find_1(a[tag_1]);
	                if (i === undefined) {
	                    // https://github.com/gcanti/io-ts/pull/305
	                    throw new Error("no codec found to encode value in union codec ".concat(name));
	                }
	                else {
	                    return codecs[i].encode(a);
	                }
	            }, codecs, tag_1);
	    }
	    else {
	        return new UnionType(name, function (u) { return codecs.some(function (type) { return type.is(u); }); }, function (u, c) {
	            var errors = [];
	            for (var i = 0; i < codecs.length; i++) {
	                var codec = codecs[i];
	                var result = codec.validate(u, appendContext(c, String(i), codec, u));
	                if ((0, Either_1.isLeft)(result)) {
	                    pushAll(errors, result.left);
	                }
	                else {
	                    return (0, exports.success)(result.right);
	                }
	            }
	            return (0, exports.failures)(errors);
	        }, useIdentity(codecs)
	            ? exports.identity
	            : function (a) {
	                for (var _i = 0, codecs_1 = codecs; _i < codecs_1.length; _i++) {
	                    var codec = codecs_1[_i];
	                    if (codec.is(a)) {
	                        return codec.encode(a);
	                    }
	                }
	                // https://github.com/gcanti/io-ts/pull/305
	                throw new Error("no codec found to encode value in union type ".concat(name));
	            }, codecs);
	    }
	}
	exports.union = union;
	/**
	 * @since 1.0.0
	 */
	var IntersectionType = /** @class */ (function (_super) {
	    __extends(IntersectionType, _super);
	    function IntersectionType(name, is, validate, encode, types) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.types = types;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'IntersectionType';
	        return _this;
	    }
	    return IntersectionType;
	}(Type));
	exports.IntersectionType = IntersectionType;
	function intersection(codecs, name) {
	    if (name === void 0) { name = "(".concat(codecs.map(function (type) { return type.name; }).join(' & '), ")"); }
	    var len = codecs.length;
	    return new IntersectionType(name, function (u) { return codecs.every(function (type) { return type.is(u); }); }, codecs.length === 0
	        ? exports.success
	        : function (u, c) {
	            var us = [];
	            var errors = [];
	            for (var i = 0; i < len; i++) {
	                var codec = codecs[i];
	                var result = codec.validate(u, appendContext(c, String(i), codec, u));
	                if ((0, Either_1.isLeft)(result)) {
	                    pushAll(errors, result.left);
	                }
	                else {
	                    us.push(result.right);
	                }
	            }
	            return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(mergeAll(u, us));
	        }, codecs.length === 0
	        ? exports.identity
	        : function (a) {
	            return mergeAll(a, codecs.map(function (codec) { return codec.encode(a); }));
	        }, codecs);
	}
	exports.intersection = intersection;
	/**
	 * @since 1.0.0
	 */
	var TupleType = /** @class */ (function (_super) {
	    __extends(TupleType, _super);
	    function TupleType(name, is, validate, encode, types) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.types = types;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'TupleType';
	        return _this;
	    }
	    return TupleType;
	}(Type));
	exports.TupleType = TupleType;
	function tuple(codecs, name) {
	    if (name === void 0) { name = "[".concat(codecs.map(function (type) { return type.name; }).join(', '), "]"); }
	    var len = codecs.length;
	    return new TupleType(name, function (u) { return exports.UnknownArray.is(u) && u.length === len && codecs.every(function (type, i) { return type.is(u[i]); }); }, function (u, c) {
	        var e = exports.UnknownArray.validate(u, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var us = e.right;
	        var as = us.length > len ? us.slice(0, len) : us; // strip additional components
	        var errors = [];
	        for (var i = 0; i < len; i++) {
	            var a = us[i];
	            var type_3 = codecs[i];
	            var result = type_3.validate(a, appendContext(c, String(i), type_3, a));
	            if ((0, Either_1.isLeft)(result)) {
	                pushAll(errors, result.left);
	            }
	            else {
	                var va = result.right;
	                if (va !== a) {
	                    /* istanbul ignore next */
	                    if (as === us) {
	                        as = us.slice();
	                    }
	                    as[i] = va;
	                }
	            }
	        }
	        return errors.length > 0 ? (0, exports.failures)(errors) : (0, exports.success)(as);
	    }, useIdentity(codecs) ? exports.identity : function (a) { return codecs.map(function (type, i) { return type.encode(a[i]); }); }, codecs);
	}
	exports.tuple = tuple;
	/**
	 * @since 1.0.0
	 */
	var ReadonlyType = /** @class */ (function (_super) {
	    __extends(ReadonlyType, _super);
	    function ReadonlyType(name, is, validate, encode, type) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.type = type;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'ReadonlyType';
	        return _this;
	    }
	    return ReadonlyType;
	}(Type));
	exports.ReadonlyType = ReadonlyType;
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function readonly(codec, name) {
	    if (name === void 0) { name = "Readonly<".concat(codec.name, ">"); }
	    return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
	}
	exports.readonly = readonly;
	/**
	 * @since 1.0.0
	 */
	var ReadonlyArrayType = /** @class */ (function (_super) {
	    __extends(ReadonlyArrayType, _super);
	    function ReadonlyArrayType(name, is, validate, encode, type) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.type = type;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'ReadonlyArrayType';
	        return _this;
	    }
	    return ReadonlyArrayType;
	}(Type));
	exports.ReadonlyArrayType = ReadonlyArrayType;
	/**
	 * @category combinators
	 * @since 1.0.0
	 */
	function readonlyArray(item, name) {
	    if (name === void 0) { name = "ReadonlyArray<".concat(item.name, ">"); }
	    var codec = array(item);
	    return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
	}
	exports.readonlyArray = readonlyArray;
	/**
	 * Strips additional properties, equivalent to `exact(type(props))`.
	 *
	 * @category combinators
	 * @since 1.0.0
	 */
	var strict = function (props, name) { return exact(type(props), name); };
	exports.strict = strict;
	/**
	 * @since 1.1.0
	 */
	var ExactType = /** @class */ (function (_super) {
	    __extends(ExactType, _super);
	    function ExactType(name, is, validate, encode, type) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.type = type;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'ExactType';
	        return _this;
	    }
	    return ExactType;
	}(Type));
	exports.ExactType = ExactType;
	/**
	 * Strips additional properties.
	 *
	 * @category combinators
	 * @since 1.1.0
	 */
	function exact(codec, name) {
	    if (name === void 0) { name = getExactTypeName(codec); }
	    var props = getProps(codec);
	    return new ExactType(name, codec.is, function (u, c) {
	        var e = exports.UnknownRecord.validate(u, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var ce = codec.validate(u, c);
	        if ((0, Either_1.isLeft)(ce)) {
	            return ce;
	        }
	        return (0, Either_1.right)(stripKeys(ce.right, props));
	    }, function (a) { return codec.encode(stripKeys(a, props)); }, codec);
	}
	exports.exact = exact;
	/**
	 * @since 1.0.0
	 */
	var FunctionType = /** @class */ (function (_super) {
	    __extends(FunctionType, _super);
	    function FunctionType() {
	        var _this = _super.call(this, 'Function', 
	        // tslint:disable-next-line:strict-type-predicates
	        function (u) { return typeof u === 'function'; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'FunctionType';
	        return _this;
	    }
	    return FunctionType;
	}(Type));
	exports.FunctionType = FunctionType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.Function = new FunctionType();
	/**
	 * @since 1.0.0
	 */
	var NeverType = /** @class */ (function (_super) {
	    __extends(NeverType, _super);
	    function NeverType() {
	        var _this = _super.call(this, 'never', function (_) { return false; }, function (u, c) { return (0, exports.failure)(u, c); }, 
	        /* istanbul ignore next */
	        function () {
	            throw new Error('cannot encode never');
	        }) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'NeverType';
	        return _this;
	    }
	    return NeverType;
	}(Type));
	exports.NeverType = NeverType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.never = new NeverType();
	/**
	 * @since 1.0.0
	 */
	var AnyType = /** @class */ (function (_super) {
	    __extends(AnyType, _super);
	    function AnyType() {
	        var _this = _super.call(this, 'any', function (_) { return true; }, exports.success, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'AnyType';
	        return _this;
	    }
	    return AnyType;
	}(Type));
	exports.AnyType = AnyType;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.any = new AnyType();
	function refinement(codec, predicate, name) {
	    if (name === void 0) { name = "(".concat(codec.name, " | ").concat(getFunctionName(predicate), ")"); }
	    return new RefinementType(name, function (u) { return codec.is(u) && predicate(u); }, function (i, c) {
	        var e = codec.validate(i, c);
	        if ((0, Either_1.isLeft)(e)) {
	            return e;
	        }
	        var a = e.right;
	        return predicate(a) ? (0, exports.success)(a) : (0, exports.failure)(a, c);
	    }, codec.encode, codec, predicate);
	}
	exports.refinement = refinement;
	/**
	 * @category primitives
	 * @since 1.0.0
	 */
	exports.Integer = refinement(exports.number, Number.isInteger, 'Integer');
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * @since 1.3.0
	 * @deprecated
	 */
	var TaggedUnionType = /** @class */ (function (_super) {
	    __extends(TaggedUnionType, _super);
	    function TaggedUnionType(name, 
	    // tslint:disable-next-line: deprecation
	    is, 
	    // tslint:disable-next-line: deprecation
	    validate, 
	    // tslint:disable-next-line: deprecation
	    encode, codecs, tag) {
	        var _this = _super.call(this, name, is, validate, encode, codecs) /* istanbul ignore next */ // <= workaround for https://github.com/Microsoft/TypeScript/issues/13455
	         || this;
	        _this.tag = tag;
	        return _this;
	    }
	    return TaggedUnionType;
	}(UnionType));
	exports.TaggedUnionType = TaggedUnionType;
	/**
	 * Use `union` instead.
	 *
	 * @category combinators
	 * @since 1.3.0
	 * @deprecated
	 */
	var taggedUnion = function (tag, codecs, name
	// tslint:disable-next-line: deprecation
	) {
	    if (name === void 0) { name = getUnionName(codecs); }
	    var U = union(codecs, name);
	    // tslint:disable-next-line: deprecation
	    if (U instanceof TaggedUnionType) {
	        return U;
	    }
	    else {
	        console.warn("[io-ts] Cannot build a tagged union for ".concat(name, ", returning a de-optimized union"));
	        // tslint:disable-next-line: deprecation
	        return new TaggedUnionType(name, U.is, U.validate, U.encode, codecs, tag);
	    }
	};
	exports.taggedUnion = taggedUnion;
	/**
	 * @since 1.0.0
	 * @deprecated
	 */
	var getValidationError /* istanbul ignore next */ = function (value, context) { return ({
	    value: value,
	    context: context
	}); };
	exports.getValidationError /* istanbul ignore next */ = getValidationError;
	/**
	 * @since 1.0.0
	 * @deprecated
	 */
	var getDefaultContext /* istanbul ignore next */ = function (decoder) { return [
	    { key: '', type: decoder }
	]; };
	exports.getDefaultContext /* istanbul ignore next */ = getDefaultContext;
	/**
	 * Use `UnknownRecord` instead.
	 *
	 * @category primitives
	 * @since 1.0.0
	 * @deprecated
	 */
	exports.Dictionary = exports.UnknownRecord;
	/**
	 * @since 1.0.0
	 * @deprecated
	 */
	var ObjectType = /** @class */ (function (_super) {
	    __extends(ObjectType, _super);
	    function ObjectType() {
	        var _this = _super.call(this, 'object', function (u) { return u !== null && typeof u === 'object'; }, function (u, c) { return (_this.is(u) ? (0, exports.success)(u) : (0, exports.failure)(u, c)); }, exports.identity) || this;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'ObjectType';
	        return _this;
	    }
	    return ObjectType;
	}(Type));
	exports.ObjectType = ObjectType;
	/**
	 * Use `UnknownRecord` instead.
	 *
	 * @category primitives
	 * @since 1.0.0
	 * @deprecated
	 */
	// tslint:disable-next-line: deprecation
	exports.object = new ObjectType();
	/**
	 * Use `record` instead.
	 *
	 * @category combinators
	 * @since 1.0.0
	 * @deprecated
	 */
	exports.dictionary = record;
	/**
	 * @since 1.0.0
	 * @deprecated
	 */
	var StrictType = /** @class */ (function (_super) {
	    __extends(StrictType, _super);
	    function StrictType(name, 
	    // tslint:disable-next-line: deprecation
	    is, 
	    // tslint:disable-next-line: deprecation
	    validate, 
	    // tslint:disable-next-line: deprecation
	    encode, props) {
	        var _this = _super.call(this, name, is, validate, encode) || this;
	        _this.props = props;
	        /**
	         * @since 1.0.0
	         */
	        _this._tag = 'StrictType';
	        return _this;
	    }
	    return StrictType;
	}(Type));
	exports.StrictType = StrictType;
	/**
	 * Drops the codec "kind".
	 *
	 * @category combinators
	 * @since 1.1.0
	 * @deprecated
	 */
	function clean(codec) {
	    return codec;
	}
	exports.clean = clean;
	function alias(codec) {
	    return function () { return codec; };
	}
	exports.alias = alias; 
} (lib));

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof$1(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */

function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */

function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */

function isValid(dirtyDate) {
  requiredArgs(1, arguments);

  if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }

  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */

function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

var MILLISECONDS_IN_DAY = 86400000;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

var MILLISECONDS_IN_WEEK$1 = 604800000;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}

function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

  requiredArgs(1, arguments);
  var defaultOptions = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

  requiredArgs(1, arguments);
  var defaultOptions = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}

var MILLISECONDS_IN_WEEK = 604800000;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();

  while (output.length < targetLength) {
    output = '0' + output;
  }

  return sign + output;
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

var formatters$2 = {
  // Year
  y: function y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();

      case 'aaa':
        return dayPeriodEnumValue;

      case 'aaaaa':
        return dayPeriodEnumValue[0];

      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var formatters$3 = formatters$2;

var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */
var formatters = {
  // Era
  G: function G(date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;

    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B

      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ

      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function y(date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }

    return formatters$3.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize, options) {
    var signedWeekYear = getUTCWeekYear(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    } // Ordinal number


    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    } // Padding


    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date); // Padding

    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'QQ':
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...

      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'qq':
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...

      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function M(date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      case 'M':
      case 'MM':
        return formatters$3.M(date, token);
      // 1st, 2nd, ..., 12th

      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D

      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December

      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12

      case 'LL':
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th

      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D

      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December

      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize, options) {
    var week = getUTCWeek(date, options);

    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }

    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize) {
    var isoWeek = getUTCISOWeek(date);

    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }

    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d(date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }

    return formatters$3.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize) {
    var dayOfYear = getUTCDayOfYear(date);

    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }

    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize) {
    var dayOfWeek = date.getUTCDay();

    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'ee':
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th

      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'cc':
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th

      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T

      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu

      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday

      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02

      case 'ii':
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd

      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue

      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function a(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();

      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }

    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();

      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function h(date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return formatters$3.h(date, token);
  },
  // Hour [0-23]
  H: function H(date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }

    return formatters$3.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize) {
    var hours = date.getUTCHours() % 12;

    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;

    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m(date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }

    return formatters$3.m(date, token);
  },
  // Second
  s: function s(date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }

    return formatters$3.s(date, token);
  },
  // Fraction of second
  S: function S(date, token) {
    return formatters$3.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return 'Z';
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`

      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`

      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`

      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`

      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};

function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;

  if (minutes === 0) {
    return sign + String(hours);
  }

  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }

  return formatTimezone(offset, dirtyDelimiter);
}

function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

var formatters$1 = formatters;

var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });

    case 'PP':
      return formatLong.date({
        width: 'medium'
      });

    case 'PPP':
      return formatLong.date({
        width: 'long'
      });

    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
};

var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });

    case 'pp':
      return formatLong.time({
        width: 'medium'
      });

    case 'ppp':
      return formatLong.time({
        width: 'long'
      });

    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
};

var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  var dateTimeFormat;

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;

    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;

    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;

    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }

  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
};

var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters$1 = longFormatters;

var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
};

var formatDistance$1 = formatDistance;

function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
var formatLong$1 = formatLong;

var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};

var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

var formatRelative$1 = formatRelative;

function buildLocalizeFn(args) {
  return function (dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

    return valuesArray[index];
  };
}

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
};

var localize = {
  ordinalNumber: ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
var localize$1 = localize;

function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }

  return undefined;
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }

  return undefined;
}

function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
var match$1 = match;

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};
var defaultLocale = locale;

// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps

var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;

  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions = getDefaultOptions();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var originalDate = toDate(dirtyDate);

  if (!isValid(originalDate)) {
    throw new RangeError('Invalid time value');
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];

    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = longFormatters$1[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }

    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }

    var firstCharacter = substring[0];

    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }

    var formatter = formatters$1[firstCharacter];

    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }

      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }

      return formatter(utcDate, substring, locale.localize, formatterOptions);
    }

    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }

    return substring;
  }).join('');
  return result;
}

function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}

/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {'extended'|'basic'} [options.format='extended'] - if 'basic', hide delimiters between date and time values.
 * @param {'complete'|'date'|'time'} [options.representation='complete'] - format date, time with local time zone, or both.
 * @returns {String} the formatted date string (in local time zone)
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.format` must be 'extended' or 'basic'
 * @throws {RangeError} `options.representation` must be 'date', 'time' or 'complete'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */

function formatISO(date, options) {
  var _options$format, _options$representati;

  requiredArgs(1, arguments);
  var originalDate = toDate(date);

  if (isNaN(originalDate.getTime())) {
    throw new RangeError('Invalid time value');
  }

  var format = String((_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : 'extended');
  var representation = String((_options$representati = options === null || options === void 0 ? void 0 : options.representation) !== null && _options$representati !== void 0 ? _options$representati : 'complete');

  if (format !== 'extended' && format !== 'basic') {
    throw new RangeError("format must be 'extended' or 'basic'");
  }

  if (representation !== 'date' && representation !== 'time' && representation !== 'complete') {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }

  var result = '';
  var tzOffset = '';
  var dateDelimiter = format === 'extended' ? '-' : '';
  var timeDelimiter = format === 'extended' ? ':' : ''; // Representation is either 'date' or 'complete'

  if (representation !== 'time') {
    var day = addLeadingZeros(originalDate.getDate(), 2);
    var month = addLeadingZeros(originalDate.getMonth() + 1, 2);
    var year = addLeadingZeros(originalDate.getFullYear(), 4); // yyyyMMdd or yyyy-MM-dd.

    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  } // Representation is either 'time' or 'complete'


  if (representation !== 'date') {
    // Add the timezone.
    var offset = originalDate.getTimezoneOffset();

    if (offset !== 0) {
      var absoluteOffset = Math.abs(offset);
      var hourOffset = addLeadingZeros(Math.floor(absoluteOffset / 60), 2);
      var minuteOffset = addLeadingZeros(absoluteOffset % 60, 2); // If less than 0, the sign is +, because it is ahead of time.

      var sign = offset < 0 ? '+' : '-';
      tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
    } else {
      tzOffset = 'Z';
    }

    var hour = addLeadingZeros(originalDate.getHours(), 2);
    var minute = addLeadingZeros(originalDate.getMinutes(), 2);
    var second = addLeadingZeros(originalDate.getSeconds(), 2); // If there's also date, separate it with time with 'T'

    var separator = result === '' ? '' : 'T'; // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.

    var time = [hour, minute, second].join(timeDelimiter); // HHmmss or HH:mm:ss.

    result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
  }

  return result;
}

const ISO8601 = lib.string;
const POSIXTime = lib.number;
const datetoIso8601 = (date) => _function.pipe(date, (date) => format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
const datetoIso8601Bis = (date) => _function.pipe(date, formatISO);
// a minute in milliseconds
const MINUTES = 1000 * 60;

var time = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ISO8601: ISO8601,
    MINUTES: MINUTES,
    POSIXTime: POSIXTime,
    datetoIso8601: datetoIso8601,
    datetoIso8601Bis: datetoIso8601Bis
});

export { ISO8601 as I, MINUTES as M, POSIXTime as P, datetoIso8601Bis as a, datetoIso8601 as d, time as t };
