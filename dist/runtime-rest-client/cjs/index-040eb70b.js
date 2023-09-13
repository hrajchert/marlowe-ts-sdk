'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

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

var lib = {};

var Either$1 = {};

var Applicative$2 = {};

var Apply$2 = {};

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
Object.defineProperty(Apply$2, "__esModule", { value: true });
Apply$2.sequenceS = Apply$2.sequenceT = Apply$2.getApplySemigroup = Apply$2.apS = Apply$2.apSecond = Apply$2.apFirst = Apply$2.ap = void 0;
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
function ap$3(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
        };
    };
}
Apply$2.ap = ap$3;
function apFirst$3(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
Apply$2.apFirst = apFirst$3;
function apSecond$3(A) {
    return function (second) {
        return function (first) {
            return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
        };
    };
}
Apply$2.apSecond = apSecond$3;
function apS$3(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, function (a) { return function (b) {
                var _a;
                return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            }; }), fb);
        };
    };
}
Apply$2.apS = apS$3;
function getApplySemigroup$3(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}
Apply$2.getApplySemigroup = getApplySemigroup$3;
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
Apply$2.sequenceT = sequenceT;
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
Apply$2.sequenceS = sequenceS;

var Functor$2 = {};

Object.defineProperty(Functor$2, "__esModule", { value: true });
Functor$2.asUnit = Functor$2.as = Functor$2.getFunctorComposition = Functor$2.let = Functor$2.bindTo = Functor$2.flap = Functor$2.map = void 0;
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
Functor$2.map = map$3;
function flap$3(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
Functor$2.flap = flap$3;
function bindTo$3(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
Functor$2.bindTo = bindTo$3;
function let_$3(F) {
    return function (name, f) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
    }); }; };
}
Functor$2.let = let_$3;
/** @deprecated */
function getFunctorComposition(F, G) {
    var _map = map$3(F, G);
    return {
        map: function (fga, f) { return (0, function_1$2.pipe)(fga, _map(f)); }
    };
}
Functor$2.getFunctorComposition = getFunctorComposition;
/** @internal */
function as$3(F) {
    return function (self, b) { return F.map(self, function () { return b; }); };
}
Functor$2.as = as$3;
/** @internal */
function asUnit$3(F) {
    var asM = as$3(F);
    return function (self) { return asM(self, undefined); };
}
Functor$2.asUnit = asUnit$3;

Object.defineProperty(Applicative$2, "__esModule", { value: true });
Applicative$2.getApplicativeComposition = Applicative$2.getApplicativeMonoid = void 0;
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
var Apply_1 = Apply$2;
var function_1$1 = _function;
var Functor_1 = Functor$2;
function getApplicativeMonoid$1(F) {
    var f = (0, Apply_1.getApplySemigroup)(F);
    return function (M) { return ({
        concat: f(M).concat,
        empty: F.of(M.empty)
    }); };
}
Applicative$2.getApplicativeMonoid = getApplicativeMonoid$1;
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
Applicative$2.getApplicativeComposition = getApplicativeComposition;

var Chain$2 = {};

Object.defineProperty(Chain$2, "__esModule", { value: true });
Chain$2.bind = Chain$2.tap = Chain$2.chainFirst = void 0;
function chainFirst$3(M) {
    var tapM = tap$3(M);
    return function (f) { return function (first) { return tapM(first, f); }; };
}
Chain$2.chainFirst = chainFirst$3;
/** @internal */
function tap$3(M) {
    return function (first, f) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); };
}
Chain$2.tap = tap$3;
function bind$3(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}
Chain$2.bind = bind$3;

var ChainRec$1 = {};

Object.defineProperty(ChainRec$1, "__esModule", { value: true });
ChainRec$1.tailRec = void 0;
/**
 * @since 2.0.0
 */
var tailRec$1 = function (startWith, f) {
    var ab = f(startWith);
    while (ab._tag === 'Left') {
        ab = f(ab.left);
    }
    return ab.right;
};
ChainRec$1.tailRec = tailRec$1;

var FromEither$2 = {};

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
Object.defineProperty(FromEither$2, "__esModule", { value: true });
FromEither$2.tapEither = FromEither$2.filterOrElse = FromEither$2.chainFirstEitherK = FromEither$2.chainEitherK = FromEither$2.fromEitherK = FromEither$2.chainOptionK = FromEither$2.fromOptionK = FromEither$2.fromPredicate = FromEither$2.fromOption = void 0;
var Chain_1 = Chain$2;
var function_1 = _function;
var _$1 = __importStar$1(internal);
function fromOption$2(F) {
    return function (onNone) { return function (ma) { return F.fromEither(_$1.isNone(ma) ? _$1.left(onNone()) : _$1.right(ma.value)); }; };
}
FromEither$2.fromOption = fromOption$2;
function fromPredicate$3(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a)));
        };
    };
}
FromEither$2.fromPredicate = fromPredicate$3;
function fromOptionK$2(F) {
    var fromOptionF = fromOption$2(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return (0, function_1.flow)(f, from); };
    };
}
FromEither$2.fromOptionK = fromOptionK$2;
function chainOptionK$2(F, M) {
    var fromOptionKF = fromOptionK$2(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
FromEither$2.chainOptionK = chainOptionK$2;
function fromEitherK$2(F) {
    return function (f) { return (0, function_1.flow)(f, F.fromEither); };
}
FromEither$2.fromEitherK = fromEitherK$2;
function chainEitherK$2(F, M) {
    var fromEitherKF = fromEitherK$2(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
FromEither$2.chainEitherK = chainEitherK$2;
function chainFirstEitherK$1(F, M) {
    var tapEitherM = tapEither$2(F, M);
    return function (f) { return function (ma) { return tapEitherM(ma, f); }; };
}
FromEither$2.chainFirstEitherK = chainFirstEitherK$1;
function filterOrElse$2(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? _$1.right(a) : _$1.left(onFalse(a))); });
        };
    };
}
FromEither$2.filterOrElse = filterOrElse$2;
/** @internal */
function tapEither$2(F, M) {
    var fromEither = fromEitherK$2(F);
    var tapM = (0, Chain_1.tap)(M);
    return function (self, f) { return tapM(self, fromEither(f)); };
}
FromEither$2.tapEither = tapEither$2;

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
	var Functor_1 = Functor$2;
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

var Witherable$1 = {};

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
Object.defineProperty(Witherable$1, "__esModule", { value: true });
Witherable$1.filterE = Witherable$1.witherDefault = Witherable$1.wiltDefault = void 0;
var _ = __importStar(internal);
function wiltDefault$1(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.separate); };
    };
}
Witherable$1.wiltDefault = wiltDefault$1;
function witherDefault$1(T, C) {
    return function (F) {
        var traverseF = T.traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), C.compact); };
    };
}
Witherable$1.witherDefault = witherDefault$1;
function filterE$1(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? _.some(a) : _.none); }); }); }; };
    };
}
Witherable$1.filterE = filterE$1;

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
	var Applicative_1 = Applicative$2;
	var Apply_1 = Apply$2;
	var chainable = __importStar(Chain$2);
	var ChainRec_1 = ChainRec$1;
	var FromEither_1 = FromEither$2;
	var function_1 = _function;
	var Functor_1 = Functor$2;
	var _ = __importStar(internal);
	var Separated_1 = Separated;
	var Witherable_1 = Witherable$1;
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
} (Either$1));

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
	var Either_1 = Either$1;
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
function constant(a) {
    return function () { return a; };
}
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
var constNull = /*#__PURE__*/ constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
var constUndefined = /*#__PURE__*/ constant(undefined);
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
/**
 * @since 2.11.0
 */
