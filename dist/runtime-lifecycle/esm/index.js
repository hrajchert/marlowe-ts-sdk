import { createBrowserWallet } from '@marlowe.io/wallet/browser';
import { getAddressesAndCollaterals } from '@marlowe.io/wallet/api';
import { contractIdToTxId, withdrawalIdToTxId, token, assetId, mkPolicyId } from '@marlowe.io/runtime-core';
import * as Tx from '@marlowe.io/runtime-rest-client/transaction';
import { tryCatchDefault, unsafeTaskEither } from '@marlowe.io/adapter/fp-ts';
import { mkEnvironment } from '@marlowe.io/language-core-v1/environment';
import { mkRestClient } from '@marlowe.io/runtime-rest-client';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var TaskEither = {};

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

var __createBinding$4 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
var __setModuleDefault$4 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$4 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);
    __setModuleDefault$4(result, mod);
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
var function_1$8 = _function;
var _$2 = __importStar$4(internal);
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
        tupleConstructors[len] = curried(function_1$8.tuple, len - 1, []);
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
var function_1$7 = _function;
function map$1(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
Functor.map = map$1;
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
    var _map = map$1(F, G);
    return {
        map: function (fga, f) { return (0, function_1$7.pipe)(fga, _map(f)); }
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
var Apply_1$1 = Apply;
var function_1$6 = _function;
var Functor_1$3 = Functor;
function getApplicativeMonoid(F) {
    var f = (0, Apply_1$1.getApplySemigroup)(F);
    return function (M) { return ({
        concat: f(M).concat,
        empty: F.of(M.empty)
    }); };
}
Applicative.getApplicativeMonoid = getApplicativeMonoid;
/** @deprecated */
function getApplicativeComposition(F, G) {
    var map = (0, Functor_1$3.getFunctorComposition)(F, G).map;
    var _ap = (0, Apply_1$1.ap)(F, G);
    return {
        map: map,
        of: function (a) { return F.of(G.of(a)); },
        ap: function (fgab, fga) { return (0, function_1$6.pipe)(fgab, _ap(fga)); }
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

var Compactable = {};

var Option = {};

var FromEither = {};

/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */
var __createBinding$3 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
var __setModuleDefault$3 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$3 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);
    __setModuleDefault$3(result, mod);
    return result;
};
Object.defineProperty(FromEither, "__esModule", { value: true });
FromEither.tapEither = FromEither.filterOrElse = FromEither.chainFirstEitherK = FromEither.chainEitherK = FromEither.fromEitherK = FromEither.chainOptionK = FromEither.fromOptionK = FromEither.fromPredicate = FromEither.fromOption = void 0;
var Chain_1$2 = Chain;
var function_1$5 = _function;
var _$1 = __importStar$3(internal);
function fromOption(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_$1.isNone(ma) ? _$1.left(onNone()) : _$1.right(ma.value)); }; };
}
FromEither.fromOption = fromOption;
function fromPredicate(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a)));
        };
    };
}
FromEither.fromPredicate = fromPredicate;
function fromOptionK(F) {
    var fromOptionF = fromOption(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return (0, function_1$5.flow)(f, from); };
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
    return function (f) { return (0, function_1$5.flow)(f, F.fromEither); };
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
    var tapM = (0, Chain_1$2.tap)(M);
    return function (self, f) { return tapM(self, fromEither(f)); };
}
FromEither.tapEither = tapEither;

var Predicate = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.and = exports.or = exports.not = exports.Contravariant = exports.getMonoidAll = exports.getSemigroupAll = exports.getMonoidAny = exports.getSemigroupAny = exports.URI = exports.contramap = void 0;
	var function_1 = _function;
	var contramap_ = function (predicate, f) { return (0, function_1.pipe)(predicate, (0, exports.contramap)(f)); };
	/**
	 * @since 2.11.0
	 */
	var contramap = function (f) {
	    return function (predicate) {
	        return (0, function_1.flow)(f, predicate);
	    };
	};
	exports.contramap = contramap;
	/**
	 * @category type lambdas
	 * @since 2.11.0
	 */
	exports.URI = 'Predicate';
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getSemigroupAny = function () { return ({
	    concat: function (first, second) { return (0, function_1.pipe)(first, (0, exports.or)(second)); }
	}); };
	exports.getSemigroupAny = getSemigroupAny;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getMonoidAny = function () { return ({
	    concat: (0, exports.getSemigroupAny)().concat,
	    empty: function_1.constFalse
	}); };
	exports.getMonoidAny = getMonoidAny;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getSemigroupAll = function () { return ({
	    concat: function (first, second) { return (0, function_1.pipe)(first, (0, exports.and)(second)); }
	}); };
	exports.getSemigroupAll = getSemigroupAll;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getMonoidAll = function () { return ({
	    concat: (0, exports.getSemigroupAll)().concat,
	    empty: function_1.constTrue
	}); };
	exports.getMonoidAll = getMonoidAll;
	/**
	 * @category instances
	 * @since 2.11.0
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
	var not = function (predicate) {
	    return function (a) {
	        return !predicate(a);
	    };
	};
	exports.not = not;
	/**
	 * @since 2.11.0
	 */
	var or = function (second) {
	    return function (first) {
	        return function (a) {
	            return first(a) || second(a);
	        };
	    };
	};
	exports.or = or;
	/**
	 * @since 2.11.0
	 */
	var and = function (second) {
	    return function (first) {
	        return function (a) {
	            return first(a) && second(a);
	        };
	    };
	};
	exports.and = and; 
} (Predicate));

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

var Ord = {};

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
Object.defineProperty(Witherable, "__esModule", { value: true });
Witherable.filterE = Witherable.witherDefault = Witherable.wiltDefault = void 0;
var _ = __importStar$2(internal);
function wiltDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
Witherable.wiltDefault = wiltDefault;
function witherDefault(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}
Witherable.witherDefault = witherDefault;
function filterE(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? _.some(a) : _.none); }); }); }; };
    };
}
Witherable.filterE = filterE;

var Zero = {};

Object.defineProperty(Zero, "__esModule", { value: true });
Zero.guard = void 0;
function guard(F, P) {
    return function (b) { return (b ? P.of(undefined) : F.zero()); };
}
Zero.guard = guard;

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
	exports.Witherable = exports.wilt = exports.wither = exports.Traversable = exports.sequence = exports.traverse = exports.Filterable = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.Compactable = exports.separate = exports.compact = exports.Extend = exports.extend = exports.Alternative = exports.guard = exports.Zero = exports.zero = exports.Alt = exports.alt = exports.altW = exports.orElse = exports.Foldable = exports.reduceRight = exports.foldMap = exports.reduce = exports.Monad = exports.Chain = exports.flatMap = exports.Applicative = exports.Apply = exports.ap = exports.Pointed = exports.of = exports.asUnit = exports.as = exports.Functor = exports.map = exports.getMonoid = exports.getOrd = exports.getEq = exports.getShow = exports.URI = exports.getRight = exports.getLeft = exports.fromPredicate = exports.some = exports.none = void 0;
	exports.getFirstMonoid = exports.getApplyMonoid = exports.getApplySemigroup = exports.option = exports.mapNullable = exports.getRefinement = exports.chainFirst = exports.chain = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.exists = exports.elem = exports.toUndefined = exports.toNullable = exports.chainNullableK = exports.fromNullableK = exports.tryCatchK = exports.tryCatch = exports.fromNullable = exports.chainFirstEitherK = exports.chainEitherK = exports.fromEitherK = exports.duplicate = exports.tapEither = exports.tap = exports.flatten = exports.apSecond = exports.apFirst = exports.flap = exports.getOrElse = exports.getOrElseW = exports.fold = exports.match = exports.foldW = exports.matchW = exports.isNone = exports.isSome = exports.FromEither = exports.fromEither = exports.MonadThrow = exports.throwError = void 0;
	exports.getLastMonoid = void 0;
	var Applicative_1 = Applicative;
	var Apply_1 = Apply;
	var chainable = __importStar(Chain);
	var FromEither_1 = FromEither;
	var function_1 = _function;
	var Functor_1 = Functor;
	var _ = __importStar(internal);
	var Predicate_1 = Predicate;
	var Semigroup_1 = Semigroup;
	var Separated_1 = Separated;
	var Witherable_1 = Witherable;
	var Zero_1 = Zero;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.none = _.none;
	/**
	 * Constructs a `Some`. Represents an optional value that exists.
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.some = _.some;
	function fromPredicate(predicate) {
	    return function (a) { return (predicate(a) ? (0, exports.some)(a) : exports.none); };
	}
	exports.fromPredicate = fromPredicate;
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
	var getLeft = function (ma) { return (ma._tag === 'Right' ? exports.none : (0, exports.some)(ma.left)); };
	exports.getLeft = getLeft;
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
	var getRight = function (ma) { return (ma._tag === 'Left' ? exports.none : (0, exports.some)(ma.right)); };
	exports.getRight = getRight;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	var _foldMap = function (M) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
	};
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	var _filter = function (fa, predicate) { return (0, function_1.pipe)(fa, (0, exports.filter)(predicate)); };
	/* istanbul ignore next */
	var _filterMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMap)(f)); };
	/* istanbul ignore next */
	var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
	/* istanbul ignore next */
	var _partition = function (fa, predicate) {
	    return (0, function_1.pipe)(fa, (0, exports.partition)(predicate));
	};
	/* istanbul ignore next */
	var _partitionMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMap)(f)); };
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Option';
	/**
	 * @category instances
	 * @since 2.0.0
	 */
	var getShow = function (S) { return ({
	    show: function (ma) { return ((0, exports.isNone)(ma) ? 'none' : "some(".concat(S.show(ma.value), ")")); }
	}); };
	exports.getShow = getShow;
	/**
	 * @example
	 * import { none, some, getEq } from 'fp-ts/Option'
	 * import * as N from 'fp-ts/number'
	 *
	 * const E = getEq(N.Eq)
	 * assert.strictEqual(E.equals(none, none), true)
	 * assert.strictEqual(E.equals(none, some(1)), false)
	 * assert.strictEqual(E.equals(some(1), none), false)
	 * assert.strictEqual(E.equals(some(1), some(2)), false)
	 * assert.strictEqual(E.equals(some(1), some(1)), true)
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getEq = function (E) { return ({
	    equals: function (x, y) { return x === y || ((0, exports.isNone)(x) ? (0, exports.isNone)(y) : (0, exports.isNone)(y) ? false : E.equals(x.value, y.value)); }
	}); };
	exports.getEq = getEq;
	/**
	 * The `Ord` instance allows `Option` values to be compared with
	 * `compare`, whenever there is an `Ord` instance for
	 * the type the `Option` contains.
	 *
	 * `None` is considered to be less than any `Some` value.
	 *
	 *
	 * @example
	 * import { none, some, getOrd } from 'fp-ts/Option'
	 * import * as N from 'fp-ts/number'
	 *
	 * const O = getOrd(N.Ord)
	 * assert.strictEqual(O.compare(none, none), 0)
	 * assert.strictEqual(O.compare(none, some(1)), -1)
	 * assert.strictEqual(O.compare(some(1), none), 1)
	 * assert.strictEqual(O.compare(some(1), some(2)), -1)
	 * assert.strictEqual(O.compare(some(1), some(1)), 0)
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getOrd = function (O) { return ({
	    equals: (0, exports.getEq)(O).equals,
	    compare: function (x, y) { return (x === y ? 0 : (0, exports.isSome)(x) ? ((0, exports.isSome)(y) ? O.compare(x.value, y.value) : 1) : -1); }
	}); };
	exports.getOrd = getOrd;
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
	var getMonoid = function (S) { return ({
	    concat: function (x, y) { return ((0, exports.isNone)(x) ? y : (0, exports.isNone)(y) ? x : (0, exports.some)(S.concat(x.value, y.value))); },
	    empty: exports.none
	}); };
	exports.getMonoid = getMonoid;
	/**
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) {
	    return (0, exports.isNone)(fa) ? exports.none : (0, exports.some)(f(fa.value));
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
	 * Maps the `Some` value of this `Option` to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the `Some` value of this `Option` to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category constructors
	 * @since 2.7.0
	 */
	exports.of = exports.some;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * @since 2.0.0
	 */
	var ap = function (fa) { return function (fab) {
	    return (0, exports.isNone)(fab) ? exports.none : (0, exports.isNone)(fa) ? exports.none : (0, exports.some)(fab.value(fa.value));
	}; };
	exports.ap = ap;
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
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) { return ((0, exports.isNone)(ma) ? exports.none : f(ma.value)); });
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
	 * @category folding
	 * @since 2.0.0
	 */
	var reduce = function (b, f) { return function (fa) {
	    return (0, exports.isNone)(fa) ? b : f(b, fa.value);
	}; };
	exports.reduce = reduce;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	var foldMap = function (M) { return function (f) { return function (fa) {
	    return (0, exports.isNone)(fa) ? M.empty : f(fa.value);
	}; }; };
	exports.foldMap = foldMap;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	var reduceRight = function (b, f) { return function (fa) {
	    return (0, exports.isNone)(fa) ? b : f(fa.value, b);
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
	exports.orElse = (0, function_1.dual)(2, function (self, that) { return ((0, exports.isNone)(self) ? that() : self); });
	/**
	 * Alias of `orElse`.
	 *
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @category legacy
	 * @since 2.9.0
	 */
	exports.altW = exports.orElse;
	/**
	 * Alias of `orElse`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.alt = exports.orElse;
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
	 * @since 2.7.0
	 */
	var zero = function () { return exports.none; };
	exports.zero = zero;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.Zero = {
	    URI: exports.URI,
	    zero: exports.zero
	};
	/**
	 * @category do notation
	 * @since 2.11.0
	 */
	exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alternative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    alt: _alt,
	    zero: exports.zero
	};
	/**
	 * @since 2.0.0
	 */
	var extend = function (f) { return function (wa) {
	    return (0, exports.isNone)(wa) ? exports.none : (0, exports.some)(f(wa));
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
	 * @category filtering
	 * @since 2.0.0
	 */
	exports.compact = (0, exports.flatMap)(function_1.identity);
	var defaultSeparated = /*#__PURE__*/ (0, Separated_1.separated)(exports.none, exports.none);
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	var separate = function (ma) {
	    return (0, exports.isNone)(ma) ? defaultSeparated : (0, Separated_1.separated)((0, exports.getLeft)(ma.value), (0, exports.getRight)(ma.value));
	};
	exports.separate = separate;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Compactable = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate
	};
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	var filter = function (predicate) {
	    return function (fa) {
	        return (0, exports.isNone)(fa) ? exports.none : predicate(fa.value) ? fa : exports.none;
	    };
	};
	exports.filter = filter;
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	var filterMap = function (f) { return function (fa) {
	    return (0, exports.isNone)(fa) ? exports.none : f(fa.value);
	}; };
	exports.filterMap = filterMap;
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	var partition = function (predicate) {
	    return function (fa) {
	        return (0, Separated_1.separated)(_filter(fa, (0, Predicate_1.not)(predicate)), _filter(fa, predicate));
	    };
	};
	exports.partition = partition;
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	var partitionMap = function (f) { return (0, function_1.flow)((0, exports.map)(f), exports.separate); };
	exports.partitionMap = partitionMap;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Filterable = {
	    URI: exports.URI,
	    map: _map,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap
	};
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    return function (f) {
	        return function (ta) {
	            return (0, exports.isNone)(ta) ? F.of(exports.none) : F.map(f(ta.value), exports.some);
	        };
	    };
	};
	exports.traverse = traverse;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) {
	    return function (ta) {
	        return (0, exports.isNone)(ta) ? F.of(exports.none) : F.map(ta.value, exports.some);
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
	var _wither = /*#__PURE__*/ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
	var _wilt = /*#__PURE__*/ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
	/**
	 * @category filtering
	 * @since 2.6.5
	 */
	var wither = function (F) {
	    var _witherF = _wither(F);
	    return function (f) { return function (fa) { return _witherF(fa, f); }; };
	};
	exports.wither = wither;
	/**
	 * @category filtering
	 * @since 2.6.5
	 */
	var wilt = function (F) {
	    var _wiltF = _wilt(F);
	    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
	};
	exports.wilt = wilt;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Witherable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    wither: _wither,
	    wilt: _wilt
	};
	/**
	 * @since 2.7.0
	 */
	var throwError = function () { return exports.none; };
	exports.throwError = throwError;
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
	 * Transforms an `Either` to an `Option` discarding the error.
	 *
	 * Alias of [getRight](#getright)
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromEither = exports.getRight;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: exports.fromEither
	};
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
	 *
	 * @example
	 * import { some, none, isSome } from 'fp-ts/Option'
	 *
	 * assert.strictEqual(isSome(some(1)), true)
	 * assert.strictEqual(isSome(none), false)
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	exports.isSome = _.isSome;
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
	exports.isNone = isNone;
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
	        return (0, exports.isNone)(ma) ? onNone() : onSome(ma.value);
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
	var getOrElseW = function (onNone) {
	    return function (ma) {
	        return (0, exports.isNone)(ma) ? onNone() : ma.value;
	    };
	};
	exports.getOrElseW = getOrElseW;
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
	exports.getOrElse = exports.getOrElseW;
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
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = exports.compact;
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as O from 'fp-ts/Option'
	 * import * as E from 'fp-ts/Either'
	 *
	 * const compute = (value: number) => pipe(
	 *   O.of(value),
	 *   O.tapEither((value) => value > 0 ? E.right('ok') : E.left('error')),
	 * )
	 *
	 * assert.deepStrictEqual(compute(1), O.of(1))
	 * assert.deepStrictEqual(compute(-42), O.none)
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapEither = (0, function_1.dual)(2, (0, FromEither_1.tapEither)(exports.FromEither, exports.Chain));
	/**
	 * @since 2.0.0
	 */
	exports.duplicate = (0, exports.extend)(function_1.identity);
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
	/**
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.chainEitherK = 
	/*#__PURE__*/ (0, FromEither_1.chainEitherK)(exports.FromEither, exports.Chain);
	/**
	 * Alias of `tapEither`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherK = exports.tapEither;
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
	var fromNullable = function (a) { return (a == null ? exports.none : (0, exports.some)(a)); };
	exports.fromNullable = fromNullable;
	/**
	 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
	 * `Some`.
	 *
	 * See also [`tryCatchK`](#trycatchk).
	 *
	 * @example
	 * import { none, some, tryCatch } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(
	 *   tryCatch(() => {
	 *     throw new Error()
	 *   }),
	 *   none
	 * )
	 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
	 *
	 * @category interop
	 * @since 2.0.0
	 */
	var tryCatch = function (f) {
	    try {
	        return (0, exports.some)(f());
	    }
	    catch (e) {
	        return exports.none;
	    }
	};
	exports.tryCatch = tryCatch;
	/**
	 * Converts a function that may throw to one returning a `Option`.
	 *
	 * @category interop
	 * @since 2.10.0
	 */
	var tryCatchK = function (f) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.tryCatch)(function () { return f.apply(void 0, a); });
	    };
	};
	exports.tryCatchK = tryCatchK;
	/**
	 * Returns a *smart constructor* from a function that returns a nullable value.
	 *
	 * @example
	 * import { fromNullableK, none, some } from 'fp-ts/Option'
	 *
	 * const f = (s: string): number | undefined => {
	 *   const n = parseFloat(s)
	 *   return isNaN(n) ? undefined : n
	 * }
	 *
	 * const g = fromNullableK(f)
	 *
	 * assert.deepStrictEqual(g('1'), some(1))
	 * assert.deepStrictEqual(g('a'), none)
	 *
	 * @category lifting
	 * @since 2.9.0
	 */
	var fromNullableK = function (f) { return (0, function_1.flow)(f, exports.fromNullable); };
	exports.fromNullableK = fromNullableK;
	/**
	 * This is `chain` + `fromNullable`, useful when working with optional values.
	 *
	 * @example
	 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * interface Employee {
	 *   readonly company?: {
	 *     readonly address?: {
	 *       readonly street?: {
	 *         readonly name?: string
	 *       }
	 *     }
	 *   }
	 * }
	 *
	 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     fromNullable(employee1.company),
	 *     chainNullableK(company => company.address),
	 *     chainNullableK(address => address.street),
	 *     chainNullableK(street => street.name)
	 *   ),
	 *   some('high street')
	 * )
	 *
	 * const employee2: Employee = { company: { address: { street: {} } } }
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     fromNullable(employee2.company),
	 *     chainNullableK(company => company.address),
	 *     chainNullableK(address => address.street),
	 *     chainNullableK(street => street.name)
	 *   ),
	 *   none
	 * )
	 *
	 * @category sequencing
	 * @since 2.9.0
	 */
	var chainNullableK = function (f) {
	    return function (ma) {
	        return (0, exports.isNone)(ma) ? exports.none : (0, exports.fromNullable)(f(ma.value));
	    };
	};
	exports.chainNullableK = chainNullableK;
	/**
	 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
	 *
	 * @example
	 * import { some, none, toNullable } from 'fp-ts/Option'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.strictEqual(
	 *   pipe(
	 *     some(1),
	 *     toNullable
	 *   ),
	 *   1
	 * )
	 * assert.strictEqual(
	 *   pipe(
	 *     none,
	 *     toNullable
	 *   ),
	 *   null
	 * )
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.toNullable = (0, exports.match)(function_1.constNull, function_1.identity);
	/**
	 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
	 *
	 * @example
	 * import { some, none, toUndefined } from 'fp-ts/Option'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.strictEqual(
	 *   pipe(
	 *     some(1),
	 *     toUndefined
	 *   ),
	 *   1
	 * )
	 * assert.strictEqual(
	 *   pipe(
	 *     none,
	 *     toUndefined
	 *   ),
	 *   undefined
	 * )
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.toUndefined = (0, exports.match)(function_1.constUndefined, function_1.identity);
	function elem(E) {
	    return function (a, ma) {
	        if (ma === undefined) {
	            var elemE_1 = elem(E);
	            return function (ma) { return elemE_1(a, ma); };
	        }
	        return (0, exports.isNone)(ma) ? false : E.equals(a, ma.value);
	    };
	}
	exports.elem = elem;
	/**
	 * Returns `true` if the predicate is satisfied by the wrapped value
	 *
	 * @example
	 * import { some, none, exists } from 'fp-ts/Option'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.strictEqual(
	 *   pipe(
	 *     some(1),
	 *     exists(n => n > 0)
	 *   ),
	 *   true
	 * )
	 * assert.strictEqual(
	 *   pipe(
	 *     some(1),
	 *     exists(n => n > 1)
	 *   ),
	 *   false
	 * )
	 * assert.strictEqual(
	 *   pipe(
	 *     none,
	 *     exists(n => n > 0)
	 *   ),
	 *   false
	 * )
	 *
	 * @since 2.0.0
	 */
	var exists = function (predicate) {
	    return function (ma) {
	        return (0, exports.isNone)(ma) ? false : predicate(ma.value);
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
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
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
	        var o = f(0, _.head(as));
	        if ((0, exports.isNone)(o)) {
	            return exports.none;
	        }
	        var out = [o.value];
	        for (var i = 1; i < as.length; i++) {
	            var o_1 = f(i, as[i]);
	            if ((0, exports.isNone)(o_1)) {
	                return exports.none;
	            }
	            out.push(o_1.value);
	        }
	        return (0, exports.some)(out);
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
	var traverseArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); });
	};
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
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * Use `Refinement` module instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function getRefinement(getOption) {
	    return function (a) { return (0, exports.isSome)(getOption(a)); };
	}
	exports.getRefinement = getRefinement;
	/**
	 * Use [`chainNullableK`](#chainnullablek) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.mapNullable = exports.chainNullableK;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `O.Functor` instead of `O.option`
	 * (where `O` is from `import O from 'fp-ts/Option'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.option = {
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
	    zero: exports.zero,
	    alt: _alt,
	    extend: _extend,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    wither: _wither,
	    wilt: _wilt,
	    throwError: exports.throwError
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplySemigroup = (0, Apply_1.getApplySemigroup)(exports.Apply);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplyMonoid = (0, Applicative_1.getApplicativeMonoid)(exports.Applicative);
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
	var getFirstMonoid = function () { return (0, exports.getMonoid)((0, Semigroup_1.first)()); };
	exports.getFirstMonoid = getFirstMonoid;
	/**
	 * Use
	 *
	 * ```ts
	 * import { last } from 'fp-ts/Semigroup'
	 * import { getMonoid } from 'fp-ts/Option'
	 *
	 * getMonoid(last())
	 * ```
	 *
	 * instead.
	 *
	 * Monoid returning the right-most non-`None` value
	 *
	 * | x       | y       | concat(x, y) |
	 * | ------- | ------- | ------------ |
	 * | none    | none    | none         |
	 * | some(a) | none    | some(a)      |
	 * | none    | some(b) | some(b)      |
	 * | some(a) | some(b) | some(b)      |
	 *
	 * @example
	 * import { getLastMonoid, some, none } from 'fp-ts/Option'
	 *
	 * const M = getLastMonoid<number>()
	 * assert.deepStrictEqual(M.concat(none, none), none)
	 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
	 * assert.deepStrictEqual(M.concat(none, some(2)), some(2))
	 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getLastMonoid = function () { return (0, exports.getMonoid)((0, Semigroup_1.last)()); };
	exports.getLastMonoid = getLastMonoid; 
} (Option));

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
Object.defineProperty(Compactable, "__esModule", { value: true });
Compactable.getCompactableComposition = Compactable.separate = Compactable.compact = void 0;
var function_1$4 = _function;
var Functor_1$2 = Functor;
var Option_1$1 = Option;
var S = __importStar$1(Separated);
function compact(F, G) {
    return function (fga) { return F.map(fga, G.compact); };
}
Compactable.compact = compact;
function separate(F, C, G) {
    var _compact = compact(F, C);
    var _map = (0, Functor_1$2.map)(F, G);
    return function (fge) { return S.separated(_compact((0, function_1$4.pipe)(fge, _map(Option_1$1.getLeft))), _compact((0, function_1$4.pipe)(fge, _map(Option_1$1.getRight)))); };
}
Compactable.separate = separate;
/** @deprecated */
function getCompactableComposition(F, G) {
    var map = (0, Functor_1$2.getFunctorComposition)(F, G).map;
    return {
        map: map,
        compact: compact(F, G),
        separate: separate(F, G, G)
    };
}
Compactable.getCompactableComposition = getCompactableComposition;

