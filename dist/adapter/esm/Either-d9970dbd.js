var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
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

var Apply = {};

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
function ap(F, G) {
    return function (fa) {
        return function (fab) {
            return F.ap(F.map(fab, function (gab) { return function (ga) { return G.ap(gab, ga); }; }), fa);
        };
    };
}
Apply.ap = ap;
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

var Either = {};

var Applicative = {};

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
function map(F, G) {
    return function (f) { return function (fa) { return F.map(fa, function (ga) { return G.map(ga, f); }); }; };
}
Functor.map = map;
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
    var _map = map(F, G);
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

export { Apply as A, Chain as C, Either as E, FromEither as F, Separated as S, Witherable as W, _function as _, Applicative as a, Functor as b, commonjsGlobal as c, getDefaultExportFromCjs as g, internal as i };