var SK = function (_, b) { return b; };
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
// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------
/** @internal */
var isNone$1 = function (fa) { return fa._tag === 'None'; };
/** @internal */
var isSome$1 = function (fa) { return fa._tag === 'Some'; };
/** @internal */
var none$1 = { _tag: 'None' };
/** @internal */
var some$1 = function (a) { return ({ _tag: 'Some', value: a }); };
// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------
/** @internal */
var isLeft$1 = function (ma) { return ma._tag === 'Left'; };
/** @internal */
var isRight$1 = function (ma) { return ma._tag === 'Right'; };
/** @internal */
var left$1 = function (e) { return ({ _tag: 'Left', left: e }); };
/** @internal */
var right$1 = function (a) { return ({ _tag: 'Right', right: a }); };
/** @internal */
var isNonEmpty$1 = function (as) { return as.length > 0; };
/** @internal */
var head = function (as) { return as[0]; };
/** @internal */
var tail = function (as) { return as.slice(1); };
// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------
/** @internal */
var emptyReadonlyArray = [];
/** @internal */
var emptyRecord = {};
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
/** @internal */
var liftNullable$1 = function (F) {
    return function (f, onNullable) {
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            var o = f.apply(void 0, a);
            return F.fromEither(o == null ? left$1(onNullable.apply(void 0, a)) : right$1(o));
        };
    };
};
/** @internal */
var liftOption$1 = function (F) {
    return function (f, onNone) {
        return function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            var o = f.apply(void 0, a);
            return F.fromEither(isNone$1(o) ? left$1(onNone.apply(void 0, a)) : right$1(o.value));
        };
    };
};
/** @internal */
var flatMapNullable$1 = function (F, M) {
     return dual(3, function (self, f, onNullable) {
        return M.flatMap(self, liftNullable$1(F)(f, onNullable));
    });
};
/** @internal */
var flatMapOption$1 = function (F, M) {
     return dual(3, function (self, f, onNone) { return M.flatMap(self, liftOption$1(F)(f, onNone)); });
};

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
function apFirst$2(A) {
    return function (second) { return function (first) {
        return A.ap(A.map(first, function (a) { return function () { return a; }; }), second);
    }; };
}
function apSecond$2(A) {
    return function (second) {
        return function (first) {
            return A.ap(A.map(first, function () { return function (b) { return b; }; }), second);
        };
    };
}
function apS$2(F) {
    return function (name, fb) {
        return function (fa) {
            return F.ap(F.map(fa, function (a) { return function (b) {
                var _a;
                return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
            }; }), fb);
        };
    };
}
function getApplySemigroup$2(F) {
    return function (S) { return ({
        concat: function (first, second) {
            return F.ap(F.map(first, function (x) { return function (y) { return S.concat(x, y); }; }), second);
        }
    }); };
}

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
function flap$2(F) {
    return function (a) { return function (fab) { return F.map(fab, function (f) { return f(a); }); }; };
}
function bindTo$2(F) {
    return function (name) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return (_a = {}, _a[name] = a, _a);
    }); }; };
}
function let_$2(F) {
    return function (name, f) { return function (fa) { return F.map(fa, function (a) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
    }); }; };
}
/** @internal */
function as$2(F) {
    return function (self, b) { return F.map(self, function () { return b; }); };
}
/** @internal */
function asUnit$2(F) {
    var asM = as$2(F);
    return function (self) { return asM(self, undefined); };
}

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
function getApplicativeMonoid(F) {
    var f = getApplySemigroup$2(F);
    return function (M) { return ({
        concat: f(M).concat,
        empty: F.of(M.empty)
    }); };
}

function chainFirst$2(M) {
    var tapM = tap$2(M);
    return function (f) { return function (first) { return tapM(first, f); }; };
}
/** @internal */
function tap$2(M) {
    return function (first, f) { return M.chain(first, function (a) { return M.map(f(a), function () { return a; }); }); };
}
function bind$2(M) {
    return function (name, f) { return function (ma) { return M.chain(ma, function (a) { return M.map(f(a), function (b) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
    }); }); }; };
}

/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */
function fromOption$1(F) {
    return function (onNone) { return function (ma) { return F.fromEither(isNone$1(ma) ? left$1(onNone()) : right$1(ma.value)); }; };
}
function fromPredicate$2(F) {
    return function (predicate, onFalse) {
        return function (a) {
            return F.fromEither(predicate(a) ? right$1(a) : left$1(onFalse(a)));
        };
    };
}
function fromOptionK$1(F) {
    var fromOptionF = fromOption$1(F);
    return function (onNone) {
        var from = fromOptionF(onNone);
        return function (f) { return flow(f, from); };
    };
}
function chainOptionK$1(F, M) {
    var fromOptionKF = fromOptionK$1(F);
    return function (onNone) {
        var from = fromOptionKF(onNone);
        return function (f) { return function (ma) { return M.chain(ma, from(f)); }; };
    };
}
function fromEitherK$1(F) {
    return function (f) { return flow(f, F.fromEither); };
}
function chainEitherK$1(F, M) {
    var fromEitherKF = fromEitherK$1(F);
    return function (f) { return function (ma) { return M.chain(ma, fromEitherKF(f)); }; };
}
function filterOrElse$1(F, M) {
    return function (predicate, onFalse) {
        return function (ma) {
            return M.chain(ma, function (a) { return F.fromEither(predicate(a) ? right$1(a) : left$1(onFalse(a))); });
        };
    };
}
/** @internal */
function tapEither$1(F, M) {
    var fromEither = fromEitherK$1(F);
    var tapM = tap$2(M);
    return function (self, f) { return tapM(self, fromEither(f)); };
}

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
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.0.0
 */
var fromCompare = function (compare) { return ({
    equals: equalsDefault(compare),
    compare: function (first, second) { return (first === second ? 0 : compare(first, second)); }
}); };
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
var getSemigroup$1 = function () { return ({
    concat: function (first, second) {
        return fromCompare(function (a, b) {
            var ox = first.compare(a, b);
            return ox !== 0 ? ox : second.compare(a, b);
        });
    }
}); };
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
var getMonoid$1 = function () { return ({
    concat: getSemigroup$1().concat,
    empty: fromCompare(function () { return 0; })
}); };
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var min$1 = function (O) {
    return function (first, second) {
        return first === second || O.compare(first, second) < 1 ? first : second;
    };
};
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
var max$1 = function (O) {
    return function (first, second) {
        return first === second || O.compare(first, second) > -1 ? first : second;
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
    concat: min$1(O)
}); };
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
    concat: max$1(O)
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
function filterE(W) {
    return function (F) {
        var witherF = W.wither(F);
        return function (predicate) { return function (ga) { return witherF(ga, function (a) { return F.map(predicate(a), function (b) { return (b ? some$1(a) : none$1); }); }); }; };
    };
}

function guard$1(F, P) {
    return function (b) { return (b ? P.of(undefined) : F.zero()); };
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
var some = some$1;
function fromPredicate$1(predicate) {
    return function (a) { return (predicate(a) ? some(a) : none); };
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
var getLeft = function (ma) { return (ma._tag === 'Right' ? none : some(ma.left)); };
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
var getRight = function (ma) { return (ma._tag === 'Left' ? none : some(ma.right)); };
var _map$1 = function (fa, f) { return pipe$1(fa, map$2(f)); };
var _ap$1 = function (fab, fa) { return pipe$1(fab, ap$2(fa)); };
var _reduce$1 = function (fa, b, f) { return pipe$1(fa, reduce$2(b, f)); };
var _foldMap$1 = function (M) {
    var foldMapM = foldMap$2(M);
    return function (fa, f) { return pipe$1(fa, foldMapM(f)); };
};
var _reduceRight$1 = function (fa, b, f) { return pipe$1(fa, reduceRight$2(b, f)); };
var _traverse$1 = function (F) {
    var traverseF = traverse$1(F);
    return function (ta, f) { return pipe$1(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt$1 = function (fa, that) { return pipe$1(fa, alt$2(that)); };
var _filter = function (fa, predicate) { return pipe$1(fa, filter$1(predicate)); };
/* istanbul ignore next */
var _filterMap = function (fa, f) { return pipe$1(fa, filterMap$1(f)); };
/* istanbul ignore next */
var _extend$1 = function (wa, f) { return pipe$1(wa, extend$2(f)); };
/* istanbul ignore next */
var _partition = function (fa, predicate) {
    return pipe$1(fa, partition$1(predicate));
};
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return pipe$1(fa, partitionMap$1(f)); };
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI$1 = 'Option';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow$1 = function (S) { return ({
    show: function (ma) { return (isNone(ma) ? 'none' : "some(".concat(S.show(ma.value), ")")); }
}); };
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
var getEq$1 = function (E) { return ({
    equals: function (x, y) { return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); }
}); };
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
    equals: getEq$1(O).equals,
    compare: function (x, y) { return (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
}); };
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
    concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
    empty: none
}); };
/**
 * @category mapping
 * @since 2.0.0
 */
var map$2 = function (f) { return function (fa) {
    return isNone(fa) ? none : some(f(fa.value));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Functor$1 = {
    URI: URI$1,
    map: _map$1
};
/**
 * Maps the `Some` value of this `Option` to the specified constant value.
 *
 * @category mapping
 * @since 2.16.0
 */
var as$1 = dual(2, as$2(Functor$1));
/**
 * Maps the `Some` value of this `Option` to the void constant value.
 *
 * @category mapping
 * @since 2.16.0
 */
var asUnit$1 = asUnit$2(Functor$1);
/**
 * @category constructors
 * @since 2.7.0
 */
var of$1 = some;
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed$1 = {
    URI: URI$1,
    of: of$1
};
/**
 * @since 2.0.0
 */
var ap$2 = function (fa) { return function (fab) {
    return isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value));
}; };
/**
 * @category instances
 * @since 2.10.0
 */
var Apply$1 = {
    URI: URI$1,
    map: _map$1,
    ap: _ap$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative$1 = {
    URI: URI$1,
    map: _map$1,
    ap: _ap$1,
    of: of$1
};
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap$1 = /*#__PURE__*/ dual(2, function (ma, f) { return (isNone(ma) ? none : f(ma.value)); });
/**
 * @category instances
 * @since 2.10.0
 */
var Chain$1 = {
    URI: URI$1,
    map: _map$1,
    ap: _ap$1,
    chain: flatMap$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad$1 = {
    URI: URI$1,
    map: _map$1,
    ap: _ap$1,
    of: of$1,
    chain: flatMap$1
};
/**
 * @category folding
 * @since 2.0.0
 */
var reduce$2 = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(b, fa.value);
}; };
/**
 * @category folding
 * @since 2.0.0
 */