var Either = {};

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

var EitherT = {};

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
Object.defineProperty(EitherT, "__esModule", { value: true });
EitherT.getEitherM = EitherT.toUnion = EitherT.swap = EitherT.orLeft = EitherT.tapError = EitherT.orElseFirst = EitherT.orElse = EitherT.getOrElse = EitherT.matchE = EitherT.match = EitherT.altValidation = EitherT.mapError = EitherT.mapLeft = EitherT.mapBoth = EitherT.bimap = EitherT.alt = EitherT.flatMap = EitherT.chain = EitherT.ap = EitherT.map = EitherT.chainNullableK = EitherT.fromNullableK = EitherT.fromNullable = EitherT.leftF = EitherT.rightF = EitherT.left = EitherT.right = void 0;
var Apply_1 = Apply;
var E = __importStar(Either);
var function_1$3 = _function;
var Functor_1$1 = Functor;
function right(F) {
    return (0, function_1$3.flow)(E.right, F.of);
}
EitherT.right = right;
function left(F) {
    return (0, function_1$3.flow)(E.left, F.of);
}
EitherT.left = left;
function rightF(F) {
    return function (fa) { return F.map(fa, E.right); };
}
EitherT.rightF = rightF;
function leftF(F) {
    return function (fe) { return F.map(fe, E.left); };
}
EitherT.leftF = leftF;
function fromNullable(F) {
    return function (e) { return (0, function_1$3.flow)(E.fromNullable(e), F.of); };
}
EitherT.fromNullable = fromNullable;
function fromNullableK(F) {
    var fromNullableF = fromNullable(F);
    return function (e) {
        var fromNullableFE = fromNullableF(e);
        return function (f) { return (0, function_1$3.flow)(f, fromNullableFE); };
    };
}
EitherT.fromNullableK = fromNullableK;
function chainNullableK(M) {
    var chainM = chain(M);
    var fromNullableKM = fromNullableK(M);
    return function (e) {
        var fromNullableKMe = fromNullableKM(e);
        return function (f) { return chainM(fromNullableKMe(f)); };
    };
}
EitherT.chainNullableK = chainNullableK;
function map(F) {
    return (0, Functor_1$1.map)(F, E.Functor);
}
EitherT.map = map;
function ap(F) {
    return (0, Apply_1.ap)(F, E.Apply);
}
EitherT.ap = ap;
function chain(M) {
    var flatMapM = flatMap(M);
    return function (f) { return function (ma) { return flatMapM(ma, f); }; };
}
EitherT.chain = chain;
/** @internal */
function flatMap(M) {
    return function (ma, f) { return M.chain(ma, function (e) { return (E.isLeft(e) ? M.of(e) : f(e.right)); }); };
}
EitherT.flatMap = flatMap;
function alt(M) {
    return function (second) { return function (first) { return M.chain(first, function (e) { return (E.isLeft(e) ? second() : M.of(e)); }); }; };
}
EitherT.alt = alt;
function bimap(F) {
    var mapBothF = mapBoth(F);
    return function (f, g) { return function (self) { return mapBothF(self, f, g); }; };
}
EitherT.bimap = bimap;
/** @internal */
function mapBoth(F) {
    return function (self, f, g) { return F.map(self, E.bimap(f, g)); };
}
EitherT.mapBoth = mapBoth;
function mapLeft(F) {
    var mapErrorF = mapError(F);
    return function (f) { return function (self) { return mapErrorF(self, f); }; };
}
EitherT.mapLeft = mapLeft;
/** @internal */
function mapError(F) {
    return function (self, f) { return F.map(self, E.mapLeft(f)); };
}
EitherT.mapError = mapError;
function altValidation(M, S) {
    return function (second) { return function (first) {
        return M.chain(first, E.match(function (e1) {
            return M.map(second(), E.mapLeft(function (e2) { return S.concat(e1, e2); }));
        }, right(M)));
    }; };
}
EitherT.altValidation = altValidation;
function match(F) {
    return function (onLeft, onRight) { return function (ma) { return F.map(ma, E.match(onLeft, onRight)); }; };
}
EitherT.match = match;
function matchE(M) {
    return function (onLeft, onRight) { return function (ma) { return M.chain(ma, E.match(onLeft, onRight)); }; };
}
EitherT.matchE = matchE;
function getOrElse(M) {
    return function (onLeft) { return function (ma) { return M.chain(ma, E.match(onLeft, M.of)); }; };
}
EitherT.getOrElse = getOrElse;
function orElse(M) {
    return function (onLeft) { return function (ma) { return M.chain(ma, function (e) { return (E.isLeft(e) ? onLeft(e.left) : M.of(e)); }); }; };
}
EitherT.orElse = orElse;
function orElseFirst(M) {
    var tapErrorM = tapError(M);
    return function (onLeft) { return function (ma) { return tapErrorM(ma, onLeft); }; };
}
EitherT.orElseFirst = orElseFirst;
/** @internal */
function tapError(M) {
    var orElseM = orElse(M);
    return function (ma, onLeft) {
        return (0, function_1$3.pipe)(ma, orElseM(function (e) { return M.map(onLeft(e), function (eb) { return (E.isLeft(eb) ? eb : E.left(e)); }); }));
    };
}
EitherT.tapError = tapError;
function orLeft(M) {
    return function (onLeft) { return function (ma) {
        return M.chain(ma, E.match(function (e) { return M.map(onLeft(e), E.left); }, function (a) { return M.of(E.right(a)); }));
    }; };
}
EitherT.orLeft = orLeft;
function swap(F) {
    return function (ma) { return F.map(ma, E.swap); };
}
EitherT.swap = swap;
function toUnion(F) {
    return function (fa) { return F.map(fa, E.toUnion); };
}
EitherT.toUnion = toUnion;
/** @deprecated  */
/* istanbul ignore next */
function getEitherM(M) {
    var _ap = ap(M);
    var _map = map(M);
    var _chain = chain(M);
    var _alt = alt(M);
    var _bimap = bimap(M);
    var _mapLeft = mapLeft(M);
    var _fold = matchE(M);
    var _getOrElse = getOrElse(M);
    var _orElse = orElse(M);
    return {
        map: function (fa, f) { return (0, function_1$3.pipe)(fa, _map(f)); },
        ap: function (fab, fa) { return (0, function_1$3.pipe)(fab, _ap(fa)); },
        of: right(M),
        chain: function (ma, f) { return (0, function_1$3.pipe)(ma, _chain(f)); },
        alt: function (fa, that) { return (0, function_1$3.pipe)(fa, _alt(that)); },
        bimap: function (fea, f, g) { return (0, function_1$3.pipe)(fea, _bimap(f, g)); },
        mapLeft: function (fea, f) { return (0, function_1$3.pipe)(fea, _mapLeft(f)); },
        fold: function (fa, onLeft, onRight) { return (0, function_1$3.pipe)(fa, _fold(onLeft, onRight)); },
        getOrElse: function (fa, onLeft) { return (0, function_1$3.pipe)(fa, _getOrElse(onLeft)); },
        orElse: function (fa, f) { return (0, function_1$3.pipe)(fa, _orElse(f)); },
        swap: swap(M),
        rightM: rightF(M),
        leftM: leftF(M),
        left: left(M)
    };
}
EitherT.getEitherM = getEitherM;

var Filterable = {};

Object.defineProperty(Filterable, "__esModule", { value: true });
Filterable.getFilterableComposition = Filterable.partitionMap = Filterable.partition = Filterable.filterMap = Filterable.filter = void 0;
/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
var Compactable_1 = Compactable;
var function_1$2 = _function;
var Functor_1 = Functor;
var Option_1 = Option;
var Predicate_1 = Predicate;
var Separated_1 = Separated;
function filter(F, G) {
    return function (predicate) { return function (fga) { return F.map(fga, function (ga) { return G.filter(ga, predicate); }); }; };
}
Filterable.filter = filter;
function filterMap(F, G) {
    return function (f) { return function (fga) { return F.map(fga, function (ga) { return G.filterMap(ga, f); }); }; };
}
Filterable.filterMap = filterMap;
function partition(F, G) {
    var _filter = filter(F, G);
    return function (predicate) {
        var left = _filter((0, Predicate_1.not)(predicate));
        var right = _filter(predicate);
        return function (fgb) { return (0, Separated_1.separated)(left(fgb), right(fgb)); };
    };
}
Filterable.partition = partition;
function partitionMap(F, G) {
    var _filterMap = filterMap(F, G);
    return function (f) { return function (fga) {
        return (0, Separated_1.separated)((0, function_1$2.pipe)(fga, _filterMap(function (a) { return (0, Option_1.getLeft)(f(a)); })), (0, function_1$2.pipe)(fga, _filterMap(function (a) { return (0, Option_1.getRight)(f(a)); })));
    }; };
}
Filterable.partitionMap = partitionMap;
/** @deprecated */
function getFilterableComposition(F, G) {
    var map = (0, Functor_1.getFunctorComposition)(F, G).map;
    var _compact = (0, Compactable_1.compact)(F, G);
    var _separate = (0, Compactable_1.separate)(F, G, G);
    var _filter = filter(F, G);
    var _filterMap = filterMap(F, G);
    var _partition = partition(F, G);
    var _partitionMap = partitionMap(F, G);
    return {
        map: map,
        compact: _compact,
        separate: _separate,
        filter: function (fga, f) { return (0, function_1$2.pipe)(fga, _filter(f)); },
        filterMap: function (fga, f) { return (0, function_1$2.pipe)(fga, _filterMap(f)); },
        partition: function (fga, p) { return (0, function_1$2.pipe)(fga, _partition(p)); },
        partitionMap: function (fga, f) { return (0, function_1$2.pipe)(fga, _partitionMap(f)); }
    };
}
Filterable.getFilterableComposition = getFilterableComposition;

var FromIO = {};

Object.defineProperty(FromIO, "__esModule", { value: true });
FromIO.tapIO = FromIO.chainFirstIOK = FromIO.chainIOK = FromIO.fromIOK = void 0;
/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.10.0
 */
var Chain_1$1 = Chain;
var function_1$1 = _function;
function fromIOK(F) {
    return function (f) { return (0, function_1$1.flow)(f, F.fromIO); };
}
FromIO.fromIOK = fromIOK;
function chainIOK(F, M) {
    return function (f) {
        var g = (0, function_1$1.flow)(f, F.fromIO);
        return function (first) { return M.chain(first, g); };
    };
}
FromIO.chainIOK = chainIOK;
function chainFirstIOK(F, M) {
    var tapIOM = tapIO(F, M);
    return function (f) { return function (first) { return tapIOM(first, f); }; };
}
FromIO.chainFirstIOK = chainFirstIOK;
/** @internal */
function tapIO(F, M) {
    var chainFirstM = (0, Chain_1$1.tap)(M);
    return function (self, f) { return chainFirstM(self, (0, function_1$1.flow)(f, F.fromIO)); };
}
FromIO.tapIO = tapIO;

var FromTask = {};

Object.defineProperty(FromTask, "__esModule", { value: true });
FromTask.tapTask = FromTask.chainFirstTaskK = FromTask.chainTaskK = FromTask.fromTaskK = void 0;
/**
 * Lift a computation from the `Task` monad
 *
 * @since 2.10.0
 */
var Chain_1 = Chain;
var function_1 = _function;
function fromTaskK(F) {
    return function (f) { return (0, function_1.flow)(f, F.fromTask); };
}
FromTask.fromTaskK = fromTaskK;
function chainTaskK(F, M) {
    return function (f) {
        var g = (0, function_1.flow)(f, F.fromTask);
        return function (first) { return M.chain(first, g); };
    };
}
FromTask.chainTaskK = chainTaskK;
function chainFirstTaskK(F, M) {
    var tapTaskM = tapTask(F, M);
    return function (f) { return function (first) { return tapTaskM(first, f); }; };
}
FromTask.chainFirstTaskK = chainFirstTaskK;
/** @internal */
function tapTask(F, M) {
    var tapM = (0, Chain_1.tap)(M);
    return function (self, f) { return tapM(self, (0, function_1.flow)(f, F.fromTask)); };
}
FromTask.tapTask = tapTask;

