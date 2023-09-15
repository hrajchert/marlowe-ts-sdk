'use strict';

var index = require('./index-040eb70b.cjs');
var runtimeCore = require('@marlowe.io/runtime-core');

var Option = {};

var Predicate = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.and = exports.or = exports.not = exports.Contravariant = exports.getMonoidAll = exports.getSemigroupAll = exports.getMonoidAny = exports.getSemigroupAny = exports.URI = exports.contramap = void 0;
	var function_1 = index._function;
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
	var function_1 = index._function;
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
	var function_1 = index._function;
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
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
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
	var function_1 = index._function;
	var _ = __importStar(index.internal);
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

var Zero = {};

Object.defineProperty(Zero, "__esModule", { value: true });
Zero.guard = void 0;
function guard(F, P) {
    return function (b) { return (b ? P.of(undefined) : F.zero()); };
}
Zero.guard = guard;

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
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
	var Applicative_1 = index.Applicative;
	var Apply_1 = index.Apply;
	var chainable = __importStar(index.Chain);
	var FromEither_1 = index.FromEither;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	var Predicate_1 = Predicate;
	var Semigroup_1 = Semigroup;
	var Separated_1 = index.Separated;
	var Witherable_1 = index.Witherable;
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

var require$$3 = /*@__PURE__*/index.getAugmentedNamespace(index.es6);

var None$1 = index.strict({
    _tag: index.literal('None')
}, 'None');
var someLiteral$1 = index.literal('Some');
/**
 * @since 0.5.0
 */
function option$2(codec, name) {
    if (name === void 0) { name = "Option<" + codec.name + ">"; }
    return index.union([
        None$1,
        index.strict({
            _tag: someLiteral$1,
            value: codec
        }, "Some<" + codec.name + ">")
    ], name);
}

/**
 * @since 0.5.0
 */
/**
 * @since 0.5.0
 */
function optionFromNullable$2(codec, name) {
    if (name === void 0) { name = "Option<" + codec.name + ">"; }
    return new index.Type(name, option$2(codec).is, function (u, c) {
        return u == null
            ? index.success(index.none$1)
            : index.pipe$1(codec.validate(u, c), index.map$1(index.some$1));
    }, function (a) {
        return index.toNullable(index.pipe$1(a, index.map(codec.encode)));
    });
}

const Available = index.lib.literal("available");
const Withdrawn = index.lib.literal("withdrawn");
const PayoutStatus = index.lib.union([Available, Withdrawn]);

const PayoutHeader = index.lib.type({
    contractId: runtimeCore.ContractId,
    payoutId: runtimeCore.PayoutId,
    withdrawalId: optionFromNullable$2(runtimeCore.WithdrawalId),
    role: runtimeCore.AssetId,
    status: PayoutStatus,
});

const TxStatus = index.lib.union([
    index.lib.literal("unsigned"),
    index.lib.literal("submitted"),
    index.lib.literal("confirmed"),
]);

var optionFromNullable$1 = {};

var pipeable$1 = {};