var foldMap$2 = function (M) { return function (f) { return function (fa) {
    return isNone(fa) ? M.empty : f(fa.value);
}; }; };
/**
 * @category folding
 * @since 2.0.0
 */
var reduceRight$2 = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(fa.value, b);
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable$1 = {
    URI: URI$1,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1
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
var orElse$1 = dual(2, function (self, that) { return (isNone(self) ? that() : self); });
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
var altW$1 = orElse$1;
/**
 * Alias of `orElse`.
 *
 * @category legacy
 * @since 2.0.0
 */
var alt$2 = orElse$1;
/**
 * @category instances
 * @since 2.7.0
 */
var Alt$1 = {
    URI: URI$1,
    map: _map$1,
    alt: _alt$1
};
/**
 * @since 2.7.0
 */
var zero = function () { return none; };
/**
 * @category instances
 * @since 2.11.0
 */
var Zero = {
    URI: URI$1,
    zero: zero
};
/**
 * @category do notation
 * @since 2.11.0
 */
var guard = /*#__PURE__*/ guard$1(Zero, Pointed$1);
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI$1,
    map: _map$1,
    ap: _ap$1,
    of: of$1,
    alt: _alt$1,
    zero: zero
};
/**
 * @since 2.0.0
 */
var extend$2 = function (f) { return function (wa) {
    return isNone(wa) ? none : some(f(wa));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Extend$1 = {
    URI: URI$1,
    map: _map$1,
    extend: _extend$1
};
/**
 * @category filtering
 * @since 2.0.0
 */
var compact = /*#__PURE__*/ flatMap$1(identity$1);
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
    URI: URI$1,
    compact: compact,
    separate: separate
};
/**
 * @category filtering
 * @since 2.0.0
 */
var filter$1 = function (predicate) {
    return function (fa) {
        return isNone(fa) ? none : predicate(fa.value) ? fa : none;
    };
};
/**
 * @category filtering
 * @since 2.0.0
 */
var filterMap$1 = function (f) { return function (fa) {
    return isNone(fa) ? none : f(fa.value);
}; };
/**
 * @category filtering
 * @since 2.0.0
 */
var partition$1 = function (predicate) {
    return function (fa) {
        return separated(_filter(fa, not(predicate)), _filter(fa, predicate));
    };
};
/**
 * @category filtering
 * @since 2.0.0
 */
var partitionMap$1 = function (f) { return flow(map$2(f), separate); };
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI$1,
    map: _map$1,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse$1 = function (F) {
    return function (f) {
        return function (ta) {
            return isNone(ta) ? F.of(none) : F.map(f(ta.value), some);
        };
    };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence$1 = function (F) {
    return function (ta) {
        return isNone(ta) ? F.of(none) : F.map(ta.value, some);
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable$1 = {
    URI: URI$1,
    map: _map$1,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    traverse: _traverse$1,
    sequence: sequence$1
};
var _wither = /*#__PURE__*/ witherDefault(Traversable$1, Compactable);
var _wilt = /*#__PURE__*/ wiltDefault(Traversable$1, Compactable);
/**
 * @category filtering
 * @since 2.6.5
 */
var wither = function (F) {
    var _witherF = _wither(F);
    return function (f) { return function (fa) { return _witherF(fa, f); }; };
};
/**
 * @category filtering
 * @since 2.6.5
 */
var wilt = function (F) {
    var _wiltF = _wilt(F);
    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI$1,
    map: _map$1,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    traverse: _traverse$1,
    sequence: sequence$1,
    compact: compact,
    separate: separate,
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
var throwError$1 = function () { return none; };
/**
 * @category instances
 * @since 2.7.0
 */
var MonadThrow$1 = {
    URI: URI$1,
    map: _map$1,
    ap: _ap$1,
    of: of$1,
    chain: flatMap$1,
    throwError: throwError$1
};
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
 * @category instances
 * @since 2.11.0
 */
var FromEither$1 = {
    URI: URI$1,
    fromEither: fromEither
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
var isSome = isSome$1;
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
var matchW$1 = function (onNone, onSome) {
    return function (ma) {
        return isNone(ma) ? onNone() : onSome(ma.value);
    };
};
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category pattern matching
 * @since 2.10.0
 */
var foldW$1 = matchW$1;
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
var match$1 = matchW$1;
/**
 * Alias of [`match`](#match).
 *
 * @category pattern matching
 * @since 2.0.0
 */
var fold$1 = match$1;
/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.6.0
 */
var getOrElseW$1 = function (onNone) {
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
var getOrElse$1 = getOrElseW$1;
/**
 * @category mapping
 * @since 2.10.0
 */
var flap$1 = /*#__PURE__*/ flap$2(Functor$1);
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
var apFirst$1 = /*#__PURE__*/ apFirst$2(Apply$1);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
var apSecond$1 = /*#__PURE__*/ apSecond$2(Apply$1);
/**
 * @category sequencing
 * @since 2.0.0
 */
var flatten$1 = compact;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category combinators
 * @since 2.15.0
 */
var tap$1 = /*#__PURE__*/ dual(2, tap$2(Chain$1));
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
var tapEither = /*#__PURE__*/ dual(2, tapEither$1(FromEither$1, Chain$1));
/**
 * @since 2.0.0
 */
var duplicate$1 = /*#__PURE__*/ extend$2(identity$1);
/**
 * @category lifting
 * @since 2.11.0
 */
var fromEitherK = /*#__PURE__*/ fromEitherK$1(FromEither$1);
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainEitherK = 
/*#__PURE__*/ chainEitherK$1(FromEither$1, Chain$1);
/**
 * Alias of `tapEither`.
 *
 * @category legacy
 * @since 2.12.0
 */
var chainFirstEitherK = tapEither;
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
var fromNullable$1 = function (a) { return (a == null ? none : some(a)); };
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
var tryCatch$1 = function (f) {
    try {
        return some(f());
    }
    catch (e) {
        return none;
    }
};
/**
 * Converts a function that may throw to one returning a `Option`.
 *
 * @category interop
 * @since 2.10.0
 */
var tryCatchK$1 = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return tryCatch$1(function () { return f.apply(void 0, a); });
    };
};
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
var fromNullableK$1 = function (f) { return flow(f, fromNullable$1); };
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
var chainNullableK$1 = function (f) {
    return function (ma) {
        return isNone(ma) ? none : fromNullable$1(f(ma.value));
    };
};
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
var toNullable = /*#__PURE__*/ match$1(constNull, identity$1);
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
var toUndefined = /*#__PURE__*/ match$1(constUndefined, identity$1);
function elem$1(E) {
    return function (a, ma) {
        if (ma === undefined) {
            var elemE_1 = elem$1(E);
            return function (ma) { return elemE_1(a, ma); };
        }
        return isNone(ma) ? false : E.equals(a, ma.value);
    };
}
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
var exists$1 = function (predicate) {
    return function (ma) {
        return isNone(ma) ? false : predicate(ma.value);
    };
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do$1 = /*#__PURE__*/ of$1(emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo$1 = /*#__PURE__*/ bindTo$2(Functor$1);
var let_$1 = /*#__PURE__*/ let_$2(Functor$1);
/**
 * @category do notation
 * @since 2.8.0
 */
var bind$1 = /*#__PURE__*/ bind$2(Chain$1);
/**
 * @category do notation
 * @since 2.8.0
 */
var apS$1 = /*#__PURE__*/ apS$2(Apply$1);
/**
 * @since 2.11.0
 */
var ApT$1 = /*#__PURE__*/ of$1(emptyReadonlyArray);
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyNonEmptyArrayWithIndex$1 = function (f) {
    return function (as) {
        var o = f(0, head(as));
        if (isNone(o)) {
            return none;
        }
        var out = [o.value];
        for (var i = 1; i < as.length; i++) {
            var o_1 = f(i, as[i]);
            if (isNone(o_1)) {
                return none;
            }
            out.push(o_1.value);
        }
        return some(out);
    };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex$1 = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex$1(f);
    return function (as) { return (isNonEmpty$1(as) ? g(as) : ApT$1); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArrayWithIndex$1 = traverseReadonlyArrayWithIndex$1;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray$1 = function (f) {
    return traverseReadonlyArrayWithIndex$1(function (_, a) { return f(a); });
};
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var sequenceArray$1 = 
/*#__PURE__*/ traverseArray$1(identity$1);
// -------------------------------------------------------------------------------------
// legacy
// -------------------------------------------------------------------------------------
/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.0.0
 */
var chain$2 = flatMap$1;
/**
 * Alias of `tap`.
 *
 * @category legacy
 * @since 2.0.0
 */
var chainFirst$1 = tap$1;
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
    return function (a) { return isSome(getOption(a)); };
}
/**
 * Use [`chainNullableK`](#chainnullablek) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var mapNullable = chainNullableK$1;
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
    URI: URI$1,
    map: _map$1,
    of: of$1,
    ap: _ap$1,
    chain: flatMap$1,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    traverse: _traverse$1,
    sequence: sequence$1,
    zero: zero,
    alt: _alt$1,
    extend: _extend$1,
    compact: compact,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt,
    throwError: throwError$1
};
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplySemigroup$1 = /*#__PURE__*/ getApplySemigroup$2(Apply$1);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplyMonoid$1 = /*#__PURE__*/ getApplicativeMonoid(Applicative$1);
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
var getFirstMonoid = function () { return getMonoid(first()); };
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
var getLastMonoid = function () { return getMonoid(last()); };

var Option = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Alt: Alt$1,
	Alternative: Alternative,
	ApT: ApT$1,
	Applicative: Applicative$1,
	Apply: Apply$1,
	Chain: Chain$1,
	Compactable: Compactable,
	Do: Do$1,
	Extend: Extend$1,
	Filterable: Filterable,
	Foldable: Foldable$1,
	FromEither: FromEither$1,
	Functor: Functor$1,
	Monad: Monad$1,
	MonadThrow: MonadThrow$1,
	Pointed: Pointed$1,
	Traversable: Traversable$1,
	URI: URI$1,
	Witherable: Witherable,
	Zero: Zero,
	alt: alt$2,
	altW: altW$1,
	ap: ap$2,
	apFirst: apFirst$1,
	apS: apS$1,
	apSecond: apSecond$1,
	as: as$1,
	asUnit: asUnit$1,
	bind: bind$1,
	bindTo: bindTo$1,
	chain: chain$2,
	chainEitherK: chainEitherK,
	chainFirst: chainFirst$1,
	chainFirstEitherK: chainFirstEitherK,
	chainNullableK: chainNullableK$1,
	compact: compact,
	duplicate: duplicate$1,
	elem: elem$1,
	exists: exists$1,
	extend: extend$2,
	filter: filter$1,
	filterMap: filterMap$1,
	flap: flap$1,
	flatMap: flatMap$1,
	flatten: flatten$1,
	fold: fold$1,
	foldMap: foldMap$2,
	foldW: foldW$1,
	fromEither: fromEither,
	fromEitherK: fromEitherK,
	fromNullable: fromNullable$1,
	fromNullableK: fromNullableK$1,
	fromPredicate: fromPredicate$1,
	getApplyMonoid: getApplyMonoid$1,
	getApplySemigroup: getApplySemigroup$1,
	getEq: getEq$1,
	getFirstMonoid: getFirstMonoid,
	getLastMonoid: getLastMonoid,
	getLeft: getLeft,
	getMonoid: getMonoid,
	getOrElse: getOrElse$1,
	getOrElseW: getOrElseW$1,
	getOrd: getOrd,
	getRefinement: getRefinement,
	getRight: getRight,
	getShow: getShow$1,
	guard: guard,
	isNone: isNone,
	isSome: isSome,
	let: let_$1,
	map: map$2,
	mapNullable: mapNullable,
	match: match$1,
	matchW: matchW$1,
	none: none,
	of: of$1,
	option: option,
	orElse: orElse$1,
	partition: partition$1,
	partitionMap: partitionMap$1,
	reduce: reduce$2,
	reduceRight: reduceRight$2,
	separate: separate,
	sequence: sequence$1,
	sequenceArray: sequenceArray$1,
	some: some,
	tap: tap$1,
	tapEither: tapEither,
	throwError: throwError$1,
	toNullable: toNullable,
	toUndefined: toUndefined,
	traverse: traverse$1,
	traverseArray: traverseArray$1,
	traverseArrayWithIndex: traverseArrayWithIndex$1,
	traverseReadonlyArrayWithIndex: traverseReadonlyArrayWithIndex$1,
	traverseReadonlyNonEmptyArrayWithIndex: traverseReadonlyNonEmptyArrayWithIndex$1,
	tryCatch: tryCatch$1,
	tryCatchK: tryCatchK$1,
	wilt: wilt,
	wither: wither,
	zero: zero
});

function map$1(F) {
    return function (f) { return function (fa) { return F.map(fa, f); }; };
}
function contramap(F) {
    return function (f) { return function (fa) { return F.contramap(fa, f); }; };
}
function mapWithIndex(F) {
    return function (f) { return function (fa) { return F.mapWithIndex(fa, f); }; };
}
function ap$1(F) {
    return function (fa) { return function (fab) { return F.ap(fab, fa); }; };
}
function chain$1(F) {
    return function (f) { return function (fa) { return F.chain(fa, f); }; };
}
function bimap$1(F) {
    return function (f, g) { return function (fea) { return F.bimap(fea, f, g); }; };
}
function mapLeft$1(F) {
    return function (f) { return function (fea) { return F.mapLeft(fea, f); }; };
}
function extend$1(F) {
    return function (f) { return function (wa) { return F.extend(wa, f); }; };
}
function reduce$1(F) {
    return function (b, f) { return function (fa) { return F.reduce(fa, b, f); }; };
}
function foldMap$1(F) {
    return function (M) {
        var foldMapM = F.foldMap(M);
        return function (f) { return function (fa) { return foldMapM(fa, f); }; };
    };
}
function reduceRight$1(F) {
    return function (b, f) { return function (fa) { return F.reduceRight(fa, b, f); }; };
}
function reduceWithIndex(F) {
    return function (b, f) { return function (fa) { return F.reduceWithIndex(fa, b, f); }; };
}
function foldMapWithIndex(F) {
    return function (M) {
        var foldMapWithIndexM = F.foldMapWithIndex(M);
        return function (f) { return function (fa) { return foldMapWithIndexM(fa, f); }; };
    };
}
function reduceRightWithIndex(F) {
    return function (b, f) { return function (fa) { return F.reduceRightWithIndex(fa, b, f); }; };
}
function alt$1(F) {
    return function (that) { return function (fa) { return F.alt(fa, that); }; };
}
function filter(F) {
    return function (predicate) { return function (fa) { return F.filter(fa, predicate); }; };
}
function filterMap(F) {
    return function (f) { return function (fa) { return F.filterMap(fa, f); }; };
}
function partition(F) {
    return function (f) { return function (fa) { return F.partition(fa, f); }; };
}
function partitionMap(F) {
    return function (f) { return function (fa) { return F.partitionMap(fa, f); }; };
}
function filterWithIndex(F) {
    return function (predicate) { return function (fa) { return F.filterWithIndex(fa, predicate); }; };
}
function filterMapWithIndex(F) {
    return function (f) { return function (fa) { return F.filterMapWithIndex(fa, f); }; };
}
function partitionWithIndex(F) {
    return function (f) { return function (fa) { return F.partitionWithIndex(fa, f); }; };
}
function partitionMapWithIndex(F) {
    return function (f) { return function (fa) { return F.partitionMapWithIndex(fa, f); }; };
}
function promap(F) {
    return function (f, g) { return function (fbc) { return F.promap(fbc, f, g); }; };
}
function compose(F) {
    return function (ea) { return function (ab) { return F.compose(ab, ea); }; };
}
var isFunctor = function (I) { return typeof I.map === 'function'; };
var isContravariant = function (I) { return typeof I.contramap === 'function'; };
var isFunctorWithIndex = function (I) { return typeof I.mapWithIndex === 'function'; };
var isApply = function (I) { return typeof I.ap === 'function'; };
var isChain = function (I) { return typeof I.chain === 'function'; };
var isBifunctor = function (I) { return typeof I.bimap === 'function'; };
var isExtend = function (I) { return typeof I.extend === 'function'; };
var isFoldable = function (I) { return typeof I.reduce === 'function'; };
var isFoldableWithIndex = function (I) { return typeof I.reduceWithIndex === 'function'; };
var isAlt = function (I) { return typeof I.alt === 'function'; };
var isCompactable = function (I) { return typeof I.compact === 'function'; };
var isFilterable = function (I) { return typeof I.filter === 'function'; };
var isFilterableWithIndex = function (I) {
    return typeof I.filterWithIndex === 'function';
};
var isProfunctor = function (I) { return typeof I.promap === 'function'; };
var isSemigroupoid = function (I) { return typeof I.compose === 'function'; };
var isMonadThrow = function (I) { return typeof I.throwError === 'function'; };
/** @deprecated */
function pipeable(I) {
    var r = {};
    if (isFunctor(I)) {
        r.map = map$1(I);
    }
    if (isContravariant(I)) {
        r.contramap = contramap(I);
    }
    if (isFunctorWithIndex(I)) {
        r.mapWithIndex = mapWithIndex(I);
    }
    if (isApply(I)) {
        r.ap = ap$1(I);
        r.apFirst = apFirst$2(I);
        r.apSecond = apSecond$2(I);
    }
    if (isChain(I)) {
        r.chain = chain$1(I);
        r.chainFirst = chainFirst$2(I);
        r.flatten = r.chain(identity$1);
    }
    if (isBifunctor(I)) {
        r.bimap = bimap$1(I);
        r.mapLeft = mapLeft$1(I);
    }
    if (isExtend(I)) {
        r.extend = extend$1(I);
        r.duplicate = r.extend(identity$1);
    }
    if (isFoldable(I)) {
        r.reduce = reduce$1(I);
        r.foldMap = foldMap$1(I);
        r.reduceRight = reduceRight$1(I);
    }
    if (isFoldableWithIndex(I)) {
        r.reduceWithIndex = reduceWithIndex(I);
        r.foldMapWithIndex = foldMapWithIndex(I);
        r.reduceRightWithIndex = reduceRightWithIndex(I);
    }
    if (isAlt(I)) {
        r.alt = alt$1(I);
    }
    if (isCompactable(I)) {
        r.compact = I.compact;
        r.separate = I.separate;
    }
    if (isFilterable(I)) {
        r.filter = filter(I);
        r.filterMap = filterMap(I);
        r.partition = partition(I);
        r.partitionMap = partitionMap(I);
    }
    if (isFilterableWithIndex(I)) {
        r.filterWithIndex = filterWithIndex(I);
        r.filterMapWithIndex = filterMapWithIndex(I);
        r.partitionWithIndex = partitionWithIndex(I);
        r.partitionMapWithIndex = partitionMapWithIndex(I);
    }
    if (isProfunctor(I)) {
        r.promap = promap(I);
    }
    if (isSemigroupoid(I)) {
        r.compose = compose(I);
    }
    if (isMonadThrow(I)) {
        var fromOption = function (onNone) { return function (ma) {
            return ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value);
        }; };
        var fromEither = function (ma) {
            return ma._tag === 'Left' ? I.throwError(ma.left) : I.of(ma.right);
        };
        var fromPredicate = function (predicate, onFalse) {
            return function (a) {
                return predicate(a) ? I.of(a) : I.throwError(onFalse(a));
            };
        };
        var filterOrElse = function (predicate, onFalse) {
            return function (ma) {
                return I.chain(ma, function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); });
            };
        };
        r.fromOption = fromOption;
        r.fromEither = fromEither;
        r.fromPredicate = fromPredicate;
        r.filterOrElse = filterOrElse;
    }
    return r;
}
/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#pipe) from `function` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
var pipe = pipe$1;

var pipeable$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	alt: alt$1,
	ap: ap$1,
	bimap: bimap$1,
	chain: chain$1,
	compose: compose,
	contramap: contramap,
	extend: extend$1,
	filter: filter,
	filterMap: filterMap,
	filterMapWithIndex: filterMapWithIndex,
	filterWithIndex: filterWithIndex,
	foldMap: foldMap$1,
	foldMapWithIndex: foldMapWithIndex,
	map: map$1,
	mapLeft: mapLeft$1,
	mapWithIndex: mapWithIndex,
	partition: partition,
	partitionMap: partitionMap,
	partitionMapWithIndex: partitionMapWithIndex,
	partitionWithIndex: partitionWithIndex,
	pipe: pipe,
	pipeable: pipeable,
	promap: promap,
	reduce: reduce$1,
	reduceRight: reduceRight$1,
	reduceRightWithIndex: reduceRightWithIndex,
	reduceWithIndex: reduceWithIndex
});

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
var left = left$1;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var right = right$1;
/**
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ dual(2, function (ma, f) { return (isLeft(ma) ? ma : f(ma.right)); });
var _map = function (fa, f) { return pipe$1(fa, map(f)); };
var _ap = function (fab, fa) { return pipe$1(fab, ap(fa)); };
/* istanbul ignore next */
var _reduce = function (fa, b, f) { return pipe$1(fa, reduce(b, f)); };
/* istanbul ignore next */
var _foldMap = function (M) { return function (fa, f) {
    var foldMapM = foldMap(M);
    return pipe$1(fa, foldMapM(f));
}; };
/* istanbul ignore next */
var _reduceRight = function (fa, b, f) { return pipe$1(fa, reduceRight(b, f)); };
var _traverse = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return pipe$1(ta, traverseF(f)); };
};
var _bimap = function (fa, f, g) { return pipe$1(fa, bimap(f, g)); };
var _mapLeft = function (fa, f) { return pipe$1(fa, mapLeft(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe$1(fa, alt(that)); };
/* istanbul ignore next */
var _extend = function (wa, f) { return pipe$1(wa, extend(f)); };
var _chainRec = function (a, f) {
    return tailRec(f(a), function (e) {
        return isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right));
    });
};
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Either';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow = function (SE, SA) { return ({
    show: function (ma) { return (isLeft(ma) ? "left(".concat(SE.show(ma.left), ")") : "right(".concat(SA.show(ma.right), ")")); }
}); };
/**
 * @category instances
 * @since 2.0.0
 */