var Task = {};

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
	exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.never = exports.FromTask = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.tapIO = exports.tap = exports.flatMapIO = exports.FromIO = exports.MonadTask = exports.fromTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecond = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.asUnit = exports.as = exports.Functor = exports.getRaceMonoid = exports.URI = exports.flatten = exports.flatMap = exports.of = exports.ap = exports.map = exports.delay = exports.fromIO = void 0;
	exports.getMonoid = exports.getSemigroup = exports.taskSeq = exports.task = exports.chainFirst = exports.chain = void 0;
	/**
	 * ```ts
	 * interface Task<A> {
	 *   (): Promise<A>
	 * }
	 * ```
	 *
	 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
	 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
	 *
	 * @since 2.0.0
	 */
	var Applicative_1 = Applicative;
	var Apply_1 = Apply;
	var chainable = __importStar(Chain);
	var FromIO_1 = FromIO;
	var function_1 = _function;
	var Functor_1 = Functor;
	var _ = __importStar(internal);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	var fromIO = function (ma) { return function () { return Promise.resolve().then(ma); }; };
	exports.fromIO = fromIO;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Creates a task that will complete after a time delay
	 *
	 * @example
	 * import { sequenceT } from 'fp-ts/Apply'
	 * import * as T from 'fp-ts/Task'
	 * import { takeRight } from 'fp-ts/Array'
	 *
	 * async function test() {
	 *   const log: Array<string> = []
	 *   const append = (message: string): T.Task<void> =>
	 *     T.fromIO(() => {
	 *       log.push(message)
	 *     })
	 *   const fa = append('a')
	 *   const fb = T.delay(20)(append('b'))
	 *   const fc = T.delay(10)(append('c'))
	 *   const fd = append('d')
	 *   await sequenceT(T.ApplyPar)(fa, fb, fc, fd)()
	 *   assert.deepStrictEqual(takeRight(2)(log), ['c', 'b'])
	 * }
	 *
	 * test()
	 *
	 * @since 2.0.0
	 */
	function delay(millis) {
	    return function (ma) { return function () {
	        return new Promise(function (resolve) {
	            setTimeout(function () {
	                Promise.resolve().then(ma).then(resolve);
	            }, millis);
	        });
	    }; };
	}
	exports.delay = delay;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _apSeq = function (fab, fa) { return (0, exports.flatMap)(fab, function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) { return function () {
	    return Promise.resolve().then(fa).then(f);
	}; }; };
	exports.map = map;
	/**
	 * @since 2.0.0
	 */
	var ap = function (fa) { return function (fab) { return function () {
	    return Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(function (_a) {
	        var f = _a[0], a = _a[1];
	        return f(a);
	    });
	}; }; };
	exports.ap = ap;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	var of = function (a) { return function () { return Promise.resolve(a); }; };
	exports.of = of;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return function () {
	        return Promise.resolve()
	            .then(ma)
	            .then(function (a) { return f(a)(); });
	    };
	});
	/**
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = (0, exports.flatMap)(function_1.identity);
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Task';
	/**
	 * Monoid returning the first completed task.
	 *
	 * Note: uses `Promise.race` internally.
	 *
	 * @example
	 * import * as T from 'fp-ts/Task'
	 *
	 * async function test() {
	 *   const S = T.getRaceMonoid<string>()
	 *   const fa = T.delay(20)(T.of('a'))
	 *   const fb = T.delay(10)(T.of('b'))
	 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
	 * }
	 *
	 * test()
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	function getRaceMonoid() {
	    return {
	        concat: function (x, y) { return function () { return Promise.race([Promise.resolve().then(x), Promise.resolve().then(y)]); }; },
	        empty: exports.never
	    };
	}
	exports.getRaceMonoid = getRaceMonoid;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the value to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the value to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
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
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplyPar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativePar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    of: exports.of
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplySeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativeSeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadIO = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO
	};
	/**
	 * @category zone of death
	 * @since 2.7.0
	 * @deprecated
	 */
	exports.fromTask = function_1.identity;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadTask = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromIO = {
	    URI: exports.URI,
	    fromIO: exports.fromIO
	};
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/** @internal */
	var _FromIO = {
	    fromIO: exports.FromIO.fromIO
	};
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as T from 'fp-ts/Task'
	 * import * as Console from 'fp-ts/Console'
	 *
	 * // Will produce `Hello, fp-ts` to the stdout
	 * const effect = pipe(
	 *   T.of('fp-ts'),
	 *   T.tapIO((value) => Console.log(`Hello, ${value}`)),
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effect(), 'fp-ts')
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports.FromIO, exports.Chain));
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	exports.fromIOK = 
	/*#__PURE__*/ (0, FromIO_1.fromIOK)(exports.FromIO);
	/**
	 * Alias of `flatMapIO`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainIOK = exports.flatMapIO;
	/**
	 * Alias of `tapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstIOK = exports.tapIO;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromTask = {
	    URI: exports.URI,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * A `Task` that never completes.
	 *
	 * @since 2.0.0
	 */
	var never = function () { return new Promise(function (_) { return undefined; }); };
	exports.never = never;
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
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return function (as) {
	        return function () {
	            return Promise.all(as.map(function (a, i) { return Promise.resolve().then(function () { return f(i, a)(); }); }));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
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
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
	    return function (as) {
	        return function () {
	            return _.tail(as).reduce(function (acc, a, i) {
	                return acc.then(function (bs) {
	                    return Promise.resolve()
	                        .then(f(i + 1, a))
	                        .then(function (b) {
	                        bs.push(b);
	                        return bs;
	                    });
	                });
	            }, Promise.resolve()
	                .then(f(0, _.head(as)))
	                .then(_.singleton));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndexSeq = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
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
	var traverseArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); });
	};
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseSeqArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); });
	};
	exports.traverseSeqArray = traverseSeqArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceSeqArray = 
	/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
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
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.task`
	 * (where `T` is from `import T from 'fp-ts/Task'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.task = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.taskSeq`
	 * (where `T` is from `import T from 'fp-ts/Task'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskSeq = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apSeq,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getSemigroup = (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getMonoid = (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq); 
} (Task));

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
	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (g && (g = 0, op[0] && (_ = 0)), _) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.throwError = exports.of = exports.altW = exports.alt = exports.flatten = exports.flattenW = exports.flatMap = exports.apW = exports.ap = exports.mapLeft = exports.mapError = exports.bimap = exports.mapBoth = exports.map = exports.fromIOEitherK = exports.chainTaskOptionK = exports.chainTaskOptionKW = exports.fromTaskOptionK = exports.swap = exports.orLeft = exports.orElseFirstTaskK = exports.orElseFirstIOK = exports.tapError = exports.orElseW = exports.orElse = exports.chainNullableK = exports.fromNullableK = exports.fromNullable = exports.toUnion = exports.tryCatchK = exports.tryCatch = exports.getOrElseW = exports.getOrElse = exports.foldW = exports.matchEW = exports.fold = exports.matchE = exports.matchW = exports.match = exports.fromTaskOption = exports.fromIOEither = exports.fromEither = exports.fromTask = exports.fromIO = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.right = exports.left = void 0;
	exports.fromPredicate = exports.chainFirstEitherKW = exports.chainFirstEitherK = exports.chainEitherKW = exports.chainEitherK = exports.flatMapTaskOption = exports.flatMapIOEither = exports.flatMapTask = exports.flatMapIO = exports.flatMapEither = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.chainOptionKW = exports.chainOptionK = exports.fromOptionK = exports.fromOption = exports.Alt = exports.Bifunctor = exports.tapTask = exports.tapIO = exports.tapEither = exports.tap = exports.FromTask = exports.FromIO = exports.FromEither = exports.MonadThrow = exports.MonadTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.asUnit = exports.as = exports.Functor = exports.getFilterable = exports.getCompactable = exports.getAltTaskValidation = exports.getApplicativeTaskValidation = exports.URI = void 0;
	exports.getTaskValidation = exports.getSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.taskEitherSeq = exports.taskEither = exports.orElseFirstW = exports.orElseFirst = exports.chainFirstW = exports.chainFirst = exports.chainW = exports.chain = exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.bracketW = exports.bracket = exports.taskify = exports.chainIOEitherK = exports.chainIOEitherKW = exports.chainFirstTaskK = exports.chainTaskK = exports.fromTaskK = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.fromEitherK = exports.filterOrElseW = exports.filterOrElse = void 0;
	var Applicative_1 = Applicative;
	var Apply_1 = Apply;
	var chainable = __importStar(Chain);
	var Compactable_1 = Compactable;
	var E = __importStar(Either);
	var ET = __importStar(EitherT);
	var Filterable_1 = Filterable;
	var FromEither_1 = FromEither;
	var FromIO_1 = FromIO;
	var FromTask_1 = FromTask;
	var function_1 = _function;
	var Functor_1 = Functor;
	var _ = __importStar(internal);
	var T = __importStar(Task);
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.left = ET.left(T.Pointed);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.right = ET.right(T.Pointed);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.rightTask = ET.rightF(T.Functor);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.leftTask = ET.leftF(T.Functor);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.rightIO = (0, function_1.flow)(T.fromIO, exports.rightTask);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.leftIO = (0, function_1.flow)(T.fromIO, exports.leftTask);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.7.0
	 */
	exports.fromIO = exports.rightIO;
	/**
	 * @category conversions
	 * @since 2.7.0
	 */
	exports.fromTask = exports.rightTask;
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromEither = T.of;
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromIOEither = T.fromIO;
	/**
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromTaskOption = function (onNone) {
	    return T.map(E.fromOption(onNone));
	};
	exports.fromTaskOption = fromTaskOption;
	/**
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.match = 
	/*#__PURE__*/ ET.match(T.Functor);
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchW = exports.match;
	/**
	 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchE = ET.matchE(T.Monad);
	/**
	 * Alias of [`matchE`](#matche).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.fold = exports.matchE;
	/**
	 * Less strict version of [`matchE`](#matche).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchEW = exports.matchE;
	/**
	 * Alias of [`matchEW`](#matchew).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.foldW = exports.matchEW;
	/**
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.getOrElse = 
	/*#__PURE__*/ ET.getOrElse(T.Monad);
	/**
	 * Less strict version of [`getOrElse`](#getorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
	 *
	 * @category error handling
	 * @since 2.6.0
	 */
	exports.getOrElseW = exports.getOrElse;
	/**
	 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
	 *
	 * See also [`tryCatchK`](#trycatchk).
	 *
	 * @example
	 * import { left, right } from 'fp-ts/Either'
	 * import { tryCatch } from 'fp-ts/TaskEither'
	 *
	 * tryCatch(() => Promise.resolve(1), String)().then(result => {
	 *   assert.deepStrictEqual(result, right(1))
	 * })
	 * tryCatch(() => Promise.reject('error'), String)().then(result => {
	 *   assert.deepStrictEqual(result, left('error'))
	 * })
	 *
	 * @category interop
	 * @since 2.0.0
	 */
	var tryCatch = function (f, onRejected) {
	    return function () { return __awaiter(void 0, void 0, void 0, function () {
	        var reason_1;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    _a.trys.push([0, 2, , 3]);
	                    return [4 /*yield*/, f().then(_.right)];
	                case 1: return [2 /*return*/, _a.sent()];
	                case 2:
	                    reason_1 = _a.sent();
	                    return [2 /*return*/, _.left(onRejected(reason_1))];
	                case 3: return [2 /*return*/];
	            }
	        });
	    }); };
	};
	exports.tryCatch = tryCatch;
	/**
	 * Converts a function returning a `Promise` to one returning a `TaskEither`.
	 *
	 * @category interop
	 * @since 2.5.0
	 */
	var tryCatchK = function (f, onRejected) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.tryCatch)(function () { return f.apply(void 0, a); }, onRejected);
	    };
	};
	exports.tryCatchK = tryCatchK;
	/**
	 * @category conversions
	 * @since 2.10.0
	 */
	exports.toUnion = ET.toUnion(T.Functor);
	/**
	 * @category conversions
	 * @since 2.12.0
	 */
	exports.fromNullable = ET.fromNullable(T.Pointed);
	/**
	 * Use `liftNullable`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.fromNullableK = ET.fromNullableK(T.Pointed);
	/**
	 * Use `flatMapNullable`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainNullableK = 
	/*#__PURE__*/ ET.chainNullableK(T.Monad);
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
	 *
	 * See also [alt](#alt).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * async function test() {
	 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
	 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
	 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.orElse = 
	/*#__PURE__*/ ET.orElse(T.Monad);
	/**
	 * Less strict version of [`orElse`](#orelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.10.0
	 */
	exports.orElseW = exports.orElse;
	/**
	 * Returns an effect that effectfully "peeks" at the failure of this effect.
	 *
	 * @category error handling
	 * @since 2.15.0
	 */
	exports.tapError = (0, function_1.dual)(2, ET.tapError(T.Monad));
	/**
	 * @category error handling
	 * @since 2.12.0
	 */
	var orElseFirstIOK = function (onLeft) { return (0, exports.tapError)((0, exports.fromIOK)(onLeft)); };
	exports.orElseFirstIOK = orElseFirstIOK;
	/**
	 * @category error handling
	 * @since 2.12.0
	 */
	var orElseFirstTaskK = function (onLeft) { return (0, exports.tapError)((0, exports.fromTaskK)(onLeft)); };
	exports.orElseFirstTaskK = orElseFirstTaskK;
	/**
	 * @category error handling
	 * @since 2.11.0
	 */
	exports.orLeft = 
	/*#__PURE__*/ ET.orLeft(T.Monad);
	/**
	 * @since 2.0.0
	 */
	exports.swap = ET.swap(T.Functor);
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	var fromTaskOptionK = function (onNone) {
	    var from = (0, exports.fromTaskOption)(onNone);
	    return function (f) { return (0, function_1.flow)(f, from); };
	};
	exports.fromTaskOptionK = fromTaskOptionK;
	/**
	 * Use `flatMapTaskOption`.
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.12.3
	 */
	var chainTaskOptionKW = function (onNone) {
	    return function (f) {
	        return function (ma) {
	            return (0, exports.flatMap)(ma, (0, exports.fromTaskOptionK)(onNone)(f));
	        };
	    };
	};
	exports.chainTaskOptionKW = chainTaskOptionKW;
	/**
	 * Use `flatMapTaskOption`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.chainTaskOptionK = exports.chainTaskOptionKW;
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	var fromIOEitherK = function (f) { return (0, function_1.flow)(f, exports.fromIOEither); };
	exports.fromIOEitherK = fromIOEitherK;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _apSeq = function (fab, fa) { return (0, exports.flatMap)(fab, function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }); };
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	exports.map = ET.map(T.Functor);
	/**
	 * Returns a `TaskEither` whose failure and success channels have been mapped by the specified pair of functions, `f` and `g`.
	 *
	 * @example
	 * import * as TaskEither from 'fp-ts/TaskEither'
	 * import * as Either from 'fp-ts/Either'
	 *
	 * const f = (s: string) => new Error(s)
	 * const g = (n: number) => n * 2
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await TaskEither.mapBoth(TaskEither.right(1), f, g)(), Either.right(2))
	 *   assert.deepStrictEqual(await TaskEither.mapBoth(TaskEither.left('err'), f, g)(), Either.left(new Error('err')))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.16.0
	 */
	exports.mapBoth = (0, function_1.dual)(3, ET.mapBoth(T.Functor));
	/**
	 * Alias of `mapBoth`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.bimap = exports.mapBoth;
	/**
	 * Returns a `TaskEither` with its error channel mapped using the specified function.
	 *
	 * @example
	 * import * as TaskEither from 'fp-ts/TaskEither'
	 * import * as Either from 'fp-ts/Either'
	 *
	 * const f = (s: string) => new Error(s)
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await TaskEither.mapError(TaskEither.right(1), f)(), Either.right(1))
	 *   assert.deepStrictEqual(await TaskEither.mapError(TaskEither.left('err'), f)(), Either.left(new Error('err')))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.16.0
	 */
	exports.mapError = (0, function_1.dual)(2, ET.mapError(T.Functor));
	/**
	 * Alias of `mapError`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.mapLeft = exports.mapError;
	/**
	 * @since 2.0.0
	 */
	exports.ap = 
	/*#__PURE__*/ ET.ap(T.ApplyPar);
	/**
	 * Less strict version of [`ap`](#ap).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.8.0
	 */
	exports.apW = exports.ap;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, ET.flatMap(T.Monad));
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
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = exports.flattenW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.
	 *
	 * See also [orElse](#orelse).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.right(1),
	 *       TE.alt(() => TE.right(2))
	 *     )(),
	 *     E.right(1)
	 *   )
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.left('a'),
	 *       TE.alt(() => TE.right(2))
	 *     )(),
	 *     E.right(2)
	 *   )
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.left('a'),
	 *       TE.alt(() => TE.left('b'))
	 *     )(),
	 *     E.left('b')
	 *   )
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.alt = 
	/*#__PURE__*/ ET.alt(T.Monad);
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	exports.altW = exports.alt;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.of = exports.right;
	/**
	 * @since 2.7.0
	 */
	exports.throwError = exports.left;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'TaskEither';
	/**
	 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 * import * as T from 'fp-ts/Task'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * interface User {
	 *   readonly id: string
	 *   readonly name: string
	 * }
	 *
	 * const remoteDatabase: ReadonlyArray<User> = [
	 *   { id: 'id1', name: 'John' },
	 *   { id: 'id2', name: 'Mary' },
	 *   { id: 'id3', name: 'Joey' }
	 * ]
	 *
	 * const fetchUser = (id: string): TE.TaskEither<string, User> =>
	 *   pipe(
	 *     remoteDatabase,
	 *     RA.findFirst((user) => user.id === id),
	 *     TE.fromOption(() => `${id} not found`)
	 *   )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(['id4', 'id5'], RA.traverse(TE.ApplicativePar)(fetchUser))(),
	 *     E.left('id4 not found') // <= first error
	 *   )
	 *
	 *   const Applicative = TE.getApplicativeTaskValidation(
	 *     T.ApplyPar,
	 *     pipe(string.Semigroup, S.intercalate(', '))
	 *   )
	 *
	 *   assert.deepStrictEqual(
	 *     await pipe(['id4', 'id5'], RA.traverse(Applicative)(fetchUser))(),
	 *     E.left('id4 not found, id5 not found') // <= all errors
	 *   )
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	function getApplicativeTaskValidation(A, S) {
	    var ap = (0, Apply_1.ap)(A, E.getApplicativeValidation(S));
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        ap: function (fab, fa) { return (0, function_1.pipe)(fab, ap(fa)); },
	        of: exports.of
	    };
	}
	exports.getApplicativeTaskValidation = getApplicativeTaskValidation;
	/**
	 * The default [`Alt`](#alt) instance returns the last error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * See [`getAltValidation`](./Either.ts.html#getaltvalidation).
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	function getAltTaskValidation(S) {
	    var alt = ET.altValidation(T.Monad, S);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        alt: function (fa, that) { return (0, function_1.pipe)(fa, alt(that)); }
	    };
	}
	exports.getAltTaskValidation = getAltTaskValidation;
	/**
	 * @category filtering
	 * @since 2.10.0
	 */
	var getCompactable = function (M) {
	    var C = E.getCompactable(M);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        compact: (0, Compactable_1.compact)(T.Functor, C),
	        separate: (0, Compactable_1.separate)(T.Functor, C, E.Functor)
	    };
	};
	exports.getCompactable = getCompactable;
	/**
	 * @category filtering
	 * @since 2.1.0
	 */
	function getFilterable(M) {
	    var F = E.getFilterable(M);
	    var C = (0, exports.getCompactable)(M);
	    var filter = (0, Filterable_1.filter)(T.Functor, F);
	    var filterMap = (0, Filterable_1.filterMap)(T.Functor, F);
	    var partition = (0, Filterable_1.partition)(T.Functor, F);
	    var partitionMap = (0, Filterable_1.partitionMap)(T.Functor, F);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: C.compact,
	        separate: C.separate,
	        filter: function (fa, predicate) { return (0, function_1.pipe)(fa, filter(predicate)); },
	        filterMap: function (fa, f) { return (0, function_1.pipe)(fa, filterMap(f)); },
	        partition: function (fa, predicate) { return (0, function_1.pipe)(fa, partition(predicate)); },
	        partitionMap: function (fa, f) { return (0, function_1.pipe)(fa, partitionMap(f)); }
	    };
	}
	exports.getFilterable = getFilterable;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the `Right` value of this `TaskEither` to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the `Right` value of this `TaskEither` to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
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
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplyPar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
	/**
	 * Less strict version of [`apFirst`](#apfirst).
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
	exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
	/**
	 * Less strict version of [`apSecond`](#apsecond).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apSecondW = exports.apSecond;
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativePar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    of: exports.of
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplySeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativeSeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadIO = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    fromIO: exports.fromIO
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadTask = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadThrow = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    throwError: exports.throwError
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: exports.fromEither
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromIO = {
	    URI: exports.URI,
	    fromIO: exports.fromIO
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromTask = {
	    URI: exports.URI,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * const checkString = (value: string) => pipe(
	 *   TE.of(value),
	 *   TE.tapEither(() => value.length > 0 ? E.right('ok') : E.left('error'))
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await checkString('')(), E.left('error'))
	 *   assert.deepStrictEqual(await checkString('fp-ts')(), E.right('fp-ts'))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapEither = (0, function_1.dual)(2, (0, FromEither_1.tapEither)(exports.FromEither, exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 * import * as E from 'fp-ts/Either'
	 * import * as Console from 'fp-ts/Console'
	 *
	 *
	 * // Will produce `Hello, fp-ts` to the stdout
	 * const effectA = TE.tapIO(
	 *   TE.of(1),
	 *   (value) => Console.log(`Hello, ${value}`)
	 * )
	 *
	 * // No output to the stdout
	 * const effectB = pipe(
	 *   TE.left('error'),
	 *   TE.tapIO((value) => Console.log(`Hello, ${value}`))
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effectA(), E.of(1))
	 *   assert.deepStrictEqual(await effectB(), E.left('error'))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports.FromIO, exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as TE from 'fp-ts/TaskEither'
	 * import * as T from 'fp-ts/Task'
	 * import * as E from 'fp-ts/Either'
	 *
	 *
	 * const effect = TE.tapIO(
	 *   TE.of(1),
	 *   (value) => T.of(value + 1)
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effect(), E.of(1))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapTask = (0, function_1.dual)(2, (0, FromTask_1.tapTask)(exports.FromTask, exports.Chain));
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Bifunctor = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError
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
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromOption = 
	/*#__PURE__*/ (0, FromEither_1.fromOption)(exports.FromEither);
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
	 * @since 2.10.0
	 */
	exports.chainOptionK = (0, FromEither_1.chainOptionK)(exports.FromEither, exports.Chain);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.13.2
	 */
	exports.chainOptionKW = 
	 exports.chainOptionK;
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
	/** @internal */
	var _FromIO = {
	    fromIO: exports.FromIO.fromIO
	};
	/** @internal */
	var _FromTask = {
	    fromTask: exports.fromTask
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
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapEither = _.flatMapEither(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapTask = _.flatMapTask(_FromTask, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapIOEither = (0, function_1.dual)(2, function (self, f) {
	    return (0, exports.flatMap)(self, (0, exports.fromIOEitherK)(f));
	});
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapTaskOption = (0, function_1.dual)(3, function (self, f, onNone) {
	    return (0, exports.flatMap)(self, function (a) { return (0, exports.fromTaskOption)(function () { return onNone(a); })(f(a)); });
	});
	/**
	 * Alias of `flatMapEither`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainEitherK = exports.flatMapEither;
	/**
	 * Alias of `flatMapEither`.
	 *
	 * @category legacy
	 * @since 2.6.1
	 */
	exports.chainEitherKW = exports.flatMapEither;
	/**
	 * Alias of `tapEither`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherK = exports.tapEither;
	/**
	 * Alias of `tapEither`.
	 *
	 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherKW = exports.tapEither;
	/**
	 * @category lifting
	 * @since 2.0.0
	 */
	exports.fromPredicate = (0, FromEither_1.fromPredicate)(exports.FromEither);
	/**
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
	 * @category lifting
	 * @since 2.4.0
	 */
	exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
	/**
	 * @category lifting
	 * @since 2.10.0
	 */
	exports.fromIOK = (0, FromIO_1.fromIOK)(exports.FromIO);
	/**
	 * Alias of `flatMapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainIOK = exports.flatMapIO;
	/**
	 * Alias of `tapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstIOK = exports.tapIO;
	/**
	 * @category lifting
	 * @since 2.10.0
	 */
	exports.fromTaskK = (0, FromTask_1.fromTaskK)(exports.FromTask);
	/**
	 * Alias of `flatMapTask`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainTaskK = exports.flatMapTask;
	/**
	 * Alias of `tapTask`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstTaskK = exports.tapTask;
	/**
	 * Alias of `flatMapIOEither`.
	 *
	 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.6.1
	 */
	exports.chainIOEitherKW = exports.flatMapIOEither;
	/**
	 * Alias of `flatMapIOEither`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainIOEitherK = exports.flatMapIOEither;
	function taskify(f) {
	    return function () {
	        var args = Array.prototype.slice.call(arguments);
	        return function () {
	            return new Promise(function (resolve) {
	                var cbResolver = function (e, r) { return (e != null ? resolve(_.left(e)) : resolve(_.right(r))); };
	                f.apply(null, args.concat(cbResolver));
	            });
	        };
	    };
	}
	exports.taskify = taskify;
	/**
	 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
	 * whether the body action throws (\*) or returns.
	 *
	 * (\*) i.e. returns a `Left`
	 *
	 * @since 2.0.0
	 */
	var bracket = function (acquire, use, release) { return (0, exports.bracketW)(acquire, use, release); };
	exports.bracket = bracket;
	/**
	 * Less strict version of [`bracket`](#bracket).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	var bracketW = function (acquire, use, release) {
	    return (0, exports.flatMap)(acquire, function (a) { return T.flatMap(use(a), function (e) { return (0, exports.flatMap)(release(a, e), function () { return T.of(e); }); }); });
	};
	exports.bracketW = bracketW;
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
	exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
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
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return (0, function_1.flow)(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(E.traverseReadonlyNonEmptyArrayWithIndex(function_1.SK)));
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
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
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
	    return function (as) {
	        return function () {
	            return _.tail(as).reduce(function (acc, a, i) {
	                return acc.then(function (ebs) {
	                    return _.isLeft(ebs)
	                        ? acc
	                        : f(i + 1, a)().then(function (eb) {
	                            if (_.isLeft(eb)) {
	                                return eb;
	                            }
	                            ebs.right.push(eb.right);
	                            return ebs;
	                        });
	                });
	            }, f(0, _.head(as))().then(E.map(_.singleton)));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndexSeq = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
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
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseSeqArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); }); };
	exports.traverseSeqArray = traverseSeqArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceSeqArray = 
	/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.6.0
	 */
	exports.chainW = exports.flatMap;
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
	 * Alias of `tapError`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.orElseFirst = exports.tapError;
	/**
	 * Alias of `tapError`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.orElseFirstW = exports.tapError;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEither`
	 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskEither = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    alt: _alt,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask,
	    throwError: exports.throwError
	};
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEitherSeq`
	 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskEitherSeq = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError,
	    map: _map,
	    of: exports.of,
	    ap: _apSeq,
	    chain: exports.flatMap,
	    alt: _alt,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask,
	    throwError: exports.throwError
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplySemigroup = 
	/*#__PURE__*/ (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplyMonoid = 
	/*#__PURE__*/ (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq);
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getSemigroup = function (S) {
	    return (0, Apply_1.getApplySemigroup)(T.ApplySeq)(E.getSemigroup(S));
	};
	exports.getSemigroup = getSemigroup;
	/**
	 * Use [`getApplicativeTaskValidation`](#getapplicativetaskvalidation) and [`getAltTaskValidation`](#getalttaskvalidation) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function getTaskValidation(SE) {
	    var applicativeTaskValidation = getApplicativeTaskValidation(T.ApplicativePar, SE);
	    var altTaskValidation = getAltTaskValidation(SE);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        ap: applicativeTaskValidation.ap,
	        of: exports.of,
	        chain: exports.flatMap,
	        bimap: exports.mapBoth,
	        mapLeft: exports.mapError,
	        alt: altTaskValidation.alt,
	        fromIO: exports.fromIO,
	        fromTask: exports.fromTask,
	        throwError: exports.throwError
	    };
	}
	exports.getTaskValidation = getTaskValidation; 
} (TaskEither));

const create = (client) => (wallet) => (payload) => _function.pipe(tryCatchDefault(() => getAddressesAndCollaterals(wallet)), TaskEither.chain((addressesAndCollaterals) => client.contracts.post({
    contract: payload.contract,
    version: "v1",
    roles: payload.roles,
    tags: payload.tags ? payload.tags : {},
    metadata: payload.metadata ? payload.metadata : {},
    minUTxODeposit: payload.minUTxODeposit
        ? payload.minUTxODeposit
        : 3000000,
}, addressesAndCollaterals)), TaskEither.chainW((contractTextEnvelope) => _function.pipe(tryCatchDefault(() => wallet.signTxTheCIP30Way(contractTextEnvelope.tx.cborHex)), TaskEither.chain((hexTransactionWitnessSet) => client.contracts.contract.put(contractTextEnvelope.contractId, hexTransactionWitnessSet)), TaskEither.map(() => contractTextEnvelope.contractId))), TaskEither.chainFirstW((contractId) => tryCatchDefault(() => wallet.waitConfirmation(_function.pipe(contractId, contractIdToTxId)))));
const applyInputs = (client) => (wallet) => (contractId) => (payload) => _function.pipe(tryCatchDefault(() => getAddressesAndCollaterals(wallet)), TaskEither.chain((addressesAndCollaterals) => client.contracts.contract.transactions.post(contractId, {
    inputs: payload.inputs,
    version: "v1",
    tags: payload.tags ? payload.tags : {},
    metadata: payload.metadata ? payload.metadata : {},
    invalidBefore: payload.invalidBefore,
    invalidHereafter: payload.invalidHereafter,
}, addressesAndCollaterals)), TaskEither.chainW((transactionTextEnvelope) => _function.pipe(tryCatchDefault(() => wallet.signTxTheCIP30Way(transactionTextEnvelope.tx.cborHex)), TaskEither.chain((hexTransactionWitnessSet) => client.contracts.contract.transactions.transaction.put(contractId, transactionTextEnvelope.transactionId, hexTransactionWitnessSet)), TaskEither.map(() => transactionTextEnvelope.transactionId))), TaskEither.chainFirstW((transactionId) => tryCatchDefault(() => wallet.waitConfirmation(_function.pipe(transactionId, Tx.idToTxId)))), TaskEither.map(() => contractId));
const withdraw = (client) => (wallet) => (payoutIds) => _function.pipe(tryCatchDefault(() => getAddressesAndCollaterals(wallet)), TaskEither.chain((addressesAndCollaterals) => client.withdrawals.post(payoutIds, addressesAndCollaterals)), TaskEither.chainW((withdrawalTextEnvelope) => _function.pipe(tryCatchDefault(() => wallet.signTxTheCIP30Way(withdrawalTextEnvelope.tx.cborHex)), TaskEither.chain((hexTransactionWitnessSet) => client.withdrawals.withdrawal.put(withdrawalTextEnvelope.withdrawalId, hexTransactionWitnessSet)), TaskEither.map(() => withdrawalTextEnvelope.withdrawalId))), TaskEither.chainFirstW((withdrawalId) => tryCatchDefault(() => wallet.waitConfirmation(_function.pipe(withdrawalId, withdrawalIdToTxId)))), TaskEither.map(_function.constVoid));

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
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

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
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

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */

function addMinutes(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */

function subMinutes(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMinutes(dirtyDate, -amount);
}

var jsonBigint = {exports: {}};

var stringify$1 = {exports: {}};

var bignumber = {exports: {}};

(function (module) {
(function (globalObject) {

	/*
	 *      bignumber.js v9.1.2
	 *      A JavaScript library for arbitrary-precision arithmetic.
	 *      https://github.com/MikeMcl/bignumber.js
	 *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
	 *      MIT Licensed.
	 *
	 *      BigNumber.prototype methods     |  BigNumber methods
	 *                                      |
	 *      absoluteValue            abs    |  clone
	 *      comparedTo                      |  config               set
	 *      decimalPlaces            dp     |      DECIMAL_PLACES
	 *      dividedBy                div    |      ROUNDING_MODE
	 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
	 *      exponentiatedBy          pow    |      RANGE
	 *      integerValue                    |      CRYPTO
	 *      isEqualTo                eq     |      MODULO_MODE
	 *      isFinite                        |      POW_PRECISION
	 *      isGreaterThan            gt     |      FORMAT
	 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
	 *      isInteger                       |  isBigNumber
	 *      isLessThan               lt     |  maximum              max
	 *      isLessThanOrEqualTo      lte    |  minimum              min
	 *      isNaN                           |  random
	 *      isNegative                      |  sum
	 *      isPositive                      |
	 *      isZero                          |
	 *      minus                           |
	 *      modulo                   mod    |
	 *      multipliedBy             times  |
	 *      negated                         |
	 *      plus                            |
	 *      precision                sd     |
	 *      shiftedBy                       |
	 *      squareRoot               sqrt   |
	 *      toExponential                   |
	 *      toFixed                         |
	 *      toFormat                        |
	 *      toFraction                      |
	 *      toJSON                          |
	 *      toNumber                        |
	 *      toPrecision                     |
	 *      toString                        |
	 *      valueOf                         |
	 *
	 */


	  var BigNumber,
	    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
	    mathceil = Math.ceil,
	    mathfloor = Math.floor,

	    bignumberError = '[BigNumber Error] ',
	    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

	    BASE = 1e14,
	    LOG_BASE = 14,
	    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	    SQRT_BASE = 1e7,

	    // EDITABLE
	    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
	    MAX = 1E9;                                   // 0 to MAX_INT32


	  /*
	   * Create and return a BigNumber constructor.
	   */
	  function clone(configObject) {
	    var div, convertBase, parseNumeric,
	      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
	      ONE = new BigNumber(1),


	      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


	      // The default values below must be integers within the inclusive ranges stated.
	      // The values can also be changed at run-time using BigNumber.set.

	      // The maximum number of decimal places for operations involving division.
	      DECIMAL_PLACES = 20,                     // 0 to MAX

	      // The rounding mode used when rounding to the above decimal places, and when using
	      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
	      // UP         0 Away from zero.
	      // DOWN       1 Towards zero.
	      // CEIL       2 Towards +Infinity.
	      // FLOOR      3 Towards -Infinity.
	      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	      ROUNDING_MODE = 4,                       // 0 to 8

	      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

	      // The exponent value at and beneath which toString returns exponential notation.
	      // Number type: -7
	      TO_EXP_NEG = -7,                         // 0 to -MAX

	      // The exponent value at and above which toString returns exponential notation.
	      // Number type: 21
	      TO_EXP_POS = 21,                         // 0 to MAX

	      // RANGE : [MIN_EXP, MAX_EXP]

	      // The minimum exponent value, beneath which underflow to zero occurs.
	      // Number type: -324  (5e-324)
	      MIN_EXP = -1e7,                          // -1 to -MAX

	      // The maximum exponent value, above which overflow to Infinity occurs.
	      // Number type:  308  (1.7976931348623157e+308)
	      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	      MAX_EXP = 1e7,                           // 1 to MAX

	      // Whether to use cryptographically-secure random number generation, if available.
	      CRYPTO = false,                          // true or false

	      // The modulo mode used when calculating the modulus: a mod n.
	      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	      // The remainder (r) is calculated as: r = a - n * q.
	      //
	      // UP        0 The remainder is positive if the dividend is negative, else is negative.
	      // DOWN      1 The remainder has the same sign as the dividend.
	      //             This modulo mode is commonly known as 'truncated division' and is
	      //             equivalent to (a % n) in JavaScript.
	      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
	      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	      //             The remainder is always positive.
	      //
	      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
	      // modes are commonly used for the modulus operation.
	      // Although the other rounding modes can also be used, they may not give useful results.
	      MODULO_MODE = 1,                         // 0 to 9

	      // The maximum number of significant digits of the result of the exponentiatedBy operation.
	      // If POW_PRECISION is 0, there will be unlimited significant digits.
	      POW_PRECISION = 0,                       // 0 to MAX

	      // The format specification used by the BigNumber.prototype.toFormat method.
	      FORMAT = {
	        prefix: '',
	        groupSize: 3,
	        secondaryGroupSize: 0,
	        groupSeparator: ',',
	        decimalSeparator: '.',
	        fractionGroupSize: 0,
	        fractionGroupSeparator: '\xA0',        // non-breaking space
	        suffix: ''
	      },

	      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
	      // '-', '.', whitespace, or repeated character.
	      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
	      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
	      alphabetHasNormalDecimalDigits = true;


	    //------------------------------------------------------------------------------------------


	    // CONSTRUCTOR


	    /*
	     * The BigNumber constructor and exported function.
	     * Create and return a new instance of a BigNumber object.
	     *
	     * v {number|string|BigNumber} A numeric value.
	     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
	     */
	    function BigNumber(v, b) {
	      var alphabet, c, caseChanged, e, i, isNum, len, str,
	        x = this;

	      // Enable constructor call without `new`.
	      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

	      if (b == null) {

	        if (v && v._isBigNumber === true) {
	          x.s = v.s;

	          if (!v.c || v.e > MAX_EXP) {
	            x.c = x.e = null;
	          } else if (v.e < MIN_EXP) {
	            x.c = [x.e = 0];
	          } else {
	            x.e = v.e;
	            x.c = v.c.slice();
	          }

	          return;
	        }

	        if ((isNum = typeof v == 'number') && v * 0 == 0) {

	          // Use `1 / n` to handle minus zero also.
	          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

	          // Fast path for integers, where n < 2147483648 (2**31).
	          if (v === ~~v) {
	            for (e = 0, i = v; i >= 10; i /= 10, e++);

	            if (e > MAX_EXP) {
	              x.c = x.e = null;
	            } else {
	              x.e = e;
	              x.c = [v];
	            }

	            return;
	          }

	          str = String(v);
	        } else {

	          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

	          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
	        }

	        // Decimal point?
	        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	        // Exponential form?
	        if ((i = str.search(/e/i)) > 0) {

	          // Determine exponent.
	          if (e < 0) e = i;
	          e += +str.slice(i + 1);
	          str = str.substring(0, i);
	        } else if (e < 0) {

	          // Integer.
	          e = str.length;
	        }

	      } else {

	        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
	        intCheck(b, 2, ALPHABET.length, 'Base');

	        // Allow exponential notation to be used with base 10 argument, while
	        // also rounding to DECIMAL_PLACES as with other bases.
	        if (b == 10 && alphabetHasNormalDecimalDigits) {
	          x = new BigNumber(v);
	          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
	        }

	        str = String(v);

	        if (isNum = typeof v == 'number') {

	          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

	          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

	          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
	          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
	            throw Error
	             (tooManyDigits + v);
	          }
	        } else {
	          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
	        }

	        alphabet = ALPHABET.slice(0, b);
	        e = i = 0;

	        // Check that str is a valid base b number.
	        // Don't use RegExp, so alphabet can contain special characters.
	        for (len = str.length; i < len; i++) {
	          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
	            if (c == '.') {

	              // If '.' is not the first character and it has not be found before.
	              if (i > e) {
	                e = len;
	                continue;
	              }
	            } else if (!caseChanged) {

	              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
	              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
	                  str == str.toLowerCase() && (str = str.toUpperCase())) {
	                caseChanged = true;
	                i = -1;
	                e = 0;
	                continue;
	              }
	            }

	            return parseNumeric(x, String(v), isNum, b);
	          }
	        }

	        // Prevent later check for length on converted number.
	        isNum = false;
	        str = convertBase(str, b, 10, x.s);

	        // Decimal point?
	        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
	        else e = str.length;
	      }

	      // Determine leading zeros.
	      for (i = 0; str.charCodeAt(i) === 48; i++);

	      // Determine trailing zeros.
	      for (len = str.length; str.charCodeAt(--len) === 48;);

	      if (str = str.slice(i, ++len)) {
	        len -= i;

	        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
	        if (isNum && BigNumber.DEBUG &&
	          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
	            throw Error
	             (tooManyDigits + (x.s * v));
	        }

	         // Overflow?
	        if ((e = e - i - 1) > MAX_EXP) {

	          // Infinity.
	          x.c = x.e = null;

	        // Underflow?
	        } else if (e < MIN_EXP) {

	          // Zero.
	          x.c = [x.e = 0];
	        } else {
	          x.e = e;
	          x.c = [];

	          // Transform base

	          // e is the base 10 exponent.
	          // i is where to slice str to get the first element of the coefficient array.
	          i = (e + 1) % LOG_BASE;
	          if (e < 0) i += LOG_BASE;  // i < 1

	          if (i < len) {
	            if (i) x.c.push(+str.slice(0, i));

	            for (len -= LOG_BASE; i < len;) {
	              x.c.push(+str.slice(i, i += LOG_BASE));
	            }

	            i = LOG_BASE - (str = str.slice(i)).length;
	          } else {
	            i -= len;
	          }

	          for (; i--; str += '0');
	          x.c.push(+str);
	        }
	      } else {

	        // Zero.
	        x.c = [x.e = 0];
	      }
	    }


	    // CONSTRUCTOR PROPERTIES


	    BigNumber.clone = clone;

	    BigNumber.ROUND_UP = 0;
	    BigNumber.ROUND_DOWN = 1;
	    BigNumber.ROUND_CEIL = 2;
	    BigNumber.ROUND_FLOOR = 3;
	    BigNumber.ROUND_HALF_UP = 4;
	    BigNumber.ROUND_HALF_DOWN = 5;
	    BigNumber.ROUND_HALF_EVEN = 6;
	    BigNumber.ROUND_HALF_CEIL = 7;
	    BigNumber.ROUND_HALF_FLOOR = 8;
	    BigNumber.EUCLID = 9;


	    /*
	     * Configure infrequently-changing library-wide settings.
	     *
	     * Accept an object with the following optional properties (if the value of a property is
	     * a number, it must be an integer within the inclusive range stated):
	     *
	     *   DECIMAL_PLACES   {number}           0 to MAX
	     *   ROUNDING_MODE    {number}           0 to 8
	     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
	     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
	     *   CRYPTO           {boolean}          true or false
	     *   MODULO_MODE      {number}           0 to 9
	     *   POW_PRECISION       {number}           0 to MAX
	     *   ALPHABET         {string}           A string of two or more unique characters which does
	     *                                       not contain '.'.
	     *   FORMAT           {object}           An object with some of the following properties:
	     *     prefix                 {string}
	     *     groupSize              {number}
	     *     secondaryGroupSize     {number}
	     *     groupSeparator         {string}
	     *     decimalSeparator       {string}
	     *     fractionGroupSize      {number}
	     *     fractionGroupSeparator {string}
	     *     suffix                 {string}
	     *
	     * (The values assigned to the above FORMAT object properties are not checked for validity.)
	     *
	     * E.g.
	     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	     *
	     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
	     *
	     * Return an object with the properties current values.
	     */
	    BigNumber.config = BigNumber.set = function (obj) {
	      var p, v;

	      if (obj != null) {

	        if (typeof obj == 'object') {

	          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
	            v = obj[p];
	            intCheck(v, 0, MAX, p);
	            DECIMAL_PLACES = v;
	          }

	          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
	            v = obj[p];
	            intCheck(v, 0, 8, p);
	            ROUNDING_MODE = v;
	          }

	          // EXPONENTIAL_AT {number|number[]}
	          // Integer, -MAX to MAX inclusive or
	          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
	            v = obj[p];
	            if (v && v.pop) {
	              intCheck(v[0], -MAX, 0, p);
	              intCheck(v[1], 0, MAX, p);
	              TO_EXP_NEG = v[0];
	              TO_EXP_POS = v[1];
	            } else {
	              intCheck(v, -MAX, MAX, p);
	              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
	            }
	          }

	          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
	          if (obj.hasOwnProperty(p = 'RANGE')) {
	            v = obj[p];
	            if (v && v.pop) {
	              intCheck(v[0], -MAX, -1, p);
	              intCheck(v[1], 1, MAX, p);
	              MIN_EXP = v[0];
	              MAX_EXP = v[1];
	            } else {
	              intCheck(v, -MAX, MAX, p);
	              if (v) {
	                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
	              } else {
	                throw Error
	                 (bignumberError + p + ' cannot be zero: ' + v);
	              }
	            }
	          }

	          // CRYPTO {boolean} true or false.
	          // '[BigNumber Error] CRYPTO not true or false: {v}'
	          // '[BigNumber Error] crypto unavailable'
	          if (obj.hasOwnProperty(p = 'CRYPTO')) {
	            v = obj[p];
	            if (v === !!v) {
	              if (v) {
	                if (typeof crypto != 'undefined' && crypto &&
	                 (crypto.getRandomValues || crypto.randomBytes)) {
	                  CRYPTO = v;
	                } else {
	                  CRYPTO = !v;
	                  throw Error
	                   (bignumberError + 'crypto unavailable');
	                }
	              } else {
	                CRYPTO = v;
	              }
	            } else {
	              throw Error
	               (bignumberError + p + ' not true or false: ' + v);
	            }
	          }

	          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
	            v = obj[p];
	            intCheck(v, 0, 9, p);
	            MODULO_MODE = v;
	          }

	          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
	            v = obj[p];
	            intCheck(v, 0, MAX, p);
	            POW_PRECISION = v;
	          }

	          // FORMAT {object}
	          // '[BigNumber Error] FORMAT not an object: {v}'
	          if (obj.hasOwnProperty(p = 'FORMAT')) {
	            v = obj[p];
	            if (typeof v == 'object') FORMAT = v;
	            else throw Error
	             (bignumberError + p + ' not an object: ' + v);
	          }

	          // ALPHABET {string}
	          // '[BigNumber Error] ALPHABET invalid: {v}'
	          if (obj.hasOwnProperty(p = 'ALPHABET')) {
	            v = obj[p];

	            // Disallow if less than two characters,
	            // or if it contains '+', '-', '.', whitespace, or a repeated character.
	            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
	              alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
	              ALPHABET = v;
	            } else {
	              throw Error
	               (bignumberError + p + ' invalid: ' + v);
	            }
	          }

	        } else {

	          // '[BigNumber Error] Object expected: {v}'
	          throw Error
	           (bignumberError + 'Object expected: ' + obj);
	        }
	      }

	      return {
	        DECIMAL_PLACES: DECIMAL_PLACES,
	        ROUNDING_MODE: ROUNDING_MODE,
	        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
	        RANGE: [MIN_EXP, MAX_EXP],
	        CRYPTO: CRYPTO,
	        MODULO_MODE: MODULO_MODE,
	        POW_PRECISION: POW_PRECISION,
	        FORMAT: FORMAT,
	        ALPHABET: ALPHABET
	      };
	    };


	    /*
	     * Return true if v is a BigNumber instance, otherwise return false.
	     *
	     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
	     *
	     * v {any}
	     *
	     * '[BigNumber Error] Invalid BigNumber: {v}'
	     */
	    BigNumber.isBigNumber = function (v) {
	      if (!v || v._isBigNumber !== true) return false;
	      if (!BigNumber.DEBUG) return true;

	      var i, n,
	        c = v.c,
	        e = v.e,
	        s = v.s;

	      out: if ({}.toString.call(c) == '[object Array]') {

	        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

	          // If the first element is zero, the BigNumber value must be zero.
	          if (c[0] === 0) {
	            if (e === 0 && c.length === 1) return true;
	            break out;
	          }

	          // Calculate number of digits that c[0] should have, based on the exponent.
	          i = (e + 1) % LOG_BASE;
	          if (i < 1) i += LOG_BASE;

	          // Calculate number of digits of c[0].
	          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
	          if (String(c[0]).length == i) {

	            for (i = 0; i < c.length; i++) {
	              n = c[i];
	              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
	            }

	            // Last element cannot be zero, unless it is the only element.
	            if (n !== 0) return true;
	          }
	        }

	      // Infinity/NaN
	      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
	        return true;
	      }

	      throw Error
	        (bignumberError + 'Invalid BigNumber: ' + v);
	    };


	    /*
	     * Return a new BigNumber whose value is the maximum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.maximum = BigNumber.max = function () {
	      return maxOrMin(arguments, -1);
	    };


	    /*
	     * Return a new BigNumber whose value is the minimum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.minimum = BigNumber.min = function () {
	      return maxOrMin(arguments, 1);
	    };


	    /*
	     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	     * zeros are produced).
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
	     * '[BigNumber Error] crypto unavailable'
	     */
	    BigNumber.random = (function () {
	      var pow2_53 = 0x20000000000000;

	      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	      // Check if Math.random() produces more than 32 bits of randomness.
	      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	       ? function () { return mathfloor(Math.random() * pow2_53); }
	       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	         (Math.random() * 0x800000 | 0); };

	      return function (dp) {
	        var a, b, e, k, v,
	          i = 0,
	          c = [],
	          rand = new BigNumber(ONE);

	        if (dp == null) dp = DECIMAL_PLACES;
	        else intCheck(dp, 0, MAX);

	        k = mathceil(dp / LOG_BASE);

	        if (CRYPTO) {

	          // Browsers supporting crypto.getRandomValues.
	          if (crypto.getRandomValues) {

	            a = crypto.getRandomValues(new Uint32Array(k *= 2));

	            for (; i < k;) {

	              // 53 bits:
	              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	              //                                     11111 11111111 11111111
	              // 0x20000 is 2^21.
	              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

	              // Rejection sampling:
	              // 0 <= v < 9007199254740992
	              // Probability that v >= 9e15, is
	              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	              if (v >= 9e15) {
	                b = crypto.getRandomValues(new Uint32Array(2));
	                a[i] = b[0];
	                a[i + 1] = b[1];
	              } else {

	                // 0 <= v <= 8999999999999999
	                // 0 <= (v % 1e14) <= 99999999999999
	                c.push(v % 1e14);
	                i += 2;
	              }
	            }
	            i = k / 2;

	          // Node.js supporting crypto.randomBytes.
	          } else if (crypto.randomBytes) {

	            // buffer
	            a = crypto.randomBytes(k *= 7);

	            for (; i < k;) {

	              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	              // 0x100000000 is 2^32, 0x1000000 is 2^24
	              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	              // 0 <= v < 9007199254740992
	              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
	                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
	                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

	              if (v >= 9e15) {
	                crypto.randomBytes(7).copy(a, i);
	              } else {

	                // 0 <= (v % 1e14) <= 99999999999999
	                c.push(v % 1e14);
	                i += 7;
	              }
	            }
	            i = k / 7;
	          } else {
	            CRYPTO = false;
	            throw Error
	             (bignumberError + 'crypto unavailable');
	          }
	        }

	        // Use Math.random.
	        if (!CRYPTO) {

	          for (; i < k;) {
	            v = random53bitInt();
	            if (v < 9e15) c[i++] = v % 1e14;
	          }
	        }

	        k = c[--i];
	        dp %= LOG_BASE;

	        // Convert trailing digits to zeros according to dp.
	        if (k && dp) {
	          v = POWS_TEN[LOG_BASE - dp];
	          c[i] = mathfloor(k / v) * v;
	        }

	        // Remove trailing elements which are zero.
	        for (; c[i] === 0; c.pop(), i--);

	        // Zero?
	        if (i < 0) {
	          c = [e = 0];
	        } else {

	          // Remove leading elements which are zero and adjust exponent accordingly.
	          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

	          // Count the digits of the first element of c to determine leading zeros, and...
	          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

	          // adjust the exponent accordingly.
	          if (i < LOG_BASE) e -= LOG_BASE - i;
	        }

	        rand.e = e;
	        rand.c = c;
	        return rand;
	      };
	    })();


	    /*
	     * Return a BigNumber whose value is the sum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.sum = function () {
	      var i = 1,
	        args = arguments,
	        sum = new BigNumber(args[0]);
	      for (; i < args.length;) sum = sum.plus(args[i++]);
	      return sum;
	    };


	    // PRIVATE FUNCTIONS


	    // Called by BigNumber and BigNumber.prototype.toString.
	    convertBase = (function () {
	      var decimal = '0123456789';

	      /*
	       * Convert string of baseIn to an array of numbers of baseOut.
	       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
	       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
	       */
	      function toBaseOut(str, baseIn, baseOut, alphabet) {
	        var j,
	          arr = [0],
	          arrL,
	          i = 0,
	          len = str.length;

	        for (; i < len;) {
	          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

	          arr[0] += alphabet.indexOf(str.charAt(i++));

	          for (j = 0; j < arr.length; j++) {

	            if (arr[j] > baseOut - 1) {
	              if (arr[j + 1] == null) arr[j + 1] = 0;
	              arr[j + 1] += arr[j] / baseOut | 0;
	              arr[j] %= baseOut;
	            }
	          }
	        }

	        return arr.reverse();
	      }

	      // Convert a numeric string of baseIn to a numeric string of baseOut.
	      // If the caller is toString, we are converting from base 10 to baseOut.
	      // If the caller is BigNumber, we are converting from baseIn to base 10.
	      return function (str, baseIn, baseOut, sign, callerIsToString) {
	        var alphabet, d, e, k, r, x, xc, y,
	          i = str.indexOf('.'),
	          dp = DECIMAL_PLACES,
	          rm = ROUNDING_MODE;

	        // Non-integer.
	        if (i >= 0) {
	          k = POW_PRECISION;

	          // Unlimited precision.
	          POW_PRECISION = 0;
	          str = str.replace('.', '');
	          y = new BigNumber(baseIn);
	          x = y.pow(str.length - i);
	          POW_PRECISION = k;

	          // Convert str as if an integer, then restore the fraction part by dividing the
	          // result by its base raised to a power.

	          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
	           10, baseOut, decimal);
	          y.e = y.c.length;
	        }

	        // Convert the number as integer.

	        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
	         ? (alphabet = ALPHABET, decimal)
	         : (alphabet = decimal, ALPHABET));

	        // xc now represents str as an integer and converted to baseOut. e is the exponent.
	        e = k = xc.length;

	        // Remove trailing zeros.
	        for (; xc[--k] == 0; xc.pop());

	        // Zero?
	        if (!xc[0]) return alphabet.charAt(0);

	        // Does str represent an integer? If so, no need for the division.
	        if (i < 0) {
	          --e;
	        } else {
	          x.c = xc;
	          x.e = e;

	          // The sign is needed for correct rounding.
	          x.s = sign;
	          x = div(x, y, dp, rm, baseOut);
	          xc = x.c;
	          r = x.r;
	          e = x.e;
	        }

	        // xc now represents str converted to baseOut.

	        // THe index of the rounding digit.
	        d = e + dp + 1;

	        // The rounding digit: the digit to the right of the digit that may be rounded up.
	        i = xc[d];

	        // Look at the rounding digits and mode to determine whether to round up.

	        k = baseOut / 2;
	        r = r || d < 0 || xc[d + 1] != null;

	        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	               rm == (x.s < 0 ? 8 : 7));

	        // If the index of the rounding digit is not greater than zero, or xc represents
	        // zero, then the result of the base conversion is zero or, if rounding up, a value
	        // such as 0.00001.
	        if (d < 1 || !xc[0]) {

	          // 1^-dp or 0
	          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
	        } else {

	          // Truncate xc to the required number of decimal places.
	          xc.length = d;

	          // Round up?
	          if (r) {

	            // Rounding up may mean the previous digit has to be rounded up and so on.
	            for (--baseOut; ++xc[--d] > baseOut;) {
	              xc[d] = 0;

	              if (!d) {
	                ++e;
	                xc = [1].concat(xc);
	              }
	            }
	          }

	          // Determine trailing zeros.
	          for (k = xc.length; !xc[--k];);

	          // E.g. [4, 11, 15] becomes 4bf.
	          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

	          // Add leading zeros, decimal point and trailing zeros as required.
	          str = toFixedPoint(str, e, alphabet.charAt(0));
	        }

	        // The caller will add the sign.
	        return str;
	      };
	    })();


	    // Perform division in the specified base. Called by div and convertBase.
	    div = (function () {

	      // Assume non-zero x and k.
	      function multiply(x, k, base) {
	        var m, temp, xlo, xhi,
	          carry = 0,
	          i = x.length,
	          klo = k % SQRT_BASE,
	          khi = k / SQRT_BASE | 0;

	        for (x = x.slice(); i--;) {
	          xlo = x[i] % SQRT_BASE;
	          xhi = x[i] / SQRT_BASE | 0;
	          m = khi * xlo + xhi * klo;
	          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
	          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
	          x[i] = temp % base;
	        }

	        if (carry) x = [carry].concat(x);

	        return x;
	      }

	      function compare(a, b, aL, bL) {
	        var i, cmp;

	        if (aL != bL) {
	          cmp = aL > bL ? 1 : -1;
	        } else {

	          for (i = cmp = 0; i < aL; i++) {

	            if (a[i] != b[i]) {
	              cmp = a[i] > b[i] ? 1 : -1;
	              break;
	            }
	          }
	        }

	        return cmp;
	      }

	      function subtract(a, b, aL, base) {
	        var i = 0;

	        // Subtract b from a.
	        for (; aL--;) {
	          a[aL] -= i;
	          i = a[aL] < b[aL] ? 1 : 0;
	          a[aL] = i * base + a[aL] - b[aL];
	        }

	        // Remove leading zeros.
	        for (; !a[0] && a.length > 1; a.splice(0, 1));
	      }

	      // x: dividend, y: divisor.
	      return function (x, y, dp, rm, base) {
	        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	          yL, yz,
	          s = x.s == y.s ? 1 : -1,
	          xc = x.c,
	          yc = y.c;

	        // Either NaN, Infinity or 0?
	        if (!xc || !xc[0] || !yc || !yc[0]) {

	          return new BigNumber(

	           // Return NaN if either NaN, or both Infinity or 0.
	           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

	            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	         );
	        }

	        q = new BigNumber(s);
	        qc = q.c = [];
	        e = x.e - y.e;
	        s = dp + e + 1;

	        if (!base) {
	          base = BASE;
	          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
	          s = s / LOG_BASE | 0;
	        }

	        // Result exponent may be one less then the current value of e.
	        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	        for (i = 0; yc[i] == (xc[i] || 0); i++);

	        if (yc[i] > (xc[i] || 0)) e--;

	        if (s < 0) {
	          qc.push(1);
	          more = true;
	        } else {
	          xL = xc.length;
	          yL = yc.length;
	          i = 0;
	          s += 2;

	          // Normalise xc and yc so highest order digit of yc is >= base / 2.

	          n = mathfloor(base / (yc[0] + 1));

	          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
	          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
	          if (n > 1) {
	            yc = multiply(yc, n, base);
	            xc = multiply(xc, n, base);
	            yL = yc.length;
	            xL = xc.length;
	          }

	          xi = yL;
	          rem = xc.slice(0, yL);
	          remL = rem.length;

	          // Add zeros to make remainder as long as divisor.
	          for (; remL < yL; rem[remL++] = 0);
	          yz = yc.slice();
	          yz = [0].concat(yz);
	          yc0 = yc[0];
	          if (yc[1] >= base / 2) yc0++;
	          // Not necessary, but to prevent trial digit n > base, when using base 3.
	          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

	          do {
	            n = 0;

	            // Compare divisor and remainder.
	            cmp = compare(yc, rem, yL, remL);

	            // If divisor < remainder.
	            if (cmp < 0) {

	              // Calculate trial digit, n.

	              rem0 = rem[0];
	              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	              // n is how many times the divisor goes into the current remainder.
	              n = mathfloor(rem0 / yc0);

	              //  Algorithm:
	              //  product = divisor multiplied by trial digit (n).
	              //  Compare product and remainder.
	              //  If product is greater than remainder:
	              //    Subtract divisor from product, decrement trial digit.
	              //  Subtract product from remainder.
	              //  If product was less than remainder at the last compare:
	              //    Compare new remainder and divisor.
	              //    If remainder is greater than divisor:
	              //      Subtract divisor from remainder, increment trial digit.

	              if (n > 1) {

	                // n may be > base only when base is 3.
	                if (n >= base) n = base - 1;

	                // product = divisor * trial digit.
	                prod = multiply(yc, n, base);
	                prodL = prod.length;
	                remL = rem.length;

	                // Compare product and remainder.
	                // If product > remainder then trial digit n too high.
	                // n is 1 too high about 5% of the time, and is not known to have
	                // ever been more than 1 too high.
	                while (compare(prod, rem, prodL, remL) == 1) {
	                  n--;

	                  // Subtract divisor from product.
	                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
	                  prodL = prod.length;
	                  cmp = 1;
	                }
	              } else {

	                // n is 0 or 1, cmp is -1.
	                // If n is 0, there is no need to compare yc and rem again below,
	                // so change cmp to 1 to avoid it.
	                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                if (n == 0) {

	                  // divisor < remainder, so n must be at least 1.
	                  cmp = n = 1;
	                }

	                // product = divisor
	                prod = yc.slice();
	                prodL = prod.length;
	              }

	              if (prodL < remL) prod = [0].concat(prod);

	              // Subtract product from remainder.
	              subtract(rem, prod, remL, base);
	              remL = rem.length;

	               // If product was < remainder.
	              if (cmp == -1) {

	                // Compare divisor and new remainder.
	                // If divisor < new remainder, subtract divisor from remainder.
	                // Trial digit n too low.
	                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                while (compare(yc, rem, yL, remL) < 1) {
	                  n++;

	                  // Subtract divisor from remainder.
	                  subtract(rem, yL < remL ? yz : yc, remL, base);
	                  remL = rem.length;
	                }
	              }
	            } else if (cmp === 0) {
	              n++;
	              rem = [0];
	            } // else cmp === 1 and n will be 0

	            // Add the next digit, n, to the result array.
	            qc[i++] = n;

	            // Update the remainder.
	            if (rem[0]) {
	              rem[remL++] = xc[xi] || 0;
	            } else {
	              rem = [xc[xi]];
	              remL = 1;
	            }
	          } while ((xi++ < xL || rem[0] != null) && s--);

	          more = rem[0] != null;

	          // Leading zero?
	          if (!qc[0]) qc.splice(0, 1);
	        }

	        if (base == BASE) {

	          // To calculate q.e, first get the number of digits of qc[0].
	          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

	          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

	        // Caller is convertBase.
	        } else {
	          q.e = e;
	          q.r = +more;
	        }

	        return q;
	      };
	    })();


	    /*
	     * Return a string representing the value of BigNumber n in fixed-point or exponential
	     * notation rounded to the specified decimal places or significant digits.
	     *
	     * n: a BigNumber.
	     * i: the index of the last digit required (i.e. the digit that may be rounded up).
	     * rm: the rounding mode.
	     * id: 1 (toExponential) or 2 (toPrecision).
	     */
	    function format(n, i, rm, id) {
	      var c0, e, ne, len, str;

	      if (rm == null) rm = ROUNDING_MODE;
	      else intCheck(rm, 0, 8);

	      if (!n.c) return n.toString();

	      c0 = n.c[0];
	      ne = n.e;

	      if (i == null) {
	        str = coeffToString(n.c);
	        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
	         ? toExponential(str, ne)
	         : toFixedPoint(str, ne, '0');
	      } else {
	        n = round(new BigNumber(n), i, rm);

	        // n.e may have changed if the value was rounded up.
	        e = n.e;

	        str = coeffToString(n.c);
	        len = str.length;

	        // toPrecision returns exponential notation if the number of significant digits
	        // specified is less than the number of digits necessary to represent the integer
	        // part of the value in fixed-point notation.

	        // Exponential notation.
	        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

	          // Append zeros?
	          for (; len < i; str += '0', len++);
	          str = toExponential(str, e);

	        // Fixed-point notation.
	        } else {
	          i -= ne;
	          str = toFixedPoint(str, e, '0');

	          // Append zeros?
	          if (e + 1 > len) {
	            if (--i > 0) for (str += '.'; i--; str += '0');
	          } else {
	            i += e - len;
	            if (i > 0) {
	              if (e + 1 == len) str += '.';
	              for (; i--; str += '0');
	            }
	          }
	        }
	      }

	      return n.s < 0 && c0 ? '-' + str : str;
	    }


	    // Handle BigNumber.max and BigNumber.min.
	    // If any number is NaN, return NaN.
	    function maxOrMin(args, n) {
	      var k, y,
	        i = 1,
	        x = new BigNumber(args[0]);

	      for (; i < args.length; i++) {
	        y = new BigNumber(args[i]);
	        if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
	          x = y;
	        }
	      }

	      return x;
	    }


	    /*
	     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	     * Called by minus, plus and times.
	     */
	    function normalise(n, c, e) {
	      var i = 1,
	        j = c.length;

	       // Remove trailing zeros.
	      for (; !c[--j]; c.pop());

	      // Calculate the base 10 exponent. First get the number of digits of c[0].
	      for (j = c[0]; j >= 10; j /= 10, i++);

	      // Overflow?
	      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

	        // Infinity.
	        n.c = n.e = null;

	      // Underflow?
	      } else if (e < MIN_EXP) {

	        // Zero.
	        n.c = [n.e = 0];
	      } else {
	        n.e = e;
	        n.c = c;
	      }

	      return n;
	    }


	    // Handle values that fail the validity test in BigNumber.
	    parseNumeric = (function () {
	      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
	        dotAfter = /^([^.]+)\.$/,
	        dotBefore = /^\.([^.]+)$/,
	        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

	      return function (x, str, isNum, b) {
	        var base,
	          s = isNum ? str : str.replace(whitespaceOrPlus, '');

	        // No exception on ±Infinity or NaN.
	        if (isInfinityOrNaN.test(s)) {
	          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	        } else {
	          if (!isNum) {

	            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	            s = s.replace(basePrefix, function (m, p1, p2) {
	              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	              return !b || b == base ? p1 : m;
	            });

	            if (b) {
	              base = b;

	              // E.g. '1.' to '1', '.1' to '0.1'
	              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
	            }

	            if (str != s) return new BigNumber(s, base);
	          }

	          // '[BigNumber Error] Not a number: {n}'
	          // '[BigNumber Error] Not a base {b} number: {n}'
	          if (BigNumber.DEBUG) {
	            throw Error
	              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
	          }

	          // NaN
	          x.s = null;
	        }

	        x.c = x.e = null;
	      }
	    })();


	    /*
	     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	     * If r is truthy, it is known that there are more digits after the rounding digit.
	     */
	    function round(x, sd, rm, r) {
	      var d, i, j, k, n, ni, rd,
	        xc = x.c,
	        pows10 = POWS_TEN;

	      // if x is not Infinity or NaN...
	      if (xc) {

	        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	        // n is a base 1e14 number, the value of the element of array x.c containing rd.
	        // ni is the index of n within x.c.
	        // d is the number of digits of n.
	        // i is the index of rd within n including leading zeros.
	        // j is the actual index of rd within n (if < 0, rd is a leading zero).
	        out: {

	          // Get the number of digits of the first element of xc.
	          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
	          i = sd - d;

	          // If the rounding digit is in the first element of xc...
	          if (i < 0) {
	            i += LOG_BASE;
	            j = sd;
	            n = xc[ni = 0];

	            // Get the rounding digit at index j of n.
	            rd = mathfloor(n / pows10[d - j - 1] % 10);
	          } else {
	            ni = mathceil((i + 1) / LOG_BASE);

	            if (ni >= xc.length) {

	              if (r) {

	                // Needed by sqrt.
	                for (; xc.length <= ni; xc.push(0));
	                n = rd = 0;
	                d = 1;
	                i %= LOG_BASE;
	                j = i - LOG_BASE + 1;
	              } else {
	                break out;
	              }
	            } else {
	              n = k = xc[ni];

	              // Get the number of digits of n.
	              for (d = 1; k >= 10; k /= 10, d++);

	              // Get the index of rd within n.
	              i %= LOG_BASE;

	              // Get the index of rd within n, adjusted for leading zeros.
	              // The number of leading zeros of n is given by LOG_BASE - d.
	              j = i - LOG_BASE + d;

	              // Get the rounding digit at index j of n.
	              rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
	            }
	          }

	          r = r || sd < 0 ||

	          // Are there any non-zero digits after the rounding digit?
	          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
	          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

	          r = rm < 4
	           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

	            // Check whether the digit to the left of the rounding digit is odd.
	            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
	             rm == (x.s < 0 ? 8 : 7));

	          if (sd < 1 || !xc[0]) {
	            xc.length = 0;

	            if (r) {

	              // Convert sd to decimal places.
	              sd -= x.e + 1;

	              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
	              x.e = -sd || 0;
	            } else {

	              // Zero.
	              xc[0] = x.e = 0;
	            }

	            return x;
	          }

	          // Remove excess digits.
	          if (i == 0) {
	            xc.length = ni;
	            k = 1;
	            ni--;
	          } else {
	            xc.length = ni + 1;
	            k = pows10[LOG_BASE - i];

	            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	            // j > 0 means i > number of leading zeros of n.
	            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
	          }

	          // Round up?
	          if (r) {

	            for (; ;) {

	              // If the digit to be rounded up is in the first element of xc...
	              if (ni == 0) {

	                // i will be the length of xc[0] before k is added.
	                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
	                j = xc[0] += k;
	                for (k = 1; j >= 10; j /= 10, k++);

	                // if i != k the length has increased.
	                if (i != k) {
	                  x.e++;
	                  if (xc[0] == BASE) xc[0] = 1;
	                }

	                break;
	              } else {
	                xc[ni] += k;
	                if (xc[ni] != BASE) break;
	                xc[ni--] = 0;
	                k = 1;
	              }
	            }
	          }

	          // Remove trailing zeros.
	          for (i = xc.length; xc[--i] === 0; xc.pop());
	        }

	        // Overflow? Infinity.
	        if (x.e > MAX_EXP) {
	          x.c = x.e = null;

	        // Underflow? Zero.
	        } else if (x.e < MIN_EXP) {
	          x.c = [x.e = 0];
	        }
	      }

	      return x;
	    }


	    function valueOf(n) {
	      var str,
	        e = n.e;

	      if (e === null) return n.toString();

	      str = coeffToString(n.c);

	      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	        ? toExponential(str, e)
	        : toFixedPoint(str, e, '0');

	      return n.s < 0 ? '-' + str : str;
	    }


	    // PROTOTYPE/INSTANCE METHODS


	    /*
	     * Return a new BigNumber whose value is the absolute value of this BigNumber.
	     */
	    P.absoluteValue = P.abs = function () {
	      var x = new BigNumber(this);
	      if (x.s < 0) x.s = 1;
	      return x;
	    };


	    /*
	     * Return
	     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	     *   0 if they have the same value,
	     *   or null if the value of either is NaN.
	     */
	    P.comparedTo = function (y, b) {
	      return compare(this, new BigNumber(y, b));
	    };


	    /*
	     * If dp is undefined or null or true or false, return the number of decimal places of the
	     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
	     *
	     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
	     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
	     * ROUNDING_MODE if rm is omitted.
	     *
	     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.decimalPlaces = P.dp = function (dp, rm) {
	      var c, n, v,
	        x = this;

	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        if (rm == null) rm = ROUNDING_MODE;
	        else intCheck(rm, 0, 8);

	        return round(new BigNumber(x), dp + x.e + 1, rm);
	      }

	      if (!(c = x.c)) return null;
	      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

	      // Subtract the number of trailing zeros of the last number.
	      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
	      if (n < 0) n = 0;

	      return n;
	    };


	    /*
	     *  n / 0 = I
	     *  n / N = N
	     *  n / I = 0
	     *  0 / n = 0
	     *  0 / 0 = N
	     *  0 / N = N
	     *  0 / I = 0
	     *  N / n = N
	     *  N / 0 = N
	     *  N / N = N
	     *  N / I = N
	     *  I / n = I
	     *  I / 0 = I
	     *  I / N = N
	     *  I / I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P.dividedBy = P.div = function (y, b) {
	      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
	    };


	    /*
	     * Return a new BigNumber whose value is the integer part of dividing the value of this
	     * BigNumber by the value of BigNumber(y, b).
	     */
	    P.dividedToIntegerBy = P.idiv = function (y, b) {
	      return div(this, new BigNumber(y, b), 0, 1);
	    };


	    /*
	     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
	     *
	     * If m is present, return the result modulo m.
	     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
	     *
	     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
	     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
	     *
	     * n {number|string|BigNumber} The exponent. An integer.
	     * [m] {number|string|BigNumber} The modulus.
	     *
	     * '[BigNumber Error] Exponent not an integer: {n}'
	     */
	    P.exponentiatedBy = P.pow = function (n, m) {
	      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
	        x = this;

	      n = new BigNumber(n);

	      // Allow NaN and ±Infinity, but not other non-integers.
	      if (n.c && !n.isInteger()) {
	        throw Error
	          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
	      }

	      if (m != null) m = new BigNumber(m);

	      // Exponent of MAX_SAFE_INTEGER is 15.
	      nIsBig = n.e > 14;

	      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
	      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

	        // The sign of the result of pow when x is negative depends on the evenness of n.
	        // If +n overflows to ±Infinity, the evenness of n would be not be known.
	        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
	        return m ? y.mod(m) : y;
	      }

	      nIsNeg = n.s < 0;

	      if (m) {

	        // x % m returns NaN if abs(m) is zero, or m is NaN.
	        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

	        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

	        if (isModExp) x = x.mod(m);

	      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
	      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
	      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
	        // [1, 240000000]
	        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
	        // [80000000000000]  [99999750000000]
	        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

	        // If x is negative and n is odd, k = -0, else k = 0.
	        k = x.s < 0 && isOdd(n) ? -0 : 0;

	        // If x >= 1, k = ±Infinity.
	        if (x.e > -1) k = 1 / k;

	        // If n is negative return ±0, else return ±Infinity.
	        return new BigNumber(nIsNeg ? 1 / k : k);

	      } else if (POW_PRECISION) {

	        // Truncating each coefficient array to a length of k after each multiplication
	        // equates to truncating significant digits to POW_PRECISION + [28, 41],
	        // i.e. there will be a minimum of 28 guard digits retained.
	        k = mathceil(POW_PRECISION / LOG_BASE + 2);
	      }

	      if (nIsBig) {
	        half = new BigNumber(0.5);
	        if (nIsNeg) n.s = 1;
	        nIsOdd = isOdd(n);
	      } else {
	        i = Math.abs(+valueOf(n));
	        nIsOdd = i % 2;
	      }

	      y = new BigNumber(ONE);

	      // Performs 54 loop iterations for n of 9007199254740991.
	      for (; ;) {

	        if (nIsOdd) {
	          y = y.times(x);
	          if (!y.c) break;

	          if (k) {
	            if (y.c.length > k) y.c.length = k;
	          } else if (isModExp) {
	            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
	          }
	        }

	        if (i) {
	          i = mathfloor(i / 2);
	          if (i === 0) break;
	          nIsOdd = i % 2;
	        } else {
	          n = n.times(half);
	          round(n, n.e + 1, 1);

	          if (n.e > 14) {
	            nIsOdd = isOdd(n);
	          } else {
	            i = +valueOf(n);
	            if (i === 0) break;
	            nIsOdd = i % 2;
	          }
	        }

	        x = x.times(x);

	        if (k) {
	          if (x.c && x.c.length > k) x.c.length = k;
	        } else if (isModExp) {
	          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
	        }
	      }

	      if (isModExp) return y;
	      if (nIsNeg) y = ONE.div(y);

	      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
	     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	     *
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
	     */
	    P.integerValue = function (rm) {
	      var n = new BigNumber(this);
	      if (rm == null) rm = ROUNDING_MODE;
	      else intCheck(rm, 0, 8);
	      return round(n, n.e + 1, rm);
	    };


	    /*
	     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isEqualTo = P.eq = function (y, b) {
	      return compare(this, new BigNumber(y, b)) === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is a finite number, otherwise return false.
	     */
	    P.isFinite = function () {
	      return !!this.c;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isGreaterThan = P.gt = function (y, b) {
	      return compare(this, new BigNumber(y, b)) > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than or equal to the value of
	     * BigNumber(y, b), otherwise return false.
	     */
	    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
	      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

	    };


	    /*
	     * Return true if the value of this BigNumber is an integer, otherwise return false.
	     */
	    P.isInteger = function () {
	      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isLessThan = P.lt = function (y, b) {
	      return compare(this, new BigNumber(y, b)) < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than or equal to the value of
	     * BigNumber(y, b), otherwise return false.
	     */
	    P.isLessThanOrEqualTo = P.lte = function (y, b) {
	      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is NaN, otherwise return false.
	     */
	    P.isNaN = function () {
	      return !this.s;
	    };


	    /*
	     * Return true if the value of this BigNumber is negative, otherwise return false.
	     */
	    P.isNegative = function () {
	      return this.s < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is positive, otherwise return false.
	     */
	    P.isPositive = function () {
	      return this.s > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
	     */
	    P.isZero = function () {
	      return !!this.c && this.c[0] == 0;
	    };


	    /*
	     *  n - 0 = n
	     *  n - N = N
	     *  n - I = -I
	     *  0 - n = -n
	     *  0 - 0 = 0
	     *  0 - N = N
	     *  0 - I = -I
	     *  N - n = N
	     *  N - 0 = N
	     *  N - N = N
	     *  N - I = N
	     *  I - n = I
	     *  I - 0 = I
	     *  I - N = N
	     *  I - I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	     * BigNumber(y, b).
	     */
	    P.minus = function (y, b) {
	      var i, j, t, xLTy,
	        x = this,
	        a = x.s;

	      y = new BigNumber(y, b);
	      b = y.s;

	      // Either NaN?
	      if (!a || !b) return new BigNumber(NaN);

	      // Signs differ?
	      if (a != b) {
	        y.s = -b;
	        return x.plus(y);
	      }

	      var xe = x.e / LOG_BASE,
	        ye = y.e / LOG_BASE,
	        xc = x.c,
	        yc = y.c;

	      if (!xe || !ye) {

	        // Either Infinity?
	        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

	           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	           ROUNDING_MODE == 3 ? -0 : 0);
	        }
	      }

	      xe = bitFloor(xe);
	      ye = bitFloor(ye);
	      xc = xc.slice();

	      // Determine which is the bigger number.
	      if (a = xe - ye) {

	        if (xLTy = a < 0) {
	          a = -a;
	          t = xc;
	        } else {
	          ye = xe;
	          t = yc;
	        }

	        t.reverse();

	        // Prepend zeros to equalise exponents.
	        for (b = a; b--; t.push(0));
	        t.reverse();
	      } else {

	        // Exponents equal. Check digit by digit.
	        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

	        for (a = b = 0; b < j; b++) {

	          if (xc[b] != yc[b]) {
	            xLTy = xc[b] < yc[b];
	            break;
	          }
	        }
	      }

	      // x < y? Point xc to the array of the bigger number.
	      if (xLTy) {
	        t = xc;
	        xc = yc;
	        yc = t;
	        y.s = -y.s;
	      }

	      b = (j = yc.length) - (i = xc.length);

	      // Append zeros to xc if shorter.
	      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	      if (b > 0) for (; b--; xc[i++] = 0);
	      b = BASE - 1;

	      // Subtract yc from xc.
	      for (; j > a;) {

	        if (xc[--j] < yc[j]) {
	          for (i = j; i && !xc[--i]; xc[i] = b);
	          --xc[i];
	          xc[j] += BASE;
	        }

	        xc[j] -= yc[j];
	      }

	      // Remove leading zeros and adjust exponent accordingly.
	      for (; xc[0] == 0; xc.splice(0, 1), --ye);

	      // Zero?
	      if (!xc[0]) {

	        // Following IEEE 754 (2008) 6.3,
	        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	        y.s = ROUNDING_MODE == 3 ? -1 : 1;
	        y.c = [y.e = 0];
	        return y;
	      }

	      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	      // for finite x and y.
	      return normalise(y, xc, ye);
	    };


	    /*
	     *   n % 0 =  N
	     *   n % N =  N
	     *   n % I =  n
	     *   0 % n =  0
	     *  -0 % n = -0
	     *   0 % 0 =  N
	     *   0 % N =  N
	     *   0 % I =  0
	     *   N % n =  N
	     *   N % 0 =  N
	     *   N % N =  N
	     *   N % I =  N
	     *   I % n =  N
	     *   I % 0 =  N
	     *   I % N =  N
	     *   I % I =  N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	     */
	    P.modulo = P.mod = function (y, b) {
	      var q, s,
	        x = this;

	      y = new BigNumber(y, b);

	      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	      if (!x.c || !y.s || y.c && !y.c[0]) {
	        return new BigNumber(NaN);

	      // Return x if y is Infinity or x is zero.
	      } else if (!y.c || x.c && !x.c[0]) {
	        return new BigNumber(x);
	      }

	      if (MODULO_MODE == 9) {

	        // Euclidian division: q = sign(y) * floor(x / abs(y))
	        // r = x - qy    where  0 <= r < abs(y)
	        s = y.s;
	        y.s = 1;
	        q = div(x, y, 0, 3);
	        y.s = s;
	        q.s *= s;
	      } else {
	        q = div(x, y, 0, MODULO_MODE);
	      }

	      y = x.minus(q.times(y));

	      // To match JavaScript %, ensure sign of zero is sign of dividend.
	      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

	      return y;
	    };


	    /*
	     *  n * 0 = 0
	     *  n * N = N
	     *  n * I = I
	     *  0 * n = 0
	     *  0 * 0 = 0
	     *  0 * N = N
	     *  0 * I = N
	     *  N * n = N
	     *  N * 0 = N
	     *  N * N = N
	     *  N * I = N
	     *  I * n = I
	     *  I * 0 = N
	     *  I * N = N
	     *  I * I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
	     * of BigNumber(y, b).
	     */
	    P.multipliedBy = P.times = function (y, b) {
	      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	        base, sqrtBase,
	        x = this,
	        xc = x.c,
	        yc = (y = new BigNumber(y, b)).c;

	      // Either NaN, ±Infinity or ±0?
	      if (!xc || !yc || !xc[0] || !yc[0]) {

	        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
	          y.c = y.e = y.s = null;
	        } else {
	          y.s *= x.s;

	          // Return ±Infinity if either is ±Infinity.
	          if (!xc || !yc) {
	            y.c = y.e = null;

	          // Return ±0 if either is ±0.
	          } else {
	            y.c = [0];
	            y.e = 0;
	          }
	        }

	        return y;
	      }

	      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
	      y.s *= x.s;
	      xcL = xc.length;
	      ycL = yc.length;

	      // Ensure xc points to longer array and xcL to its length.
	      if (xcL < ycL) {
	        zc = xc;
	        xc = yc;
	        yc = zc;
	        i = xcL;
	        xcL = ycL;
	        ycL = i;
	      }

	      // Initialise the result array with zeros.
	      for (i = xcL + ycL, zc = []; i--; zc.push(0));

	      base = BASE;
	      sqrtBase = SQRT_BASE;

	      for (i = ycL; --i >= 0;) {
	        c = 0;
	        ylo = yc[i] % sqrtBase;
	        yhi = yc[i] / sqrtBase | 0;

	        for (k = xcL, j = i + k; j > i;) {
	          xlo = xc[--k] % sqrtBase;
	          xhi = xc[k] / sqrtBase | 0;
	          m = yhi * xlo + xhi * ylo;
	          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
	          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
	          zc[j--] = xlo % base;
	        }

	        zc[j] = c;
	      }

	      if (c) {
	        ++e;
	      } else {
	        zc.splice(0, 1);
	      }

	      return normalise(y, zc, e);
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber negated,
	     * i.e. multiplied by -1.
	     */
	    P.negated = function () {
	      var x = new BigNumber(this);
	      x.s = -x.s || null;
	      return x;
	    };


	    /*
	     *  n + 0 = n
	     *  n + N = N
	     *  n + I = I
	     *  0 + n = n
	     *  0 + 0 = 0
	     *  0 + N = N
	     *  0 + I = I
	     *  N + n = N
	     *  N + 0 = N
	     *  N + N = N
	     *  N + I = N
	     *  I + n = I
	     *  I + 0 = I
	     *  I + N = N
	     *  I + I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	     * BigNumber(y, b).
	     */
	    P.plus = function (y, b) {
	      var t,
	        x = this,
	        a = x.s;

	      y = new BigNumber(y, b);
	      b = y.s;

	      // Either NaN?
	      if (!a || !b) return new BigNumber(NaN);

	      // Signs differ?
	       if (a != b) {
	        y.s = -b;
	        return x.minus(y);
	      }

	      var xe = x.e / LOG_BASE,
	        ye = y.e / LOG_BASE,
	        xc = x.c,
	        yc = y.c;

	      if (!xe || !ye) {

	        // Return ±Infinity if either ±Infinity.
	        if (!xc || !yc) return new BigNumber(a / 0);

	        // Either zero?
	        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
	      }

	      xe = bitFloor(xe);
	      ye = bitFloor(ye);
	      xc = xc.slice();

	      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	      if (a = xe - ye) {
	        if (a > 0) {
	          ye = xe;
	          t = yc;
	        } else {
	          a = -a;
	          t = xc;
	        }

	        t.reverse();
	        for (; a--; t.push(0));
	        t.reverse();
	      }

	      a = xc.length;
	      b = yc.length;

	      // Point xc to the longer array, and b to the shorter length.
	      if (a - b < 0) {
	        t = yc;
	        yc = xc;
	        xc = t;
	        b = a;
	      }

	      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	      for (a = 0; b;) {
	        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
	        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
	      }

	      if (a) {
	        xc = [a].concat(xc);
	        ++ye;
	      }

	      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	      // ye = MAX_EXP + 1 possible
	      return normalise(y, xc, ye);
	    };


	    /*
	     * If sd is undefined or null or true or false, return the number of significant digits of
	     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
	     * If sd is true include integer-part trailing zeros in the count.
	     *
	     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
	     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
	     * ROUNDING_MODE if rm is omitted.
	     *
	     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
	     *                     boolean: whether to count integer-part trailing zeros: true or false.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
	     */
	    P.precision = P.sd = function (sd, rm) {
	      var c, n, v,
	        x = this;

	      if (sd != null && sd !== !!sd) {
	        intCheck(sd, 1, MAX);
	        if (rm == null) rm = ROUNDING_MODE;
	        else intCheck(rm, 0, 8);

	        return round(new BigNumber(x), sd, rm);
	      }

	      if (!(c = x.c)) return null;
	      v = c.length - 1;
	      n = v * LOG_BASE + 1;

	      if (v = c[v]) {

	        // Subtract the number of trailing zeros of the last element.
	        for (; v % 10 == 0; v /= 10, n--);

	        // Add the number of digits of the first element.
	        for (v = c[0]; v >= 10; v /= 10, n++);
	      }

	      if (sd && x.e + 1 > n) n = x.e + 1;

	      return n;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	     *
	     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
	     */
	    P.shiftedBy = function (k) {
	      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
	      return this.times('1e' + k);
	    };


	    /*
	     *  sqrt(-n) =  N
	     *  sqrt(N) =  N
	     *  sqrt(-I) =  N
	     *  sqrt(I) =  I
	     *  sqrt(0) =  0
	     *  sqrt(-0) = -0
	     *
	     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P.squareRoot = P.sqrt = function () {
	      var m, n, r, rep, t,
	        x = this,
	        c = x.c,
	        s = x.s,
	        e = x.e,
	        dp = DECIMAL_PLACES + 4,
	        half = new BigNumber('0.5');

	      // Negative/NaN/Infinity/zero?
	      if (s !== 1 || !c || !c[0]) {
	        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
	      }

	      // Initial estimate.
	      s = Math.sqrt(+valueOf(x));

	      // Math.sqrt underflow/overflow?
	      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	      if (s == 0 || s == 1 / 0) {
	        n = coeffToString(c);
	        if ((n.length + e) % 2 == 0) n += '0';
	        s = Math.sqrt(+n);
	        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

	        if (s == 1 / 0) {
	          n = '5e' + e;
	        } else {
	          n = s.toExponential();
	          n = n.slice(0, n.indexOf('e') + 1) + e;
	        }

	        r = new BigNumber(n);
	      } else {
	        r = new BigNumber(s + '');
	      }

	      // Check for zero.
	      // r could be zero if MIN_EXP is changed after the this value was created.
	      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	      // coeffToString to throw.
	      if (r.c[0]) {
	        e = r.e;
	        s = e + dp;
	        if (s < 3) s = 0;

	        // Newton-Raphson iteration.
	        for (; ;) {
	          t = r;
	          r = half.times(t.plus(div(x, t, dp, 1)));

	          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

	            // The exponent of r may here be one less than the final result exponent,
	            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	            // are indexed correctly.
	            if (r.e < e) --s;
	            n = n.slice(s - 3, s + 1);

	            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	            // iteration.
	            if (n == '9999' || !rep && n == '4999') {

	              // On the first iteration only, check to see if rounding up gives the
	              // exact result as the nines may infinitely repeat.
	              if (!rep) {
	                round(t, t.e + DECIMAL_PLACES + 2, 0);

	                if (t.times(t).eq(x)) {
	                  r = t;
	                  break;
	                }
	              }

	              dp += 4;
	              s += 4;
	              rep = 1;
	            } else {

	              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	              // result. If not, then there are further digits and m will be truthy.
	              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	                // Truncate to the first rounding digit.
	                round(r, r.e + DECIMAL_PLACES + 2, 1);
	                m = !r.times(r).eq(x);
	              }

	              break;
	            }
	          }
	        }
	      }

	      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in exponential notation and
	     * rounded using ROUNDING_MODE to dp fixed decimal places.
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.toExponential = function (dp, rm) {
	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        dp++;
	      }
	      return format(this, dp, rm, 1);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in fixed-point notation rounding
	     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	     *
	     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	     * but e.g. (-0.00001).toFixed(0) is '-0'.
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.toFixed = function (dp, rm) {
	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        dp = dp + this.e + 1;
	      }
	      return format(this, dp, rm);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in fixed-point notation rounded
	     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	     * of the format or FORMAT object (see BigNumber.set).
	     *
	     * The formatting object may contain some or all of the properties shown below.
	     *
	     * FORMAT = {
	     *   prefix: '',
	     *   groupSize: 3,
	     *   secondaryGroupSize: 0,
	     *   groupSeparator: ',',
	     *   decimalSeparator: '.',
	     *   fractionGroupSize: 0,
	     *   fractionGroupSeparator: '\xA0',      // non-breaking space
	     *   suffix: ''
	     * };
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     * [format] {object} Formatting options. See FORMAT pbject above.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     * '[BigNumber Error] Argument not an object: {format}'
	     */
	    P.toFormat = function (dp, rm, format) {
	      var str,
	        x = this;

	      if (format == null) {
	        if (dp != null && rm && typeof rm == 'object') {
	          format = rm;
	          rm = null;
	        } else if (dp && typeof dp == 'object') {
	          format = dp;
	          dp = rm = null;
	        } else {
	          format = FORMAT;
	        }
	      } else if (typeof format != 'object') {
	        throw Error
	          (bignumberError + 'Argument not an object: ' + format);
	      }

	      str = x.toFixed(dp, rm);

	      if (x.c) {
	        var i,
	          arr = str.split('.'),
	          g1 = +format.groupSize,
	          g2 = +format.secondaryGroupSize,
	          groupSeparator = format.groupSeparator || '',
	          intPart = arr[0],
	          fractionPart = arr[1],
	          isNeg = x.s < 0,
	          intDigits = isNeg ? intPart.slice(1) : intPart,
	          len = intDigits.length;

	        if (g2) {
	          i = g1;
	          g1 = g2;
	          g2 = i;
	          len -= i;
	        }

	        if (g1 > 0 && len > 0) {
	          i = len % g1 || g1;
	          intPart = intDigits.substr(0, i);
	          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
	          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
	          if (isNeg) intPart = '-' + intPart;
	        }

	        str = fractionPart
	         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
	          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
	           '$&' + (format.fractionGroupSeparator || ''))
	          : fractionPart)
	         : intPart;
	      }

	      return (format.prefix || '') + str + (format.suffix || '');
	    };


	    /*
	     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
	     * fraction with an integer numerator and an integer denominator.
	     * The denominator will be a positive non-zero value less than or equal to the specified
	     * maximum denominator. If a maximum denominator is not specified, the denominator will be
	     * the lowest value necessary to represent the number exactly.
	     *
	     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
	     *
	     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
	     */
	    P.toFraction = function (md) {
	      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
	        x = this,
	        xc = x.c;

	      if (md != null) {
	        n = new BigNumber(md);

	        // Throw if md is less than one or is not an integer, unless it is Infinity.
	        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
	          throw Error
	            (bignumberError + 'Argument ' +
	              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
	        }
	      }

	      if (!xc) return new BigNumber(x);

	      d = new BigNumber(ONE);
	      n1 = d0 = new BigNumber(ONE);
	      d1 = n0 = new BigNumber(ONE);
	      s = coeffToString(xc);

	      // Determine initial denominator.
	      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	      e = d.e = s.length - x.e - 1;
	      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
	      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

	      exp = MAX_EXP;
	      MAX_EXP = 1 / 0;
	      n = new BigNumber(s);

	      // n0 = d1 = 0
	      n0.c[0] = 0;

	      for (; ;)  {
	        q = div(n, d, 0, 1);
	        d2 = d0.plus(q.times(d1));
	        if (d2.comparedTo(md) == 1) break;
	        d0 = d1;
	        d1 = d2;
	        n1 = n0.plus(q.times(d2 = n1));
	        n0 = d2;
	        d = n.minus(q.times(d2 = d));
	        n = d2;
	      }

	      d2 = div(md.minus(d0), d1, 0, 1);
	      n0 = n0.plus(d2.times(n1));
	      d0 = d0.plus(d2.times(d1));
	      n0.s = n1.s = x.s;
	      e = e * 2;

	      // Determine which fraction is closer to x, n0/d0 or n1/d1
	      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
	          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

	      MAX_EXP = exp;

	      return r;
	    };


	    /*
	     * Return the value of this BigNumber converted to a number primitive.
	     */
	    P.toNumber = function () {
	      return +valueOf(this);
	    };


	    /*
	     * Return a string representing the value of this BigNumber rounded to sd significant digits
	     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	     * necessary to represent the integer part of the value in fixed-point notation, then use
	     * exponential notation.
	     *
	     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
	     */
	    P.toPrecision = function (sd, rm) {
	      if (sd != null) intCheck(sd, 1, MAX);
	      return format(this, sd, rm, 2);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	     * TO_EXP_NEG, return exponential notation.
	     *
	     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
	     *
	     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
	     */
	    P.toString = function (b) {
	      var str,
	        n = this,
	        s = n.s,
	        e = n.e;

	      // Infinity or NaN?
	      if (e === null) {
	        if (s) {
	          str = 'Infinity';
	          if (s < 0) str = '-' + str;
	        } else {
	          str = 'NaN';
	        }
	      } else {
	        if (b == null) {
	          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	           ? toExponential(coeffToString(n.c), e)
	           : toFixedPoint(coeffToString(n.c), e, '0');
	        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
	          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
	          str = toFixedPoint(coeffToString(n.c), n.e, '0');
	        } else {
	          intCheck(b, 2, ALPHABET.length, 'Base');
	          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
	        }

	        if (s < 0 && n.c[0]) str = '-' + str;
	      }

	      return str;
	    };


	    /*
	     * Return as toString, but do not accept a base argument, and include the minus sign for
	     * negative zero.
	     */
	    P.valueOf = P.toJSON = function () {
	      return valueOf(this);
	    };


	    P._isBigNumber = true;

	    if (configObject != null) BigNumber.set(configObject);

	    return BigNumber;
	  }


	  // PRIVATE HELPER FUNCTIONS

	  // These functions don't need access to variables,
	  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


	  function bitFloor(n) {
	    var i = n | 0;
	    return n > 0 || n === i ? i : i - 1;
	  }


	  // Return a coefficient array as a string of base 10 digits.
	  function coeffToString(a) {
	    var s, z,
	      i = 1,
	      j = a.length,
	      r = a[0] + '';

	    for (; i < j;) {
	      s = a[i++] + '';
	      z = LOG_BASE - s.length;
	      for (; z--; s = '0' + s);
	      r += s;
	    }

	    // Determine trailing zeros.
	    for (j = r.length; r.charCodeAt(--j) === 48;);

	    return r.slice(0, j + 1 || 1);
	  }


	  // Compare the value of BigNumbers x and y.
	  function compare(x, y) {
	    var a, b,
	      xc = x.c,
	      yc = y.c,
	      i = x.s,
	      j = y.s,
	      k = x.e,
	      l = y.e;

	    // Either NaN?
	    if (!i || !j) return null;

	    a = xc && !xc[0];
	    b = yc && !yc[0];

	    // Either zero?
	    if (a || b) return a ? b ? 0 : -j : i;

	    // Signs differ?
	    if (i != j) return i;

	    a = i < 0;
	    b = k == l;

	    // Either Infinity?
	    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

	    // Compare exponents.
	    if (!b) return k > l ^ a ? 1 : -1;

	    j = (k = xc.length) < (l = yc.length) ? k : l;

	    // Compare digit by digit.
	    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

	    // Compare lengths.
	    return k == l ? 0 : k > l ^ a ? 1 : -1;
	  }


	  /*
	   * Check that n is a primitive number, an integer, and in range, otherwise throw.
	   */
	  function intCheck(n, min, max, name) {
	    if (n < min || n > max || n !== mathfloor(n)) {
	      throw Error
	       (bignumberError + (name || 'Argument') + (typeof n == 'number'
	         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
	         : ' not a primitive number: ') + String(n));
	    }
	  }


	  // Assumes finite n.
	  function isOdd(n) {
	    var k = n.c.length - 1;
	    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
	  }


	  function toExponential(str, e) {
	    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
	     (e < 0 ? 'e' : 'e+') + e;
	  }


	  function toFixedPoint(str, e, z) {
	    var len, zs;

	    // Negative exponent?
	    if (e < 0) {

	      // Prepend zeros.
	      for (zs = z + '.'; ++e; zs += z);
	      str = zs + str;

	    // Positive exponent
	    } else {
	      len = str.length;

	      // Append zeros.
	      if (++e > len) {
	        for (zs = z, e -= len; --e; zs += z);
	        str += zs;
	      } else if (e < len) {
	        str = str.slice(0, e) + '.' + str.slice(e);
	      }
	    }

	    return str;
	  }


	  // EXPORT


	  BigNumber = clone();
	  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

	  // AMD.
	  if (module.exports) {
	    module.exports = BigNumber;

	  // Browser.
	  } else {
	    if (!globalObject) {
	      globalObject = typeof self != 'undefined' && self ? self : window;
	    }

	    globalObject.BigNumber = BigNumber;
	  }
	})(commonjsGlobal); 
} (bignumber));

