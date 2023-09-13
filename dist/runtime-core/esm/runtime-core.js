var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var lib = {};

var Either = {};

var Applicative = {};

var Apply = {};

var _function = {};

(function (exports) {
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
	exports.dual = exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
	// -------------------------------------------------------------------------------------
	// instances
	// -------------------------------------------------------------------------------------
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getBooleanAlgebra = function (B) {
	    return function () { return ({
	        meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
	        join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
	        zero: function () { return B.zero; },
	        one: function () { return B.one; },
	        implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
	        not: function (x) { return function (a) { return B.not(x(a)); }; }
	    }); };
	};
	exports.getBooleanAlgebra = getBooleanAlgebra;
	/**
	 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
	 *
	 * @example
	 * import { Predicate, getSemigroup } from 'fp-ts/function'
	 * import * as B from 'fp-ts/boolean'
	 *
	 * const f: Predicate<number> = (n) => n <= 2
	 * const g: Predicate<number> = (n) => n >= 0
	 *
	 * const S1 = getSemigroup(B.SemigroupAll)<number>()
	 *
	 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
	 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
	 *
	 * const S2 = getSemigroup(B.SemigroupAny)<number>()
	 *
	 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
	 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var getSemigroup = function (S) {
	    return function () { return ({
	        concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
	    }); };
	};
	exports.getSemigroup = getSemigroup;
	/**
	 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
	 *
	 * @example
	 * import { Predicate } from 'fp-ts/Predicate'
	 * import { getMonoid } from 'fp-ts/function'
	 * import * as B from 'fp-ts/boolean'
	 *
	 * const f: Predicate<number> = (n) => n <= 2
	 * const g: Predicate<number> = (n) => n >= 0
	 *
	 * const M1 = getMonoid(B.MonoidAll)<number>()
	 *
	 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
	 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
	 *
	 * const M2 = getMonoid(B.MonoidAny)<number>()
	 *
	 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
	 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var getMonoid = function (M) {
	    var getSemigroupM = (0, exports.getSemigroup)(M);
	    return function () { return ({
	        concat: getSemigroupM().concat,
	        empty: function () { return M.empty; }
	    }); };
	};
	exports.getMonoid = getMonoid;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getSemiring = function (S) { return ({
	    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
	    zero: function () { return S.zero; },
	    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
	    one: function () { return S.one; }
	}); };
	exports.getSemiring = getSemiring;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getRing = function (R) {
	    var S = (0, exports.getSemiring)(R);
	    return {
	        add: S.add,
	        mul: S.mul,
	        one: S.one,
	        zero: S.zero,
	        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
	    };
	};
	exports.getRing = getRing;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.11.0
	 */
	var apply = function (a) {
	    return function (f) {
	        return f(a);
	    };
	};
	exports.apply = apply;
	/**
	 * @since 2.0.0
	 */
	function identity(a) {
	    return a;
	}
	exports.identity = identity;
	/**
	 * @since 2.0.0
	 */
	exports.unsafeCoerce = identity;
	/**
	 * @since 2.0.0
	 */
	function constant(a) {
	    return function () { return a; };
	}
	exports.constant = constant;
	/**
	 * A thunk that returns always `true`.
	 *
	 * @since 2.0.0
	 */
	exports.constTrue = constant(true);
	/**
	 * A thunk that returns always `false`.
	 *
	 * @since 2.0.0
	 */
	exports.constFalse = constant(false);
	/**
	 * A thunk that returns always `null`.
	 *
	 * @since 2.0.0
	 */
	exports.constNull = constant(null);
	/**
	 * A thunk that returns always `undefined`.
	 *
	 * @since 2.0.0
	 */
	exports.constUndefined = constant(undefined);
	/**
	 * A thunk that returns always `void`.
	 *
	 * @since 2.0.0
	 */
	exports.constVoid = exports.constUndefined;
	function flip(f) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length > 1) {
	            return f(args[1], args[0]);
	        }
	        return function (a) { return f(a)(args[0]); };
	    };
	}
	exports.flip = flip;
	function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
	    switch (arguments.length) {
	        case 1:
	            return ab;
	        case 2:
	            return function () {
	                return bc(ab.apply(this, arguments));
	            };
	        case 3:
	            return function () {
	                return cd(bc(ab.apply(this, arguments)));
	            };
	        case 4:
	            return function () {
	                return de(cd(bc(ab.apply(this, arguments))));
	            };
	        case 5:
	            return function () {
	                return ef(de(cd(bc(ab.apply(this, arguments)))));
	            };
	        case 6:
	            return function () {
	                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
	            };
	        case 7:
	            return function () {
	                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
	            };
	        case 8:
	            return function () {
	                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
	            };
	        case 9:
	            return function () {
	                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
	            };
	    }
	    return;
	}
	exports.flow = flow;
	/**
	 * @since 2.0.0
	 */
	function tuple() {
	    var t = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        t[_i] = arguments[_i];
	    }
	    return t;
	}
	exports.tuple = tuple;
	/**
	 * @since 2.0.0
	 */
	function increment(n) {
	    return n + 1;
	}
	exports.increment = increment;
	/**
	 * @since 2.0.0
	 */
	function decrement(n) {
	    return n - 1;
	}
	exports.decrement = decrement;
	/**
	 * @since 2.0.0
	 */
	function absurd(_) {
	    throw new Error('Called `absurd` function which should be uncallable');
	}
	exports.absurd = absurd;
	/**
	 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
	 *
	 * @example
	 * import { tupled } from 'fp-ts/function'
	 *
	 * const add = tupled((x: number, y: number): number => x + y)
	 *
	 * assert.strictEqual(add([1, 2]), 3)
	 *
	 * @since 2.4.0
	 */
	function tupled(f) {
	    return function (a) { return f.apply(void 0, a); };
	}
	exports.tupled = tupled;
	/**
	 * Inverse function of `tupled`
	 *
	 * @since 2.4.0
	 */
	function untupled(f) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return f(a);
	    };
	}
	exports.untupled = untupled;
	function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
	    switch (arguments.length) {
	        case 1:
	            return a;
	        case 2:
	            return ab(a);
	        case 3:
	            return bc(ab(a));
	        case 4:
	            return cd(bc(ab(a)));
	        case 5:
	            return de(cd(bc(ab(a))));
	        case 6:
	            return ef(de(cd(bc(ab(a)))));
	        case 7:
	            return fg(ef(de(cd(bc(ab(a))))));
	        case 8:
	            return gh(fg(ef(de(cd(bc(ab(a)))))));
	        case 9:
	            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
	        default: {
	            var ret = arguments[0];
	            for (var i = 1; i < arguments.length; i++) {
	                ret = arguments[i](ret);
	            }
	            return ret;
	        }
	    }
	}
	exports.pipe = pipe;
	/**
	 * Type hole simulation
	 *
	 * @since 2.7.0
	 */
	exports.hole = absurd;
	/**
	 * @since 2.11.0
	 */
	var SK = function (_, b) { return b; };
	exports.SK = SK;
	/**
	 * Use `Predicate` module instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function not(predicate) {
	    return function (a) { return !predicate(a); };
	}
	exports.not = not;
	/**
	 * Use `Endomorphism` module instead.
	 *
	 * @category zone of death
	 * @since 2.10.0
	 * @deprecated
	 */
	var getEndomorphismMonoid = function () { return ({
	    concat: function (first, second) { return flow(first, second); },
	    empty: identity
	}); };
	exports.getEndomorphismMonoid = getEndomorphismMonoid;
	/** @internal */
	var dual = function (arity, body) {
	    var isDataFirst = typeof arity === 'number' ? function (args) { return args.length >= arity; } : arity;
	    return function () {
	        var args = Array.from(arguments);
	        if (isDataFirst(arguments)) {
	            return body.apply(this, args);
	        }
	        return function (self) { return body.apply(void 0, __spreadArray([self], args, false)); };
	    };
	};
	exports.dual = dual; 
} (_function));

var internal = {};

(function (exports) {
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
	exports.flatMapReader = exports.flatMapTask = exports.flatMapIO = exports.flatMapEither = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.fromReadonlyNonEmptyArray = exports.has = exports.emptyRecord = exports.emptyReadonlyArray = exports.tail = exports.head = exports.isNonEmpty = exports.singleton = exports.right = exports.left = exports.isRight = exports.isLeft = exports.some = exports.none = exports.isSome = exports.isNone = void 0;
	var function_1 = _function;
	// -------------------------------------------------------------------------------------
	// Option
	// -------------------------------------------------------------------------------------
	/** @internal */
	var isNone = function (fa) { return fa._tag === 'None'; };
	exports.isNone = isNone;
	/** @internal */
	var isSome = function (fa) { return fa._tag === 'Some'; };
	exports.isSome = isSome;
	/** @internal */
	exports.none = { _tag: 'None' };
	/** @internal */
	var some = function (a) { return ({ _tag: 'Some', value: a }); };
	exports.some = some;
	// -------------------------------------------------------------------------------------
	// Either
	// -------------------------------------------------------------------------------------
	/** @internal */
	var isLeft = function (ma) { return ma._tag === 'Left'; };
	exports.isLeft = isLeft;
	/** @internal */
	var isRight = function (ma) { return ma._tag === 'Right'; };
	exports.isRight = isRight;
	/** @internal */
	var left = function (e) { return ({ _tag: 'Left', left: e }); };
	exports.left = left;
	/** @internal */
	var right = function (a) { return ({ _tag: 'Right', right: a }); };
	exports.right = right;
	// -------------------------------------------------------------------------------------
	// ReadonlyNonEmptyArray
	// -------------------------------------------------------------------------------------
	/** @internal */
	var singleton = function (a) { return [a]; };
	exports.singleton = singleton;
	/** @internal */
	var isNonEmpty = function (as) { return as.length > 0; };
	exports.isNonEmpty = isNonEmpty;
	/** @internal */
	var head = function (as) { return as[0]; };
	exports.head = head;
	/** @internal */
	var tail = function (as) { return as.slice(1); };
	exports.tail = tail;
	// -------------------------------------------------------------------------------------
	// empty
	// -------------------------------------------------------------------------------------
	/** @internal */
	exports.emptyReadonlyArray = [];
	/** @internal */
	exports.emptyRecord = {};
	// -------------------------------------------------------------------------------------
	// Record
	// -------------------------------------------------------------------------------------
	/** @internal */
	exports.has = Object.prototype.hasOwnProperty;
	// -------------------------------------------------------------------------------------
	// NonEmptyArray
	// -------------------------------------------------------------------------------------
	/** @internal */
	var fromReadonlyNonEmptyArray = function (as) { return __spreadArray([as[0]], as.slice(1), true); };
	exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
	/** @internal */
	var liftNullable = function (F) {
	    return function (f, onNullable) {
	        return function () {
	            var a = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                a[_i] = arguments[_i];
	            }
	            var o = f.apply(void 0, a);
	            return F.fromEither(o == null ? (0, exports.left)(onNullable.apply(void 0, a)) : (0, exports.right)(o));
	        };
	    };
	};
	exports.liftNullable = liftNullable;
	/** @internal */
	var liftOption = function (F) {
	    return function (f, onNone) {
	        return function () {
	            var a = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                a[_i] = arguments[_i];
	            }
	            var o = f.apply(void 0, a);
	            return F.fromEither((0, exports.isNone)(o) ? (0, exports.left)(onNone.apply(void 0, a)) : (0, exports.right)(o.value));
	        };
	    };
	};
	exports.liftOption = liftOption;
	/** @internal */
	var flatMapNullable = function (F, M) {
	     return (0, function_1.dual)(3, function (self, f, onNullable) {
	        return M.flatMap(self, (0, exports.liftNullable)(F)(f, onNullable));
	    });
	};
	exports.flatMapNullable = flatMapNullable;
	/** @internal */
	var flatMapOption = function (F, M) {
	     return (0, function_1.dual)(3, function (self, f, onNone) { return M.flatMap(self, (0, exports.liftOption)(F)(f, onNone)); });
	};
	exports.flatMapOption = flatMapOption;
	/** @internal */
	var flatMapEither = function (F, M) {
	     return (0, function_1.dual)(2, function (self, f) {
	        return M.flatMap(self, function (a) { return F.fromEither(f(a)); });
	    });
	};
	exports.flatMapEither = flatMapEither;
	/** @internal */
	var flatMapIO = function (F, M) {
	     return (0, function_1.dual)(2, function (self, f) {
	        return M.flatMap(self, function (a) { return F.fromIO(f(a)); });
	    });
	};
	exports.flatMapIO = flatMapIO;
	/** @internal */
	var flatMapTask = function (F, M) {
	     return (0, function_1.dual)(2, function (self, f) {
	        return M.flatMap(self, function (a) { return F.fromTask(f(a)); });
	    });
	};
	exports.flatMapTask = flatMapTask;
	/** @internal */
	var flatMapReader = function (F, M) {
	     return (0, function_1.dual)(2, function (self, f) {
	        return M.flatMap(self, function (a) { return F.fromReader(f(a)); });
	    });
	};
	exports.flatMapReader = flatMapReader; 
} (internal));

var __createBinding$2 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$2 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$2 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
    __setModuleDefault$2(result, mod);
    return result;
};
Object.defineProperty(Apply, "__esModule", { value: true });
Apply.sequenceS = Apply.sequenceT = Apply.getApplySemigroup = Apply.apS = Apply.apSecond = Apply.apFirst = Apply.ap = void 0;
/**
 * The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + String(c)
 * const fa: O.Option<string> = O.some('s')
 * const fb: O.Option<number> = O.some(1)
 * const fc: O.Option<boolean> = O.some(true)
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     // lift a function
 *     O.some(f),
 *     // apply the first argument
 *     O.ap(fa),
 *     // apply the second argument
 *     O.ap(fb),
 *     // apply the third argument
 *     O.ap(fc)
 *   ),
 *   O.some('s1true')
 * )
 *
 * @since 2.0.0
 */
var function_1$3 = _function;
var _$2 = __importStar$2(internal);
function ap$1(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
        };
    };
}
Apply.ap = ap$1;
function apFirst(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
Apply.apFirst = apFirst;
function apSecond(A) {
    return function (second) {
        return function (first) {
            return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
        };
    };
}
Apply.apSecond = apSecond;
function apS(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, function (a) { return function (b) {
                var _a;
                return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            }; }), fb);
        };
    };
}
Apply.apS = apS;
function getApplySemigroup(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
Apply.getApplySemigroup = getApplySemigroup;
function curried(f, n, acc) {
    return function (x) {
        var combined = Array(acc.length + 1);
        for (var i = 0; i < acc.length; i++) {
            combined[i] = acc[i];
        }
        combined[acc.length] = x;
        return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined);
    };
}
var tupleConstructors = {
    1: function (a) { return [a]; },
    2: function (a) { return function (b) { return [a, b]; }; },
    3: function (a) { return function (b) { return function (c) { return [a, b, c]; }; }; },
    4: function (a) { return function (b) { return function (c) { return function (d) { return [a, b, c, d]; }; }; }; },
    5: function (a) { return function (b) { return function (c) { return function (d) { return function (e) { return [a, b, c, d, e]; }; }; }; }; }
};
function getTupleConstructor(len) {
    if (!_$2.has.call(tupleConstructors, len)) {
        tupleConstructors[len] = curried(function_1$3.tuple, len - 1, []);
    }
    return tupleConstructors[len];
}
function sequenceT(F) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var f = getTupleConstructor(len);
        var fas = F.map(args[0], f);
        for (var i = 1; i < len; i++) {
            fas = F.ap(fas, args[i]);
        }
        return fas;
    };
}
Apply.sequenceT = sequenceT;
function getRecordConstructor(keys) {
    var len = keys.length;
    switch (len) {
        case 1:
            return function (a) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a);
            };
        case 2:
            return function (a) { return function (b) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a);
            }; };
        case 3:
            return function (a) { return function (b) { return function (c) {
                var _a;
                return (_a = {}, _a[keys[0]] = a, _a[keys[1]] = b, _a[keys[2]] = c, _a);
            }; }; };
        case 4:
            return function (a) { return function (b) { return function (c) { return function (d) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a);
            }; }; }; };
        case 5:
            return function (a) { return function (b) { return function (c) { return function (d) { return function (e) {
                var _a;
                return (_a = {},
                    _a[keys[0]] = a,
                    _a[keys[1]] = b,
                    _a[keys[2]] = c,
                    _a[keys[3]] = d,
                    _a[keys[4]] = e,
                    _a);
            }; }; }; }; };
        default:
            return curried(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var r = {};
                for (var i = 0; i < len; i++) {
                    r[keys[i]] = args[i];
                }
                return r;
            }, len - 1, []);
    }
}
function sequenceS(F) {
    return function (r) {
        var keys = Object.keys(r);
        var len = keys.length;
        var f = getRecordConstructor(keys);
        var fr = F.map(r[keys[0]], f);
        for (var i = 1; i < len; i++) {
            fr = F.ap(fr, r[keys[i]]);
        }
        return fr;
    };
}
Apply.sequenceS = sequenceS;

var Functor = {};

Object.defineProperty(Functor, "__esModule", { value: true });
Functor.asUnit = Functor.as = Functor.getFunctorComposition = Functor.let = Functor.bindTo = Functor.flap = Functor.map = void 0;
/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
 * constructor `f` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `F.map(fa, a => a) <-> fa`
 * 2. Composition: `F.map(fa, a => bc(ab(a))) <-> F.map(F.map(fa, ab), bc)`
 *
 * @since 2.0.0
 */
var function_1$2 = _function;
function map$3(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
Functor.map = map$3;
function flap(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
Functor.flap = flap;
function bindTo(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
Functor.bindTo = bindTo;
function let_(F) {
    return function (name, f) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
    }); }; };
}
Functor.let = let_;
/** @deprecated */
function getFunctorComposition(F, G) {
    var _map = map$3(F, G);
    return {
        map: function (fga, f) { return (0, function_1$2.pipe)(fga, _map(f)); }
    };
}
Functor.getFunctorComposition = getFunctorComposition;
/** @internal */
function as(F) {
    return function (self, b) { return F.map(self, function () { return b; }); };
}
Functor.as = as;
/** @internal */
function asUnit(F) {
    var asM = as(F);
    return function (self) { return asM(self, undefined); };
}
Functor.asUnit = asUnit;

Object.defineProperty(Applicative, "__esModule", { value: true });
Applicative.getApplicativeComposition = Applicative.getApplicativeMonoid = void 0;
/**
 * The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
 * of type `f a` from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
 * wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
 * function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
 * any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * 1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
 * 3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @since 2.0.0
 */
var Apply_1 = Apply;
var function_1$1 = _function;
var Functor_1 = Functor;
function getApplicativeMonoid(F) {
    var f = (0, Apply_1.getApplySemigroup)(F);
    return function (M) { return ({
        concat: f(M).concat,
        empty: F.of(M.empty)
    }); };
}
Applicative.getApplicativeMonoid = getApplicativeMonoid;
/** @deprecated */
function getApplicativeComposition(F, G) {
    var map = (0, Functor_1.getFunctorComposition)(F, G).map;
    var _ap = (0, Apply_1.ap)(F, G);
    return {
        map: map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fgab, fga) { return (0, function_1$1.pipe)(fgab, _ap(fga)); }
    };
}
Applicative.getApplicativeComposition = getApplicativeComposition;

var Chain = {};

Object.defineProperty(Chain, "__esModule", { value: true });
Chain.bind = Chain.tap = Chain.chainFirst = void 0;
function chainFirst(M) {
    var tapM = tap(M);
    return function (f) { return function (first) { return tapM(first, f); }; };
}
Chain.chainFirst = chainFirst;
/** @internal */
function tap(M) {
    return function (first, f) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); };
}
Chain.tap = tap;
function bind(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}
Chain.bind = bind;

var ChainRec = {};

Object.defineProperty(ChainRec, "__esModule", { value: true });
ChainRec.tailRec = void 0;
/**
 * @since 2.0.0
 */
var tailRec = function (startWith, f) {
    var ab = f(startWith);
    while (ab._tag === 'Left') {
        ab = f(ab.left);
    }
    return ab.right;
};
ChainRec.tailRec = tailRec;

var FromEither = {};

/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */
var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(FromEither, "__esModule", { value: true });
FromEither.tapEither = FromEither.filterOrElse = FromEither.chainFirstEitherK = FromEither.chainEitherK = FromEither.fromEitherK = FromEither.chainOptionK = FromEither.fromOptionK = FromEither.fromPredicate = FromEither.fromOption = void 0;
var Chain_1 = Chain;
var function_1 = _function;
var _$1 = __importStar$1(internal);
function fromOption(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_$1.isNone(ma) ? _$1.left(onNone()) : _$1.right(ma.value)); }; };
}
FromEither.fromOption = fromOption;
function fromPredicate$2(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a)));
        };
    };
}
FromEither.fromPredicate = fromPredicate$2;
function fromOptionK(F) {
    var fromOptionF = fromOption(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return (0, function_1.flow)(f, from); };
    };
}
FromEither.fromOptionK = fromOptionK;
function chainOptionK(F, M) {
    var fromOptionKF = fromOptionK(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
FromEither.chainOptionK = chainOptionK;
function fromEitherK(F) {
    return function (f) { return (0, function_1.flow)(f, F.fromEither); };
}
FromEither.fromEitherK = fromEitherK;
function chainEitherK(F, M) {
    var fromEitherKF = fromEitherK(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
FromEither.chainEitherK = chainEitherK;
function chainFirstEitherK(F, M) {
    var tapEitherM = tapEither(F, M);
    return function (f) { return function (ma) { return tapEitherM(ma, f); }; };
}
FromEither.chainFirstEitherK = chainFirstEitherK;
function filterOrElse(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a))); });
        };
    };
}
FromEither.filterOrElse = filterOrElse;
/** @internal */
function tapEither(F, M) {
    var fromEither = fromEitherK(F);
    var tapM = (0, Chain_1.tap)(M);
    return function (self, f) { return tapM(self, fromEither(f)); };
}
FromEither.tapEither = tapEither;