var getEq = function (EL, EA) { return ({
    equals: function (x, y) {
        return x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right));
    }
}); };
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
    concat: function (x, y) { return (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right))); }
}); };
/**
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category filtering
 * @since 2.10.0
 */
var getCompactable = function (M) {
    var empty = left(M.empty);
    return {
        URI: URI,
        _E: undefined,
        compact: function (ma) { return (isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : right(ma.right.value)); },
        separate: function (ma) {
            return isLeft(ma)
                ? separated(ma, ma)
                : isLeft(ma.right)
                    ? separated(right(ma.right.left), empty)
                    : separated(empty, right(ma.right.right));
        }
    };
};
/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @category filtering
 * @since 2.10.0
 */
var getFilterable = function (M) {
    var empty = left(M.empty);
    var _a = getCompactable(M), compact = _a.compact, separate = _a.separate;
    var filter = function (ma, predicate) {
        return isLeft(ma) ? ma : predicate(ma.right) ? ma : empty;
    };
    var partition = function (ma, p) {
        return isLeft(ma)
            ? separated(ma, ma)
            : p(ma.right)
                ? separated(empty, right(ma.right))
                : separated(right(ma.right), empty);
    };
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: function (ma, f) {
            if (isLeft(ma)) {
                return ma;
            }
            var ob = f(ma.right);
            return ob._tag === 'None' ? empty : right(ob.value);
        },
        partition: partition,
        partitionMap: function (ma, f) {
            if (isLeft(ma)) {
                return separated(ma, ma);
            }
            var e = f(ma.right);
            return isLeft(e) ? separated(right(e.left), empty) : separated(empty, right(e.right));
        }
    };
};
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category filtering
 * @since 2.0.0
 */