var bignumberExports = bignumber.exports;

(function (module) {
	var BigNumber = bignumberExports;

	/*
	    json2.js
	    2013-05-26

	    Public Domain.

	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

	    See http://www.JSON.org/js.html


	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html

	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.


	    This file creates a global JSON object containing two methods: stringify
	    and parse.

	        JSON.stringify(value, replacer, space)
	            value       any JavaScript value, usually an object or array.

	            replacer    an optional parameter that determines how object
	                        values are stringified for objects. It can be a
	                        function or an array of strings.

	            space       an optional parameter that specifies the indentation
	                        of nested structures. If it is omitted, the text will
	                        be packed without extra whitespace. If it is a number,
	                        it will specify the number of spaces to indent at each
	                        level. If it is a string (such as '\t' or '&nbsp;'),
	                        it contains the characters used to indent at each level.

	            This method produces a JSON text from a JavaScript value.

	            When an object value is found, if the object contains a toJSON
	            method, its toJSON method will be called and the result will be
	            stringified. A toJSON method does not serialize: it returns the
	            value represented by the name/value pair that should be serialized,
	            or undefined if nothing should be serialized. The toJSON method
	            will be passed the key associated with the value, and this will be
	            bound to the value

	            For example, this would serialize Dates as ISO strings.

	                Date.prototype.toJSON = function (key) {
	                    function f(n) {
	                        // Format integers to have at least two digits.
	                        return n < 10 ? '0' + n : n;
	                    }

	                    return this.getUTCFullYear()   + '-' +
	                         f(this.getUTCMonth() + 1) + '-' +
	                         f(this.getUTCDate())      + 'T' +
	                         f(this.getUTCHours())     + ':' +
	                         f(this.getUTCMinutes())   + ':' +
	                         f(this.getUTCSeconds())   + 'Z';
	                };

	            You can provide an optional replacer method. It will be passed the
	            key and value of each member, with this bound to the containing
	            object. The value that is returned from your method will be
	            serialized. If your method returns undefined, then the member will
	            be excluded from the serialization.

	            If the replacer parameter is an array of strings, then it will be
	            used to select the members to be serialized. It filters the results
	            such that only members with keys listed in the replacer array are
	            stringified.

	            Values that do not have JSON representations, such as undefined or
	            functions, will not be serialized. Such values in objects will be
	            dropped; in arrays they will be replaced with null. You can use
	            a replacer function to replace those with JSON values.
	            JSON.stringify(undefined) returns undefined.

	            The optional space parameter produces a stringification of the
	            value that is filled with line breaks and indentation to make it
	            easier to read.

	            If the space parameter is a non-empty string, then that string will
	            be used for indentation. If the space parameter is a number, then
	            the indentation will be that many spaces.

	            Example:

	            text = JSON.stringify(['e', {pluribus: 'unum'}]);
	            // text is '["e",{"pluribus":"unum"}]'


	            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
	            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

	            text = JSON.stringify([new Date()], function (key, value) {
	                return this[key] instanceof Date ?
	                    'Date(' + this[key] + ')' : value;
	            });
	            // text is '["Date(---current time---)"]'


	        JSON.parse(text, reviver)
	            This method parses a JSON text to produce an object or array.
	            It can throw a SyntaxError exception.

	            The optional reviver parameter is a function that can filter and
	            transform the results. It receives each of the keys and values,
	            and its return value is used instead of the original value.
	            If it returns what it received, then the structure is not modified.
	            If it returns undefined then the member is deleted.

	            Example:

	            // Parse the text. Values that look like ISO date strings will
	            // be converted to Date objects.

	            myData = JSON.parse(text, function (key, value) {
	                var a;
	                if (typeof value === 'string') {
	                    a =
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	                    if (a) {
	                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	                            +a[5], +a[6]));
	                    }
	                }
	                return value;
	            });

	            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	                var d;
	                if (typeof value === 'string' &&
	                        value.slice(0, 5) === 'Date(' &&
	                        value.slice(-1) === ')') {
	                    d = new Date(value.slice(5, -1));
	                    if (d) {
	                        return d;
	                    }
	                }
	                return value;
	            });


	    This is a reference implementation. You are free to copy, modify, or
	    redistribute.
	*/

	/*jslint evil: true, regexp: true */

	/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
	    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	    lastIndex, length, parse, prototype, push, replace, slice, stringify,
	    test, toJSON, toString, valueOf
	*/


	// Create a JSON object only if one does not already exist. We create the
	// methods in a closure to avoid creating global variables.

	var JSON = module.exports;

	(function () {

	    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        gap,
	        indent,
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        },
	        rep;


	    function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

	        escapable.lastIndex = 0;
	        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	            var c = meta[a];
	            return typeof c === 'string'
	                ? c
	                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"' : '"' + string + '"';
	    }


	    function str(key, holder) {

	// Produce a string from holder[key].

	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            mind = gap,
	            partial,
	            value = holder[key],
	            isBigNumber = value != null && (value instanceof BigNumber || BigNumber.isBigNumber(value));

	// If the value has a toJSON method, call it to obtain a replacement value.

	        if (value && typeof value === 'object' &&
	                typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }

	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.

	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }

	// What happens next depends on the value's type.

	        switch (typeof value) {
	        case 'string':
	            if (isBigNumber) {
	                return value;
	            } else {
	                return quote(value);
	            }

	        case 'number':

	// JSON numbers must be finite. Encode non-finite numbers as null.

	            return isFinite(value) ? String(value) : 'null';

	        case 'boolean':
	        case 'null':
	        case 'bigint':

	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.

	            return String(value);

	// If the type is 'object', we might be dealing with an object or an array or
	// null.

	        case 'object':

	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.

	            if (!value) {
	                return 'null';
	            }

	// Make an array to hold the partial results of stringifying this object value.

	            gap += indent;
	            partial = [];

	// Is the value an array?

	            if (Object.prototype.toString.apply(value) === '[object Array]') {

	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.

	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }

	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.

	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                    : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }

	// If the replacer is an array, use it to select the members to be stringified.

	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {

	// Otherwise, iterate through all of the keys in the object.

	                Object.keys(value).forEach(function(k) {
	                    var v = str(k, value);
	                    if (v) {
	                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                    }
	                });
	            }

	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.

	            v = partial.length === 0
	                ? '{}'
	                : gap
	                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }

	// If the JSON object does not yet have a stringify method, give it one.

	    if (typeof JSON.stringify !== 'function') {
	        JSON.stringify = function (value, replacer, space) {

	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.

	            var i;
	            gap = '';
	            indent = '';

	// If the space parameter is a number, make an indent string containing that
	// many spaces.

	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }

	// If the space parameter is a string, it will be used as the indent string.

	            } else if (typeof space === 'string') {
	                indent = space;
	            }

	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.

	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                    typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	            return str('', {'': value});
	        };
	    }
	}()); 
} (stringify$1));