var Separated = {};

(function (exports) {
	/**
	 * ```ts
	 * interface Separated<E, A> {
	 *    readonly left: E
	 *    readonly right: A
	 * }
	 * ```
	 *
	 * Represents a result of separating a whole into two parts.
	 *
	 * @since 2.10.0
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.right = exports.left = exports.flap = exports.Functor = exports.Bifunctor = exports.URI = exports.bimap = exports.mapLeft = exports.map = exports.separated = void 0;
	var function_1 = _function;
	var Functor_1 = Functor;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category constructors
	 * @since 2.10.0
	 */
	var separated = function (left, right) { return ({ left: left, right: right }); };
	exports.separated = separated;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _mapLeft = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f)); };
	var _bimap = function (fa, g, f) { return (0, function_1.pipe)(fa, (0, exports.bimap)(g, f)); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.10.0
	 */
	var map = function (f) {
	    return function (fa) {
	        return (0, exports.separated)((0, exports.left)(fa), f((0, exports.right)(fa)));
	    };
	};
	exports.map = map;
	/**
	 * Map a function over the first type argument of a bifunctor.
	 *
	 * @category error handling
	 * @since 2.10.0
	 */
	var mapLeft = function (f) {
	    return function (fa) {
	        return (0, exports.separated)(f((0, exports.left)(fa)), (0, exports.right)(fa));
	    };
	};
	exports.mapLeft = mapLeft;
	/**
	 * Map a pair of functions over the two type arguments of the bifunctor.
	 *
	 * @category mapping
	 * @since 2.10.0
	 */
	var bimap = function (f, g) {
	    return function (fa) {
	        return (0, exports.separated)(f((0, exports.left)(fa)), g((0, exports.right)(fa)));
	    };
	};
	exports.bimap = bimap;
	/**
	 * @category type lambdas
	 * @since 2.10.0
	 */
	exports.URI = 'Separated';
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Bifunctor = {
	    URI: exports.URI,
	    mapLeft: _mapLeft,
	    bimap: _bimap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.10.0
	 */
	var left = function (s) { return s.left; };
	exports.left = left;
	/**
	 * @since 2.10.0
	 */
	var right = function (s) { return s.right; };
	exports.right = right; 
} (Separated));

var Witherable = {};

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(Witherable, "__esModule", { value: true });
Witherable.filterE = Witherable.witherDefault = Witherable.wiltDefault = void 0;
var _ = __importStar(internal);
function wiltDefault$1(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
Witherable.wiltDefault = wiltDefault$1;
function witherDefault$1(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}
Witherable.witherDefault = witherDefault$1;
function filterE(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? _.some(a) : _.none); }); }); }; };
    };
}
Witherable.filterE = filterE;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.match = exports.foldW = exports.matchW = exports.isRight = exports.isLeft = exports.fromOption = exports.fromPredicate = exports.FromEither = exports.MonadThrow = exports.throwError = exports.ChainRec = exports.Extend = exports.extend = exports.Alt = exports.alt = exports.altW = exports.Bifunctor = exports.mapLeft = exports.bimap = exports.Traversable = exports.sequence = exports.traverse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.Applicative = exports.Apply = exports.ap = exports.apW = exports.Pointed = exports.of = exports.asUnit = exports.as = exports.Functor = exports.map = exports.getAltValidation = exports.getApplicativeValidation = exports.getWitherable = exports.getFilterable = exports.getCompactable = exports.getSemigroup = exports.getEq = exports.getShow = exports.URI = exports.flatMap = exports.right = exports.left = void 0;
	exports.chainFirstW = exports.chainFirst = exports.chain = exports.chainW = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toError = exports.toUnion = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.orElse = exports.orElseW = exports.swap = exports.filterOrElseW = exports.filterOrElse = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.chainOptionKW = exports.chainOptionK = exports.fromOptionK = exports.duplicate = exports.flatten = exports.flattenW = exports.tap = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = exports.fold = void 0;
	exports.getValidation = exports.getValidationMonoid = exports.getValidationSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.either = exports.stringifyJSON = exports.parseJSON = void 0;
	var Applicative_1 = Applicative;
	var Apply_1 = Apply;
	var chainable = __importStar(Chain);
	var ChainRec_1 = ChainRec;
	var FromEither_1 = FromEither;
	var function_1 = _function;
	var Functor_1 = Functor;
	var _ = __importStar(internal);
	var Separated_1 = Separated;
	var Witherable_1 = Witherable;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
	 * structure.
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.left = _.left;
	/**
	 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
	 * of this structure.
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.right = _.right;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) { return ((0, exports.isLeft)(ma) ? ma : f(ma.right)); });
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	/* istanbul ignore next */
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	/* istanbul ignore next */
	var _foldMap = function (M) { return function (fa, f) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return (0, function_1.pipe)(fa, foldMapM(f));
	}; };
	/* istanbul ignore next */
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	var _bimap = function (fa, f, g) { return (0, function_1.pipe)(fa, (0, exports.bimap)(f, g)); };
	var _mapLeft = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapLeft)(f)); };
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/* istanbul ignore next */
	var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
	var _chainRec = function (a, f) {
	    return (0, ChainRec_1.tailRec)(f(a), function (e) {
	        return (0, exports.isLeft)(e) ? (0, exports.right)((0, exports.left)(e.left)) : (0, exports.isLeft)(e.right) ? (0, exports.left)(f(e.right.left)) : (0, exports.right)((0, exports.right)(e.right.right));
	    });
	};
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Either';
	/**
	 * @category instances
	 * @since 2.0.0
	 */
	var getShow = function (SE, SA) { return ({
	    show: function (ma) { return ((0, exports.isLeft)(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")")); }
	}); };
	exports.getShow = getShow;
	/**
	 * @category instances
	 * @since 2.0.0
	 */
	var getEq = function (EL, EA) { return ({
	    equals: function (x, y) {
	        return x === y || ((0, exports.isLeft)(x) ? (0, exports.isLeft)(y) && EL.equals(x.left, y.left) : (0, exports.isRight)(y) && EA.equals(x.right, y.right));
	    }
	}); };
	exports.getEq = getEq;
	/**
	 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
	 * concatenated using the provided `Semigroup`
	 *
	 * @example
	 * import { getSemigroup, left, right } from 'fp-ts/Either'
	 * import { SemigroupSum } from 'fp-ts/number'
	 *
	 * const S = getSemigroup<string, number>(SemigroupSum)
	 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
	 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
	 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
	 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getSemigroup = function (S) { return ({
	    concat: function (x, y) { return ((0, exports.isLeft)(y) ? x : (0, exports.isLeft)(x) ? y : (0, exports.right)(S.concat(x.right, y.right))); }
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
	 *
	 * @category filtering
	 * @since 2.10.0
	 */
	var getCompactable = function (M) {
	    var empty = (0, exports.left)(M.empty);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        compact: function (ma) { return ((0, exports.isLeft)(ma) ? ma : ma.right._tag === 'None' ? empty : (0, exports.right)(ma.right.value)); },
	        separate: function (ma) {
	            return (0, exports.isLeft)(ma)
	                ? (0, Separated_1.separated)(ma, ma)
	                : (0, exports.isLeft)(ma.right)
	                    ? (0, Separated_1.separated)((0, exports.right)(ma.right.left), empty)
	                    : (0, Separated_1.separated)(empty, (0, exports.right)(ma.right.right));
	        }
	    };
	};
	exports.getCompactable = getCompactable;
	/**
	 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
	 *
	 * @category filtering
	 * @since 2.10.0
	 */
	var getFilterable = function (M) {
	    var empty = (0, exports.left)(M.empty);
	    var _a = (0, exports.getCompactable)(M), compact = _a.compact, separate = _a.separate;
	    var filter = function (ma, predicate) {
	        return (0, exports.isLeft)(ma) ? ma : predicate(ma.right) ? ma : empty;
	    };
	    var partition = function (ma, p) {
	        return (0, exports.isLeft)(ma)
	            ? (0, Separated_1.separated)(ma, ma)
	            : p(ma.right)
	                ? (0, Separated_1.separated)(empty, (0, exports.right)(ma.right))
	                : (0, Separated_1.separated)((0, exports.right)(ma.right), empty);
	    };
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: compact,
	        separate: separate,
	        filter: filter,
	        filterMap: function (ma, f) {
	            if ((0, exports.isLeft)(ma)) {
	                return ma;
	            }
	            var ob = f(ma.right);
	            return ob._tag === 'None' ? empty : (0, exports.right)(ob.value);
	        },
	        partition: partition,
	        partitionMap: function (ma, f) {
	            if ((0, exports.isLeft)(ma)) {
	                return (0, Separated_1.separated)(ma, ma);
	            }
	            var e = f(ma.right);
	            return (0, exports.isLeft)(e) ? (0, Separated_1.separated)((0, exports.right)(e.left), empty) : (0, Separated_1.separated)(empty, (0, exports.right)(e.right));
	        }
	    };
	};
	exports.getFilterable = getFilterable;
	/**
	 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var getWitherable = function (M) {
	    var F_ = (0, exports.getFilterable)(M);
	    var C = (0, exports.getCompactable)(M);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: F_.compact,
	        separate: F_.separate,
	        filter: F_.filter,
	        filterMap: F_.filterMap,
	        partition: F_.partition,
	        partitionMap: F_.partitionMap,
	        traverse: _traverse,
	        sequence: exports.sequence,
	        reduce: _reduce,
	        foldMap: _foldMap,
	        reduceRight: _reduceRight,
	        wither: (0, Witherable_1.witherDefault)(exports.Traversable, C),
	        wilt: (0, Witherable_1.wiltDefault)(exports.Traversable, C)
	    };
	};
	exports.getWitherable = getWitherable;
	/**
	 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as A from 'fp-ts/Apply'
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 *
	 * const parseString = (u: unknown): E.Either<string, string> =>
	 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
	 *
	 * const parseNumber = (u: unknown): E.Either<string, number> =>
	 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
	 *
	 * interface Person {
	 *   readonly name: string
	 *   readonly age: number
	 * }
	 *
	 * const parsePerson = (
	 *   input: Record<string, unknown>
	 * ): E.Either<string, Person> =>
	 *   pipe(
	 *     E.Do,
	 *     E.apS('name', parseString(input.name)),
	 *     E.apS('age', parseNumber(input.age))
	 *   )
	 *
	 * assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error
	 *
	 * const Applicative = E.getApplicativeValidation(
	 *   pipe(string.Semigroup, S.intercalate(', '))
	 * )
	 *
	 * const apS = A.apS(Applicative)
	 *
	 * const parsePersonAll = (
	 *   input: Record<string, unknown>
	 * ): E.Either<string, Person> =>
	 *   pipe(
	 *     E.Do,
	 *     apS('name', parseString(input.name)),
	 *     apS('age', parseNumber(input.age))
	 *   )
	 *
	 * assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	var getApplicativeValidation = function (SE) { return ({
	    URI: exports.URI,
	    _E: undefined,
	    map: _map,
	    ap: function (fab, fa) {
	        return (0, exports.isLeft)(fab)
	            ? (0, exports.isLeft)(fa)
	                ? (0, exports.left)(SE.concat(fab.left, fa.left))
	                : fab
	            : (0, exports.isLeft)(fa)
	                ? fa
	                : (0, exports.right)(fab.right(fa.right));
	    },
	    of: exports.of
	}); };
	exports.getApplicativeValidation = getApplicativeValidation;
	/**
	 * The default [`Alt`](#alt) instance returns the last error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 *
	 * const parseString = (u: unknown): E.Either<string, string> =>
	 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
	 *
	 * const parseNumber = (u: unknown): E.Either<string, number> =>
	 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
	 *
	 * const parse = (u: unknown): E.Either<string, string | number> =>
	 *   pipe(
	 *     parseString(u),
	 *     E.alt<string, string | number>(() => parseNumber(u))
	 *   )
	 *
	 * assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error
	 *
	 * const Alt = E.getAltValidation(pipe(string.Semigroup, S.intercalate(', ')))
	 *
	 * const parseAll = (u: unknown): E.Either<string, string | number> =>
	 *   Alt.alt<string | number>(parseString(u), () => parseNumber(u))
	 *
	 * assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	var getAltValidation = function (SE) { return ({
	    URI: exports.URI,
	    _E: undefined,
	    map: _map,
	    alt: function (me, that) {
	        if ((0, exports.isRight)(me)) {
	            return me;
	        }
	        var ea = that();
	        return (0, exports.isLeft)(ea) ? (0, exports.left)(SE.concat(me.left, ea.left)) : ea;
	    }
	}); };
	exports.getAltValidation = getAltValidation;
	/**
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? fa : (0, exports.right)(f(fa.right));
	}; };
	exports.map = map;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the `Right` value of this `Either` to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the `Right` value of this `Either` to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category constructors
	 * @since 2.7.0
	 */
	exports.of = exports.right;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * Less strict version of [`ap`](#ap).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.8.0
	 */
	var apW = function (fa) { return function (fab) {
	    return (0, exports.isLeft)(fab) ? fab : (0, exports.isLeft)(fa) ? fa : (0, exports.right)(fab.right(fa.right));
	}; };
	exports.apW = apW;
	/**
	 * @since 2.0.0
	 */
	exports.ap = exports.apW;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * Left-associative fold of a structure.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 *
	 * const startWith = 'prefix'
	 * const concat = (a: string, b: string) => `${a}:${b}`
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right('a'), E.reduce(startWith, concat)),
	 *   'prefix:a'
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.left('e'), E.reduce(startWith, concat)),
	 *   'prefix'
	 * )
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	var reduce = function (b, f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? b : f(b, fa.right);
	}; };
	exports.reduce = reduce;
	/**
	 * Map each element of the structure to a monoid, and combine the results.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 * import * as S from 'fp-ts/string'
	 *
	 * const yell = (a: string) => `${a}!`
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right('a'), E.foldMap(S.Monoid)(yell)),
	 *   'a!'
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.left('e'), E.foldMap(S.Monoid)(yell)),
	 *   S.Monoid.empty
	 * )
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	var foldMap = function (M) { return function (f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? M.empty : f(fa.right);
	}; }; };
	exports.foldMap = foldMap;
	/**
	 * Right-associative fold of a structure.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 *
	 * const startWith = 'postfix'
	 * const concat = (a: string, b: string) => `${a}:${b}`
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
	 *   'a:postfix'
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
	 *   'postfix'
	 * )
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	var reduceRight = function (b, f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? b : f(fa.right, b);
	}; };
	exports.reduceRight = reduceRight;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as E from 'fp-ts/Either'
	 * import * as O from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)),
	 *   O.some(E.right('a'))
	 *  )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
	 *   O.none
	 * )
	 *
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    return function (f) {
	        return function (ta) {
	            return (0, exports.isLeft)(ta) ? F.of((0, exports.left)(ta.left)) : F.map(f(ta.right), exports.right);
	        };
	    };
	};
	exports.traverse = traverse;
	/**
	 * Evaluate each monadic action in the structure from left to right, and collect the results.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as E from 'fp-ts/Either'
	 * import * as O from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right(O.some('a')), E.sequence(O.Applicative)),
	 *   O.some(E.right('a'))
	 *  )
	 *
	 * assert.deepStrictEqual(
	 *   pipe(E.right(O.none), E.sequence(O.Applicative)),
	 *   O.none
	 * )
	 *
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? F.of((0, exports.left)(ma.left)) : F.map(ma.right, exports.right);
	    };
	};
	exports.sequence = sequence;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * Map a pair of functions over the two type arguments of the bifunctor.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var bimap = function (f, g) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? (0, exports.left)(f(fa.left)) : (0, exports.right)(g(fa.right));
	}; };
	exports.bimap = bimap;
	/**
	 * Map a function over the first type argument of a bifunctor.
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	var mapLeft = function (f) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? (0, exports.left)(f(fa.left)) : fa;
	}; };
	exports.mapLeft = mapLeft;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Bifunctor = {
	    URI: exports.URI,
	    bimap: _bimap,
	    mapLeft: _mapLeft
	};
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) { return function (fa) {
	    return (0, exports.isLeft)(fa) ? that() : fa;
	}; };
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).
	 *
	 * | x        | y        | pipe(x, alt(() => y) |
	 * | -------- | -------- | -------------------- |
	 * | left(a)  | left(b)  | left(b)              |
	 * | left(a)  | right(2) | right(2)             |
	 * | right(1) | left(b)  | right(1)             |
	 * | right(1) | right(2) | right(1)             |
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.left('a'),
	 *     E.alt(() => E.left('b'))
	 *   ),
	 *   E.left('b')
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.left('a'),
	 *     E.alt(() => E.right(2))
	 *   ),
	 *   E.right(2)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(1),
	 *     E.alt(() => E.left('b'))
	 *   ),
	 *   E.right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(1),
	 *     E.alt(() => E.right(2))
	 *   ),
	 *   E.right(1)
	 * )
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.alt = exports.altW;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @since 2.0.0
	 */
	var extend = function (f) { return function (wa) {
	    return (0, exports.isLeft)(wa) ? wa : (0, exports.right)(f(wa));
	}; };
	exports.extend = extend;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Extend = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ChainRec = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap,
	    chainRec: _chainRec
	};
	/**
	 * @since 2.6.3
	 */
	exports.throwError = exports.left;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.MonadThrow = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap,
	    throwError: exports.throwError
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: function_1.identity
	};
	/**
	 * @example
	 * import { fromPredicate, left, right } from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     1,
	 *     fromPredicate(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     -1,
	 *     fromPredicate(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   left('error')
	 * )
	 *
	 * @category lifting
	 * @since 2.0.0
	 */
	exports.fromPredicate = (0, FromEither_1.fromPredicate)(exports.FromEither);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as O from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     O.some(1),
	 *     E.fromOption(() => 'error')
	 *   ),
	 *   E.right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     O.none,
	 *     E.fromOption(() => 'error')
	 *   ),
	 *   E.left('error')
	 * )
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromOption = 
	/*#__PURE__*/ (0, FromEither_1.fromOption)(exports.FromEither);
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	exports.isLeft = _.isLeft;
	/**
	 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	exports.isRight = _.isRight;
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	var matchW = function (onLeft, onRight) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : onRight(ma.right);
	    };
	};
	exports.matchW = matchW;
	/**
	 * Alias of [`matchW`](#matchw).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.foldW = exports.matchW;
	/**
	 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
	 * if the value is a `Right` the inner value is applied to the second function.
	 *
	 * @example
	 * import { match, left, right } from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * function onLeft(errors: Array<string>): string {
	 *   return `Errors: ${errors.join(', ')}`
	 * }
	 *
	 * function onRight(value: number): string {
	 *   return `Ok: ${value}`
	 * }
	 *
	 * assert.strictEqual(
	 *   pipe(
	 *     right(1),
	 *     match(onLeft, onRight)
	 *   ),
	 *   'Ok: 1'
	 * )
	 * assert.strictEqual(
	 *   pipe(
	 *     left(['error 1', 'error 2']),
	 *     match(onLeft, onRight)
	 *   ),
	 *   'Errors: error 1, error 2'
	 * )
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.match = exports.matchW;
	/**
	 * Alias of [`match`](#match).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.fold = exports.match;
	/**
	 * Less strict version of [`getOrElse`](#getorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
	 *
	 * @category error handling
	 * @since 2.6.0
	 */
	var getOrElseW = function (onLeft) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : ma.right;
	    };
	};
	exports.getOrElseW = getOrElseW;
	/**
	 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
	 *
	 * @example
	 * import { getOrElse, left, right } from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     right(1),
	 *     getOrElse(() => 0)
	 *   ),
	 *   1
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     left('error'),
	 *     getOrElse(() => 0)
	 *   ),
	 *   0
	 * )
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.getOrElse = exports.getOrElseW;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Less strict version of [`apFirst`](#apfirst)
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apFirstW = exports.apFirst;
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * Less strict version of [`apSecond`](#apsecond)
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apSecondW = exports.apSecond;
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Less strict version of [`flatten`](#flatten).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.flattenW = 
	/*#__PURE__*/ (0, exports.flatMap)(function_1.identity);
	/**
	 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 *
	 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
	 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
	 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
	 *
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = exports.flattenW;
	/**
	 * @since 2.0.0
	 */
	exports.duplicate = (0, exports.extend)(function_1.identity);
	/**
	 * Use `liftOption`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.fromOptionK = 
	/*#__PURE__*/ (0, FromEither_1.fromOptionK)(exports.FromEither);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.chainOptionK = (0, FromEither_1.chainOptionK)(exports.FromEither, exports.Chain);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.13.2
	 */
	exports.chainOptionKW = exports.chainOptionK;
	/** @internal */
	var _FromEither = {
	    fromEither: exports.FromEither.fromEither
	};
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftNullable = _.liftNullable(_FromEither);
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftOption = _.liftOption(_FromEither);
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
	/**
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(1),
	 *     E.filterOrElse(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   E.right(1)
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.right(-1),
	 *     E.filterOrElse(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   E.left('error')
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     E.left('a'),
	 *     E.filterOrElse(
	 *       (n) => n > 0,
	 *       () => 'error'
	 *     )
	 *   ),
	 *   E.left('a')
	 * )
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	exports.filterOrElse = (0, FromEither_1.filterOrElse)(exports.FromEither, exports.Chain);
	/**
	 * Less strict version of [`filterOrElse`](#filterorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category filtering
	 * @since 2.9.0
	 */
	exports.filterOrElseW = exports.filterOrElse;
	/**
	 * Returns a `Right` if is a `Left` (and vice versa).
	 *
	 * @since 2.0.0
	 */
	var swap = function (ma) { return ((0, exports.isLeft)(ma) ? (0, exports.right)(ma.left) : (0, exports.left)(ma.right)); };
	exports.swap = swap;
	/**
	 * Less strict version of [`orElse`](#orelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.10.0
	 */
	var orElseW = function (onLeft) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? onLeft(ma.left) : ma;
	    };
	};
	exports.orElseW = orElseW;
	/**
	 * Useful for recovering from errors.
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.orElse = exports.orElseW;
	/**
	 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
	 * the provided default as a `Left`.
	 *
	 * @example
	 * import { fromNullable, left, right } from 'fp-ts/Either'
	 *
	 * const parse = fromNullable('nully')
	 *
	 * assert.deepStrictEqual(parse(1), right(1))
	 * assert.deepStrictEqual(parse(null), left('nully'))
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	var fromNullable = function (e) {
	    return function (a) {
	        return a == null ? (0, exports.left)(e) : (0, exports.right)(a);
	    };
	};
	exports.fromNullable = fromNullable;
	/**
	 * Constructs a new `Either` from a function that might throw.
	 *
	 * See also [`tryCatchK`](#trycatchk).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 *
	 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
	 *   if (as.length > 0) {
	 *     return as[0]
	 *   } else {
	 *     throw new Error('empty array')
	 *   }
	 * }
	 *
	 * const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
	 *   E.tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
	 *
	 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
	 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
	 *
	 * @category interop
	 * @since 2.0.0
	 */
	var tryCatch = function (f, onThrow) {
	    try {
	        return (0, exports.right)(f());
	    }
	    catch (e) {
	        return (0, exports.left)(onThrow(e));
	    }
	};
	exports.tryCatch = tryCatch;
	/**
	 * Converts a function that may throw to one returning a `Either`.
	 *
	 * @category interop
	 * @since 2.10.0
	 */
	var tryCatchK = function (f, onThrow) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.tryCatch)(function () { return f.apply(void 0, a); }, onThrow);
	    };
	};
	exports.tryCatchK = tryCatchK;
	/**
	 * Use `liftNullable`.
	 *
	 * @category legacy
	 * @since 2.9.0
	 */
	var fromNullableK = function (e) {
	    var from = (0, exports.fromNullable)(e);
	    return function (f) { return (0, function_1.flow)(f, from); };
	};
	exports.fromNullableK = fromNullableK;
	/**
	 * Use `flatMapNullable`.
	 *
	 * @category legacy
	 * @since 2.9.0
	 */
	var chainNullableK = function (e) {
	    var from = (0, exports.fromNullableK)(e);
	    return function (f) { return (0, exports.flatMap)(from(f)); };
	};
	exports.chainNullableK = chainNullableK;
	/**
	 * @category conversions
	 * @since 2.10.0
	 */
	exports.toUnion = (0, exports.foldW)(function_1.identity, function_1.identity);
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * Default value for the `onError` argument of `tryCatch`
	 *
	 * @since 2.0.0
	 */
	function toError(e) {
	    return e instanceof Error ? e : new Error(String(e));
	}
	exports.toError = toError;
	function elem(E) {
	    return function (a, ma) {
	        if (ma === undefined) {
	            var elemE_1 = elem(E);
	            return function (ma) { return elemE_1(a, ma); };
	        }
	        return (0, exports.isLeft)(ma) ? false : E.equals(a, ma.right);
	    };
	}
	exports.elem = elem;
	/**
	 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
	 *
	 * @example
	 * import { exists, left, right } from 'fp-ts/Either'
	 *
	 * const gt2 = exists((n: number) => n > 2)
	 *
	 * assert.strictEqual(gt2(left('a')), false)
	 * assert.strictEqual(gt2(right(1)), false)
	 * assert.strictEqual(gt2(right(3)), true)
	 *
	 * @since 2.0.0
	 */
	var exists = function (predicate) {
	    return function (ma) {
	        return (0, exports.isLeft)(ma) ? false : predicate(ma.right);
	    };
	};
	exports.exists = exists;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = chainable.bind(exports.Chain);
	/**
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindW = exports.bind;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	/**
	 * Less strict version of [`apS`](#aps).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apSW = exports.apS;
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return function (as) {
	        var e = f(0, _.head(as));
	        if ((0, exports.isLeft)(e)) {
	            return e;
	        }
	        var out = [e.right];
	        for (var i = 1; i < as.length; i++) {
	            var e_1 = f(i, as[i]);
	            if ((0, exports.isLeft)(e_1)) {
	                return e_1;
	            }
	            out.push(e_1.right);
	        }
	        return (0, exports.right)(out);
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndex = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); }); };
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.6.0
	 */
	exports.chainW = exports.flatMap;
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chainFirst = exports.tap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.8.0
	 */
	exports.chainFirstW = exports.tap;
	/**
	 * Use [`parse`](./Json.ts.html#parse) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function parseJSON(s, onError) {
	    return (0, exports.tryCatch)(function () { return JSON.parse(s); }, onError);
	}
	exports.parseJSON = parseJSON;
	/**
	 * Use [`stringify`](./Json.ts.html#stringify) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var stringifyJSON = function (u, onError) {
	    return (0, exports.tryCatch)(function () {
	        var s = JSON.stringify(u);
	        if (typeof s !== 'string') {
	            throw new Error('Converting unsupported structure to JSON');
	        }
	        return s;
	    }, onError);
	};
	exports.stringifyJSON = stringifyJSON;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `E.Functor` instead of `E.either`
	 * (where `E` is from `import E from 'fp-ts/Either'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.either = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _ap,
	    chain: exports.flatMap,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    bimap: _bimap,
	    mapLeft: _mapLeft,
	    alt: _alt,
	    extend: _extend,
	    chainRec: _chainRec,
	    throwError: exports.throwError
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
	 * are concatenated using the provided `Semigroup`
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplySemigroup = 
	/*#__PURE__*/ (0, Apply_1.getApplySemigroup)(exports.Apply);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplyMonoid = 
	/*#__PURE__*/ (0, Applicative_1.getApplicativeMonoid)(exports.Applicative);
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getValidationSemigroup = function (SE, SA) {
	    return (0, Apply_1.getApplySemigroup)((0, exports.getApplicativeValidation)(SE))(SA);
	};
	exports.getValidationSemigroup = getValidationSemigroup;
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getValidationMonoid = function (SE, MA) {
	    return (0, Applicative_1.getApplicativeMonoid)((0, exports.getApplicativeValidation)(SE))(MA);
	};
	exports.getValidationMonoid = getValidationMonoid;
	/**
	 * Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function getValidation(SE) {
	    var ap = (0, exports.getApplicativeValidation)(SE).ap;
	    var alt = (0, exports.getAltValidation)(SE).alt;
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        of: exports.of,
	        chain: exports.flatMap,
	        bimap: _bimap,
	        mapLeft: _mapLeft,
	        reduce: _reduce,
	        foldMap: _foldMap,
	        reduceRight: _reduceRight,
	        extend: _extend,
	        traverse: _traverse,
	        sequence: exports.sequence,
	        chainRec: _chainRec,
	        throwError: exports.throwError,
	        ap: ap,
	        alt: alt
	    };
	}
	exports.getValidation = getValidation; 
} (Either));

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

var __spreadArray$2 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @since 2.0.0
 */