var getWitherable = function (M) {
    var F_ = getFilterable(M);
    var C = getCompactable(M);
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: _traverse,
        sequence: sequence,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        wither: witherDefault(Traversable, C),
        wilt: wiltDefault(Traversable, C)
    };
};
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
    URI: URI,
    _E: undefined,
    map: _map,
    ap: function (fab, fa) {
        return isLeft(fab)
            ? isLeft(fa)
                ? left(SE.concat(fab.left, fa.left))
                : fab
            : isLeft(fa)
                ? fa
                : right(fab.right(fa.right));
    },
    of: of
}); };
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
    URI: URI,
    _E: undefined,
    map: _map,
    alt: function (me, that) {
        if (isRight(me)) {
            return me;
        }
        var ea = that();
        return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea;
    }
}); };
/**
 * @category mapping
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right(f(fa.right));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * Maps the `Right` value of this `Either` to the specified constant value.
 *
 * @category mapping
 * @since 2.16.0
 */
var as = dual(2, as$2(Functor));
/**
 * Maps the `Right` value of this `Either` to the void constant value.
 *
 * @category mapping
 * @since 2.16.0
 */
var asUnit = asUnit$2(Functor);
/**
 * @category constructors
 * @since 2.7.0
 */
var of = right;
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI,
    of: of
};
/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) {
    return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
}; };
/**
 * @since 2.0.0
 */
var ap = apW;
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI,
    map: _map,
    ap: _ap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap
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
    return isLeft(fa) ? b : f(b, fa.right);
}; };
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
    return isLeft(fa) ? M.empty : f(fa.right);
}; }; };
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
    return isLeft(fa) ? b : f(fa.right, b);
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
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
            return isLeft(ta) ? F.of(left(ta.left)) : F.map(f(ta.right), right);
        };
    };
};
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
        return isLeft(ma) ? F.of(left(ma.left)) : F.map(ma.right, right);
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: _map,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence
};
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : right(g(fa.right));
}; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : fa;
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Bifunctor = {
    URI: URI,
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
    return isLeft(fa) ? that() : fa;
}; };
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
var alt = altW;
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: _map,
    alt: _alt
};
/**
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isLeft(wa) ? wa : right(f(wa));
}; };
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: _map,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
var ChainRec = {
    URI: URI,
    map: _map,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRec
};
/**
 * @since 2.6.3
 */
var throwError = left;
/**
 * @category instances
 * @since 2.7.0
 */
var MonadThrow = {
    URI: URI,
    map: _map,
    ap: _ap,
    of: of,
    chain: flatMap,
    throwError: throwError
};
/**
 * @category instances
 * @since 2.10.0
 */