var stringifyExports = stringify$1.exports;

var BigNumber = null;

// regexpxs extracted from
// (c) BSD-3-Clause
// https://github.com/fastify/secure-json-parse/graphs/contributors and https://github.com/hapijs/bourne/graphs/contributors

const suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/;
const suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;

/*
    json_parse.js
    2012-06-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This file creates a json_parse function.
    During create you can (optionally) specify some behavioural switches

        require('json-bigint')(options)

            The optional options parameter holds switches that drive certain
            aspects of the parsing process:
            * options.strict = true will warn about duplicate-key usage in the json.
              The default (strict = false) will silently ignore those and overwrite
              values for keys that are in duplicate use.

    The resulting function follows this signature:
        json_parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = json_parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*members "", "\"", "\/", "\\", at, b, call, charAt, f, fromCharCode,
    hasOwnProperty, message, n, name, prototype, push, r, t, text
*/

var json_parse$1 = function (options) {

  // This is a function that can parse a JSON text, producing a JavaScript
  // data structure. It is a simple, recursive descent parser. It does not use
  // eval or regular expressions, so it can be used as a model for implementing
  // a JSON parser in other languages.

  // We are defining the function inside of another function to avoid creating
  // global variables.

  // Default options one can override by passing options to the parse()
  var _options = {
    strict: false, // not being strict means do not generate syntax errors for "duplicate key"
    storeAsString: false, // toggles whether the values should be stored as BigNumber (default) or a string
    alwaysParseAsBig: false, // toggles whether all numbers should be Big
    useNativeBigInt: false, // toggles whether to use native BigInt instead of bignumber.js
    protoAction: 'error',
    constructorAction: 'error',
  };

  // If there are options, then use them to override the default _options
  if (options !== undefined && options !== null) {
    if (options.strict === true) {
      _options.strict = true;
    }
    if (options.storeAsString === true) {
      _options.storeAsString = true;
    }
    _options.alwaysParseAsBig =
      options.alwaysParseAsBig === true ? options.alwaysParseAsBig : false;
    _options.useNativeBigInt =
      options.useNativeBigInt === true ? options.useNativeBigInt : false;

    if (typeof options.constructorAction !== 'undefined') {
      if (
        options.constructorAction === 'error' ||
        options.constructorAction === 'ignore' ||
        options.constructorAction === 'preserve'
      ) {
        _options.constructorAction = options.constructorAction;
      } else {
        throw new Error(
          `Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${options.constructorAction}`
        );
      }
    }

    if (typeof options.protoAction !== 'undefined') {
      if (
        options.protoAction === 'error' ||
        options.protoAction === 'ignore' ||
        options.protoAction === 'preserve'
      ) {
        _options.protoAction = options.protoAction;
      } else {
        throw new Error(
          `Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${options.protoAction}`
        );
      }
    }
  }

  var at, // The index of the current character
    ch, // The current character
    escapee = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      b: '\b',
      f: '\f',
      n: '\n',
      r: '\r',
      t: '\t',
    },
    text,
    error = function (m) {
      // Call error when something is wrong.

      throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text,
      };
    },
    next = function (c) {
      // If a c parameter is provided, verify that it matches the current character.

      if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
      }

      // Get the next character. When there are no more characters,
      // return the empty string.

      ch = text.charAt(at);
      at += 1;
      return ch;
    },
    number = function () {
      // Parse a number value.

      var number,
        string = '';

      if (ch === '-') {
        string = '-';
        next('-');
      }
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
      if (ch === '.') {
        string += '.';
        while (next() && ch >= '0' && ch <= '9') {
          string += ch;
        }
      }
      if (ch === 'e' || ch === 'E') {
        string += ch;
        next();
        if (ch === '-' || ch === '+') {
          string += ch;
          next();
        }
        while (ch >= '0' && ch <= '9') {
          string += ch;
          next();
        }
      }
      number = +string;
      if (!isFinite(number)) {
        error('Bad number');
      } else {
        if (BigNumber == null) BigNumber = bignumberExports;
        //if (number > 9007199254740992 || number < -9007199254740992)
        // Bignumber has stricter check: everything with length > 15 digits disallowed
        if (string.length > 15)
          return _options.storeAsString
            ? string
            : _options.useNativeBigInt
            ? BigInt(string)
            : new BigNumber(string);
        else
          return !_options.alwaysParseAsBig
            ? number
            : _options.useNativeBigInt
            ? BigInt(number)
            : new BigNumber(number);
      }
    },
    string = function () {
      // Parse a string value.

      var hex,
        i,
        string = '',
        uffff;

      // When parsing for string values, we must look for " and \ characters.

      if (ch === '"') {
        var startAt = at;
        while (next()) {
          if (ch === '"') {
            if (at - 1 > startAt) string += text.substring(startAt, at - 1);
            next();
            return string;
          }
          if (ch === '\\') {
            if (at - 1 > startAt) string += text.substring(startAt, at - 1);
            next();
            if (ch === 'u') {
              uffff = 0;
              for (i = 0; i < 4; i += 1) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex)) {
                  break;
                }
                uffff = uffff * 16 + hex;
              }
              string += String.fromCharCode(uffff);
            } else if (typeof escapee[ch] === 'string') {
              string += escapee[ch];
            } else {
              break;
            }
            startAt = at;
          }
        }
      }
      error('Bad string');
    },
    white = function () {
      // Skip whitespace.

      while (ch && ch <= ' ') {
        next();
      }
    },
    word = function () {
      // true, false, or null.

      switch (ch) {
        case 't':
          next('t');
          next('r');
          next('u');
          next('e');
          return true;
        case 'f':
          next('f');
          next('a');
          next('l');
          next('s');
          next('e');
          return false;
        case 'n':
          next('n');
          next('u');
          next('l');
          next('l');
          return null;
      }
      error("Unexpected '" + ch + "'");
    },
    value, // Place holder for the value function.
    array = function () {
      // Parse an array value.

      var array = [];

      if (ch === '[') {
        next('[');
        white();
        if (ch === ']') {
          next(']');
          return array; // empty array
        }
        while (ch) {
          array.push(value());
          white();
          if (ch === ']') {
            next(']');
            return array;
          }
          next(',');
          white();
        }
      }
      error('Bad array');
    },
    object = function () {
      // Parse an object value.

      var key,
        object = Object.create(null);

      if (ch === '{') {
        next('{');
        white();
        if (ch === '}') {
          next('}');
          return object; // empty object
        }
        while (ch) {
          key = string();
          white();
          next(':');
          if (
            _options.strict === true &&
            Object.hasOwnProperty.call(object, key)
          ) {
            error('Duplicate key "' + key + '"');
          }

          if (suspectProtoRx.test(key) === true) {
            if (_options.protoAction === 'error') {
              error('Object contains forbidden prototype property');
            } else if (_options.protoAction === 'ignore') {
              value();
            } else {
              object[key] = value();
            }
          } else if (suspectConstructorRx.test(key) === true) {
            if (_options.constructorAction === 'error') {
              error('Object contains forbidden constructor property');
            } else if (_options.constructorAction === 'ignore') {
              value();
            } else {
              object[key] = value();
            }
          } else {
            object[key] = value();
          }

          white();
          if (ch === '}') {
            next('}');
            return object;
          }
          next(',');
          white();
        }
      }
      error('Bad object');
    };

  value = function () {
    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.

    white();
    switch (ch) {
      case '{':
        return object();
      case '[':
        return array();
      case '"':
        return string();
      case '-':
        return number();
      default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
  };

  // Return the json_parse function. It will have access to all of the above
  // functions and variables.

  return function (source, reviver) {
    var result;

    text = source + '';
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
      error('Syntax error');
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function'
      ? (function walk(holder, key) {
          var v,
            value = holder[key];
          if (value && typeof value === 'object') {
            Object.keys(value).forEach(function (k) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            });
          }
          return reviver.call(holder, key, value);
        })({ '': result }, '')
      : result;
  };
};