function identity$1(a) {
    return a;
}
/**
 * @since 2.0.0
 */
var unsafeCoerce = identity$1;
/**
 * @since 2.0.0
 */
function constant$1(a) {
    return function () { return a; };
}
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
function pipe$1(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default: {
            var ret = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                ret = arguments[i](ret);
            }
            return ret;
        }
    }
}
/** @internal */
var dual = function (arity, body) {
    var isDataFirst = typeof arity === 'number' ? function (args) { return args.length >= arity; } : arity;
    return function () {
        var args = Array.from(arguments);
        if (isDataFirst(arguments)) {
            return body.apply(this, args);
        }
        return function (self) { return body.apply(void 0, __spreadArray$2([self], args, false)); };
    };
};

var __spreadArray$1 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/** @internal */
var none$1 = { _tag: 'None' };
/** @internal */
var some$2 = function (a) { return ({ _tag: 'Some', value: a }); };
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft$1 = function (ma) { return ma._tag === 'Left'; };
/** @internal */
var left$2 = function (e) { return ({ _tag: 'Left', left: e }); };
/** @internal */
var right$2 = function (a) { return ({ _tag: 'Right', right: a }); };
/** @internal */
var isNonEmpty$2 = function (as) { return as.length > 0; };
// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------
/** @internal */
var has = Object.prototype.hasOwnProperty;
// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------
/** @internal */
var fromReadonlyNonEmptyArray = function (as) { return __spreadArray$1([as[0]], as.slice(1), true); };

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var not = function (predicate) {
    return function (a) {
        return !predicate(a);
    };
};