var FromEither = {
    URI: URI,
    fromEither: identity$1
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
var fromPredicate = /*#__PURE__*/ fromPredicate$2(FromEither);
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
var fromOption = 
/*#__PURE__*/ fromOption$1(FromEither);
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
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
var isRight = isRight$1;
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
        return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
    };
};
/**
 * Alias of [`matchW`](#matchw).
 *
 * @category pattern matching
 * @since 2.10.0
 */
var foldW = matchW;
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
var getOrElseW = function (onLeft) {
    return function (ma) {
        return isLeft(ma) ? onLeft(ma.left) : ma.right;
    };
};
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
var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ flap$2(Functor);
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
var apFirst = /*#__PURE__*/ apFirst$2(Apply);
/**
 * Less strict version of [`apFirst`](#apfirst)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
var apFirstW = apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
var apSecond = /*#__PURE__*/ apSecond$2(Apply);
/**
 * Less strict version of [`apSecond`](#apsecond)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
var apSecondW = apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category combinators
 * @since 2.15.0
 */
var tap = /*#__PURE__*/ dual(2, tap$2(Chain));
/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
var flattenW = 
/*#__PURE__*/ flatMap(identity$1);
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
var flatten = flattenW;
/**
 * @since 2.0.0
 */
var duplicate = /*#__PURE__*/ extend(identity$1);
/**
 * Use `liftOption`.
 *
 * @category legacy
 * @since 2.10.0
 */
var fromOptionK = 
/*#__PURE__*/ fromOptionK$1(FromEither);
/**
 * Use `flatMapOption`.
 *
 * @category legacy
 * @since 2.11.0
 */
var chainOptionK = /*#__PURE__*/ chainOptionK$1(FromEither, Chain);
/**
 * Use `flatMapOption`.
 *
 * @category legacy
 * @since 2.13.2
 */
var chainOptionKW =  chainOptionK;
/** @internal */
var _FromEither = {
    fromEither: FromEither.fromEither
};
/**
 * @category lifting
 * @since 2.15.0
 */
var liftNullable = /*#__PURE__*/ liftNullable$1(_FromEither);
/**
 * @category lifting
 * @since 2.15.0
 */
var liftOption = /*#__PURE__*/ liftOption$1(_FromEither);
/** @internal */
var _FlatMap = {
    flatMap: flatMap
};
/**
 * @category sequencing
 * @since 2.15.0
 */
var flatMapNullable = /*#__PURE__*/ flatMapNullable$1(_FromEither, _FlatMap);
/**
 * @category sequencing
 * @since 2.15.0
 */
var flatMapOption = /*#__PURE__*/ flatMapOption$1(_FromEither, _FlatMap);
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
var filterOrElse = /*#__PURE__*/ filterOrElse$1(FromEither, Chain);
/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category filtering
 * @since 2.9.0
 */
var filterOrElseW = filterOrElse;
/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @since 2.0.0
 */
var swap = function (ma) { return (isLeft(ma) ? right(ma.left) : left(ma.right)); };
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
        return isLeft(ma) ? onLeft(ma.left) : ma;
    };
};
/**
 * Useful for recovering from errors.
 *
 * @category error handling
 * @since 2.0.0
 */
var orElse = orElseW;
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
        return a == null ? left(e) : right(a);
    };
};
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
        return right(f());
    }
    catch (e) {
        return left(onThrow(e));
    }
};
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
        return tryCatch(function () { return f.apply(void 0, a); }, onThrow);
    };
};
/**
 * Use `liftNullable`.
 *
 * @category legacy
 * @since 2.9.0
 */
var fromNullableK = function (e) {
    var from = fromNullable(e);
    return function (f) { return flow(f, from); };
};
/**
 * Use `flatMapNullable`.
 *
 * @category legacy
 * @since 2.9.0
 */
var chainNullableK = function (e) {
    var from = fromNullableK(e);
    return function (f) { return flatMap(from(f)); };
};
/**
 * @category conversions
 * @since 2.10.0
 */
var toUnion = /*#__PURE__*/ foldW(identity$1, identity$1);
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
function elem(E) {
    return function (a, ma) {
        if (ma === undefined) {
            var elemE_1 = elem(E);
            return function (ma) { return elemE_1(a, ma); };
        }
        return isLeft(ma) ? false : E.equals(a, ma.right);
    };
}
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
        return isLeft(ma) ? false : predicate(ma.right);
    };
};
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @category do notation
 * @since 2.9.0
 */
var Do = /*#__PURE__*/ of(emptyRecord);
/**
 * @category do notation
 * @since 2.8.0
 */
var bindTo = /*#__PURE__*/ bindTo$2(Functor);
var let_ = /*#__PURE__*/ let_$2(Functor);
/**
 * @category do notation
 * @since 2.8.0
 */
var bind = /*#__PURE__*/ bind$2(Chain);
/**
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
var bindW = bind;
/**
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ apS$2(Apply);
/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
var apSW = apS;
/**
 * @since 2.11.0
 */
var ApT = /*#__PURE__*/ of(emptyReadonlyArray);
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
        var e = f(0, head(as));
        if (isLeft(e)) {
            return e;
        }
        var out = [e.right];
        for (var i = 1; i < as.length; i++) {
            var e_1 = f(i, as[i]);
            if (isLeft(e_1)) {
                return e_1;
            }
            out.push(e_1.right);
        }
        return right(out);
    };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