var parse = json_parse$1;

var json_stringify = stringifyExports.stringify;
var json_parse     = parse;

jsonBigint.exports = function(options) {
    return  {
        parse: json_parse(options),
        stringify: json_stringify
    }
};
//create the default method members with no options applied for backwards compatibility
jsonBigint.exports.parse = json_parse();
var stringify = jsonBigint.exports.stringify = json_stringify;

class ContractLifecycle {
    constructor(wallet, rest) {
        this.wallet = wallet;
        this.rest = rest;
    }
    async create(req) {
        return unsafeTaskEither(create(this.rest)(this.wallet)(req));
    }
    async applyInputs(contractId, provideInput) {
        const contractDetails = await unsafeTaskEither(this.rest.contracts.contract.get(contractId));
        const parties = await getParties(this.wallet)(contractDetails.roleTokenMintingPolicyId)();
        const next = await unsafeTaskEither(this.rest.contracts.contract.next(contractId)(mkEnvironment(_function.pipe(Date.now(), (date) => subMinutes(date, 15)))(_function.pipe(Date.now(), (date) => addMinutes(date, 15))))(parties));
        return unsafeTaskEither(applyInputs(this.rest)(this.wallet)(contractId)(provideInput(next)));
    }
}
class PayoutLifecycle {
    constructor(wallet, rest) {
        this.wallet = wallet;
        this.rest = rest;
    }
    async available(filters) {
        return unsafeTaskEither(availablePayouts(this.rest)(this.wallet)(Option.fromNullable(filters)));
    }
    async withdraw(payoutIds) {
        return unsafeTaskEither(withdraw(this.rest)(this.wallet)(payoutIds));
    }
    async withdrawn(filters) {
        return unsafeTaskEither(withdrawnPayouts(this.rest)(this.wallet)(Option.fromNullable(filters)));
    }
}
function mkRuntimeLifecycle$1(restAPI, wallet) {
    return {
        wallet: wallet,
        contracts: new ContractLifecycle(wallet, restAPI),
        payouts: new PayoutLifecycle(wallet, restAPI),
    };
}
const availablePayouts = (restAPI) => (walletApi) => (filtersOption) => _function.pipe(getAssetIds(walletApi), TaskEither.chain((walletAssetIds) => _function.pipe(restAPI.payouts.getHeadersByRange(Option.none)(_function.pipe(filtersOption, Option.match(() => [], (filters) => filters.byContractIds)))(_function.pipe(filtersOption, Option.match(() => walletAssetIds, (filters) => filters.byMyRoleTokens(walletAssetIds))))(Option.some("available")), TaskEither.map((result) => result.headers))), TaskEither.chain((headers) => TaskEither.sequenceArray(headers.map((header) => restAPI.payouts.get(header.payoutId)))), TaskEither.map((payoutsDetails) => payoutsDetails.map((payoutDetails) => ({
    payoutId: payoutDetails.payoutId,
    contractId: payoutDetails.contractId,
    role: payoutDetails.role,
    assets: convertAsset(payoutDetails.assets),
}))));
const withdrawnPayouts = (restAPI) => (walletApi) => (filtersOption) => _function.pipe(getAssetIds(walletApi), TaskEither.chain((walletAssetIds) => _function.pipe(restAPI.payouts.getHeadersByRange(Option.none)(_function.pipe(filtersOption, Option.match(() => [], (filters) => filters.byContractIds)))(_function.pipe(filtersOption, Option.match(() => walletAssetIds, (filters) => filters.byMyRoleTokens(walletAssetIds))))(Option.some("withdrawn")), TaskEither.map((result) => result.headers))), TaskEither.chain((headers) => TaskEither.sequenceArray(headers.map((header) => restAPI.payouts.get(header.payoutId)))), TaskEither.map((payoutsDetails) => payoutsDetails.map((payoutDetails) => _function.pipe(payoutDetails.withdrawalId, Option.match(() => {
    throw `Rest API Inconsistencies for Payout API (payout withdrawn without a withdrawalID) : ${stringify(payoutDetails)}`;
}, (withdrawalId) => ({
    withdrawalId: withdrawalId,
    payoutId: payoutDetails.payoutId,
    contractId: payoutDetails.contractId,
    role: payoutDetails.role,
    assets: convertAsset(payoutDetails.assets),
}))))));
const convertAsset = (restAssets) => ({
    lovelaces: restAssets.lovelace,
    tokens: convertTokens(restAssets.tokens),
});
const convertTokens = (restTokens) => Object.entries(restTokens)
    .map(([policyId, x]) => Object.entries(x).map(([assetName, quantity]) => token(quantity)(assetId(mkPolicyId(policyId))(assetName))))
    .flat();
const getAssetIds = (walletAPI) => _function.pipe(tryCatchDefault(walletAPI.getTokens), TaskEither.map((tokens) => tokens.map((token) => token.assetId)));
const getParties = (walletAPI) => (roleMintingPolicyId) => Task.of([]);

/**
 * Creates an instance of RuntimeLifecycle using the browser wallet.
 * @param options
 */
async function mkRuntimeLifecycle({ runtimeURL, walletName, }) {
    const wallet = await createBrowserWallet(walletName);
    const restClient = mkRestClient(runtimeURL);
    return mkRuntimeLifecycle$1(restClient, wallet);
}

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	mkRuntimeLifecycle: mkRuntimeLifecycle
});

export { index as Browser, index as NodeJS };