Object.defineProperty(pipeable$1, "__esModule", { value: true });
pipeable$1.pipe = pipeable$1.pipeable = pipeable$1.compose = pipeable$1.promap = pipeable$1.partitionMapWithIndex = pipeable$1.partitionWithIndex = pipeable$1.filterMapWithIndex = pipeable$1.filterWithIndex = pipeable$1.partitionMap = pipeable$1.partition = pipeable$1.filterMap = pipeable$1.filter = pipeable$1.alt = pipeable$1.reduceRightWithIndex = pipeable$1.foldMapWithIndex = pipeable$1.reduceWithIndex = pipeable$1.reduceRight = pipeable$1.foldMap = pipeable$1.reduce = pipeable$1.extend = pipeable$1.mapLeft = pipeable$1.bimap = pipeable$1.chain = pipeable$1.ap = pipeable$1.mapWithIndex = pipeable$1.contramap = pipeable$1.map = void 0;
var Apply_1 = index.Apply;
var Chain_1 = index.Chain;
var function_1 = index._function;
function map(F) {
    return function (f) { return function (fa) { return F.map(fa, f); }; };
}
pipeable$1.map = map;
function contramap(F) {
    return function (f) { return function (fa) { return F.contramap(fa, f); }; };
}
pipeable$1.contramap = contramap;
function mapWithIndex(F) {
    return function (f) { return function (fa) { return F.mapWithIndex(fa, f); }; };
}
pipeable$1.mapWithIndex = mapWithIndex;
function ap(F) {
    return function (fa) { return function (fab) { return F.ap(fab, fa); }; };
}
pipeable$1.ap = ap;
function chain(F) {
    return function (f) { return function (fa) { return F.chain(fa, f); }; };
}
pipeable$1.chain = chain;
function bimap(F) {
    return function (f, g) { return function (fea) { return F.bimap(fea, f, g); }; };
}
pipeable$1.bimap = bimap;
function mapLeft(F) {
    return function (f) { return function (fea) { return F.mapLeft(fea, f); }; };
}
pipeable$1.mapLeft = mapLeft;
function extend(F) {
    return function (f) { return function (wa) { return F.extend(wa, f); }; };
}
pipeable$1.extend = extend;
function reduce(F) {
    return function (b, f) { return function (fa) { return F.reduce(fa, b, f); }; };
}
pipeable$1.reduce = reduce;
function foldMap(F) {
    return function (M) {
        var foldMapM = F.foldMap(M);
        return function (f) { return function (fa) { return foldMapM(fa, f); }; };
    };
}
pipeable$1.foldMap = foldMap;
function reduceRight(F) {
    return function (b, f) { return function (fa) { return F.reduceRight(fa, b, f); }; };
}
pipeable$1.reduceRight = reduceRight;
function reduceWithIndex(F) {
    return function (b, f) { return function (fa) { return F.reduceWithIndex(fa, b, f); }; };
}
pipeable$1.reduceWithIndex = reduceWithIndex;
function foldMapWithIndex(F) {
    return function (M) {
        var foldMapWithIndexM = F.foldMapWithIndex(M);
        return function (f) { return function (fa) { return foldMapWithIndexM(fa, f); }; };
    };
}
pipeable$1.foldMapWithIndex = foldMapWithIndex;
function reduceRightWithIndex(F) {
    return function (b, f) { return function (fa) { return F.reduceRightWithIndex(fa, b, f); }; };
}
pipeable$1.reduceRightWithIndex = reduceRightWithIndex;
function alt(F) {
    return function (that) { return function (fa) { return F.alt(fa, that); }; };
}
pipeable$1.alt = alt;
function filter(F) {
    return function (predicate) { return function (fa) { return F.filter(fa, predicate); }; };
}
pipeable$1.filter = filter;
function filterMap(F) {
    return function (f) { return function (fa) { return F.filterMap(fa, f); }; };
}
pipeable$1.filterMap = filterMap;
function partition(F) {
    return function (f) { return function (fa) { return F.partition(fa, f); }; };
}
pipeable$1.partition = partition;
function partitionMap(F) {
    return function (f) { return function (fa) { return F.partitionMap(fa, f); }; };
}
pipeable$1.partitionMap = partitionMap;
function filterWithIndex(F) {
    return function (predicate) { return function (fa) { return F.filterWithIndex(fa, predicate); }; };
}
pipeable$1.filterWithIndex = filterWithIndex;
function filterMapWithIndex(F) {
    return function (f) { return function (fa) { return F.filterMapWithIndex(fa, f); }; };
}
pipeable$1.filterMapWithIndex = filterMapWithIndex;
function partitionWithIndex(F) {
    return function (f) { return function (fa) { return F.partitionWithIndex(fa, f); }; };
}
pipeable$1.partitionWithIndex = partitionWithIndex;
function partitionMapWithIndex(F) {
    return function (f) { return function (fa) { return F.partitionMapWithIndex(fa, f); }; };
}
pipeable$1.partitionMapWithIndex = partitionMapWithIndex;
function promap(F) {
    return function (f, g) { return function (fbc) { return F.promap(fbc, f, g); }; };
}
pipeable$1.promap = promap;
function compose(F) {
    return function (ea) { return function (ab) { return F.compose(ab, ea); }; };
}
pipeable$1.compose = compose;
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
        r.map = map(I);
    }
    if (isContravariant(I)) {
        r.contramap = contramap(I);
    }
    if (isFunctorWithIndex(I)) {
        r.mapWithIndex = mapWithIndex(I);
    }
    if (isApply(I)) {
        r.ap = ap(I);
        r.apFirst = (0, Apply_1.apFirst)(I);
        r.apSecond = (0, Apply_1.apSecond)(I);
    }
    if (isChain(I)) {
        r.chain = chain(I);
        r.chainFirst = (0, Chain_1.chainFirst)(I);
        r.flatten = r.chain(function_1.identity);
    }
    if (isBifunctor(I)) {
        r.bimap = bimap(I);
        r.mapLeft = mapLeft(I);
    }
    if (isExtend(I)) {
        r.extend = extend(I);
        r.duplicate = r.extend(function_1.identity);
    }
    if (isFoldable(I)) {
        r.reduce = reduce(I);
        r.foldMap = foldMap(I);
        r.reduceRight = reduceRight(I);
    }
    if (isFoldableWithIndex(I)) {
        r.reduceWithIndex = reduceWithIndex(I);
        r.foldMapWithIndex = foldMapWithIndex(I);
        r.reduceRightWithIndex = reduceRightWithIndex(I);
    }
    if (isAlt(I)) {
        r.alt = alt(I);
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
pipeable$1.pipeable = pipeable;
/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#pipe) from `function` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
pipeable$1.pipe = function_1.pipe;

var option$1 = {};

var __createBinding$1 = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(option$1, "__esModule", { value: true });
option$1.option = void 0;
var t$1 = __importStar$1(require$$3);
var None = t$1.strict({
    _tag: t$1.literal('None')
}, 'None');
var someLiteral = t$1.literal('Some');
/**
 * @since 0.5.0
 */
function option(codec, name) {
    if (name === void 0) { name = "Option<" + codec.name + ">"; }
    return t$1.union([
        None,
        t$1.strict({
            _tag: someLiteral,
            value: codec
        }, "Some<" + codec.name + ">")
    ], name);
}
option$1.option = option;

var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(optionFromNullable$1, "__esModule", { value: true });
var optionFromNullable_2 = optionFromNullable$1.optionFromNullable = void 0;
/**
 * @since 0.5.0
 */
var pipeable_1 = pipeable$1;
var Either_1 = index.Either;
var O = __importStar(Option);
var t = __importStar(require$$3);
var option_1 = option$1;
/**
 * @since 0.5.0
 */
function optionFromNullable(codec, name) {
    if (name === void 0) { name = "Option<" + codec.name + ">"; }
    return new t.Type(name, option_1.option(codec).is, function (u, c) {
        return u == null
            ? t.success(O.none)
            : pipeable_1.pipe(codec.validate(u, c), Either_1.map(O.some));
    }, function (a) {
        return O.toNullable(pipeable_1.pipe(a, O.map(codec.encode)));
    });
}
optionFromNullable_2 = optionFromNullable$1.optionFromNullable = optionFromNullable;

const WithdrawalDetails = index.lib.type({
    withdrawalId: runtimeCore.WithdrawalId,
    status: TxStatus,
    block: optionFromNullable_2(runtimeCore.BlockHeader),
    payouts: index.lib.array(PayoutHeader),
});

const WithdrawalHeader = index.lib.type({
    withdrawalId: runtimeCore.WithdrawalId,
    status: TxStatus,
    block: optionFromNullable_2(runtimeCore.BlockHeader),
});

exports.Available = Available;
exports.Eq = Eq;
exports.Option = Option;
exports.Ord = Ord;
exports.PayoutHeader = PayoutHeader;
exports.PayoutStatus = PayoutStatus;
exports.Predicate = Predicate;
exports.Semigroup = Semigroup;
exports.TxStatus = TxStatus;
exports.WithdrawalDetails = WithdrawalDetails;
exports.WithdrawalHeader = WithdrawalHeader;
exports.Withdrawn = Withdrawn;
exports.Zero = Zero;
exports.optionFromNullable = optionFromNullable$2;
exports.require$$3 = require$$3;