/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly concat: (x: A, y: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * concat(x, concat(y, z)) = concat(concat(x, y), z)
 * ```
 *
 * A common example of a semigroup is the type `string` with the operation `+`.
 *
 * ```ts
 * import { Semigroup } from 'fp-ts/Semigroup'
 *
 * const semigroupString: Semigroup<string> = {
 *   concat: (x, y) => x + y
 * }
 *
 * const x = 'x'
 * const y = 'y'
 * const z = 'z'
 *
 * semigroupString.concat(x, y) // 'xy'
 *
 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
 *
 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
 * ```
 *
 * *Adapted from https://typelevel.org/cats*
 *
 * @since 2.0.0
 */
/**
 * @category constructors
 * @since 2.10.0
 */
var constant = function (a) { return ({
    concat: function () { return a; }
}); };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * Always return the first argument.
 *
 * @example
 * import * as S from 'fp-ts/Semigroup'
 *
 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
 *
 * @category instances
 * @since 2.10.0
 */
var first = function () { return ({ concat: identity$1 }); };
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `void` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupVoid = constant(undefined);
/**
 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var semigroupAny = {
    concat: function (x, y) { return x || y; }
};

/**
 * ```ts
 * interface Separated<E, A> {
 *    readonly left: E
 *    readonly right: A
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.10.0
 */
var separated = function (left, right) { return ({ left: left, right: right }); };

function wiltDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
function witherDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
var none = none$1;
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
var some$1 = some$2;
function fromPredicate$1(predicate) {
    return function (a) { return (predicate(a) ? some$1(a) : none); };
}
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
var getLeft = function (ma) { return (ma._tag === 'Right' ? none : some$1(ma.left)); };
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
var getRight = function (ma) { return (ma._tag === 'Left' ? none : some$1(ma.right)); };
var _map$1 = function (fa, f) { return pipe$1(fa, map$2(f)); };
var _ap = function (fab, fa) { return pipe$1(fab, ap(fa)); };
var _reduce = function (fa, b, f) { return pipe$1(fa, reduce(b, f)); };
var _foldMap = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return pipe$1(fa, foldMapM(f)); };
};
var _reduceRight = function (fa, b, f) { return pipe$1(fa, reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = traverse$1(F);
    return function (ta, f) { return pipe$1(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe$1(fa, alt(that)); };
var _filter = function (fa, predicate) { return pipe$1(fa, filter$2(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return pipe$1(fa, filterMap(f)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return pipe$1(wa, extend(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return pipe$1(fa, partition(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return pipe$1(fa, partitionMap(f)); };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI$2 = 'Option';
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(b) | some(b)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const M = getMonoid(SemigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid$1 = function (S) { return ({
    concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some$1(S.concat(x.value, y.value))); },
    empty: none
}); };
/**
 * @category mapping
 * @since 2.0.0
 */
var map$2 = function (f) { return function (fa) {
    return isNone(fa) ? none : some$1(f(fa.value));
}; };
/**
 * @category constructors
 * @since 2.7.0
 */
var of$2 = some$1;
/**
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) {
    return isNone(fab) ? none : isNone(fa) ? none : some$1(fab.value(fa.value));
}; };
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ dual(2, function (ma, f) { return (isNone(ma) ? none : f(ma.value)); });
/**
 * @category folding
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(b, fa.value);
}; };
/**
 * @category folding
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isNone(fa) ? M.empty : f(fa.value);
}; }; };
/**
 * @category folding
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(fa.value, b);
}; };
/**
 * Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.
 *
 * @param self - The first `Option` to be checked.
 * @param that - The `Option` to return if `self` is `None`.
 *
 * @example
 * import * as O from "fp-ts/Option"
 *
 * assert.deepStrictEqual(O.orElse(O.none, () => O.none), O.none)
 * assert.deepStrictEqual(O.orElse(O.some(1), () => O.none), O.some(1))
 * assert.deepStrictEqual(O.orElse(O.none, () => O.some('b')), O.some('b'))
 * assert.deepStrictEqual(O.orElse(O.some(1), () => O.some('b')), O.some(1))
 *
 * @category error handling
 * @since 2.16.0
 */
var orElse = dual(2, function (self, that) { return (isNone(self) ? that() : self); });
/**
 * Alias of `orElse`.
 *
 * @category legacy
 * @since 2.0.0
 */
var alt = orElse;
/**
 * @since 2.7.0
 */
var zero = function () { return none; };
/**
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isNone(wa) ? none : some$1(f(wa));
}; };
/**
 * @category filtering
 * @since 2.0.0
 */
var compact = /*#__PURE__*/ flatMap(identity$1);
var defaultSeparated = /*#__PURE__*/ separated(none, none);
/**
 * @category filtering
 * @since 2.0.0
 */
var separate = function (ma) {
    return isNone(ma) ? defaultSeparated : separated(getLeft(ma.value), getRight(ma.value));
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI$2,
    compact: compact,
    separate: separate
};
/**
 * @category filtering
 * @since 2.0.0
 */
var filter$2 = function (predicate) {
    return function (fa) {
        return isNone(fa) ? none : predicate(fa.value) ? fa : none;
    };
};
/**
 * @category filtering
 * @since 2.0.0
 */
var filterMap = function (f) { return function (fa) {
    return isNone(fa) ? none : f(fa.value);
}; };
/**
 * @category filtering
 * @since 2.0.0
 */
var partition = function (predicate) {
    return function (fa) {
        return separated(_filter(fa, not(predicate)), _filter(fa, predicate));
    };
};
/**
 * @category filtering
 * @since 2.0.0
 */
var partitionMap = function (f) { return flow(map$2(f), separate); };
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse$1 = function (F) {
    return function (f) {
        return function (ta) {
            return isNone(ta) ? F.of(none) : F.map(f(ta.value), some$1);
        };
    };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence = function (F) {
    return function (ta) {
        return isNone(ta) ? F.of(none) : F.map(ta.value, some$1);
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI$2,
    map: _map$1,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence
};
var _wither = /*#__PURE__*/ witherDefault(Traversable, Compactable);
var _wilt = /*#__PURE__*/ wiltDefault(Traversable, Compactable);
/**
 * @since 2.7.0
 */
var throwError = function () { return none; };
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getright)
 *
 * @category conversions
 * @since 2.0.0
 */
var fromEither = getRight;
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category refinements
 * @since 2.0.0
 */
var isNone = function (fa) { return fa._tag === 'None'; };
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchW = function (onNone, onSome) {
    return function (ma) {
        return isNone(ma) ? onNone() : onSome(ma.value);
    };
};
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, match } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     match(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category pattern matching
 * @since 2.10.0
 */
var match = matchW;
/**
 * Alias of [`match`](#match).
 *
 * @category pattern matching
 * @since 2.0.0
 */
var fold = match;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.6.0
 */
var getOrElseW = function (onNone) {
    return function (ma) {
        return isNone(ma) ? onNone() : ma.value;
    };
};
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category conversions
 * @since 2.0.0
 */
var fromNullable$1 = function (a) { return (a == null ? none : some$1(a)); };
// -------------------------------------------------------------------------------------
// legacy
// -------------------------------------------------------------------------------------
/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.0.0
 */
var chain = flatMap;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `O.Functor` instead of `O.option`
 * (where `O` is from `import O from 'fp-ts/Option'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var option = {
    URI: URI$2,
    map: _map$1,
    of: of$2,
    ap: _ap,
    chain: flatMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    zero: zero,
    alt: _alt,
    extend: _extend,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt,
    throwError: throwError
};
/**
 * Use
 *
 * ```ts
 * import { first } from 'fp-ts/Semigroup'
 * import { getMonoid } from 'fp-ts/Option'
 *
 * getMonoid(first())
 * ```
 *
 * instead.
 *
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(b) | some(b)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getFirstMonoid = function () { return getMonoid$1(first()); };

(undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @internal
 */
var isNonEmpty$1 = isNonEmpty$2;
/**
 * @internal
 */
var isOutOfBound$1 = function (i, as) { return i < 0 || i >= as.length; };
/**
 * @internal
 */
var unsafeUpdateAt$2 = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = fromReadonlyNonEmptyArray(as);
        xs[i] = a;
        return xs;
    }
};

(undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @category constructors
 * @since 2.0.0
 */
var of$1 = function (a) { return [a]; };

(undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category refinements
 * @since 2.5.0
 */
var isNonEmpty = isNonEmpty$1;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
var isOutOfBound = isOutOfBound$1;
function lookup$1(i, as) {
    return as === undefined ? function (as) { return lookup$1(i, as); } : isOutOfBound(i, as) ? none$1 : some$2(as[i]);
}
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
var findIndex = function (predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$2(i);
            }
        }
        return none$1;
    };
};
function findFirst$1(predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$2(as[i]);
            }
        }
        return none$1;
    };
}
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeUpdateAt$1 = function (i, a, as) {
    return isNonEmpty(as) ? unsafeUpdateAt$2(i, a, as) : as;
};

/**
 * Given an element of the base type, `of` builds an `Array` containing just that
 * element of the base type (this is useful for building a `Monad`).
 *
 * @example
 * import { of } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(of("a"), ["a"]);
 *
 * @category constructors
 * @since 2.0.0
 */
var of = of$1;
/**
 * Get a `Semigroup` based on the concatenation of `Array`s.
 * See also [`getMonoid`](#getMonoid).
 *
 * @example
 * import { getSemigroup } from 'fp-ts/Array'
 *
 * const S = getSemigroup<number>();
 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1, 2, 2, 3]);
 *
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function () { return ({
    concat: function (first, second) { return first.concat(second); }
}); };
/**
 * Returns a `Monoid` for `Array<A>` based on the concatenation of `Array`s.
 *
 * @example
 * import { getMonoid } from 'fp-ts/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = function () { return ({
    concat: getSemigroup().concat,
    empty: []
}); };

/**
 * @category constructors
 * @since 2.0.0
 */
var make = unsafeCoerce;
/**
 * @category instances
 * @since 2.0.0
 */
function getApply(S) {
    return {
        URI: URI$1,
        _E: undefined,
        map: _map,
        ap: function (fab, fa) { return make(S.concat(fab, fa)); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
function getApplicative(M) {
    var A = getApply(M);
    return {
        URI: URI$1,
        _E: undefined,
        map: A.map,
        ap: A.ap,
        of: function () { return make(M.empty); }
    };
}
/* istanbul ignore next */
var _map = function (fa, f) { return pipe$1(fa, map$1()); };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
var map$1 = function () { return unsafeCoerce; };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI$1 = 'Const';

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use [`Monoid`](./void.ts.html#monoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
({
    concat: semigroupVoid.concat,
    empty: undefined
});
/**
 * Use [`MonoidAll`](./boolean.ts.html#monoidall) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidAll = {
    concat: semigroupAll.concat,
    empty: true
};
/**
 * Use [`MonoidAny`](./boolean.ts.html#monoidany) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var monoidAny = {
    concat: semigroupAny.concat,
    empty: false
};

/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#pipe) from `function` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
var pipe = pipe$1;

/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @example
 * import { upsertAt } from 'fp-ts/ReadonlyRecord'
 *
 * assert.deepStrictEqual(upsertAt("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
 * assert.deepStrictEqual(upsertAt("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
 *
 * @since 2.10.0
 */
var upsertAt = function (k, a) {
    return function (r) {
        if (has.call(r, k) && r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
};
function deleteAt(k) {
    return function (r) {
        if (!has.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return has.call(r, k) ? some$2(r[k]) : none$1;
}
/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var insertAt = upsertAt;

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var left$1 = left$2;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var right$1 = right$2;
/**
 * @category mapping
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right$1(f(fa.right));
}; };
// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
var isLeft = isLeft$1;

var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// -------------------------------------------------------------------------------------
// Iso
// -------------------------------------------------------------------------------------
/** @internal */
var iso$2 = function (get, reverseGet) { return ({
    get: get,
    reverseGet: reverseGet
}); };
/** @internal */
var isoAsLens = function (sa) { return lens$2(sa.get, flow(sa.reverseGet, constant$1)); };
/** @internal */
var isoAsPrism = function (sa) { return prism(flow(sa.get, some$1), sa.reverseGet); };
/** @internal */
var isoAsOptional = function (sa) {
    return optional(flow(sa.get, some$1), flow(sa.reverseGet, constant$1));
};
/** @internal */
var isoAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) {
        return F.map(f(sa.get(s)), function (a) { return sa.reverseGet(a); });
    }; }; });
};
// -------------------------------------------------------------------------------------
// Lens
// -------------------------------------------------------------------------------------
/** @internal */
var lens$2 = function (get, set) { return ({ get: get, set: set }); };
/** @internal */
var lensAsOptional = function (sa) { return optional(flow(sa.get, some$1), sa.set); };
/** @internal */
var lensAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) { return F.map(f(sa.get(s)), function (a) { return sa.set(a)(s); }); }; }; });
};
/** @internal */
var lensComposeLens = function (ab) { return function (sa) {
    return lens$2(function (s) { return ab.get(sa.get(s)); }, function (b) { return function (s) { return sa.set(ab.set(b)(sa.get(s)))(s); }; });
}; };
/** @internal */
var prismComposePrism = function (ab) { return function (sa) {
    return prism(flow(sa.getOption, chain(ab.getOption)), flow(ab.reverseGet, sa.reverseGet));
}; };
/** @internal */
var lensComposePrism = function (ab) { return function (sa) {
    return optionalComposeOptional(prismAsOptional(ab))(lensAsOptional(sa));
}; };
/** @internal */
var lensId = function () { return lens$2(identity$1, constant$1); };
/** @internal */
var lensProp = function (prop) { return function (sa) {
    return lens$2(function (s) { return sa.get(s)[prop]; }, function (ap) { return function (s) {
        var _a;
        var oa = sa.get(s);
        if (ap === oa[prop]) {
            return s;
        }
        return sa.set(Object.assign({}, oa, (_a = {}, _a[prop] = ap, _a)))(s);
    }; });
}; };
/** @internal */
var lensProps = function () {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return function (sa) {
        return lens$2(function (s) {
            var a = sa.get(s);
            var r = {};
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var k = props_1[_i];
                r[k] = a[k];
            }
            return r;
        }, function (a) { return function (s) {
            var oa = sa.get(s);
            for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
                var k = props_2[_i];
                if (a[k] !== oa[k]) {
                    return sa.set(Object.assign({}, oa, a))(s);
                }
            }
            return s;
        }; });
    };
};
/** @internal */
var lensComponent = function (prop) { return function (sa) {
    return lens$2(function (s) { return sa.get(s)[prop]; }, function (ap) { return function (s) {
        var oa = sa.get(s);
        if (ap === oa[prop]) {
            return s;
        }
        var copy = oa.slice();
        copy[prop] = ap;
        return sa.set(copy)(s);
    }; });
}; };
/** @internal */
var lensAtKey = function (key) { return function (sa) {
    return pipe(sa, lensComposeLens(atReadonlyRecord().at(key)));
}; };
// -------------------------------------------------------------------------------------
// Prism
// -------------------------------------------------------------------------------------
/** @internal */
var prism = function (getOption, reverseGet) { return ({ getOption: getOption, reverseGet: reverseGet }); };
/** @internal */
var prismAsOptional = function (sa) { return optional(sa.getOption, function (a) { return prismSet(a)(sa); }); };
/** @internal */
var prismAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) {
        return pipe(sa.getOption(s), fold(function () { return F.of(s); }, function (a) { return F.map(f(a), function (a) { return prismSet(a)(sa)(s); }); }));
    }; }; });
};
/** @internal */
var prismModifyOption = function (f) { return function (sa) { return function (s) {
    return pipe(sa.getOption(s), map$2(function (o) {
        var n = f(o);
        return n === o ? s : sa.reverseGet(n);
    }));
}; }; };
/** @internal */
var prismModify = function (f) { return function (sa) {
    var g = prismModifyOption(f)(sa);
    return function (s) {
        return pipe(g(s), getOrElse(function () { return s; }));
    };
}; };
/** @internal */
var prismSet = function (a) { return prismModify(function () { return a; }); };
/** @internal */
var prismComposeLens = function (ab) { return function (sa) {
    return optionalComposeOptional(lensAsOptional(ab))(prismAsOptional(sa));
}; };
/** @internal */
var prismFromNullable = function () { return prism(fromNullable$1, identity$1); };
/** @internal */
var prismFromPredicate = function (predicate) {
    return prism(fromPredicate$1(predicate), identity$1);
};
/** @internal */
var prismSome = function () { return prism(identity$1, some$1); };
/** @internal */
var prismRight = function () { return prism(fromEither, right$1); };
/** @internal */
var prismLeft = function () {
    return prism(function (s) { return (isLeft(s) ? some$1(s.left) : none); }, // TODO: replace with E.getLeft in v3
    left$1);
};
// -------------------------------------------------------------------------------------
// Optional
// -------------------------------------------------------------------------------------
/** @internal */
var optional = function (getOption, set) { return ({
    getOption: getOption,
    set: set
}); };
/** @internal */
var optionalAsTraversal = function (sa) {
    return traversal(function (F) { return function (f) { return function (s) {
        return pipe(sa.getOption(s), fold(function () { return F.of(s); }, function (a) { return F.map(f(a), function (a) { return sa.set(a)(s); }); }));
    }; }; });
};
/** @internal */
var optionalModifyOption = function (f) { return function (optional) { return function (s) {
    return pipe(optional.getOption(s), map$2(function (a) {
        var n = f(a);
        return n === a ? s : optional.set(n)(s);
    }));
}; }; };
/** @internal */
var optionalModify = function (f) { return function (optional) {
    var g = optionalModifyOption(f)(optional);
    return function (s) {
        return pipe(g(s), getOrElse(function () { return s; }));
    };
}; };
/** @internal */
var optionalComposeOptional = function (ab) { return function (sa) {
    return optional(flow(sa.getOption, chain(ab.getOption)), function (b) { return optionalModify(ab.set(b))(sa); });
}; };
/** @internal */
var optionalIndex = function (i) { return function (sa) {
    return pipe(sa, optionalComposeOptional(indexReadonlyArray().index(i)));
}; };
/** @internal */
var optionalIndexNonEmpty = function (i) { return function (sa) { return pipe(sa, optionalComposeOptional(indexReadonlyNonEmptyArray().index(i))); }; };
/** @internal */
var optionalKey = function (key) { return function (sa) {
    return pipe(sa, optionalComposeOptional(indexReadonlyRecord().index(key)));
}; };
/** @internal */
var optionalFindFirst = function (predicate) {
    return optional(findFirst$1(predicate), function (a) { return function (s) {
        return pipe(findIndex(predicate)(s), fold(function () { return s; }, function (i) { return unsafeUpdateAt$1(i, a, s); }));
    }; });
};
var unsafeUpdateAt = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = __spreadArray([as[0]], as.slice(1), true);
        xs[i] = a;
        return xs;
    }
};
/** @internal */
var optionalFindFirstNonEmpty = function (predicate) {
    return optional(findFirst$1(predicate), function (a) { return function (as) {
        return pipe(findIndex(predicate)(as), fold(function () { return as; }, function (i) { return unsafeUpdateAt(i, a, as); }));
    }; });
};
// -------------------------------------------------------------------------------------
// Traversal
// -------------------------------------------------------------------------------------
/** @internal */
var traversal = function (modifyF) { return ({
    modifyF: modifyF
}); };
/** @internal */
function traversalComposeTraversal(ab) {
    return function (sa) { return traversal(function (F) { return function (f) { return sa.modifyF(F)(ab.modifyF(F)(f)); }; }); };
}
/** @internal */
var ApplicativeIdentity = {
    URI: 'Identity',
    map: function (fa, f) { return f(fa); },
    of: identity$1,
    ap: 
    /* istanbul ignore next */
    function (fab, fa) { return fab(fa); }
};
var isIdentity = function (F) { return F.URI === 'Identity'; };
function fromTraversable(T) {
    return function () {
        return traversal(function (F) {
            // if `F` is `Identity` then `traverseF = map`
            var traverseF = isIdentity(F)
                ? T.map
                : T.traverse(F);
            return function (f) { return function (s) { return traverseF(s, f); }; };
        });
    };
}
/** @internal */
function traversalTraverse(T) {
    return traversalComposeTraversal(fromTraversable(T)());
}
// -------------------------------------------------------------------------------------
// Ix
// -------------------------------------------------------------------------------------
/** @internal */
var index$1 = function (index) { return ({ index: index }); };
/** @internal */
var indexReadonlyArray = function () {
    return index$1(function (i) {
        return optional(function (as) { return lookup$1(i, as); }, function (a) { return function (as) {
            return pipe(lookup$1(i, as), fold(function () { return as; }, function () { return unsafeUpdateAt$1(i, a, as); }));
        }; });
    });
};
/** @internal */
var indexReadonlyNonEmptyArray = function () {
    return index$1(function (i) {
        return optional(function (as) { return lookup$1(i, as); }, function (a) { return function (as) {
            return pipe(lookup$1(i, as), fold(function () { return as; }, function () { return unsafeUpdateAt(i, a, as); }));
        }; });
    });
};
/** @internal */
var indexReadonlyRecord = function () {
    return index$1(function (k) {
        return optional(function (r) { return lookup(k, r); }, function (a) { return function (r) {
            if (r[k] === a || isNone(lookup(k, r))) {
                return r;
            }
            return insertAt(k, a)(r);
        }; });
    });
};
// -------------------------------------------------------------------------------------
// At
// -------------------------------------------------------------------------------------
/** @internal */
var at = function (at) { return ({ at: at }); };
/** @internal */
function atReadonlyRecord() {
    return at(function (key) {
        return lens$2(function (r) { return lookup(key, r); }, fold(function () { return deleteAt(key); }, function (a) { return insertAt(key, a); }));
    });
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.3.8
 */
var iso$1 = iso$2;
// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View an `Iso` as a `Lens`.
 *
 * @category converters
 * @since 2.3.0
 */
var asLens = isoAsLens;
/**
 * View an `Iso` as a `Prism`.
 *
 * @category converters
 * @since 2.3.0
 */
var asPrism = isoAsPrism;
/**
 * View an `Iso` as a `Optional`.
 *
 * @category converters
 * @since 2.3.0
 */
var asOptional$2 = isoAsOptional;
/**
 * View an `Iso` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal$3 = isoAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose an `Iso` with an `Iso`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$4 = function (ab) { return function (sa) {
    return iso$1(flow(sa.get, ab.get), flow(ab.reverseGet, sa.reverseGet));
}; };
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.3.0
 */
var reverse$1 = function (sa) { return iso$1(sa.reverseGet, sa.get); };
/**
 * @category combinators
 * @since 2.3.0
 */
var modify$3 = function (f) { return function (sa) { return function (s) {
    return sa.reverseGet(f(sa.get(s)));
}; }; };

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.3.8
 */
var lens = lens$2;
/**
 * @category constructors
 * @since 2.3.0
 */
var id = lensId;
// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View a `Lens` as a `Optional`.
 *
 * @category converters
 * @since 2.3.0
 */
var asOptional$1 = lensAsOptional;
/**
 * View a `Lens` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal$2 = lensAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Lens` with a `Lens`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$3 = lensComposeLens;
/**
 * Alias of `compose`.
 *
 * @category compositions
 * @since 2.3.8
 */
var composeLens$1 = compose$3;
/**
 * Compose a `Lens` with a `Iso`.
 *
 * @category compositions
 * @since 2.3.8
 */
var composeIso = 
/*#__PURE__*/
flow(isoAsLens, compose$3);
/**
 * Compose a `Lens` with a `Prism`.
 *
 * @category compositions
 * @since 2.3.0
 */
var composePrism = lensComposePrism;
/**
 * Compose a `Lens` with an `Optional`.
 *
 * @category compositions
 * @since 2.3.0
 */
var composeOptional = function (ab) {
    return flow(asOptional$1, optionalComposeOptional(ab));
};
/**
 * Compose a `Lens` with an `Traversal`.
 *
 * @category compositions
 * @since 2.3.8
 */
var composeTraversal = function (ab) {
    return flow(asTraversal$2, traversalComposeTraversal(ab));
};
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.3.0
 */
var modify$2 = function (f) { return function (sa) { return function (s) {
    var o = sa.get(s);
    var n = f(o);
    return o === n ? s : sa.set(n)(s);
}; }; };
function modifyF(F) {
    return function (f) { return function (sa) { return function (s) { return pipe(sa.get(s), f, function (fa) { return F.map(fa, function (a) { return sa.set(a)(s); }); }); }; }; };
}
/**
 * Return a `Optional` from a `Lens` focused on a nullable value.
 *
 * @category combinators
 * @since 2.3.0
 */
var fromNullable = function (sa) {
    return composePrism(prismFromNullable())(sa);
};
function filter$1(predicate) {
    return composePrism(prismFromPredicate(predicate));
}
/**
 * Return a `Lens` from a `Lens` and a prop.
 *
 * @category combinators
 * @since 2.3.0
 */
var prop = lensProp;
/**
 * Return a `Lens` from a `Lens` and a list of props.
 *
 * @category combinators
 * @since 2.3.0
 */
var props = lensProps;
/**
 * Return a `Lens` from a `Lens` focused on a component of a tuple.
 *
 * @category combinators
 * @since 2.3.0
 */
var component = lensComponent;
/**
 * Return a `Optional` from a `Lens` focused on an index of a `ReadonlyArray`.
 *
 * @category combinators
 * @since 2.3.0
 */
var index = function (i) {
    return flow(asOptional$1, optionalIndex(i));
};
/**
 * Return a `Optional` from a `Lens` focused on an index of a `ReadonlyNonEmptyArray`.
 *
 * @category combinators
 * @since 2.3.8
 */
var indexNonEmpty = function (i) {
    return flow(asOptional$1, optionalIndexNonEmpty(i));
};
/**
 * Return a `Optional` from a `Lens` focused on a key of a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.3.0
 */
var key = function (key) {
    return flow(asOptional$1, optionalKey(key));
};
/**
 * Return a `Lens` from a `Lens` focused on a required key of a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 2.3.0
 */
var atKey = lensAtKey;
/**
 * Return a `Optional` from a `Lens` focused on the `Some` of a `Option` type.
 *
 * @category combinators
 * @since 2.3.0
 */
var some = 
/*#__PURE__*/
composePrism(/*#__PURE__*/ prismSome());
/**
 * Return a `Optional` from a `Lens` focused on the `Right` of a `Either` type.
 *
 * @category combinators
 * @since 2.3.0
 */
var right = 
/*#__PURE__*/
composePrism(/*#__PURE__*/ prismRight());
/**
 * Return a `Optional` from a `Lens` focused on the `Left` of a `Either` type.
 *
 * @category combinators
 * @since 2.3.0
 */
var left = 
/*#__PURE__*/
composePrism(/*#__PURE__*/ prismLeft());
/**
 * Return a `Traversal` from a `Lens` focused on a `Traversable`.
 *
 * @category combinators
 * @since 2.3.0
 */
function traverse(T) {
    return flow(asTraversal$2, traversalTraverse(T));
}
function findFirst(predicate) {
    return composeOptional(optionalFindFirst(predicate));
}
function findFirstNonEmpty(predicate) {
    return composeOptional(optionalFindFirstNonEmpty(predicate));
}
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Invariant
 * @since 2.3.0
 */
var imap = function (f, g) { return function (ea) {
    return imap_(ea, f, g);
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
var imap_ = function (ea, ab, ba) { return lens(flow(ea.get, ab), flow(ba, ea.set)); };
/**
 * @category instances
 * @since 2.3.0
 */
var URI = 'monocle-ts/Lens';
/**
 * @category instances
 * @since 2.3.0
 */
var Invariant = {
    URI: URI,
    imap: imap_
};
/**
 * @category instances
 * @since 2.3.8
 */
var Semigroupoid = {
    URI: URI,
    compose: function (ab, ea) { return compose$3(ab)(ea); }
};
/**
 * @category instances
 * @since 2.3.0
 */
var Category = {
    URI: URI,
    compose: Semigroupoid.compose,
    id: id
};

var lens$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Category: Category,
	Invariant: Invariant,
	Semigroupoid: Semigroupoid,
	URI: URI,
	asOptional: asOptional$1,
	asTraversal: asTraversal$2,
	atKey: atKey,
	component: component,
	compose: compose$3,
	composeIso: composeIso,
	composeLens: composeLens$1,
	composeOptional: composeOptional,
	composePrism: composePrism,
	composeTraversal: composeTraversal,
	filter: filter$1,
	findFirst: findFirst,
	findFirstNonEmpty: findFirstNonEmpty,
	fromNullable: fromNullable,
	id: id,
	imap: imap,
	index: index,
	indexNonEmpty: indexNonEmpty,
	key: key,
	left: left,
	lens: lens,
	modify: modify$2,
	modifyF: modifyF,
	prop: prop,
	props: props,
	right: right,
	some: some,
	traverse: traverse
});

// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View a `Optional` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal$1 = optionalAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Optional` with a `Optional`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$2 = optionalComposeOptional;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.3.0
 */
var modifyOption = optionalModifyOption;
/**
 * @category combinators
 * @since 2.3.0
 */
var modify$1 = optionalModify;

/**
 * @category constructors
 * @since 2.3.0
 */
var fromPredicate = prismFromPredicate;
// -------------------------------------------------------------------------------------
// converters
// -------------------------------------------------------------------------------------
/**
 * View a `Prism` as a `Optional`.
 *
 * @category converters
 * @since 2.3.0
 */
var asOptional = prismAsOptional;
/**
 * View a `Prism` as a `Traversal`.
 *
 * @category converters
 * @since 2.3.0
 */
var asTraversal = prismAsTraversal;
// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Prism` with a `Prism`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose$1 = prismComposePrism;
/**
 * Compose a `Prism` with a `Lens`.
 *
 * @category compositions
 * @since 2.3.0
 */
var composeLens = prismComposeLens;

// -------------------------------------------------------------------------------------
// compositions
// -------------------------------------------------------------------------------------
/**
 * Compose a `Traversal` with a `Traversal`.
 *
 * @category compositions
 * @since 2.3.0
 */
var compose = traversalComposeTraversal;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.3.0
 */
var modify = function (f) { return function (sa) {
    return sa.modifyF(ApplicativeIdentity)(f);
}; };
/**
 * @category combinators
 * @since 2.3.0
 */
var set = function (a) { return modify(function () { return a; }); };
function filter(predicate) {
    return compose(prismAsTraversal(prismFromPredicate(predicate)));
}

/**
 * @since 1.0.0
 */
//
// compat
//
var fromIso = function (iso) { return new Iso(iso.get, iso.reverseGet); };
var fromLens = function (lens) { return new Lens(lens.get, lens.set); };
var fromPrism = function (prism) { return new Prism(prism.getOption, prism.reverseGet); };
var fromOptional = function (optional) {
    return new Optional(optional.getOption, optional.set);
};
var fromTraversal = function (traversal) { return new Traversal(traversal.modifyF); };
//
// old APIs
//
var update = function (o, k, a) {
    var _a;
    return a === o[k] ? o : Object.assign({}, o, (_a = {}, _a[k] = a, _a));
};
/**
 * Laws:
 * 1. `reverseGet(get(s)) = s`
 * 2. `get(reversetGet(a)) = a`
 *
 * @category constructor
 * @since 1.0.0
 */
var Iso = /** @class */ (function () {
    function Iso(get, reverseGet) {
        this.get = get;
        this.reverseGet = reverseGet;
        /**
         * @since 1.0.0
         */
        this._tag = 'Iso';
        /**
         * @since 1.0.0
         */
        this.unwrap = this.get;
        /**
         * @since 1.0.0
         */
        this.to = this.get;
        /**
         * @since 1.0.0
         */
        this.wrap = this.reverseGet;
        /**
         * @since 1.0.0
         */
        this.from = this.reverseGet;
    }
    /**
     * reverse the `Iso`: the source becomes the target and the target becomes the source
     * @since 1.0.0
     */
    Iso.prototype.reverse = function () {
        return fromIso(reverse$1(this));
    };
    /**
     * @since 1.0.0
     */
    Iso.prototype.modify = function (f) {
        return modify$3(f)(this);
    };
    /**
     * view an `Iso` as a `Lens`
     *
     * @since 1.0.0
     */
    Iso.prototype.asLens = function () {
        return fromLens(asLens(this));
    };
    /**
     * view an `Iso` as a `Prism`
     *
     * @since 1.0.0
     */
    Iso.prototype.asPrism = function () {
        return fromPrism(asPrism(this));
    };
    /**
     * view an `Iso` as a `Optional`
     *
     * @since 1.0.0
     */
    Iso.prototype.asOptional = function () {
        return fromOptional(asOptional$2(this));
    };
    /**
     * view an `Iso` as a `Traversal`
     *
     * @since 1.0.0
     */
    Iso.prototype.asTraversal = function () {
        return fromTraversal(asTraversal$3(this));
    };
    /**
     * view an `Iso` as a `Fold`
     *
     * @since 1.0.0
     */
    Iso.prototype.asFold = function () {
        var _this = this;
        return new Fold(function () { return function (f) { return function (s) { return f(_this.get(s)); }; }; });
    };
    /**
     * view an `Iso` as a `Getter`
     *
     * @since 1.0.0
     */
    Iso.prototype.asGetter = function () {
        var _this = this;
        return new Getter(function (s) { return _this.get(s); });
    };
    /**
     * view an `Iso` as a `Setter`
     *
     * @since 1.0.0
     */
    Iso.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * compose an `Iso` with an `Iso`
     *
     * @since 1.0.0
     */
    Iso.prototype.compose = function (ab) {
        return fromIso(compose$4(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeIso = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose an `Iso` with a `Lens `
     *
     * @since 1.0.0
     */
    Iso.prototype.composeLens = function (ab) {
        return fromLens(pipe(this, asLens, compose$3(ab)));
    };
    /**
     * compose an `Iso` with a `Prism`
     *
     * @since 1.0.0
     */
    Iso.prototype.composePrism = function (ab) {
        return fromPrism(pipe(this, asPrism, compose$1(ab)));
    };
    /**
     * compose an `Iso` with an `Optional`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeOptional = function (ab) {
        return fromOptional(pipe(this, asOptional$2, compose$2(ab)));
    };
    /**
     * compose an `Iso` with a `Traversal`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal$3, compose(ab)));
    };
    /**
     * compose an `Iso` with a `Fold`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose an `Iso` with a `Getter`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeGetter = function (ab) {
        return this.asGetter().compose(ab);
    };
    /**
     * compose an `Iso` with a `Setter`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    return Iso;
}());
/**
 * Laws:
 * 1. `get(set(a)(s)) = a`
 * 2. `set(get(s))(s) = s`
 * 3. `set(a)(set(a)(s)) = set(a)(s)`
 *
 * @category constructor
 * @since 1.0.0
 */
var Lens = /** @class */ (function () {
    function Lens(get, set) {
        this.get = get;
        this.set = set;
        /**
         * @since 1.0.0
         */
        this._tag = 'Lens';
    }
    /**
     * @example
     * import { Lens } from 'monocle-ts'
     *
     * type Person = {
     *   name: string
     *   age: number
     *   address: {
     *     city: string
     *   }
     * }
     *
     * const city = Lens.fromPath<Person>()(['address', 'city'])
     *
     * const person: Person = { name: 'Giulio', age: 43, address: { city: 'Milan' } }
     *
     * assert.strictEqual(city.get(person), 'Milan')
     * assert.deepStrictEqual(city.set('London')(person), { name: 'Giulio', age: 43, address: { city: 'London' } })
     *
     * @since 1.0.0
     */
    Lens.fromPath = function () {
        var fromProp = Lens.fromProp();
        return function (path) {
            var lens = fromProp(path[0]);
            return path.slice(1).reduce(function (acc, prop) { return acc.compose(fromProp(prop)); }, lens);
        };
    };
    /**
     * Returns a `Lens` from a type and a prop
     *
     * @example
     * import { Lens } from 'monocle-ts'
     *
     * type Person = {
     *   name: string
     *   age: number
     * }
     *
     * const age = Lens.fromProp<Person>()('age')
     *
     * const person: Person = { name: 'Giulio', age: 43 }
     *
     * assert.strictEqual(age.get(person), 43)
     * assert.deepStrictEqual(age.set(44)(person), { name: 'Giulio', age: 44 })
     *
     * @since 1.0.0
     */
    Lens.fromProp = function () {
        return function (prop$1) { return fromLens(pipe(id(), prop(prop$1))); };
    };
    Lens.fromProps = function () {
        return function (props$1) { return fromLens(pipe(id(), props.apply(lens$1, props$1))); };
    };
    /**
     * Returns a `Lens` from a nullable (`A | null | undefined`) prop
     *
     * @example
     * import { Lens } from 'monocle-ts'
     *
     * interface Outer {
     *   inner?: Inner
     * }
     *
     * interface Inner {
     *   value: number
     *   foo: string
     * }
     *
     * const inner = Lens.fromNullableProp<Outer>()('inner', { value: 0, foo: 'foo' })
     * const value = Lens.fromProp<Inner>()('value')
     * const lens = inner.compose(value)
     *
     * assert.deepStrictEqual(lens.set(1)({}), { inner: { value: 1, foo: 'foo' } })
     * assert.strictEqual(lens.get({}), 0)
     * assert.deepStrictEqual(lens.set(1)({ inner: { value: 1, foo: 'bar' } }), { inner: { value: 1, foo: 'bar' } })
     * assert.strictEqual(lens.get({ inner: { value: 1, foo: 'bar' } }), 1)
     *
     * @since 1.0.0
     */
    Lens.fromNullableProp = function () {
        return function (k, defaultValue) {
            return new Lens(function (s) {
                var osk = fromNullable$1(s[k]);
                if (isNone(osk)) {
                    return defaultValue;
                }
                else {
                    return osk.value;
                }
            }, function (a) { return function (s) { return update(s, k, a); }; });
        };
    };
    /**
     * @since 1.0.0
     */
    Lens.prototype.modify = function (f) {
        return modify$2(f)(this);
    };
    /**
     * view a `Lens` as a Optional
     *
     * @since 1.0.0
     */
    Lens.prototype.asOptional = function () {
        return fromOptional(asOptional$1(this));
    };
    /**
     * view a `Lens` as a `Traversal`
     *
     * @since 1.0.0
     */
    Lens.prototype.asTraversal = function () {
        return fromTraversal(asTraversal$2(this));
    };
    /**
     * view a `Lens` as a `Setter`
     *
     * @since 1.0.0
     */
    Lens.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * view a `Lens` as a `Getter`
     *
     * @since 1.0.0
     */
    Lens.prototype.asGetter = function () {
        var _this = this;
        return new Getter(function (s) { return _this.get(s); });
    };
    /**
     * view a `Lens` as a `Fold`
     *
     * @since 1.0.0
     */
    Lens.prototype.asFold = function () {
        var _this = this;
        return new Fold(function () { return function (f) { return function (s) { return f(_this.get(s)); }; }; });
    };
    /**
     * compose a `Lens` with a `Lens`
     *
     * @since 1.0.0
     */
    Lens.prototype.compose = function (ab) {
        return fromLens(compose$3(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeLens = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Lens` with a `Getter`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeGetter = function (ab) {
        return this.asGetter().compose(ab);
    };
    /**
     * compose a `Lens` with a `Fold`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Lens` with an `Optional`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeOptional = function (ab) {
        return fromOptional(pipe(this, asOptional$1, compose$2(ab)));
    };
    /**
     * compose a `Lens` with an `Traversal`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal$2, compose(ab)));
    };
    /**
     * compose a `Lens` with an `Setter`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose a `Lens` with an `Iso`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeIso = function (ab) {
        return fromLens(pipe(this, compose$3(pipe(ab, asLens))));
    };
    /**
     * compose a `Lens` with a `Prism`
     *
     * @since 1.0.0
     */
    Lens.prototype.composePrism = function (ab) {
        return fromOptional(composePrism(ab)(this));
    };
    return Lens;
}());
/**
 * Laws:
 * 1. `pipe(getOption(s), fold(() => s, reverseGet)) = s`
 * 2. `getOption(reverseGet(a)) = some(a)`
 *
 * @category constructor
 * @since 1.0.0
 */
var Prism = /** @class */ (function () {
    function Prism(getOption, reverseGet) {
        this.getOption = getOption;
        this.reverseGet = reverseGet;
        /**
         * @since 1.0.0
         */
        this._tag = 'Prism';
    }
    Prism.fromPredicate = function (predicate) {
        return fromPrism(fromPredicate(predicate));
    };
    /**
     * @since 1.0.0
     */
    Prism.some = function () {
        return somePrism;
    };
    /**
     * @since 1.0.0
     */
    Prism.prototype.modify = function (f) {
        var _this = this;
        return function (s) {
            var os = _this.modifyOption(f)(s);
            if (isNone(os)) {
                return s;
            }
            else {
                return os.value;
            }
        };
    };
    /**
     * @since 1.0.0
     */
    Prism.prototype.modifyOption = function (f) {
        var _this = this;
        return function (s) {
            return option.map(_this.getOption(s), function (v) {
                var n = f(v);
                return n === v ? s : _this.reverseGet(n);
            });
        };
    };
    /**
     * set the target of a `Prism` with a value
     *
     * @since 1.0.0
     */
    Prism.prototype.set = function (a) {
        return this.modify(function () { return a; });
    };
    /**
     * view a `Prism` as a `Optional`
     *
     * @since 1.0.0
     */
    Prism.prototype.asOptional = function () {
        return fromOptional(asOptional(this));
    };
    /**
     * view a `Prism` as a `Traversal`
     *
     * @since 1.0.0
     */
    Prism.prototype.asTraversal = function () {
        return fromTraversal(asTraversal(this));
    };
    /**
     * view a `Prism` as a `Setter`
     *
     * @since 1.0.0
     */
    Prism.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * view a `Prism` as a `Fold`
     *
     * @since 1.0.0
     */
    Prism.prototype.asFold = function () {
        var _this = this;
        return new Fold(function (M) { return function (f) { return function (s) {
            var oa = _this.getOption(s);
            return isNone(oa) ? M.empty : f(oa.value);
        }; }; });
    };
    /**
     * compose a `Prism` with a `Prism`
     *
     * @since 1.0.0
     */
    Prism.prototype.compose = function (ab) {
        return fromPrism(compose$1(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Prism.prototype.composePrism = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Prism` with a `Optional`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeOptional = function (ab) {
        return fromOptional(pipe(this, asOptional, compose$2(ab)));
    };
    /**
     * compose a `Prism` with a `Traversal`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal, compose(ab)));
    };
    /**
     * compose a `Prism` with a `Fold`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Prism` with a `Setter`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose a `Prism` with a `Iso`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeIso = function (ab) {
        return fromPrism(pipe(this, compose$1(pipe(ab, asPrism))));
    };
    /**
     * compose a `Prism` with a `Lens`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeLens = function (ab) {
        return fromOptional(composeLens(ab)(this));
    };
    /**
     * compose a `Prism` with a `Getter`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeGetter = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Prism;
}());
var somePrism = 
/*#__PURE__*/
new Prism(identity$1, some$1);
/**
 * Laws:
 * 1. `pipe(getOption(s), fold(() => s, a => set(a)(s))) = s`
 * 2. `getOption(set(a)(s)) = pipe(getOption(s), map(_ => a))`
 * 3. `set(a)(set(a)(s)) = set(a)(s)`
 *
 * @category constructor
 * @since 1.0.0
 */
var Optional = /** @class */ (function () {
    function Optional(getOption, set) {
        this.getOption = getOption;
        this.set = set;
        /**
         * @since 1.0.0
         */
        this._tag = 'Optional';
    }
    /**
     * Returns an `Optional` from a nullable (`A | null | undefined`) prop
     *
     * @example
     * import { Optional } from 'monocle-ts'
     *
     * interface Phone {
     *   number: string
     * }
     * interface Employment {
     *   phone?: Phone
     * }
     * interface Info {
     *   employment?: Employment
     * }
     * interface Response {
     *   info?: Info
     * }
     *
     * const numberFromResponse = Optional.fromPath<Response>()(['info', 'employment', 'phone', 'number'])
     *
     * const response1: Response = {
     *   info: {
     *     employment: {
     *       phone: {
     *         number: '555-1234'
     *       }
     *     }
     *   }
     * }
     * const response2: Response = {
     *   info: {
     *     employment: {}
     *   }
     * }
     *
     * numberFromResponse.getOption(response1) // some('555-1234')
     * numberFromResponse.getOption(response2) // none
     *
     * @since 2.1.0
     */
    Optional.fromPath = function () {
        var fromNullableProp = Optional.fromNullableProp();
        return function (path) {
            var optional = fromNullableProp(path[0]);
            return path.slice(1).reduce(function (acc, prop) { return acc.compose(fromNullableProp(prop)); }, optional);
        };
    };
    /**
     * @example
     * import { Optional } from 'monocle-ts'
     *
     * interface S {
     *   a: number | undefined | null
     * }
     *
     * const optional = Optional.fromNullableProp<S>()('a')
     *
     * const s1: S = { a: undefined }
     * const s2: S = { a: null }
     * const s3: S = { a: 1 }
     *
     * assert.deepStrictEqual(optional.set(2)(s1), s1)
     * assert.deepStrictEqual(optional.set(2)(s2), s2)
     * assert.deepStrictEqual(optional.set(2)(s3), { a: 2 })
     *
     * @since 1.0.0
     */
    Optional.fromNullableProp = function () {
        return function (k) {
            return new Optional(function (s) { return fromNullable$1(s[k]); }, function (a) { return function (s) { return (s[k] == null ? s : update(s, k, a)); }; });
        };
    };
    /**
     * Returns an `Optional` from an option (`Option<A>`) prop
     *
     * @example
     * import { Optional } from 'monocle-ts'
     * import * as O from 'fp-ts/Option'
     *
     * interface S {
     *   a: O.Option<number>
     * }
     *
     * const optional = Optional.fromOptionProp<S>()('a')
     * const s1: S = { a: O.none }
     * const s2: S = { a: O.some(1) }
     * assert.deepStrictEqual(optional.set(2)(s1), s1)
     * assert.deepStrictEqual(optional.set(2)(s2), { a: O.some(2) })
     *
     * @since 1.0.0
     */
    Optional.fromOptionProp = function () {
        var formProp = Lens.fromProp();
        return function (prop) { return formProp(prop).composePrism(somePrism); };
    };
    /**
     * @since 1.0.0
     */
    Optional.prototype.modify = function (f) {
        return modify$1(f)(this);
    };
    /**
     * @since 1.0.0
     */
    Optional.prototype.modifyOption = function (f) {
        return modifyOption(f)(this);
    };
    /**
     * view a `Optional` as a `Traversal`
     *
     * @since 1.0.0
     */
    Optional.prototype.asTraversal = function () {
        return fromTraversal(asTraversal$1(this));
    };
    /**
     * view an `Optional` as a `Fold`
     *
     * @since 1.0.0
     */
    Optional.prototype.asFold = function () {
        var _this = this;
        return new Fold(function (M) { return function (f) { return function (s) {
            var oa = _this.getOption(s);
            return isNone(oa) ? M.empty : f(oa.value);
        }; }; });
    };
    /**
     * view an `Optional` as a `Setter`
     *
     * @since 1.0.0
     */
    Optional.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * compose a `Optional` with a `Optional`
     *
     * @since 1.0.0
     */
    Optional.prototype.compose = function (ab) {
        return fromOptional(compose$2(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeOptional = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose an `Optional` with a `Traversal`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe(this, asTraversal$1, compose(ab)));
    };
    /**
     * compose an `Optional` with a `Fold`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose an `Optional` with a `Setter`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose an `Optional` with a `Lens`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeLens = function (ab) {
        return fromOptional(pipe(this, compose$2(pipe(ab, asOptional$1))));
    };
    /**
     * compose an `Optional` with a `Prism`
     *
     * @since 1.0.0
     */
    Optional.prototype.composePrism = function (ab) {
        return fromOptional(pipe(this, compose$2(pipe(ab, asOptional))));
    };
    /**
     * compose an `Optional` with a `Iso`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeIso = function (ab) {
        return fromOptional(pipe(this, compose$2(pipe(ab, asOptional$2))));
    };
    /**
     * compose an `Optional` with a `Getter`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeGetter = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Optional;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Traversal = /** @class */ (function () {
    function Traversal(
    // Van Laarhoven representation
    modifyF) {
        this.modifyF = modifyF;
        /**
         * @since 1.0.0
         */
        this._tag = 'Traversal';
    }
    /**
     * @since 1.0.0
     */
    Traversal.prototype.modify = function (f) {
        return modify(f)(this);
    };
    /**
     * @since 1.0.0
     */
    Traversal.prototype.set = function (a) {
        return set(a)(this);
    };
    Traversal.prototype.filter = function (predicate) {
        return fromTraversal(filter(predicate)(this));
    };
    /**
     * view a `Traversal` as a `Fold`
     *
     * @since 1.0.0
     */
    Traversal.prototype.asFold = function () {
        var _this = this;
        return new Fold(function (M) { return function (f) {
            return _this.modifyF(getApplicative(M))(function (a) { return make(f(a)); });
        }; });
    };
    /**
     * view a `Traversal` as a `Setter`
     *
     * @since 1.0.0
     */
    Traversal.prototype.asSetter = function () {
        var _this = this;
        return new Setter(function (f) { return _this.modify(f); });
    };
    /**
     * compose a `Traversal` with a `Traversal`
     *
     * @since 1.0.0
     */
    Traversal.prototype.compose = function (ab) {
        return fromTraversal(compose(ab)(this));
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeTraversal = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Traversal` with a `Fold`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Traversal` with a `Setter`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeSetter = function (ab) {
        return this.asSetter().compose(ab);
    };
    /**
     * compose a `Traversal` with a `Optional`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeOptional = function (ab) {
        return this.compose(ab.asTraversal());
    };
    /**
     * compose a `Traversal` with a `Lens`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeLens = function (ab) {
        return fromTraversal(pipe(this, compose(pipe(ab, asTraversal$2))));
    };
    /**
     * compose a `Traversal` with a `Prism`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composePrism = function (ab) {
        return fromTraversal(pipe(this, compose(pipe(ab, asTraversal))));
    };
    /**
     * compose a `Traversal` with a `Iso`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeIso = function (ab) {
        return fromTraversal(pipe(this, compose(pipe(ab, asTraversal$3))));
    };
    /**
     * compose a `Traversal` with a `Getter`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeGetter = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Traversal;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Getter = /** @class */ (function () {
    function Getter(get) {
        this.get = get;
        /**
         * @since 1.0.0
         */
        this._tag = 'Getter';
    }
    /**
     * view a `Getter` as a `Fold`
     *
     * @since 1.0.0
     */
    Getter.prototype.asFold = function () {
        var _this = this;
        return new Fold(function () { return function (f) { return function (s) { return f(_this.get(s)); }; }; });
    };
    /**
     * compose a `Getter` with a `Getter`
     *
     * @since 1.0.0
     */
    Getter.prototype.compose = function (ab) {
        var _this = this;
        return new Getter(function (s) { return ab.get(_this.get(s)); });
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeGetter = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Getter` with a `Fold`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeFold = function (ab) {
        return this.asFold().compose(ab);
    };
    /**
     * compose a `Getter` with a `Lens`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeLens = function (ab) {
        return this.compose(ab.asGetter());
    };
    /**
     * compose a `Getter` with a `Iso`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeIso = function (ab) {
        return this.compose(ab.asGetter());
    };
    /**
     * compose a `Getter` with a `Optional`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeTraversal = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    /**
     * compose a `Getter` with a `Optional`
     *
     * @since 1.0.0
     */
    Getter.prototype.composeOptional = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    /**
     * compose a `Getter` with a `Prism`
     *
     * @since 1.0.0
     */
    Getter.prototype.composePrism = function (ab) {
        return this.asFold().compose(ab.asFold());
    };
    return Getter;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Fold = /** @class */ (function () {
    function Fold(foldMap) {
        this.foldMap = foldMap;
        /**
         * @since 1.0.0
         */
        this._tag = 'Fold';
        this.getAll = foldMap(getMonoid())(of);
        this.exist = foldMap(monoidAny);
        this.all = foldMap(monoidAll);
        this.foldMapFirst = foldMap(getFirstMonoid());
    }
    /**
     * compose a `Fold` with a `Fold`
     *
     * @since 1.0.0
     */
    Fold.prototype.compose = function (ab) {
        var _this = this;
        return new Fold(function (M) { return function (f) { return _this.foldMap(M)(ab.foldMap(M)(f)); }; });
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeFold = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Fold` with a `Getter`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeGetter = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Traversal`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeTraversal = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Optional`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeOptional = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Lens`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeLens = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Prism`
     *
     * @since 1.0.0
     */
    Fold.prototype.composePrism = function (ab) {
        return this.compose(ab.asFold());
    };
    /**
     * compose a `Fold` with a `Iso`
     *
     * @since 1.0.0
     */
    Fold.prototype.composeIso = function (ab) {
        return this.compose(ab.asFold());
    };
    Fold.prototype.find = function (p) {
        return this.foldMapFirst(fromPredicate$1(p));
    };
    /**
     * get the first target of a `Fold`
     *
     * @since 1.0.0
     */
    Fold.prototype.headOption = function (s) {
        return this.find(function () { return true; })(s);
    };
    return Fold;
}());
/**
 * @category constructor
 * @since 1.0.0
 */
var Setter = /** @class */ (function () {
    function Setter(modify) {
        this.modify = modify;
        /**
         * @since 1.0.0
         */
        this._tag = 'Setter';
    }
    /**
     * @since 1.0.0
     */
    Setter.prototype.set = function (a) {
        return this.modify(constant$1(a));
    };
    /**
     * compose a `Setter` with a `Setter`
     *
     * @since 1.0.0
     */
    Setter.prototype.compose = function (ab) {
        var _this = this;
        return new Setter(function (f) { return _this.modify(ab.modify(f)); });
    };
    /**
     * Alias of `compose`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeSetter = function (ab) {
        return this.compose(ab);
    };
    /**
     * compose a `Setter` with a `Traversal`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeTraversal = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Optional`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeOptional = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Lens`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeLens = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Prism`
     *
     * @since 1.0.0
     */
    Setter.prototype.composePrism = function (ab) {
        return this.compose(ab.asSetter());
    };
    /**
     * compose a `Setter` with a `Iso`
     *
     * @since 1.0.0
     */
    Setter.prototype.composeIso = function (ab) {
        return this.compose(ab.asSetter());
    };
    return Setter;
}());

//
// isos
//
var anyIso = 
/*#__PURE__*/
new Iso(unsafeCoerce, unsafeCoerce);
/**
 * @since 0.2.0
 */
function iso() {
    return anyIso;
}

var __extends = (undefined && undefined.__extends) || (function () {
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
var __assign = (undefined && undefined.__assign) || function () {
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
(undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @category Decode error
 * @since 1.0.0
 */
var failures = left$1;
/**
 * @category Decode error
 * @since 1.0.0
 */
var failure = function (value, context, message) {
    return failures([{ value: value, context: context, message: message }]);
};
/**
 * @category Decode error
 * @since 1.0.0
 */
var success = right$1;
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
            if (isLeft(e)) {
                return e;
            }
            return ab.validate(e.right, c);
        }, this.encode === identity && ab.encode === identity ? identity : function (b) { return _this.encode(ab.encode(b)); });
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
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 1.0.0
 */
var identity = function (a) { return a; };
/**
 * @since 1.0.0
 */
function getFunctionName(f) {
    return f.displayName || f.name || "<function".concat(f.length, ">");
}
// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------
/**
 * @since 1.0.0
 */
var NullType = /** @class */ (function (_super) {
    __extends(NullType, _super);
    function NullType() {
        var _this = _super.call(this, 'null', function (u) { return u === null; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'NullType';
        return _this;
    }
    return NullType;
}(Type));
/**
 * @category primitives
 * @since 1.0.0
 */
new NullType();
/**
 * @since 1.0.0
 */
var UndefinedType = /** @class */ (function (_super) {
    __extends(UndefinedType, _super);
    function UndefinedType() {
        var _this = _super.call(this, 'undefined', function (u) { return u === void 0; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'UndefinedType';
        return _this;
    }
    return UndefinedType;
}(Type));
var undefinedType = new UndefinedType();
/**
 * @since 1.2.0
 */
var VoidType = /** @class */ (function (_super) {
    __extends(VoidType, _super);
    function VoidType() {
        var _this = _super.call(this, 'void', undefinedType.is, undefinedType.validate, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'VoidType';
        return _this;
    }
    return VoidType;
}(Type));
/**
 * @category primitives
 * @since 1.2.0
 */
new VoidType();
/**
 * @since 1.5.0
 */
var UnknownType = /** @class */ (function (_super) {
    __extends(UnknownType, _super);
    function UnknownType() {
        var _this = _super.call(this, 'unknown', function (_) { return true; }, success, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'UnknownType';
        return _this;
    }
    return UnknownType;
}(Type));
/**
 * @category primitives
 * @since 1.5.0
 */
new UnknownType();
/**
 * @since 1.0.0
 */
var StringType = /** @class */ (function (_super) {
    __extends(StringType, _super);
    function StringType() {
        var _this = _super.call(this, 'string', function (u) { return typeof u === 'string'; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'StringType';
        return _this;
    }
    return StringType;
}(Type));
/**
 * @category primitives
 * @since 1.0.0
 */
new StringType();
/**
 * @since 1.0.0
 */
var NumberType = /** @class */ (function (_super) {
    __extends(NumberType, _super);
    function NumberType() {
        var _this = _super.call(this, 'number', function (u) { return typeof u === 'number'; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'NumberType';
        return _this;
    }
    return NumberType;
}(Type));
/**
 * @category primitives
 * @since 1.0.0
 */
var number = new NumberType();
/**
 * @since 2.1.0
 */
var BigIntType = /** @class */ (function (_super) {
    __extends(BigIntType, _super);
    function BigIntType() {
        var _this = _super.call(this, 'bigint', 
        // tslint:disable-next-line: valid-typeof
        function (u) { return typeof u === 'bigint'; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'BigIntType';
        return _this;
    }
    return BigIntType;
}(Type));
/**
 * @category primitives
 * @since 2.1.0
 */
new BigIntType();
/**
 * @since 1.0.0
 */
var BooleanType = /** @class */ (function (_super) {
    __extends(BooleanType, _super);
    function BooleanType() {
        var _this = _super.call(this, 'boolean', function (u) { return typeof u === 'boolean'; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'BooleanType';
        return _this;
    }
    return BooleanType;
}(Type));
/**
 * @category primitives
 * @since 1.0.0
 */
new BooleanType();
/**
 * @since 1.0.0
 */
var AnyArrayType = /** @class */ (function (_super) {
    __extends(AnyArrayType, _super);
    function AnyArrayType() {
        var _this = _super.call(this, 'UnknownArray', Array.isArray, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'AnyArrayType';
        return _this;
    }
    return AnyArrayType;
}(Type));
/**
 * @category primitives
 * @since 1.7.1
 */
new AnyArrayType();
/**
 * @since 1.0.0
 */
var AnyDictionaryType = /** @class */ (function (_super) {
    __extends(AnyDictionaryType, _super);
    function AnyDictionaryType() {
        var _this = _super.call(this, 'UnknownRecord', function (u) { return u !== null && typeof u === 'object' && !Array.isArray(u); }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'AnyDictionaryType';
        return _this;
    }
    return AnyDictionaryType;
}(Type));
/**
 * @category primitives
 * @since 1.7.1
 */
new AnyDictionaryType();
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
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
/**
 * @category combinators
 * @since 1.8.1
 */
function brand(codec, predicate, name) {
    return refinement(codec, predicate, name);
}
/**
 * A branded codec representing an integer
 *
 * @category primitives
 * @since 1.8.1
 */
brand(number, function (n) { return Number.isInteger(n); }, 'Int');
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
Object.defineProperty(RecursiveType.prototype, 'type', {
    get: function () {
        return this.runDefinition();
    },
    enumerable: true,
    configurable: true
});
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
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
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.1.0
 */
/** @class */ ((function (_super) {
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
})(Type));
/**
 * @since 1.0.0
 */
var FunctionType = /** @class */ (function (_super) {
    __extends(FunctionType, _super);
    function FunctionType() {
        var _this = _super.call(this, 'Function', 
        // tslint:disable-next-line:strict-type-predicates
        function (u) { return typeof u === 'function'; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'FunctionType';
        return _this;
    }
    return FunctionType;
}(Type));
/**
 * @category primitives
 * @since 1.0.0
 */
new FunctionType();
/**
 * @since 1.0.0
 */
var NeverType = /** @class */ (function (_super) {
    __extends(NeverType, _super);
    function NeverType() {
        var _this = _super.call(this, 'never', function (_) { return false; }, function (u, c) { return failure(u, c); }, 
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
/**
 * @category primitives
 * @since 1.0.0
 */
new NeverType();
/**
 * @since 1.0.0
 */
var AnyType = /** @class */ (function (_super) {
    __extends(AnyType, _super);
    function AnyType() {
        var _this = _super.call(this, 'any', function (_) { return true; }, success, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'AnyType';
        return _this;
    }
    return AnyType;
}(Type));
/**
 * @category primitives
 * @since 1.0.0
 */
new AnyType();
function refinement(codec, predicate, name) {
    if (name === void 0) { name = "(".concat(codec.name, " | ").concat(getFunctionName(predicate), ")"); }
    return new RefinementType(name, function (u) { return codec.is(u) && predicate(u); }, function (i, c) {
        var e = codec.validate(i, c);
        if (isLeft(e)) {
            return e;
        }
        var a = e.right;
        return predicate(a) ? success(a) : failure(a, c);
    }, codec.encode, codec, predicate);
}
/**
 * @category primitives
 * @since 1.0.0
 */
refinement(number, Number.isInteger, 'Integer');
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * @since 1.3.0
 * @deprecated
 */
/** @class */ ((function (_super) {
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
})(UnionType));
/**
 * @since 1.0.0
 * @deprecated
 */
var ObjectType = /** @class */ (function (_super) {
    __extends(ObjectType, _super);
    function ObjectType() {
        var _this = _super.call(this, 'object', function (u) { return u !== null && typeof u === 'object'; }, function (u, c) { return (_this.is(u) ? success(u) : failure(u, c)); }, identity) || this;
        /**
         * @since 1.0.0
         */
        _this._tag = 'ObjectType';
        return _this;
    }
    return ObjectType;
}(Type));
/**
 * Use `UnknownRecord` instead.
 *
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
// tslint:disable-next-line: deprecation
new ObjectType();
/**
 * @since 1.0.0
 * @deprecated
 */
/** @class */ ((function (_super) {
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
})(Type));

/**
 * @since 0.5.2
 */
/**
 * Returns a codec from a newtype
 *
 * @example
 * import { fromNewtype } from 'io-ts-types/es6/fromNewtype'
 * import * as t from 'io-ts'
 * import { right } from 'fp-ts/es6/Either'
 * import { PathReporter } from 'io-ts/es6/PathReporter'
 * import { Newtype, iso } from 'newtype-ts'
 *
 * interface Token extends Newtype<{ readonly Token: unique symbol }, string> {}
 *
 * const T = fromNewtype<Token>(t.string)
 *
 * assert.deepStrictEqual(T.decode('sometoken'), right(iso<Token>().wrap('sometoken')))
 * assert.deepStrictEqual(PathReporter.report(T.decode(42)), ['Invalid value 42 supplied to : fromNewtype(string)'])
 *
 * @since 0.5.2
 */
function fromNewtype(codec, name) {
    if (name === void 0) { name = "fromNewtype(" + codec.name + ")"; }
    var i = iso();
    return new Type(name, function (u) { return codec.is(u); }, function (u, c) {
        return pipe(codec.validate(u, c), map(i.wrap));
    }, function (a) { return codec.encode(i.unwrap(a)); });
}

const TxOutRef = fromNewtype(lib.string);
const unTxOutRef = iso().unwrap;
const txOutRef = iso().wrap;

const AddressBech32 = fromNewtype(lib.string);
const unAddressBech32 = iso().unwrap;
const addressBech32 = iso().wrap;
const AddressesAndCollaterals = lib.type({
    changeAddress: AddressBech32,
    usedAddresses: lib.array(AddressBech32),
    collateralUTxOs: lib.array(TxOutRef),
});

function isBigIntOrNumber(u) {
    return typeof u === "bigint" || typeof u === "number";
}
const bigint = new lib.Type("bigint", isBigIntOrNumber, (i, c) => (isBigIntOrNumber(i) ? lib.success(i) : lib.failure(i, c)), (number) => BigInt(number));
const BlockHeader = lib.type({
    slotNo: bigint,
    blockNo: bigint,
    blockHeaderHash: lib.string,
});

const PolicyId = fromNewtype(lib.string);
const unPolicyId = iso().unwrap;
const mkPolicyId = iso().wrap;

const TextEnvelope = lib.type({
    type: lib.string,
    description: lib.string,
    cborHex: lib.string,
});
const transactionWitnessSetTextEnvelope = (hexTransactionWitnessSet) => ({
    type: "ShelleyTxWitness BabbageEra",
    description: "",
    cborHex: hexTransactionWitnessSet,
});

const TxId = lib.string; // to refine

const MetadatumLabel = lib.union([lib.bigint, lib.string]);
const Metadatum = lib.any;
const Metadata = lib.record(MetadatumLabel, Metadatum);

const Tag = lib.string;
const TagContent = lib.any;
const Tags = lib.record(Tag, TagContent);
const noTags = [];

var string = {};

var ReadonlyNonEmptyArray = {};

var Eq = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.eqDate = exports.eqNumber = exports.eqString = exports.eqBoolean = exports.eq = exports.strictEqual = exports.getStructEq = exports.getTupleEq = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.eqStrict = exports.URI = exports.contramap = exports.tuple = exports.struct = exports.fromEquals = void 0;
	var function_1 = _function;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	var fromEquals = function (equals) { return ({
	    equals: function (x, y) { return x === y || equals(x, y); }
	}); };
	exports.fromEquals = fromEquals;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.10.0
	 */
	var struct = function (eqs) {
	    return (0, exports.fromEquals)(function (first, second) {
	        for (var key in eqs) {
	            if (!eqs[key].equals(first[key], second[key])) {
	                return false;
	            }
	        }
	        return true;
	    });
	};
	exports.struct = struct;
	/**
	 * Given a tuple of `Eq`s returns a `Eq` for the tuple
	 *
	 * @example
	 * import { tuple } from 'fp-ts/Eq'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 * import * as B from 'fp-ts/boolean'
	 *
	 * const E = tuple(S.Eq, N.Eq, B.Eq)
	 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
	 * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
	 * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
	 * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
	 *
	 * @since 2.10.0
	 */
	var tuple = function () {
	    var eqs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        eqs[_i] = arguments[_i];
	    }
	    return (0, exports.fromEquals)(function (first, second) { return eqs.every(function (E, i) { return E.equals(first[i], second[i]); }); });
	};
	exports.tuple = tuple;
	/* istanbul ignore next */
	var contramap_ = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.contramap)(f)); };
	/**
	 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Eq<User>`.
	 *
	 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
	 * for equality (meaning we have an `Eq<X>`)
	 *
	 * For example, given the following `User` type, we want to construct an `Eq<User>` that just looks at the `key` field
	 * for each user (since it's known to be unique).
	 *
	 * If we have a way of comparing `UUID`s for equality (`eqUUID: Eq<UUID>`) and we know how to go from `User -> UUID`,
	 * using `contramap` we can do this
	 *
	 * @example
	 * import { contramap, Eq } from 'fp-ts/Eq'
	 * import { pipe } from 'fp-ts/function'
	 * import * as S from 'fp-ts/string'
	 *
	 * type UUID = string
	 *
	 * interface User {
	 *   readonly key: UUID
	 *   readonly firstName: string
	 *   readonly lastName: string
	 * }
	 *
	 * const eqUUID: Eq<UUID> = S.Eq
	 *
	 * const eqUserByKey: Eq<User> = pipe(
	 *   eqUUID,
	 *   contramap((user) => user.key)
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   eqUserByKey.equals(
	 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
	 *     { key: 'k2', firstName: 'a1', lastName: 'b1' }
	 *   ),
	 *   false
	 * )
	 * assert.deepStrictEqual(
	 *   eqUserByKey.equals(
	 *     { key: 'k1', firstName: 'a1', lastName: 'b1' },
	 *     { key: 'k1', firstName: 'a2', lastName: 'b1' }
	 *   ),
	 *   true
	 * )
	 *
	 * @since 2.0.0
	 */
	var contramap = function (f) { return function (fa) {
	    return (0, exports.fromEquals)(function (x, y) { return fa.equals(f(x), f(y)); });
	}; };
	exports.contramap = contramap;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Eq';
	/**
	 * @category instances
	 * @since 2.5.0
	 */
	exports.eqStrict = {
	    equals: function (a, b) { return a === b; }
	};
	var empty = {
	    equals: function () { return true; }
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	var getSemigroup = function () { return ({
	    concat: function (x, y) { return (0, exports.fromEquals)(function (a, b) { return x.equals(a, b) && y.equals(a, b); }); }
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * @category instances
	 * @since 2.6.0
	 */
	var getMonoid = function () { return ({
	    concat: (0, exports.getSemigroup)().concat,
	    empty: empty
	}); };
	exports.getMonoid = getMonoid;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Contravariant = {
	    URI: exports.URI,
	    contramap: contramap_
	};
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * Use [`tuple`](#tuple) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getTupleEq = exports.tuple;
	/**
	 * Use [`struct`](#struct) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getStructEq = exports.struct;
	/**
	 * Use [`eqStrict`](#eqstrict) instead
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.strictEqual = exports.eqStrict.equals;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Contravariant` instance, pass `E.Contravariant` instead of `E.eq`
	 * (where `E` is from `import E from 'fp-ts/Eq'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.eq = exports.Contravariant;
	/**
	 * Use [`Eq`](./boolean.ts.html#eq) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.eqBoolean = exports.eqStrict;
	/**
	 * Use [`Eq`](./string.ts.html#eq) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.eqString = exports.eqStrict;
	/**
	 * Use [`Eq`](./number.ts.html#eq) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.eqNumber = exports.eqStrict;
	/**
	 * Use [`Eq`](./Date.ts.html#eq) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.eqDate = {
	    equals: function (first, second) { return first.valueOf() === second.valueOf(); }
	}; 
} (Eq));

var Ord = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ordDate = exports.ordNumber = exports.ordString = exports.ordBoolean = exports.ord = exports.getDualOrd = exports.getTupleOrd = exports.between = exports.clamp = exports.max = exports.min = exports.geq = exports.leq = exports.gt = exports.lt = exports.equals = exports.trivial = exports.Contravariant = exports.getMonoid = exports.getSemigroup = exports.URI = exports.contramap = exports.reverse = exports.tuple = exports.fromCompare = exports.equalsDefault = void 0;
	var Eq_1 = Eq;
	var function_1 = _function;
	// -------------------------------------------------------------------------------------
	// defaults
	// -------------------------------------------------------------------------------------
	/**
	 * @category defaults
	 * @since 2.10.0
	 */
	var equalsDefault = function (compare) {
	    return function (first, second) {
	        return first === second || compare(first, second) === 0;
	    };
	};
	exports.equalsDefault = equalsDefault;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	var fromCompare = function (compare) { return ({
	    equals: (0, exports.equalsDefault)(compare),
	    compare: function (first, second) { return (first === second ? 0 : compare(first, second)); }
	}); };
	exports.fromCompare = fromCompare;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Given a tuple of `Ord`s returns an `Ord` for the tuple.
	 *
	 * @example
	 * import { tuple } from 'fp-ts/Ord'
	 * import * as B from 'fp-ts/boolean'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 *
	 * const O = tuple(S.Ord, N.Ord, B.Ord)
	 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
	 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
	 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
	 *
	 * @since 2.10.0
	 */
	var tuple = function () {
	    var ords = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        ords[_i] = arguments[_i];
	    }
	    return (0, exports.fromCompare)(function (first, second) {
	        var i = 0;
	        for (; i < ords.length - 1; i++) {
	            var r = ords[i].compare(first[i], second[i]);
	            if (r !== 0) {
	                return r;
	            }
	        }
	        return ords[i].compare(first[i], second[i]);
	    });
	};
	exports.tuple = tuple;
	/**
	 * @since 2.10.0
	 */
	var reverse = function (O) { return (0, exports.fromCompare)(function (first, second) { return O.compare(second, first); }); };
	exports.reverse = reverse;
	/* istanbul ignore next */
	var contramap_ = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.contramap)(f)); };
	/**
	 * A typical use case for `contramap` would be like, given some `User` type, to construct an `Ord<User>`.
	 *
	 * We can do so with a function from `User -> X` where `X` is some value that we know how to compare
	 * for ordering (meaning we have an `Ord<X>`)
	 *
	 * For example, given the following `User` type, there are lots of possible choices for `X`,
	 * but let's say we want to sort a list of users by `lastName`.
	 *
	 * If we have a way of comparing `lastName`s for ordering (`ordLastName: Ord<string>`) and we know how to go from `User -> string`,
	 * using `contramap` we can do this
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import { contramap, Ord } from 'fp-ts/Ord'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as S from 'fp-ts/string'
	 *
	 * interface User {
	 *   readonly firstName: string
	 *   readonly lastName: string
	 * }
	 *
	 * const ordLastName: Ord<string> = S.Ord
	 *
	 * const ordByLastName: Ord<User> = pipe(
	 *   ordLastName,
	 *   contramap((user) => user.lastName)
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   RA.sort(ordByLastName)([
	 *     { firstName: 'a', lastName: 'd' },
	 *     { firstName: 'c', lastName: 'b' }
	 *   ]),
	 *   [
	 *     { firstName: 'c', lastName: 'b' },
	 *     { firstName: 'a', lastName: 'd' }
	 *   ]
	 * )
	 *
	 * @since 2.0.0
	 */
	var contramap = function (f) { return function (fa) {
	    return (0, exports.fromCompare)(function (first, second) { return fa.compare(f(first), f(second)); });
	}; };
	exports.contramap = contramap;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Ord';
	/**
	 * A typical use case for the `Semigroup` instance of `Ord` is merging two or more orderings.
	 *
	 * For example the following snippet builds an `Ord` for a type `User` which
	 * sorts by `created` date descending, and **then** `lastName`
	 *
	 * @example
	 * import * as D from 'fp-ts/Date'
	 * import { pipe } from 'fp-ts/function'
	 * import { contramap, getSemigroup, Ord, reverse } from 'fp-ts/Ord'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as S from 'fp-ts/string'
	 *
	 * interface User {
	 *   readonly id: string
	 *   readonly lastName: string
	 *   readonly created: Date
	 * }
	 *
	 * const ordByLastName: Ord<User> = pipe(
	 *   S.Ord,
	 *   contramap((user) => user.lastName)
	 * )
	 *
	 * const ordByCreated: Ord<User> = pipe(
	 *   D.Ord,
	 *   contramap((user) => user.created)
	 * )
	 *
	 * const ordUserByCreatedDescThenLastName = getSemigroup<User>().concat(
	 *   reverse(ordByCreated),
	 *   ordByLastName
	 * )
	 *
	 * assert.deepStrictEqual(
	 *   RA.sort(ordUserByCreatedDescThenLastName)([
	 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) },
	 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
	 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) }
	 *   ]),
	 *   [
	 *     { id: 'e', lastName: 'f', created: new Date(1980, 10, 30) },
	 *     { id: 'a', lastName: 'b', created: new Date(1973, 10, 30) },
	 *     { id: 'c', lastName: 'd', created: new Date(1973, 10, 30) }
	 *   ]
	 * )
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getSemigroup = function () { return ({
	    concat: function (first, second) {
	        return (0, exports.fromCompare)(function (a, b) {
	            var ox = first.compare(a, b);
	            return ox !== 0 ? ox : second.compare(a, b);
	        });
	    }
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * Returns a `Monoid` such that:
	 *
	 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
	 * - its `empty` value is an `Ord` that always considers compared elements equal
	 *
	 * @example
	 * import { sort } from 'fp-ts/Array'
	 * import { contramap, reverse, getMonoid } from 'fp-ts/Ord'
	 * import * as S from 'fp-ts/string'
	 * import * as B from 'fp-ts/boolean'
	 * import { pipe } from 'fp-ts/function'
	 * import { concatAll } from 'fp-ts/Monoid'
	 * import * as N from 'fp-ts/number'
	 *
	 * interface User {
	 *   readonly id: number
	 *   readonly name: string
	 *   readonly age: number
	 *   readonly rememberMe: boolean
	 * }
	 *
	 * const byName = pipe(
	 *   S.Ord,
	 *   contramap((p: User) => p.name)
	 * )
	 *
	 * const byAge = pipe(
	 *   N.Ord,
	 *   contramap((p: User) => p.age)
	 * )
	 *
	 * const byRememberMe = pipe(
	 *   B.Ord,
	 *   contramap((p: User) => p.rememberMe)
	 * )
	 *
	 * const M = getMonoid<User>()
	 *
	 * const users: Array<User> = [
	 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
	 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
	 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
	 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
	 * ]
	 *
	 * // sort by name, then by age, then by `rememberMe`
	 * const O1 = concatAll(M)([byName, byAge, byRememberMe])
	 * assert.deepStrictEqual(sort(O1)(users), [
	 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
	 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
	 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
	 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
	 * ])
	 *
	 * // now `rememberMe = true` first, then by name, then by age
	 * const O2 = concatAll(M)([reverse(byRememberMe), byName, byAge])
	 * assert.deepStrictEqual(sort(O2)(users), [
	 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
	 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
	 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
	 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
	 * ])
	 *
	 * @category instances
	 * @since 2.4.0
	 */
	var getMonoid = function () { return ({
	    concat: (0, exports.getSemigroup)().concat,
	    empty: (0, exports.fromCompare)(function () { return 0; })
	}); };
	exports.getMonoid = getMonoid;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Contravariant = {
	    URI: exports.URI,
	    contramap: contramap_
	};
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.11.0
	 */
	exports.trivial = {
	    equals: function_1.constTrue,
	    compare: /*#__PURE__*/ (0, function_1.constant)(0)
	};
	/**
	 * @since 2.11.0
	 */
	var equals = function (O) {
	    return function (second) {
	        return function (first) {
	            return first === second || O.compare(first, second) === 0;
	        };
	    };
	};
	exports.equals = equals;
	// TODO: curry in v3
	/**
	 * Test whether one value is _strictly less than_ another
	 *
	 * @since 2.0.0
	 */
	var lt = function (O) {
	    return function (first, second) {
	        return O.compare(first, second) === -1;
	    };
	};
	exports.lt = lt;
	// TODO: curry in v3
	/**
	 * Test whether one value is _strictly greater than_ another
	 *
	 * @since 2.0.0
	 */
	var gt = function (O) {
	    return function (first, second) {
	        return O.compare(first, second) === 1;
	    };
	};
	exports.gt = gt;
	// TODO: curry in v3
	/**
	 * Test whether one value is _non-strictly less than_ another
	 *
	 * @since 2.0.0
	 */
	var leq = function (O) {
	    return function (first, second) {
	        return O.compare(first, second) !== 1;
	    };
	};
	exports.leq = leq;
	// TODO: curry in v3
	/**
	 * Test whether one value is _non-strictly greater than_ another
	 *
	 * @since 2.0.0
	 */
	var geq = function (O) {
	    return function (first, second) {
	        return O.compare(first, second) !== -1;
	    };
	};
	exports.geq = geq;
	// TODO: curry in v3
	/**
	 * Take the minimum of two values. If they are considered equal, the first argument is chosen
	 *
	 * @since 2.0.0
	 */
	var min = function (O) {
	    return function (first, second) {
	        return first === second || O.compare(first, second) < 1 ? first : second;
	    };
	};
	exports.min = min;
	// TODO: curry in v3
	/**
	 * Take the maximum of two values. If they are considered equal, the first argument is chosen
	 *
	 * @since 2.0.0
	 */
	var max = function (O) {
	    return function (first, second) {
	        return first === second || O.compare(first, second) > -1 ? first : second;
	    };
	};
	exports.max = max;
	/**
	 * Clamp a value between a minimum and a maximum
	 *
	 * @since 2.0.0
	 */
	var clamp = function (O) {
	    var minO = (0, exports.min)(O);
	    var maxO = (0, exports.max)(O);
	    return function (low, hi) { return function (a) { return maxO(minO(a, hi), low); }; };
	};
	exports.clamp = clamp;
	/**
	 * Test whether a value is between a minimum and a maximum (inclusive)
	 *
	 * @since 2.0.0
	 */
	var between = function (O) {
	    var ltO = (0, exports.lt)(O);
	    var gtO = (0, exports.gt)(O);
	    return function (low, hi) { return function (a) { return ltO(a, low) || gtO(a, hi) ? false : true; }; };
	};
	exports.between = between;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * Use [`tuple`](#tuple) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getTupleOrd = exports.tuple;
	/**
	 * Use [`reverse`](#reverse) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getDualOrd = exports.reverse;
	/**
	 * Use [`Contravariant`](#contravariant) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.ord = exports.Contravariant;
	// default compare for primitive types
	function compare(first, second) {
	    return first < second ? -1 : first > second ? 1 : 0;
	}
	var strictOrd = {
	    equals: Eq_1.eqStrict.equals,
	    compare: compare
	};
	/**
	 * Use [`Ord`](./boolean.ts.html#ord) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.ordBoolean = strictOrd;
	/**
	 * Use [`Ord`](./string.ts.html#ord) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.ordString = strictOrd;
	/**
	 * Use [`Ord`](./number.ts.html#ord) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.ordNumber = strictOrd;
	/**
	 * Use [`Ord`](./Date.ts.html#ord) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.ordDate = (0, function_1.pipe)(exports.ordNumber, 
	/*#__PURE__*/
	(0, exports.contramap)(function (date) { return date.valueOf(); })); 
} (Ord));

var Semigroup = {};

var Magma = {};

/**
 * A `Magma` is a pair `(A, concat)` in which `A` is a non-empty set and `concat` is a binary operation on `A`
 *
 * See [Semigroup](https://gcanti.github.io/fp-ts/modules/Semigroup.ts.html) for some instances.
 *
 * @since 2.0.0
 */
Object.defineProperty(Magma, "__esModule", { value: true });
Magma.concatAll = Magma.endo = Magma.filterSecond = Magma.filterFirst = Magma.reverse = void 0;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * The dual of a `Magma`, obtained by swapping the arguments of `concat`.
 *
 * @example
 * import { reverse, concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(reverse(N.MagmaSub))(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), 2)
 *
 * @since 2.11.0
 */
var reverse = function (M) { return ({
    concat: function (first, second) { return M.concat(second, first); }
}); };
Magma.reverse = reverse;
/**
 * @since 2.11.0
 */
var filterFirst = function (predicate) {
    return function (M) { return ({
        concat: function (first, second) { return (predicate(first) ? M.concat(first, second) : second); }
    }); };
};
Magma.filterFirst = filterFirst;
/**
 * @since 2.11.0
 */
var filterSecond = function (predicate) {
    return function (M) { return ({
        concat: function (first, second) { return (predicate(second) ? M.concat(first, second) : first); }
    }); };
};
Magma.filterSecond = filterSecond;
/**
 * @since 2.11.0
 */
var endo = function (f) {
    return function (M) { return ({
        concat: function (first, second) { return M.concat(f(first), f(second)); }
    }); };
};
Magma.endo = endo;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Given a sequence of `as`, concat them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @example
 * import { concatAll } from 'fp-ts/Magma'
 * import * as N from 'fp-ts/number'
 *
 * const subAll = concatAll(N.MagmaSub)(0)
 *
 * assert.deepStrictEqual(subAll([1, 2, 3]), -6)
 *
 * @since 2.11.0
 */
var concatAll = function (M) {
    return function (startWith) {
        return function (as) {
            return as.reduce(function (a, acc) { return M.concat(a, acc); }, startWith);
        };
    };
};
Magma.concatAll = concatAll;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.semigroupProduct = exports.semigroupSum = exports.semigroupString = exports.getFunctionSemigroup = exports.semigroupAny = exports.semigroupAll = exports.fold = exports.getIntercalateSemigroup = exports.getMeetSemigroup = exports.getJoinSemigroup = exports.getDualSemigroup = exports.getStructSemigroup = exports.getTupleSemigroup = exports.getFirstSemigroup = exports.getLastSemigroup = exports.getObjectSemigroup = exports.semigroupVoid = exports.concatAll = exports.last = exports.first = exports.intercalate = exports.tuple = exports.struct = exports.reverse = exports.constant = exports.max = exports.min = void 0;
	/**
	 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
	 *
	 * ```ts
	 * interface Semigroup<A> {
	 *   readonly concat: (x: A, y: A) => A
	 * }
	 * ```
	 *
	 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
	 *
	 * ```ts
	 * concat(x, concat(y, z)) = concat(concat(x, y), z)
	 * ```
	 *
	 * A common example of a semigroup is the type `string` with the operation `+`.
	 *
	 * ```ts
	 * import { Semigroup } from 'fp-ts/Semigroup'
	 *
	 * const semigroupString: Semigroup<string> = {
	 *   concat: (x, y) => x + y
	 * }
	 *
	 * const x = 'x'
	 * const y = 'y'
	 * const z = 'z'
	 *
	 * semigroupString.concat(x, y) // 'xy'
	 *
	 * semigroupString.concat(x, semigroupString.concat(y, z)) // 'xyz'
	 *
	 * semigroupString.concat(semigroupString.concat(x, y), z) // 'xyz'
	 * ```
	 *
	 * *Adapted from https://typelevel.org/cats*
	 *
	 * @since 2.0.0
	 */
	var function_1 = _function;
	var _ = __importStar(internal);
	var M = __importStar(Magma);
	var Or = __importStar(Ord);
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Get a semigroup where `concat` will return the minimum, based on the provided order.
	 *
	 * @example
	 * import * as N from 'fp-ts/number'
	 * import * as S from 'fp-ts/Semigroup'
	 *
	 * const S1 = S.min(N.Ord)
	 *
	 * assert.deepStrictEqual(S1.concat(1, 2), 1)
	 *
	 * @category constructors
	 * @since 2.10.0
	 */
	var min = function (O) { return ({
	    concat: Or.min(O)
	}); };
	exports.min = min;
	/**
	 * Get a semigroup where `concat` will return the maximum, based on the provided order.
	 *
	 * @example
	 * import * as N from 'fp-ts/number'
	 * import * as S from 'fp-ts/Semigroup'
	 *
	 * const S1 = S.max(N.Ord)
	 *
	 * assert.deepStrictEqual(S1.concat(1, 2), 2)
	 *
	 * @category constructors
	 * @since 2.10.0
	 */
	var max = function (O) { return ({
	    concat: Or.max(O)
	}); };
	exports.max = max;
	/**
	 * @category constructors
	 * @since 2.10.0
	 */
	var constant = function (a) { return ({
	    concat: function () { return a; }
	}); };
	exports.constant = constant;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * The dual of a `Semigroup`, obtained by swapping the arguments of `concat`.
	 *
	 * @example
	 * import { reverse } from 'fp-ts/Semigroup'
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(reverse(S.Semigroup).concat('a', 'b'), 'ba')
	 *
	 * @since 2.10.0
	 */
	exports.reverse = M.reverse;
	/**
	 * Given a struct of semigroups returns a semigroup for the struct.
	 *
	 * @example
	 * import { struct } from 'fp-ts/Semigroup'
	 * import * as N from 'fp-ts/number'
	 *
	 * interface Point {
	 *   readonly x: number
	 *   readonly y: number
	 * }
	 *
	 * const S = struct<Point>({
	 *   x: N.SemigroupSum,
	 *   y: N.SemigroupSum
	 * })
	 *
	 * assert.deepStrictEqual(S.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
	 *
	 * @since 2.10.0
	 */
	var struct = function (semigroups) { return ({
	    concat: function (first, second) {
	        var r = {};
	        for (var k in semigroups) {
	            if (_.has.call(semigroups, k)) {
	                r[k] = semigroups[k].concat(first[k], second[k]);
	            }
	        }
	        return r;
	    }
	}); };
	exports.struct = struct;
	/**
	 * Given a tuple of semigroups returns a semigroup for the tuple.
	 *
	 * @example
	 * import { tuple } from 'fp-ts/Semigroup'
	 * import * as B from 'fp-ts/boolean'
	 * import * as N from 'fp-ts/number'
	 * import * as S from 'fp-ts/string'
	 *
	 * const S1 = tuple(S.Semigroup, N.SemigroupSum)
	 * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
	 *
	 * const S2 = tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)
	 * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
	 *
	 * @since 2.10.0
	 */
	var tuple = function () {
	    var semigroups = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        semigroups[_i] = arguments[_i];
	    }
	    return ({
	        concat: function (first, second) { return semigroups.map(function (s, i) { return s.concat(first[i], second[i]); }); }
	    });
	};
	exports.tuple = tuple;
	/**
	 * Between each pair of elements insert `middle`.
	 *
	 * @example
	 * import { intercalate } from 'fp-ts/Semigroup'
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const S1 = pipe(S.Semigroup, intercalate(' + '))
	 *
	 * assert.strictEqual(S1.concat('a', 'b'), 'a + b')
	 *
	 * @since 2.10.0
	 */
	var intercalate = function (middle) {
	    return function (S) { return ({
	        concat: function (x, y) { return S.concat(x, S.concat(middle, y)); }
	    }); };
	};
	exports.intercalate = intercalate;
	// -------------------------------------------------------------------------------------
	// instances
	// -------------------------------------------------------------------------------------
	/**
	 * Always return the first argument.
	 *
	 * @example
	 * import * as S from 'fp-ts/Semigroup'
	 *
	 * assert.deepStrictEqual(S.first<number>().concat(1, 2), 1)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var first = function () { return ({ concat: function_1.identity }); };
	exports.first = first;
	/**
	 * Always return the last argument.
	 *
	 * @example
	 * import * as S from 'fp-ts/Semigroup'
	 *
	 * assert.deepStrictEqual(S.last<number>().concat(1, 2), 2)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var last = function () { return ({ concat: function (_, y) { return y; } }); };
	exports.last = last;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * Given a sequence of `as`, concat them and return the total.
	 *
	 * If `as` is empty, return the provided `startWith` value.
	 *
	 * @example
	 * import { concatAll } from 'fp-ts/Semigroup'
	 * import * as N from 'fp-ts/number'
	 *
	 * const sum = concatAll(N.SemigroupSum)(0)
	 *
	 * assert.deepStrictEqual(sum([1, 2, 3]), 6)
	 * assert.deepStrictEqual(sum([]), 0)
	 *
	 * @since 2.10.0
	 */
	exports.concatAll = M.concatAll;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * Use `void` module instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.semigroupVoid = (0, exports.constant)(undefined);
	/**
	 * Use [`getAssignSemigroup`](./struct.ts.html#getAssignSemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getObjectSemigroup = function () { return ({
	    concat: function (first, second) { return Object.assign({}, first, second); }
	}); };
	exports.getObjectSemigroup = getObjectSemigroup;
	/**
	 * Use [`last`](#last) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getLastSemigroup = exports.last;
	/**
	 * Use [`first`](#first) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getFirstSemigroup = exports.first;
	/**
	 * Use [`tuple`](#tuple) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getTupleSemigroup = exports.tuple;
	/**
	 * Use [`struct`](#struct) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getStructSemigroup = exports.struct;
	/**
	 * Use [`reverse`](#reverse) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getDualSemigroup = exports.reverse;
	/**
	 * Use [`max`](#max) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getJoinSemigroup = exports.max;
	/**
	 * Use [`min`](#min) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getMeetSemigroup = exports.min;
	/**
	 * Use [`intercalate`](#intercalate) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.getIntercalateSemigroup = exports.intercalate;
	function fold(S) {
	    var concatAllS = (0, exports.concatAll)(S);
	    return function (startWith, as) { return (as === undefined ? concatAllS(startWith) : concatAllS(startWith)(as)); };
	}
	exports.fold = fold;
	/**
	 * Use [`SemigroupAll`](./boolean.ts.html#SemigroupAll) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.semigroupAll = {
	    concat: function (x, y) { return x && y; }
	};
	/**
	 * Use [`SemigroupAny`](./boolean.ts.html#SemigroupAny) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.semigroupAny = {
	    concat: function (x, y) { return x || y; }
	};
	/**
	 * Use [`getSemigroup`](./function.ts.html#getSemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getFunctionSemigroup = function_1.getSemigroup;
	/**
	 * Use [`Semigroup`](./string.ts.html#Semigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.semigroupString = {
	    concat: function (x, y) { return x + y; }
	};
	/**
	 * Use [`SemigroupSum`](./number.ts.html#SemigroupSum) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.semigroupSum = {
	    concat: function (x, y) { return x + y; }
	};
	/**
	 * Use [`SemigroupProduct`](./number.ts.html#SemigroupProduct) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.semigroupProduct = {
	    concat: function (x, y) { return x * y; }
	}; 
} (Semigroup));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
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
	exports.reduceRight = exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
	exports.groupSort = exports.chain = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = void 0;
	exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = exports.filter = void 0;
	var Apply_1 = Apply;
	var Chain_1 = Chain;
	var Eq_1 = Eq;
	var function_1 = _function;
	var Functor_1 = Functor;
	var _ = __importStar(internal);
	var Ord_1 = Ord;
	var Se = __importStar(Semigroup);
	// -------------------------------------------------------------------------------------
	// internal
	// -------------------------------------------------------------------------------------
	/**
	 * @internal
	 */
	exports.empty = _.emptyReadonlyArray;
	/**
	 * @internal
	 */
	exports.isNonEmpty = _.isNonEmpty;
	/**
	 * @internal
	 */
	var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
	exports.isOutOfBound = isOutOfBound;
	/**
	 * @internal
	 */
	var prependW = function (head) {
	    return function (tail) {
	        return __spreadArray([head], tail, true);
	    };
	};
	exports.prependW = prependW;
	/**
	 * @internal
	 */
	exports.prepend = exports.prependW;
	/**
	 * @internal
	 */
	var appendW = function (end) {
	    return function (init) {
	        return __spreadArray(__spreadArray([], init, true), [end], false);
	    };
	};
	exports.appendW = appendW;
	/**
	 * @internal
	 */
	exports.append = exports.appendW;
	/**
	 * @internal
	 */
	var unsafeInsertAt = function (i, a, as) {
	    if ((0, exports.isNonEmpty)(as)) {
	        var xs = _.fromReadonlyNonEmptyArray(as);
	        xs.splice(i, 0, a);
	        return xs;
	    }
	    return [a];
	};
	exports.unsafeInsertAt = unsafeInsertAt;
	/**
	 * @internal
	 */
	var unsafeUpdateAt = function (i, a, as) {
	    if (as[i] === a) {
	        return as;
	    }
	    else {
	        var xs = _.fromReadonlyNonEmptyArray(as);
	        xs[i] = a;
	        return xs;
	    }
	};
	exports.unsafeUpdateAt = unsafeUpdateAt;
	/**
	 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
	 *
	 * @example
	 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
	 *
	 * @since 2.11.0
	 */
	var uniq = function (E) {
	    return function (as) {
	        if (as.length === 1) {
	            return as;
	        }
	        var out = [(0, exports.head)(as)];
	        var rest = (0, exports.tail)(as);
	        var _loop_1 = function (a) {
	            if (out.every(function (o) { return !E.equals(o, a); })) {
	                out.push(a);
	            }
	        };
	        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
	            var a = rest_1[_i];
	            _loop_1(a);
	        }
	        return out;
	    };
	};
	exports.uniq = uniq;
	/**
	 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	 * etc...
	 *
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { contramap } from 'fp-ts/Ord'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * interface Person {
	 *   name: string
	 *   age: number
	 * }
	 *
	 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
	 *
	 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
	 *
	 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
	 *
	 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 },
	 *   { name: 'b', age: 2 }
	 * ]
	 *
	 * assert.deepStrictEqual(sortByNameByAge(persons), [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 2 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 }
	 * ])
	 *
	 * @since 2.11.0
	 */
	var sortBy = function (ords) {
	    if ((0, exports.isNonEmpty)(ords)) {
	        var M = (0, Ord_1.getMonoid)();
	        return (0, exports.sort)(ords.reduce(M.concat, M.empty));
	    }
	    return function_1.identity;
	};
	exports.sortBy = sortBy;
	/**
	 * @since 2.11.0
	 */
	var union = function (E) {
	    var uniqE = (0, exports.uniq)(E);
	    return function (second) { return function (first) { return uniqE((0, function_1.pipe)(first, concat(second))); }; };
	};
	exports.union = union;
	/**
	 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
	 *
	 * @example
	 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
	 *
	 * @since 2.11.0
	 */
	var rotate = function (n) {
	    return function (as) {
	        var len = as.length;
	        var m = Math.round(n) % len;
	        if ((0, exports.isOutOfBound)(Math.abs(m), as) || m === 0) {
	            return as;
	        }
	        if (m < 0) {
	            var _a = (0, exports.splitAt)(-m)(as), f = _a[0], s = _a[1];
	            return (0, function_1.pipe)(s, concat(f));
	        }
	        else {
	            return (0, exports.rotate)(m - len)(as);
	        }
	    };
	};
	exports.rotate = rotate;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
	 *
	 * @category conversions
	 * @since 2.5.0
	 */
	var fromReadonlyArray = function (as) {
	    return (0, exports.isNonEmpty)(as) ? _.some(as) : _.none;
	};
	exports.fromReadonlyArray = fromReadonlyArray;
	/**
	 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
	 *
	 * **Note**. `n` is normalized to a natural number.
	 *
	 * @example
	 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const double = (n: number): number => n * 2
	 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var makeBy = function (f) {
	    return function (n) {
	        var j = Math.max(0, Math.floor(n));
	        var out = [f(0)];
	        for (var i = 1; i < j; i++) {
	            out.push(f(i));
	        }
	        return out;
	    };
	};
	exports.makeBy = makeBy;
	/**
	 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
	 *
	 * **Note**. `n` is normalized to a natural number.
	 *
	 * @example
	 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var replicate = function (a) { return (0, exports.makeBy)(function () { return a; }); };
	exports.replicate = replicate;
	/**
	 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
	 *
	 * @example
	 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var range = function (start, end) {
	    return start <= end ? (0, exports.makeBy)(function (i) { return start + i; })(end - start + 1) : [start];
	};
	exports.range = range;
	/**
	 * Return the tuple of the `head` and the `tail`.
	 *
	 * @example
	 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
	 *
	 * @since 2.9.0
	 */
	var unprepend = function (as) { return [(0, exports.head)(as), (0, exports.tail)(as)]; };
	exports.unprepend = unprepend;
	/**
	 * Return the tuple of the `init` and the `last`.
	 *
	 * @example
	 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
	 *
	 * @since 2.9.0
	 */
	var unappend = function (as) { return [(0, exports.init)(as), (0, exports.last)(as)]; };
	exports.unappend = unappend;
	/**
	 * @category conversions
	 * @since 2.5.0
	 */
	var fromArray = function (as) { return (0, exports.fromReadonlyArray)(as.slice()); };
	exports.fromArray = fromArray;
	function concatW(second) {
	    return function (first) { return first.concat(second); };
	}
	exports.concatW = concatW;
	function concat(x, y) {
	    return y ? x.concat(y) : function (y) { return y.concat(x); };
	}
	exports.concat = concat;
	/**
	 * @since 2.5.0
	 */
	var reverse = function (as) {
	    return as.length === 1 ? as : __spreadArray([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
	};
	exports.reverse = reverse;
	function group(E) {
	    return function (as) {
	        var len = as.length;
	        if (len === 0) {
	            return exports.empty;
	        }
	        var out = [];
	        var head = as[0];
	        var nea = [head];
	        for (var i = 1; i < len; i++) {
	            var a = as[i];
	            if (E.equals(a, head)) {
	                nea.push(a);
	            }
	            else {
	                out.push(nea);
	                head = a;
	                nea = [head];
	            }
	        }
	        out.push(nea);
	        return out;
	    };
	}
	exports.group = group;
	/**
	 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
	 * function on each element, and grouping the results according to values returned
	 *
	 * @example
	 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
	 *   '1': ['a', 'b'],
	 *   '2': ['ab']
	 * })
	 *
	 * @since 2.5.0
	 */
	var groupBy = function (f) {
	    return function (as) {
	        var out = {};
	        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
	            var a = as_1[_i];
	            var k = f(a);
	            if (_.has.call(out, k)) {
	                out[k].push(a);
	            }
	            else {
	                out[k] = [a];
	            }
	        }
	        return out;
	    };
	};
	exports.groupBy = groupBy;
	/**
	 * @since 2.5.0
	 */
	var sort = function (O) {
	    return function (as) {
	        return as.length === 1 ? as : as.slice().sort(O.compare);
	    };
	};
	exports.sort = sort;
	/**
	 * @since 2.5.0
	 */
	var updateAt = function (i, a) {
	    return (0, exports.modifyAt)(i, function () { return a; });
	};
	exports.updateAt = updateAt;
	/**
	 * @since 2.5.0
	 */
	var modifyAt = function (i, f) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
	    };
	};
	exports.modifyAt = modifyAt;
	/**
	 * @since 2.5.1
	 */
	var zipWith = function (as, bs, f) {
	    var cs = [f(as[0], bs[0])];
	    var len = Math.min(as.length, bs.length);
	    for (var i = 1; i < len; i++) {
	        cs[i] = f(as[i], bs[i]);
	    }
	    return cs;
	};
	exports.zipWith = zipWith;
	function zip(as, bs) {
	    if (bs === undefined) {
	        return function (bs) { return zip(bs, as); };
	    }
	    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
	}
	exports.zip = zip;
	/**
	 * @since 2.5.1
	 */
	var unzip = function (abs) {
	    var fa = [abs[0][0]];
	    var fb = [abs[0][1]];
	    for (var i = 1; i < abs.length; i++) {
	        fa[i] = abs[i][0];
	        fb[i] = abs[i][1];
	    }
	    return [fa, fb];
	};
	exports.unzip = unzip;
	/**
	 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
	 *
	 * @example
	 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.10.0
	 */
	var prependAll = function (middle) {
	    return function (as) {
	        var out = [middle, as[0]];
	        for (var i = 1; i < as.length; i++) {
	            out.push(middle, as[i]);
	        }
	        return out;
	    };
	};
	exports.prependAll = prependAll;
	/**
	 * Places an element in between members of a `ReadonlyNonEmptyArray`.
	 *
	 * @example
	 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.9.0
	 */
	var intersperse = function (middle) {
	    return function (as) {
	        var rest = (0, exports.tail)(as);
	        return (0, exports.isNonEmpty)(rest) ? (0, function_1.pipe)(rest, (0, exports.prependAll)(middle), (0, exports.prepend)((0, exports.head)(as))) : as;
	    };
	};
	exports.intersperse = intersperse;
	/**
	 * @category sequencing
	 * @since 2.10.0
	 */
	var chainWithIndex = function (f) {
	    return function (as) {
	        var out = _.fromReadonlyNonEmptyArray(f(0, (0, exports.head)(as)));
	        for (var i = 1; i < as.length; i++) {
	            out.push.apply(out, f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.chainWithIndex = chainWithIndex;
	/**
	 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
	 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
	 * value and the tail of the `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.10.0
	 */
	var chop = function (f) {
	    return function (as) {
	        var _a = f(as), b = _a[0], rest = _a[1];
	        var out = [b];
	        var next = rest;
	        while ((0, exports.isNonEmpty)(next)) {
	            var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
	            out.push(b_1);
	            next = rest_2;
	        }
	        return out;
	    };
	};
	exports.chop = chop;
	/**
	 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
	 *
	 * @since 2.10.0
	 */
	var splitAt = function (n) {
	    return function (as) {
	        var m = Math.max(1, n);
	        return m >= as.length ? [as, exports.empty] : [(0, function_1.pipe)(as.slice(1, m), (0, exports.prepend)((0, exports.head)(as))), as.slice(m)];
	    };
	};
	exports.splitAt = splitAt;
	/**
	 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
	 * the `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.10.0
	 */
	var chunksOf = function (n) { return (0, exports.chop)((0, exports.splitAt)(n)); };
	exports.chunksOf = chunksOf;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	/* istanbul ignore next */
	var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	/* istanbul ignore next */
	var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
	/* istanbul ignore next */
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	/* istanbul ignore next */
	var _foldMap = function (M) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	/* istanbul ignore next */
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/* istanbul ignore next */
	var _reduceWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _foldMapWithIndex = function (M) {
	    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRightWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _traverseWithIndex = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
	};
	/**
	 * @category constructors
	 * @since 2.5.0
	 */
	exports.of = _.singleton;
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3] as RNEA.ReadonlyNonEmptyArray<number>,
	 *     RNEA.altW(() => ['a', 'b'])
	 *   ),
	 *   [1, 2, 3, 'a', 'b']
	 * )
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) {
	    return function (as) {
	        return (0, function_1.pipe)(as, concatW(that()));
	    };
	};
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `ReadonlyNonEmptyArray` concatenates the inputs into a single array.
	 *
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RNEA.alt(() => [4, 5])
	 *   ),
	 *   [1, 2, 3, 4, 5]
	 * )
	 *
	 * @category error handling
	 * @since 2.6.2
	 */
	exports.alt = exports.altW;
	/**
	 * @since 2.5.0
	 */
	var ap = function (as) { return (0, exports.flatMap)(function (f) { return (0, function_1.pipe)(as, (0, exports.map)(f)); }); };
	exports.ap = ap;
	/**
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RNEA.flatMap((n) => [`a${n}`, `b${n}`])
	 *   ),
	 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
	 * )
	 *
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (i, a) { return f(a, i); }));
	});
	/**
	 * @since 2.5.0
	 */
	var extend = function (f) {
	    return function (as) {
	        var next = (0, exports.tail)(as);
	        var out = [f(as)];
	        while ((0, exports.isNonEmpty)(next)) {
	            out.push(f(next));
	            next = (0, exports.tail)(next);
	        }
	        return out;
	    };
	};
	exports.extend = extend;
	/**
	 * @since 2.5.0
	 */
	exports.duplicate = 
	/*#__PURE__*/ (0, exports.extend)(function_1.identity);
	/**
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.flatten = 
	/*#__PURE__*/ (0, exports.flatMap)(function_1.identity);
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.5.0
	 */
	var map = function (f) {
	    return (0, exports.mapWithIndex)(function (_, a) { return f(a); });
	};
	exports.map = map;
	/**
	 * @category mapping
	 * @since 2.5.0
	 */
	var mapWithIndex = function (f) {
	    return function (as) {
	        var out = [f(0, (0, exports.head)(as))];
	        for (var i = 1; i < as.length; i++) {
	            out.push(f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.mapWithIndex = mapWithIndex;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduce = function (b, f) {
	    return (0, exports.reduceWithIndex)(b, function (_, b, a) { return f(b, a); });
	};
	exports.reduce = reduce;
	/**
	 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
	 *
	 * @category folding
	 * @since 2.5.0
	 */
	var foldMap = function (S) {
	    return function (f) {
	        return function (as) {
	            return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
	        };
	    };
	};
	exports.foldMap = foldMap;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceRight = function (b, f) {
	    return (0, exports.reduceRightWithIndex)(b, function (_, b, a) { return f(b, a); });
	};
	exports.reduceRight = reduceRight;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceWithIndex = function (b, f) {
	    return function (as) {
	        return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
	    };
	};
	exports.reduceWithIndex = reduceWithIndex;
	/**
	 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
	 *
	 * @category folding
	 * @since 2.5.0
	 */
	var foldMapWithIndex = function (S) {
	    return function (f) {
	        return function (as) {
	            return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0]));
	        };
	    };
	};
	exports.foldMapWithIndex = foldMapWithIndex;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceRightWithIndex = function (b, f) {
	    return function (as) {
	        return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
	    };
	};
	exports.reduceRightWithIndex = reduceRightWithIndex;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
	};
	exports.traverse = traverse;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) { return (0, exports.traverseWithIndex)(F)(function_1.SK); };
	exports.sequence = sequence;
	/**
	 * @category sequencing
	 * @since 2.6.3
	 */
	var traverseWithIndex = function (F) {
	    return function (f) {
	        return function (as) {
	            var out = F.map(f(0, (0, exports.head)(as)), exports.of);
	            for (var i = 1; i < as.length; i++) {
	                out = F.ap(F.map(out, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, as[i]));
	            }
	            return out;
	        };
	    };
	};
	exports.traverseWithIndex = traverseWithIndex;
	/**
	 * @category Comonad
	 * @since 2.6.3
	 */
	exports.extract = _.head;
	/**
	 * @category type lambdas
	 * @since 2.5.0
	 */
	exports.URI = 'ReadonlyNonEmptyArray';
	/**
	 * @category instances
	 * @since 2.5.0
	 */
	var getShow = function (S) { return ({
	    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
	}); };
	exports.getShow = getShow;
	/**
	 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getSemigroup = function () { return ({
	    concat: concat
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * @example
	 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * const E = getEq(N.Eq)
	 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
	 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getEq = function (E) {
	    return (0, Eq_1.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
	};
	exports.getEq = getEq;
	/**
	 * @since 2.11.0
	 */
	var getUnionSemigroup = function (E) {
	    var unionE = (0, exports.union)(E);
	    return {
	        concat: function (first, second) { return unionE(second)(first); }
	    };
	};
	exports.getUnionSemigroup = getUnionSemigroup;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.5.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.5.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.chainFirst(() => ['a', 'b'])
	 *   ),
	 *   [1, 1, 2, 2, 3, 3]
	 * )
	 *
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Comonad = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend,
	    extract: exports.extract
	};
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = (0, Chain_1.bind)(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.5.0
	 */
	exports.head = exports.extract;
	/**
	 * @since 2.5.0
	 */
	exports.tail = _.tail;
	/**
	 * @since 2.5.0
	 */
	var last = function (as) { return as[as.length - 1]; };
	exports.last = last;
	/**
	 * Get all but the last element of a non empty array, creating a new array.
	 *
	 * @example
	 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
	 * assert.deepStrictEqual(init([1]), [])
	 *
	 * @since 2.5.0
	 */
	var init = function (as) { return as.slice(0, -1); };
	exports.init = init;
	/**
	 * @since 2.5.0
	 */
	var min = function (O) {
	    var S = Se.min(O);
	    return function (as) { return as.reduce(S.concat); };
	};
	exports.min = min;
	/**
	 * @since 2.5.0
	 */
	var max = function (O) {
	    var S = Se.max(O);
	    return function (as) { return as.reduce(S.concat); };
	};
	exports.max = max;
	/**
	 * @since 2.10.0
	 */
	var concatAll = function (S) {
	    return function (as) {
	        return as.reduce(S.concat);
	    };
	};
	exports.concatAll = concatAll;
	/**
	 * Break a `ReadonlyArray` into its first element and remaining elements.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchLeft = function (f) {
	    return function (as) {
	        return f((0, exports.head)(as), (0, exports.tail)(as));
	    };
	};
	exports.matchLeft = matchLeft;
	/**
	 * Break a `ReadonlyArray` into its initial elements and the last element.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchRight = function (f) {
	    return function (as) {
	        return f((0, exports.init)(as), (0, exports.last)(as));
	    };
	};
	exports.matchRight = matchRight;
	/**
	 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var modifyHead = function (f) {
	    return function (as) {
	        return __spreadArray([f((0, exports.head)(as))], (0, exports.tail)(as), true);
	    };
	};
	exports.modifyHead = modifyHead;
	/**
	 * Change the head, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var updateHead = function (a) { return (0, exports.modifyHead)(function () { return a; }); };
	exports.updateHead = updateHead;
	/**
	 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var modifyLast = function (f) {
	    return function (as) {
	        return (0, function_1.pipe)((0, exports.init)(as), (0, exports.append)(f((0, exports.last)(as))));
	    };
	};
	exports.modifyLast = modifyLast;
	/**
	 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var updateLast = function (a) { return (0, exports.modifyLast)(function () { return a; }); };
	exports.updateLast = updateLast;
	/**
	 * Places an element in between members of a `ReadonlyNonEmptyArray`, then folds the results using the provided `Semigroup`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { intercalate } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
	 *
	 * @since 2.12.0
	 */
	var intercalate = function (S) {
	    var concatAllS = (0, exports.concatAll)(S);
	    return function (middle) { return (0, function_1.flow)((0, exports.intersperse)(middle), concatAllS); };
	};
	exports.intercalate = intercalate;
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.5.0
	 */
	exports.chain = exports.flatMap;
	function groupSort(O) {
	    var sortO = (0, exports.sort)(O);
	    var groupO = group(O);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : exports.empty); };
	}
	exports.groupSort = groupSort;
	function filter(predicate) {
	    return (0, exports.filterWithIndex)(function (_, a) { return predicate(a); });
	}
	exports.filter = filter;
	/**
	 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	var filterWithIndex = function (predicate) {
	    return function (as) {
	        return (0, exports.fromReadonlyArray)(as.filter(function (a, i) { return predicate(i, a); }));
	    };
	};
	exports.filterWithIndex = filterWithIndex;
	/**
	 * Use [`unprepend`](#unprepend) instead.
	 *
	 * @category zone of death
	 * @since 2.10.0
	 * @deprecated
	 */
	exports.uncons = exports.unprepend;
	/**
	 * Use [`unappend`](#unappend) instead.
	 *
	 * @category zone of death
	 * @since 2.10.0
	 * @deprecated
	 */
	exports.unsnoc = exports.unappend;
	function cons(head, tail) {
	    return tail === undefined ? (0, exports.prepend)(head) : (0, function_1.pipe)(tail, (0, exports.prepend)(head));
	}
	exports.cons = cons;
	/**
	 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	var snoc = function (init, end) { return (0, function_1.pipe)(init, concat([end])); };
	exports.snoc = snoc;
	/**
	 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	var insertAt = function (i, a) {
	    return function (as) {
	        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
	    };
	};
	exports.insertAt = insertAt;
	/**
	 * Use [`prependAll`](#prependall) instead.
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.prependToAll = exports.prependAll;
	/**
	 * Use [`concatAll`](#concatall) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.fold = exports.concatAll;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `RNEA.Functor` instead of `RNEA.readonlyNonEmptyArray`
	 * (where `RNEA` is from `import RNEA from 'fp-ts/ReadonlyNonEmptyArray'`)
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.readonlyNonEmptyArray = {
	    URI: exports.URI,
	    of: exports.of,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    ap: _ap,
	    chain: exports.flatMap,
	    extend: _extend,
	    extract: exports.extract,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex,
	    alt: _alt
	}; 
} (ReadonlyNonEmptyArray));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.endsWith = exports.startsWith = exports.includes = exports.split = exports.size = exports.isEmpty = exports.slice = exports.trimRight = exports.trimLeft = exports.trim = exports.replace = exports.toLowerCase = exports.toUpperCase = exports.isString = exports.Show = exports.Ord = exports.Monoid = exports.empty = exports.Semigroup = exports.Eq = void 0;
	var ReadonlyNonEmptyArray_1 = ReadonlyNonEmptyArray;
	// -------------------------------------------------------------------------------------
	// instances
	// -------------------------------------------------------------------------------------
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(S.Eq.equals('a', 'a'), true)
	 * assert.deepStrictEqual(S.Eq.equals('a', 'b'), false)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Eq = {
	    equals: function (first, second) { return first === second; }
	};
	/**
	 * `string` semigroup under concatenation.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(S.Semigroup.concat('a', 'b'), 'ab')
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Semigroup = {
	    concat: function (first, second) { return first + second; }
	};
	/**
	 * An empty `string`.
	 *
	 * @since 2.10.0
	 */
	exports.empty = '';
	/**
	 * `string` monoid under concatenation.
	 *
	 * The `empty` value is `''`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(S.Monoid.concat('a', 'b'), 'ab')
	 * assert.deepStrictEqual(S.Monoid.concat('a', S.Monoid.empty), 'a')
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monoid = {
	    concat: exports.Semigroup.concat,
	    empty: exports.empty
	};
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(S.Ord.compare('a', 'a'), 0)
	 * assert.deepStrictEqual(S.Ord.compare('a', 'b'), -1)
	 * assert.deepStrictEqual(S.Ord.compare('b', 'a'), 1)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Ord = {
	    equals: exports.Eq.equals,
	    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
	};
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(S.Show.show('a'), '"a"')
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Show = {
	    show: function (s) { return JSON.stringify(s); }
	};
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 *
	 * assert.deepStrictEqual(S.isString('a'), true)
	 * assert.deepStrictEqual(S.isString(1), false)
	 *
	 * @category refinements
	 * @since 2.11.0
	 */
	var isString = function (u) { return typeof u === 'string'; };
	exports.isString = isString;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
	 *
	 * @since 2.11.0
	 */
	var toUpperCase = function (s) { return s.toUpperCase(); };
	exports.toUpperCase = toUpperCase;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
	 *
	 * @since 2.11.0
	 */
	var toLowerCase = function (s) { return s.toLowerCase(); };
	exports.toLowerCase = toLowerCase;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
	 *
	 * @since 2.11.0
	 */
	var replace = function (searchValue, replaceValue) {
	    return function (s) {
	        return s.replace(searchValue, replaceValue);
	    };
	};
	exports.replace = replace;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
	 *
	 * @since 2.11.0
	 */
	var trim = function (s) { return s.trim(); };
	exports.trim = trim;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
	 *
	 * @since 2.11.0
	 */
	var trimLeft = function (s) { return s.trimLeft(); };
	exports.trimLeft = trimLeft;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
	 *
	 * @since 2.11.0
	 */
	var trimRight = function (s) { return s.trimRight(); };
	exports.trimRight = trimRight;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
	 *
	 * @since 2.11.0
	 */
	var slice = function (start, end) {
	    return function (s) {
	        return s.slice(start, end);
	    };
	};
	exports.slice = slice;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * Test whether a `string` is empty.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('', S.isEmpty), true)
	 * assert.deepStrictEqual(pipe('a', S.isEmpty), false)
	 *
	 * @since 2.10.0
	 */
	var isEmpty = function (s) { return s.length === 0; };
	exports.isEmpty = isEmpty;
	/**
	 * Calculate the number of characters in a `string`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abc', S.size), 3)
	 *
	 * @since 2.10.0
	 */
	var size = function (s) { return s.length; };
	exports.size = size;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
	 * assert.deepStrictEqual(pipe('', S.split('')), [''])
	 *
	 * @since 2.11.0
	 */
	var split = function (separator) {
	    return function (s) {
	        var out = s.split(separator);
	        return (0, ReadonlyNonEmptyArray_1.isNonEmpty)(out) ? out : [s];
	    };
	};
	exports.split = split;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
	 * assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
	 *
	 * @since 2.11.0
	 */
	var includes = function (searchString, position) {
	    return function (s) {
	        return s.includes(searchString, position);
	    };
	};
	exports.includes = includes;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
	 * assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
	 *
	 * @since 2.11.0
	 */
	var startsWith = function (searchString, position) {
	    return function (s) {
	        return s.startsWith(searchString, position);
	    };
	};
	exports.startsWith = startsWith;
	/**
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
	 * assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
	 *
	 * @since 2.11.0
	 */
	var endsWith = function (searchString, position) {
	    return function (s) {
	        return s.endsWith(searchString, position);
	    };
	};
	exports.endsWith = endsWith; 
} (string));

const ContractId = fromNewtype(lib.string);
const unContractId = iso().unwrap;
const contractId = iso().wrap;
const contractIdToTxId = (contractId) => _function.pipe(contractId, unContractId, string.split("#"), ReadonlyNonEmptyArray.head);

const AssetName = lib.string;
const AssetQuantity = lib.bigint;
const AssetId = lib.type({ policyId: PolicyId, assetName: AssetName });
const assetId = (policyId) => (assetName) => ({
    policyId: policyId,
    assetName: assetName,
});
const Token = lib.type({ quantity: AssetQuantity, assetId: AssetId });
const token = (quantity) => (assetId) => ({ quantity: quantity, assetId: assetId });
const lovelaces = (quantity) => token(quantity)(assetId(mkPolicyId(""))(""));
const Tokens = lib.array(Token);
const Assets = lib.type({ lovelaces: AssetQuantity, tokens: Tokens });
const assetIdToString = (assetId) => `${unPolicyId(assetId.policyId)}|${assetId.assetName}`;
const runtimeTokenToMarloweTokenValue = (runtimeToken) => ({
    amount: runtimeToken.quantity,
    token: {
        currency_symbol: unPolicyId(runtimeToken.assetId.policyId),
        token_name: runtimeToken.assetId.assetName,
    },
});

const PayoutId = fromNewtype(lib.string);
const unPayoutId = iso().unwrap;
const payoutId = iso().wrap;
const payoutIdToTxId = (payoutId) => _function.pipe(payoutId, unPayoutId, string.split("#"), ReadonlyNonEmptyArray.head);
const WithdrawalId = fromNewtype(lib.string);
const unWithdrawalId = iso().unwrap;
const withdrawalId = iso().wrap;
const withdrawalIdToTxId = (withdrawalId) => _function.pipe(withdrawalId, unWithdrawalId);
const PayoutAvailable = lib.type({
    payoutId: PayoutId,
    contractId: ContractId,
    role: AssetId,
    assets: Assets,
});
const PayoutWithdrawn = lib.type({
    withdrawalId: WithdrawalId,
    payoutId: PayoutId,
    contractId: ContractId,
    role: AssetId,
    assets: Assets,
});

export { AddressBech32, AddressesAndCollaterals, AssetId, AssetName, AssetQuantity, Assets, BlockHeader, ContractId, Metadata, Metadatum, MetadatumLabel, PayoutAvailable, PayoutId, PayoutWithdrawn, PolicyId, Tag, TagContent, Tags, TextEnvelope, Token, Tokens, TxId, TxOutRef, WithdrawalId, addressBech32, assetId, assetIdToString, bigint, contractId, contractIdToTxId, isBigIntOrNumber, lovelaces, mkPolicyId, noTags, payoutId, payoutIdToTxId, runtimeTokenToMarloweTokenValue, token, transactionWitnessSetTextEnvelope, txOutRef, unAddressBech32, unContractId, unPayoutId, unPolicyId, unTxOutRef, unWithdrawalId, withdrawalId, withdrawalIdToTxId };
