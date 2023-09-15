'use strict';

var Either = require('./Either-e3415b14.cjs');

var TaskEither = {};

var Compactable = {};

var Option = {};

var Predicate = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.and = exports.or = exports.not = exports.Contravariant = exports.getMonoidAll = exports.getSemigroupAll = exports.getMonoidAny = exports.getSemigroupAny = exports.URI = exports.contramap = void 0;
	var function_1 = Either._function;
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
	var function_1 = Either._function;
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
	var function_1 = Either._function;
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
	var __createBinding = (Either.commonjsGlobal && Either.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (Either.commonjsGlobal && Either.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Either.commonjsGlobal && Either.commonjsGlobal.__importStar) || function (mod) {
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
	var function_1 = Either._function;
	var _ = __importStar(Either.internal);
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
	var __createBinding = (Either.commonjsGlobal && Either.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (Either.commonjsGlobal && Either.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Either.commonjsGlobal && Either.commonjsGlobal.__importStar) || function (mod) {
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
	var Applicative_1 = Either.Applicative;
	var Apply_1 = Either.Apply;
	var chainable = __importStar(Either.Chain);
	var FromEither_1 = Either.FromEither;
	var function_1 = Either._function;
	var Functor_1 = Either.Functor;
	var _ = __importStar(Either.internal);
	var Predicate_1 = Predicate;
	var Semigroup_1 = Semigroup;
	var Separated_1 = Either.Separated;
	var Witherable_1 = Either.Witherable;
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

var __createBinding$1 = (Either.commonjsGlobal && Either.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
var __setModuleDefault$1 = (Either.commonjsGlobal && Either.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (Either.commonjsGlobal && Either.commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(Compactable, "__esModule", { value: true });
Compactable.getCompactableComposition = Compactable.separate = Compactable.compact = void 0;
var function_1$4 = Either._function;
var Functor_1$2 = Either.Functor;
var Option_1$1 = Option;
var S = __importStar$1(Either.Separated);
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

var EitherT = {};

var __createBinding = (Either.commonjsGlobal && Either.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
var __setModuleDefault = (Either.commonjsGlobal && Either.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (Either.commonjsGlobal && Either.commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(EitherT, "__esModule", { value: true });
EitherT.getEitherM = EitherT.toUnion = EitherT.swap = EitherT.orLeft = EitherT.tapError = EitherT.orElseFirst = EitherT.orElse = EitherT.getOrElse = EitherT.matchE = EitherT.match = EitherT.altValidation = EitherT.mapError = EitherT.mapLeft = EitherT.mapBoth = EitherT.bimap = EitherT.alt = EitherT.flatMap = EitherT.chain = EitherT.ap = EitherT.map = EitherT.chainNullableK = EitherT.fromNullableK = EitherT.fromNullable = EitherT.leftF = EitherT.rightF = EitherT.left = EitherT.right = void 0;
var Apply_1 = Either.Apply;
var E = __importStar(Either.Either);
var function_1$3 = Either._function;
var Functor_1$1 = Either.Functor;
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
var function_1$2 = Either._function;
var Functor_1 = Either.Functor;
var Option_1 = Option;
var Predicate_1 = Predicate;
var Separated_1 = Either.Separated;
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
var Chain_1$1 = Either.Chain;
var function_1$1 = Either._function;
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
var Chain_1 = Either.Chain;
var function_1 = Either._function;
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
	var __createBinding = (Either.commonjsGlobal && Either.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (Either.commonjsGlobal && Either.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Either.commonjsGlobal && Either.commonjsGlobal.__importStar) || function (mod) {
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
	var Applicative_1 = Either.Applicative;
	var Apply_1 = Either.Apply;
	var chainable = __importStar(Either.Chain);
	var FromIO_1 = FromIO;
	var function_1 = Either._function;
	var Functor_1 = Either.Functor;
	var _ = __importStar(Either.internal);
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
	var __createBinding = (Either.commonjsGlobal && Either.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (Either.commonjsGlobal && Either.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (Either.commonjsGlobal && Either.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (Either.commonjsGlobal && Either.commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (Either.commonjsGlobal && Either.commonjsGlobal.__generator) || function (thisArg, body) {
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
	var Applicative_1 = Either.Applicative;
	var Apply_1 = Either.Apply;
	var chainable = __importStar(Either.Chain);
	var Compactable_1 = Compactable;
	var E = __importStar(Either.Either);
	var ET = __importStar(EitherT);
	var Filterable_1 = Filterable;
	var FromEither_1 = Either.FromEither;
	var FromIO_1 = FromIO;
	var FromTask_1 = FromTask;
	var function_1 = Either._function;
	var Functor_1 = Either.Functor;
	var _ = __importStar(Either.internal);
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

exports.TaskEither = TaskEither;