var traverseReadonlyArrayWithIndex = function (f) {
    var g = traverseReadonlyNonEmptyArrayWithIndex(f);
    return function (as) { return (isNonEmpty$1(as) ? g(as) : ApT); };
};
/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArrayWithIndex = traverseReadonlyArrayWithIndex;
/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var traverseArray = function (f) { return traverseReadonlyArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/ traverseArray(identity$1);
// -------------------------------------------------------------------------------------
// legacy
// -------------------------------------------------------------------------------------
/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.6.0
 */
var chainW = flatMap;
/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.0.0
 */
var chain = flatMap;
/**
 * Alias of `tap`.
 *
 * @category legacy
 * @since 2.0.0
 */
var chainFirst = tap;
/**
 * Alias of `tap`.
 *
 * @category legacy
 * @since 2.8.0
 */
var chainFirstW = tap;
/**
 * Use [`parse`](./Json.ts.html#parse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
/**
 * Use [`stringify`](./Json.ts.html#stringify) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var stringifyJSON = function (u, onError) {
    return tryCatch(function () {
        var s = JSON.stringify(u);
        if (typeof s !== 'string') {
            throw new Error('Converting unsupported structure to JSON');
        }
        return s;
    }, onError);
};
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `E.Functor` instead of `E.either`
 * (where `E` is from `import E from 'fp-ts/Either'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var either = {
    URI: URI,
    map: _map,
    of: of,
    ap: _ap,
    chain: flatMap,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    traverse: _traverse,
    sequence: sequence,
    bimap: _bimap,
    mapLeft: _mapLeft,
    alt: _alt,
    extend: _extend,
    chainRec: _chainRec,
    throwError: throwError
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
var getApplySemigroup = 
/*#__PURE__*/ getApplySemigroup$2(Apply);
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getApplyMonoid = 
/*#__PURE__*/ getApplicativeMonoid(Applicative);
/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getValidationSemigroup = function (SE, SA) {
    return getApplySemigroup$2(getApplicativeValidation(SE))(SA);
};
/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var getValidationMonoid = function (SE, MA) {
    return getApplicativeMonoid(getApplicativeValidation(SE))(MA);
};
/**
 * Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
function getValidation(SE) {
    var ap = getApplicativeValidation(SE).ap;
    var alt = getAltValidation(SE).alt;
    return {
        URI: URI,
        _E: undefined,
        map: _map,
        of: of,
        chain: flatMap,
        bimap: _bimap,
        mapLeft: _mapLeft,
        reduce: _reduce,
        foldMap: _foldMap,
        reduceRight: _reduceRight,
        extend: _extend,
        traverse: _traverse,
        sequence: sequence,
        chainRec: _chainRec,
        throwError: throwError,
        ap: ap,
        alt: alt
    };
}

var Either = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Alt: Alt,
	ApT: ApT,
	Applicative: Applicative,
	Apply: Apply,
	Bifunctor: Bifunctor,
	Chain: Chain,
	ChainRec: ChainRec,
	Do: Do,
	Extend: Extend,
	Foldable: Foldable,
	FromEither: FromEither,
	Functor: Functor,
	Monad: Monad,
	MonadThrow: MonadThrow,
	Pointed: Pointed,
	Traversable: Traversable,
	URI: URI,
	alt: alt,
	altW: altW,
	ap: ap,
	apFirst: apFirst,
	apFirstW: apFirstW,
	apS: apS,
	apSW: apSW,
	apSecond: apSecond,
	apSecondW: apSecondW,
	apW: apW,
	as: as,
	asUnit: asUnit,
	bimap: bimap,
	bind: bind,
	bindTo: bindTo,
	bindW: bindW,
	chain: chain,
	chainFirst: chainFirst,
	chainFirstW: chainFirstW,
	chainNullableK: chainNullableK,
	chainOptionK: chainOptionK,
	chainOptionKW: chainOptionKW,
	chainW: chainW,
	duplicate: duplicate,
	either: either,
	elem: elem,
	exists: exists,
	extend: extend,
	filterOrElse: filterOrElse,
	filterOrElseW: filterOrElseW,
	flap: flap,
	flatMap: flatMap,
	flatMapNullable: flatMapNullable,
	flatMapOption: flatMapOption,
	flatten: flatten,
	flattenW: flattenW,
	fold: fold,
	foldMap: foldMap,
	foldW: foldW,
	fromNullable: fromNullable,
	fromNullableK: fromNullableK,
	fromOption: fromOption,
	fromOptionK: fromOptionK,
	fromPredicate: fromPredicate,
	getAltValidation: getAltValidation,
	getApplicativeValidation: getApplicativeValidation,
	getApplyMonoid: getApplyMonoid,
	getApplySemigroup: getApplySemigroup,
	getCompactable: getCompactable,
	getEq: getEq,
	getFilterable: getFilterable,
	getOrElse: getOrElse,
	getOrElseW: getOrElseW,
	getSemigroup: getSemigroup,
	getShow: getShow,
	getValidation: getValidation,
	getValidationMonoid: getValidationMonoid,
	getValidationSemigroup: getValidationSemigroup,
	getWitherable: getWitherable,
	isLeft: isLeft,
	isRight: isRight,
	left: left,
	let: let_,
	liftNullable: liftNullable,
	liftOption: liftOption,
	map: map,
	mapLeft: mapLeft,
	match: match,
	matchW: matchW,
	of: of,
	orElse: orElse,
	orElseW: orElseW,
	parseJSON: parseJSON,
	reduce: reduce,
	reduceRight: reduceRight,
	right: right,
	sequence: sequence,
	sequenceArray: sequenceArray,
	stringifyJSON: stringifyJSON,
	swap: swap,
	tap: tap,
	throwError: throwError,
	toError: toError,
	toUnion: toUnion,
	traverse: traverse,
	traverseArray: traverseArray,
	traverseArrayWithIndex: traverseArrayWithIndex,
	traverseReadonlyArrayWithIndex: traverseReadonlyArrayWithIndex,
	traverseReadonlyNonEmptyArrayWithIndex: traverseReadonlyNonEmptyArrayWithIndex,
	tryCatch: tryCatch,
	tryCatchK: tryCatchK
});

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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
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
var failures = left;
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
var success = right;
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
/**
 * @since 1.0.0
 */
function getContextEntry(key, decoder) {
    return { key: key, type: decoder };
}
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
        if (codecs[i].encode !== identity) {
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
    return new DictionaryType(name, function (u) { return UnknownRecord.is(u) && keys.every(function (k) { return codomain.is(u[k]); }); }, function (u, c) {
        var e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
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
            if (isLeft(codomainResult)) {
                pushAll(errors, codomainResult.left);
            }
            else {
                var vok = codomainResult.right;
                changed = changed || vok !== ok;
                a[k] = vok;
            }
        }
        return errors.length > 0 ? failures(errors) : success((changed || Object.keys(o).length !== len ? a : o));
    }, codomain.encode === identity
        ? identity
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
        if (string.is(literal_1)) {
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
function nonEnumerableRecord(domain, codomain, name) {
    if (name === void 0) { name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }"); }
    return new DictionaryType(name, function (u) {
        if (UnknownRecord.is(u)) {
            return Object.keys(u).every(function (k) { return domain.is(k) && codomain.is(u[k]); });
        }
        return isAnyC(codomain) && Array.isArray(u);
    }, function (u, c) {
        if (UnknownRecord.is(u)) {
            var a = {};
            var errors = [];
            var keys = Object.keys(u);
            var len = keys.length;
            var changed = false;
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var ok = u[k];
                var domainResult = domain.validate(k, appendContext(c, k, domain, k));
                if (isLeft(domainResult)) {
                    pushAll(errors, domainResult.left);
                }
                else {
                    var vk = domainResult.right;
                    changed = changed || vk !== k;
                    k = vk;
                    var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
                    if (isLeft(codomainResult)) {
                        pushAll(errors, codomainResult.left);
                    }
                    else {
                        var vok = codomainResult.right;
                        changed = changed || vok !== ok;
                        a[k] = vok;
                    }
                }
            }
            return errors.length > 0 ? failures(errors) : success((changed ? a : u));
        }
        if (isAnyC(codomain) && Array.isArray(u)) {
            return success(u);
        }
        return failure(u, c);
    }, domain.encode === identity && codomain.encode === identity
        ? identity
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
    var baseIsNotADictionary = !UnknownRecord.is(base);
    for (var _i = 0, us_1 = us; _i < us_1.length; _i++) {
        var u = us_1[_i];
        if (u !== base) {
            equal = false;
        }
        if (UnknownRecord.is(u)) {
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
var emptyTags = {};
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
    if (a === emptyTags) {
        return b;
    }
    if (b === emptyTags) {
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
                r = emptyTags;
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
    if (a === emptyTags || b === emptyTags) {
        return emptyTags;
    }
    var r = emptyTags;
    for (var k in a) {
        if (hasOwnProperty.call(b, k)) {
            var intersection_2 = intersect(a[k], b[k]);
            if (intersection_2.length === 0) {
                if (r === emptyTags) {
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
        return emptyTags;
    }
    if (isTypeC(codec) || isStrictC(codec)) {
        var index = emptyTags;
        // tslint:disable-next-line: forin
        for (var k in codec.props) {
            var prop = codec.props[k];
            if (isLiteralC(prop)) {
                if (index === emptyTags) {
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
        return codec.types.reduce(function (tags, codec) { return mergeTags(tags, getTags(codec)); }, emptyTags);
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
    return emptyTags;
}
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
var nullType = new NullType();
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
var voidType = new VoidType();
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
var unknown = new UnknownType();
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
var string = new StringType();
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
var bigint = new BigIntType();
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
var boolean = new BooleanType();
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
var UnknownArray = new AnyArrayType();
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
var UnknownRecord = new AnyDictionaryType();
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
/**
 * @category constructors
 * @since 1.0.0
 */
function literal(value, name) {
    if (name === void 0) { name = JSON.stringify(value); }
    var is = function (u) { return u === value; };
    return new LiteralType(name, is, function (u, c) { return (is(u) ? success(value) : failure(u, c)); }, identity, value);
}
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
/**
 * @category constructors
 * @since 1.0.0
 */
function keyof(keys, name) {
    if (name === void 0) { name = Object.keys(keys)
        .map(function (k) { return JSON.stringify(k); })
        .join(' | '); }
    var is = function (u) { return string.is(u) && hasOwnProperty.call(keys, u); };
    return new KeyofType(name, is, function (u, c) { return (is(u) ? success(u) : failure(u, c)); }, identity, keys);
}
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
var Int = brand(number, function (n) { return Number.isInteger(n); }, 'Int');
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
/**
 * @category combinators
 * @since 1.0.0
 */
function array(item, name) {
    if (name === void 0) { name = "Array<".concat(item.name, ">"); }
    return new ArrayType(name, function (u) { return UnknownArray.is(u) && u.every(item.is); }, function (u, c) {
        var e = UnknownArray.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        var us = e.right;
        var len = us.length;
        var as = us;
        var errors = [];
        for (var i = 0; i < len; i++) {
            var ui = us[i];
            var result = item.validate(ui, appendContext(c, String(i), item, ui));
            if (isLeft(result)) {
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
        return errors.length > 0 ? failures(errors) : success(as);
    }, item.encode === identity ? identity : function (a) { return a.map(item.encode); }, item);
}
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
        if (UnknownRecord.is(u)) {
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
        var e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
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
            if (isLeft(result)) {
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
        return errors.length > 0 ? failures(errors) : success(a);
    }, useIdentity(types)
        ? identity
        : function (a) {
            var s = __assign({}, a);
            for (var i = 0; i < len; i++) {
                var k = keys[i];
                var encode = types[i].encode;
                if (encode !== identity) {
                    s[k] = encode(a[k]);
                }
            }
            return s;
        }, props);
}
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
        if (UnknownRecord.is(u)) {
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
        var e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
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
            if (isLeft(result)) {
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
        return errors.length > 0 ? failures(errors) : success(a);
    }, useIdentity(types)
        ? identity
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
            if (UnknownRecord.is(u)) {
                var i = find_1(u[tag_1]);
                return i !== undefined ? codecs[i].is(u) : false;
            }
            return false;
        }, function (u, c) {
            var e = UnknownRecord.validate(u, c);
            if (isLeft(e)) {
                return e;
            }
            var r = e.right;
            var i = find_1(r[tag_1]);
            if (i === undefined) {
                return failure(u, c);
            }
            var codec = codecs[i];
            return codec.validate(r, appendContext(c, String(i), codec, r));
        }, useIdentity(codecs)
            ? identity
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
                if (isLeft(result)) {
                    pushAll(errors, result.left);
                }
                else {
                    return success(result.right);
                }
            }
            return failures(errors);
        }, useIdentity(codecs)
            ? identity
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
function intersection(codecs, name) {
    if (name === void 0) { name = "(".concat(codecs.map(function (type) { return type.name; }).join(' & '), ")"); }
    var len = codecs.length;
    return new IntersectionType(name, function (u) { return codecs.every(function (type) { return type.is(u); }); }, codecs.length === 0
        ? success
        : function (u, c) {
            var us = [];
            var errors = [];
            for (var i = 0; i < len; i++) {
                var codec = codecs[i];
                var result = codec.validate(u, appendContext(c, String(i), codec, u));
                if (isLeft(result)) {
                    pushAll(errors, result.left);
                }
                else {
                    us.push(result.right);
                }
            }
            return errors.length > 0 ? failures(errors) : success(mergeAll(u, us));
        }, codecs.length === 0
        ? identity
        : function (a) {
            return mergeAll(a, codecs.map(function (codec) { return codec.encode(a); }));
        }, codecs);
}
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
function tuple(codecs, name) {
    if (name === void 0) { name = "[".concat(codecs.map(function (type) { return type.name; }).join(', '), "]"); }
    var len = codecs.length;
    return new TupleType(name, function (u) { return UnknownArray.is(u) && u.length === len && codecs.every(function (type, i) { return type.is(u[i]); }); }, function (u, c) {
        var e = UnknownArray.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        var us = e.right;
        var as = us.length > len ? us.slice(0, len) : us; // strip additional components
        var errors = [];
        for (var i = 0; i < len; i++) {
            var a = us[i];
            var type_3 = codecs[i];
            var result = type_3.validate(a, appendContext(c, String(i), type_3, a));
            if (isLeft(result)) {
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
        return errors.length > 0 ? failures(errors) : success(as);
    }, useIdentity(codecs) ? identity : function (a) { return codecs.map(function (type, i) { return type.encode(a[i]); }); }, codecs);
}
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
/**
 * @category combinators
 * @since 1.0.0
 */
function readonly(codec, name) {
    if (name === void 0) { name = "Readonly<".concat(codec.name, ">"); }
    return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
}
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
/**
 * @category combinators
 * @since 1.0.0
 */
function readonlyArray(item, name) {
    if (name === void 0) { name = "ReadonlyArray<".concat(item.name, ">"); }
    var codec = array(item);
    return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
}
/**
 * Strips additional properties, equivalent to `exact(type(props))`.
 *
 * @category combinators
 * @since 1.0.0
 */
var strict = function (props, name) { return exact(type(props), name); };
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
        var e = UnknownRecord.validate(u, c);
        if (isLeft(e)) {
            return e;
        }
        var ce = codec.validate(u, c);
        if (isLeft(ce)) {
            return ce;
        }
        return right(stripKeys(ce.right, props));
    }, function (a) { return codec.encode(stripKeys(a, props)); }, codec);
}
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
var Function = new FunctionType();
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
var never = new NeverType();
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
var any = new AnyType();
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
var Integer = refinement(number, Number.isInteger, 'Integer');
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
/**
 * @since 1.0.0
 * @deprecated
 */
var getValidationError /* istanbul ignore next */ = function (value, context) { return ({
    value: value,
    context: context
}); };
/**
 * @since 1.0.0
 * @deprecated
 */
var getDefaultContext /* istanbul ignore next */ = function (decoder) { return [
    { key: '', type: decoder }
]; };
/**
 * Use `UnknownRecord` instead.
 *
 * @category primitives
 * @since 1.0.0
 * @deprecated
 */
var Dictionary = UnknownRecord;
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
var object = new ObjectType();
/**
 * Use `record` instead.
 *
 * @category combinators
 * @since 1.0.0
 * @deprecated
 */
var dictionary = record;
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
function alias(codec) {
    return function () { return codec; };
}

var es6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	AnyArrayType: AnyArrayType,
	AnyDictionaryType: AnyDictionaryType,
	AnyType: AnyType,
	Array: UnknownArray,
	ArrayType: ArrayType,
	BigIntType: BigIntType,
	BooleanType: BooleanType,
	Dictionary: Dictionary,
	DictionaryType: DictionaryType,
	ExactType: ExactType,
	Function: Function,
	FunctionType: FunctionType,
	Int: Int,
	Integer: Integer,
	InterfaceType: InterfaceType,
	IntersectionType: IntersectionType,
	KeyofType: KeyofType,
	LiteralType: LiteralType,
	NeverType: NeverType,
	NullType: NullType,
	NumberType: NumberType,
	ObjectType: ObjectType,
	PartialType: PartialType,
	ReadonlyArrayType: ReadonlyArrayType,
	ReadonlyType: ReadonlyType,
	RecursiveType: RecursiveType,
	RefinementType: RefinementType,
	StrictType: StrictType,
	StringType: StringType,
	TaggedUnionType: TaggedUnionType,
	TupleType: TupleType,
	Type: Type,
	UndefinedType: UndefinedType,
	UnionType: UnionType,
	UnknownArray: UnknownArray,
	UnknownRecord: UnknownRecord,
	UnknownType: UnknownType,
	VoidType: VoidType,
	alias: alias,
	any: any,
	appendContext: appendContext,
	array: array,
	bigint: bigint,
	boolean: boolean,
	brand: brand,
	clean: clean,
	dictionary: dictionary,
	emptyTags: emptyTags,
	exact: exact,
	failure: failure,
	failures: failures,
	getContextEntry: getContextEntry,
	getDefaultContext: getDefaultContext,
	getDomainKeys: getDomainKeys,
	getFunctionName: getFunctionName,
	getIndex: getIndex,
	getTags: getTags,
	getValidationError: getValidationError,
	identity: identity,
	interface: type,
	intersection: intersection,
	keyof: keyof,
	literal: literal,
	mergeAll: mergeAll,
	never: never,
	null: nullType,
	nullType: nullType,
	number: number,
	object: object,
	partial: partial,
	readonly: readonly,
	readonlyArray: readonlyArray,
	record: record,
	recursion: recursion,
	refinement: refinement,
	strict: strict,
	string: string,
	success: success,
	taggedUnion: taggedUnion,
	tuple: tuple,
	type: type,
	undefined: undefinedType,
	union: union,
	unknown: unknown,
	void: voidType,
	voidType: voidType
});

exports.Applicative = Applicative$2;
exports.Apply = Apply$2;
exports.Chain = Chain$2;
exports.Either = Either$1;
exports.Either$1 = Either;
exports.FromEither = FromEither$2;
exports.Functor = Functor$2;
exports.Option = Option;
exports.SK = SK;
exports.Separated = Separated;
exports.Type = Type;
exports.Witherable = Witherable$1;
exports._function = _function;
exports.apFirst = apFirst$2;
exports.apS = apS$2;
exports.apSecond = apSecond$2;
exports.bind = bind$2;
exports.bindTo = bindTo$2;
exports.chain = chain$2;
exports.chainFirst = chainFirst$2;
exports.commonjsGlobal = commonjsGlobal;
exports.constant = constant;
exports.dual = dual;
exports.emptyRecord = emptyRecord;
exports.es6 = es6;
exports.filterE = filterE;
exports.flap = flap$2;
exports.flow = flow;
exports.fold = fold$1;
exports.fromCompare = fromCompare;
exports.fromEither = fromEither;
exports.fromEitherK = fromEitherK$1;
exports.fromNullable = fromNullable$1;
exports.fromPredicate = fromPredicate$1;
exports.fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray;
exports.getAugmentedNamespace = getAugmentedNamespace;
exports.getFirstMonoid = getFirstMonoid;
exports.getMonoid = getMonoid$1;
exports.getOrElse = getOrElse$1;
exports.guard = guard$1;
exports.has = has;
exports.head = head;
exports.identity = identity$1;
exports.internal = internal;
exports.isLeft = isLeft$1;
exports.isLeft$1 = isLeft;
exports.isNonEmpty = isNonEmpty$1;
exports.isNone = isNone$1;
exports.isNone$1 = isNone;
exports.isSome = isSome$1;
exports.last = last;
exports.left = left;
exports.let_ = let_$2;
exports.lib = lib;
exports.literal = literal;
exports.map = map$2;
exports.map$1 = map;
exports.max = max;
exports.min = min;
exports.none = none$1;
exports.none$1 = none;
exports.option = option;
exports.pipe = pipe$1;
exports.pipe$1 = pipe;
exports.pipeable = pipeable$1;
exports.right = right;
exports.semigroupAll = semigroupAll;
exports.semigroupAny = semigroupAny;
exports.separated = separated;
exports.some = some$1;
exports.some$1 = some;
exports.strict = strict;
exports.success = success;
exports.tail = tail;
exports.toNullable = toNullable;
exports.union = union;
exports.unsafeCoerce = unsafeCoerce;
exports.wiltDefault = wiltDefault;
exports.witherDefault = witherDefault;
