import { o as flow, p as pipe, q as head$4, t as tail$3, r as min$2, u as max$2, v as isNonEmpty$4, x as fromReadonlyNonEmptyArray$1, y as getMonoid$2, s as some$3, n as none, h as has$1, z as dual, B as identity, f as flap$2, D as apFirst$2, G as apSecond$2, H as chainFirst$2, I as emptyRecord, J as bindTo$2, K as let_$2, L as bind$2, M as apS$2, N as isSome, P as fromCompare, Q as isLeft, e as isNone, R as separated, T as guard$1, w as witherDefault, j as wiltDefault, U as filterE$1, V as fromEitherK$1, X as unsafeCoerce, Y as semigroupAll, Z as semigroupAny, $ as SK, a0 as constant, a1 as some$4, a2 as chain$2, a3 as pipe$1, a4 as getOrElse, a5 as fold$1, a6 as fromNullable$1, a7 as fromPredicate$2, a8 as map$4, a9 as isNone$1, aa as right$1, ab as fromEither$1, ac as left$1, ad as isLeft$1, ae as none$1, af as getFirstMonoid, ag as option, ah as Type, ai as map$5, m as lib, _ as _function } from './index-bba2aa9d.js';

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

var __spreadArray$3 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
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
var isNonEmpty$3 = isNonEmpty$4;
/**
 * @internal
 */
var isOutOfBound$3 = function (i, as) { return i < 0 || i >= as.length; };
/**
 * @internal
 */
var prependW$2 = function (head) {
    return function (tail) {
        return __spreadArray$3([head], tail, true);
    };
};
/**
 * @internal
 */
var prepend$2 = prependW$2;
/**
 * @internal
 */
var unsafeUpdateAt$4 = function (i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = fromReadonlyNonEmptyArray$1(as);
        xs[i] = a;
        return xs;
    }
};
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
var prependAll$2 = function (middle) {
    return function (as) {
        var out = [middle, as[0]];
        for (var i = 1; i < as.length; i++) {
            out.push(middle, as[i]);
        }
        return out;
    };
};
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
var intersperse$2 = function (middle) {
    return function (as) {
        var rest = tail$2(as);
        return isNonEmpty$3(rest) ? pipe(rest, prependAll$2(middle), prepend$2(head$3(as))) : as;
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduce$4 = function (b, f) {
    return reduceWithIndex$4(b, function (_, b, a) { return f(b, a); });
};
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 2.5.0
 */
var foldMap$4 = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
        };
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRight$4 = function (b, f) {
    return reduceRightWithIndex$4(b, function (_, b, a) { return f(b, a); });
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceWithIndex$4 = function (b, f) {
    return function (as) {
        return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
    };
};
/**
 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
 *
 * @category folding
 * @since 2.5.0
 */
var foldMapWithIndex$4 = function (S) {
    return function (f) {
        return function (as) {
            return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0]));
        };
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRightWithIndex$4 = function (b, f) {
    return function (as) {
        return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
    };
};
/**
 * @category Comonad
 * @since 2.6.3
 */
var extract$1 = head$4;
/**
 * @category instances
 * @since 2.5.0
 */
var getShow$4 = function (S) { return ({
    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
}); };
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
var getEq$4 = function (E) {
    return fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.5.0
 */
var head$3 = extract$1;
/**
 * @since 2.5.0
 */
var tail$2 = tail$3;
/**
 * @since 2.5.0
 */
var last$3 = function (as) { return as[as.length - 1]; };
/**
 * @since 2.5.0
 */
var min$1 = function (O) {
    var S = min$2(O);
    return function (as) { return as.reduce(S.concat); };
};
/**
 * @since 2.5.0
 */
var max$1 = function (O) {
    var S = max$2(O);
    return function (as) { return as.reduce(S.concat); };
};
/**
 * @since 2.10.0
 */
var concatAll$1 = function (S) {
    return function (as) {
        return as.reduce(S.concat);
    };
};
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
var intercalate$3 = function (S) {
    var concatAllS = concatAll$1(S);
    return function (middle) { return flow(intersperse$2(middle), concatAllS); };
};

var __spreadArray$2 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// -------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------
/**
 * @internal
 */
var isNonEmpty$2 = function (as) { return as.length > 0; };
/**
 * @internal
 */
var isOutOfBound$2 = function (i, as) { return i < 0 || i >= as.length; };
/**
 * @internal
 */
var prependW$1 = function (head) {
    return function (tail) {
        return __spreadArray$2([head], tail, true);
    };
};
/**
 * @internal
 */
var prepend$1 = prependW$1;
/**
 * @internal
 */
var appendW$1 = function (end) {
    return function (init) {
        return __spreadArray$2(__spreadArray$2([], init, true), [end], false);
    };
};
/**
 * @internal
 */
var append$1 = appendW$1;
/**
 * @internal
 */
var unsafeInsertAt$1 = function (i, a, as) {
    if (isNonEmpty$2(as)) {
        var xs = fromReadonlyNonEmptyArray(as);
        xs.splice(i, 0, a);
        return xs;
    }
    return [a];
};
/**
 * @internal
 */
var unsafeUpdateAt$3 = function (i, a, as) {
    var xs = fromReadonlyNonEmptyArray(as);
    xs[i] = a;
    return xs;
};
/**
 * Remove duplicates from a `NonEmptyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 2.11.0
 */
var uniq$1 = function (E) {
    return function (as) {
        if (as.length === 1) {
            return copy$1(as);
        }
        var out = [head$2(as)];
        var rest = tail$1(as);
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
/**
 * Sort the elements of a `NonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import * as NEA from 'fp-ts/NonEmptyArray'
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
 * const sortByNameByAge = NEA.sortBy([byName, byAge])
 *
 * const persons: NEA.NonEmptyArray<Person> = [
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
var sortBy$1 = function (ords) {
    if (isNonEmpty$2(ords)) {
        var M = getMonoid$2();
        return sort$1(ords.reduce(M.concat, M.empty));
    }
    return copy$1;
};
/**
 * @since 2.11.0
 */
var union$2 = function (E) {
    var uniqE = uniq$1(E);
    return function (second) { return function (first) { return uniqE(pipe(first, concat$1(second))); }; };
};
/**
 * Rotate a `NonEmptyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @since 2.11.0
 */
var rotate$1 = function (n) {
    return function (as) {
        var len = as.length;
        var m = Math.round(n) % len;
        if (isOutOfBound$2(Math.abs(m), as) || m === 0) {
            return copy$1(as);
        }
        if (m < 0) {
            var _a = splitAt$1(-m)(as), f = _a[0], s = _a[1];
            return pipe(s, concat$1(f));
        }
        else {
            return rotate$1(m - len)(as);
        }
    };
};
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * @category conversions
 * @since 2.10.0
 */
var fromReadonlyNonEmptyArray = fromReadonlyNonEmptyArray$1;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category conversions
 * @since 2.0.0
 */
var fromArray = function (as) { return (isNonEmpty$2(as) ? some$3(as) : none); };
/**
 * Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { makeBy } from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.11.0
 */
var makeBy$1 = function (f) {
    return function (n) {
        var j = Math.max(0, Math.floor(n));
        var out = [f(0)];
        for (var i = 1; i < j; i++) {
            out.push(f(i));
        }
        return out;
    };
};
/**
 * Create a `NonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a natural number.
 *
 * @example
 * import { replicate } from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.11.0
 */
var replicate$1 = function (a) { return makeBy$1(function () { return a; }); };
/**
 * Create a `NonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @example
 * import { range } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.11.0
 */
var range$1 = function (start, end) {
    return start <= end ? makeBy$1(function (i) { return start + i; })(end - start + 1) : [start];
};
/**
 * Return the tuple of the `head` and the `tail`.
 *
 * @example
 * import { unprepend } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unprepend([1, 2, 3]), [1, [2, 3]])
 *
 * @since 2.9.0
 */
var unprepend = function (as) { return [head$2(as), tail$1(as)]; };
/**
 * Return the tuple of the `init` and the `last`.
 *
 * @example
 * import { unappend } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
 *
 * @since 2.9.0
 */
var unappend = function (as) { return [init$1(as), last$2(as)]; };
function concatW$1(second) {
    return function (first) { return first.concat(second); };
}
function concat$1(x, y) {
    return y ? x.concat(y) : function (y) { return y.concat(x); };
}
/**
 * @since 2.0.0
 */
var reverse$2 = function (as) { return __spreadArray$2([last$2(as)], as.slice(0, -1).reverse(), true); };
function group(E) {
    return function (as) {
        var len = as.length;
        if (len === 0) {
            return [];
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
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { groupBy } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
 *   '1': ['a', 'b'],
 *   '2': ['ab']
 * })
 *
 * @since 2.0.0
 */
var groupBy = function (f) {
    return function (as) {
        var out = {};
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            var k = f(a);
            if (has$1.call(out, k)) {
                out[k].push(a);
            }
            else {
                out[k] = [a];
            }
        }
        return out;
    };
};
/**
 * @since 2.0.0
 */
var sort$1 = function (O) {
    return function (as) {
        return as.slice().sort(O.compare);
    };
};
/**
 * @since 2.0.0
 */
var insertAt$2 = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? none : some$3(unsafeInsertAt$1(i, a, as));
    };
};
/**
 * @since 2.0.0
 */
var updateAt$1 = function (i, a) {
    return modifyAt$1(i, function () { return a; });
};
/**
 * @since 2.0.0
 */
var modifyAt$1 = function (i, f) {
    return function (as) {
        return isOutOfBound$2(i, as) ? none : some$3(unsafeUpdateAt$3(i, f(as[i]), as));
    };
};
/**
 * @since 2.0.0
 */
var copy$1 = fromReadonlyNonEmptyArray;
/**
 * @category constructors
 * @since 2.0.0
 */
var of$1 = function (a) { return [a]; };
/**
 * @since 2.5.1
 */
var zipWith$1 = function (as, bs, f) {
    var cs = [f(as[0], bs[0])];
    var len = Math.min(as.length, bs.length);
    for (var i = 1; i < len; i++) {
        cs[i] = f(as[i], bs[i]);
    }
    return cs;
};
function zip$1(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip$1(bs, as); };
    }
    return zipWith$1(as, bs, function (a, b) { return [a, b]; });
}
/**
 * @since 2.5.1
 */
var unzip$1 = function (abs) {
    var fa = [abs[0][0]];
    var fb = [abs[0][1]];
    for (var i = 1; i < abs.length; i++) {
        fa[i] = abs[i][0];
        fb[i] = abs[i][1];
    }
    return [fa, fb];
};
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependAll } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.10.0
 */
var prependAll$1 = function (middle) {
    return function (as) {
        var out = [middle, as[0]];
        for (var i = 1; i < as.length; i++) {
            out.push(middle, as[i]);
        }
        return out;
    };
};
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.9.0
 */
var intersperse$1 = function (middle) {
    return function (as) {
        var rest = tail$1(as);
        return isNonEmpty$2(rest) ? pipe(rest, prependAll$1(middle), prepend$1(head$2(as))) : copy$1(as);
    };
};
/**
 * @category folding
 * @since 2.0.0
 */
var foldMapWithIndex$3 = foldMapWithIndex$4;
/**
 * @category folding
 * @since 2.0.0
 */
var foldMap$3 = foldMap$4;
/**
 * @category sequencing
 * @since 2.10.0
 */
var chainWithIndex$1 = function (f) {
    return function (as) {
        var out = fromReadonlyNonEmptyArray(f(0, head$2(as)));
        for (var i = 1; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
/**
 * @since 2.10.0
 */
var chop$1 = function (f) {
    return function (as) {
        var _a = f(as), b = _a[0], rest = _a[1];
        var out = [b];
        var next = rest;
        while (isNonEmpty$2(next)) {
            var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
            out.push(b_1);
            next = rest_2;
        }
        return out;
    };
};
/**
 * Splits a `NonEmptyArray` into two pieces, the first piece has max `n` elements.
 *
 * @since 2.10.0
 */
var splitAt$1 = function (n) {
    return function (as) {
        var m = Math.max(1, n);
        return m >= as.length ? [copy$1(as), []] : [pipe(as.slice(1, m), prepend$1(head$2(as))), as.slice(m)];
    };
};
/**
 * @since 2.10.0
 */
var chunksOf$1 = function (n) { return chop$1(splitAt$1(n)); };
/* istanbul ignore next */
var _map$3 = function (fa, f) { return pipe(fa, map$3(f)); };
/* istanbul ignore next */
var _mapWithIndex$2 = function (fa, f) { return pipe(fa, mapWithIndex$2(f)); };
/* istanbul ignore next */
var _ap$1 = function (fab, fa) { return pipe(fab, ap$1(fa)); };
/* istanbul ignore next */
var _extend$1 = function (wa, f) { return pipe(wa, extend$1(f)); };
/* istanbul ignore next */
var _reduce$2 = function (fa, b, f) { return pipe(fa, reduce$3(b, f)); };
/* istanbul ignore next */
var _foldMap$2 = function (M) {
    var foldMapM = foldMap$3(M);
    return function (fa, f) { return pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight$2 = function (fa, b, f) { return pipe(fa, reduceRight$3(b, f)); };
/* istanbul ignore next */
var _traverse$2 = function (F) {
    var traverseF = traverse$3(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _alt$1 = function (fa, that) { return pipe(fa, alt$1(that)); };
/* istanbul ignore next */
var _reduceWithIndex$2 = function (fa, b, f) {
    return pipe(fa, reduceWithIndex$3(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex$2 = function (M) {
    var foldMapWithIndexM = foldMapWithIndex$3(M);
    return function (fa, f) { return pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex$2 = function (fa, b, f) {
    return pipe(fa, reduceRightWithIndex$3(b, f));
};
/* istanbul ignore next */
var _traverseWithIndex$2 = function (F) {
    var traverseWithIndexF = traverseWithIndex$2(F);
    return function (ta, f) { return pipe(ta, traverseWithIndexF(f)); };
};
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as NEA from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3] as NEA.NonEmptyArray<number>,
 *     NEA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category error handling
 * @since 2.9.0
 */
var altW$1 = function (that) {
    return function (as) {
        return pipe(as, concatW$1(that()));
    };
};
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `NonEmptyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as NEA from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     NEA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category error handling
 * @since 2.6.2
 */
var alt$1 = altW$1;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @since 2.0.0
 */
var ap$1 = function (as) {
    return flatMap$1(function (f) { return pipe(as, map$3(f)); });
};
/**
 * @example
 * import * as NEA from 'fp-ts/NonEmptyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     NEA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 *
 * @category sequencing
 * @since 2.14.0
 */
var flatMap$1 = /*#__PURE__*/ dual(2, function (ma, f) {
    return pipe(ma, chainWithIndex$1(function (i, a) { return f(a, i); }));
});
/**
 * @since 2.0.0
 */
var extend$1 = function (f) {
    return function (as) {
        var next = tail$1(as);
        var out = [f(as)];
        while (isNonEmpty$2(next)) {
            out.push(f(next));
            next = tail$1(next);
        }
        return out;
    };
};
/**
 * @since 2.5.0
 */
var duplicate$1 = /*#__PURE__*/ extend$1(identity);
/**
 * @category sequencing
 * @since 2.5.0
 */
var flatten$1 = /*#__PURE__*/ flatMap$1(identity);
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
var map$3 = function (f) { return mapWithIndex$2(function (_, a) { return f(a); }); };
/**
 * @category mapping
 * @since 2.0.0
 */
var mapWithIndex$2 = function (f) {
    return function (as) {
        var out = [f(0, head$2(as))];
        for (var i = 1; i < as.length; i++) {
            out.push(f(i, as[i]));
        }
        return out;
    };
};
/**
 * @category folding
 * @since 2.0.0
 */
var reduce$3 = reduce$4;
/**
 * @category folding
 * @since 2.0.0
 */
var reduceWithIndex$3 = reduceWithIndex$4;
/**
 * @category folding
 * @since 2.0.0
 */
var reduceRight$3 = reduceRight$4;
/**
 * @category folding
 * @since 2.0.0
 */
var reduceRightWithIndex$3 = reduceRightWithIndex$4;
/**
 * @category traversing
 * @since 2.6.3
 */
var traverse$3 = function (F) {
    var traverseWithIndexF = traverseWithIndex$2(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
/**
 * @category traversing
 * @since 2.6.3
 */
var sequence$2 = function (F) { return traverseWithIndex$2(F)(function (_, a) { return a; }); };
/**
 * @category sequencing
 * @since 2.6.3
 */
var traverseWithIndex$2 = function (F) {
    return function (f) {
        return function (as) {
            var out = F.map(f(0, head$2(as)), of$1);
            for (var i = 1; i < as.length; i++) {
                out = F.ap(F.map(out, function (bs) { return function (b) { return pipe(bs, append$1(b)); }; }), f(i, as[i]));
            }
            return out;
        };
    };
};
/**
 * @since 2.7.0
 */
var extract = head$3;
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI$3 = 'NonEmptyArray';
/**
 * @category instances
 * @since 2.0.0
 */
var getShow$3 = getShow$4;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
var getSemigroup$1 = function () { return ({
    concat: concat$1
}); };
/**
 * @example
 * import { getEq } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
 *
 * @category instances
 * @since 2.0.0
 */
var getEq$3 = getEq$4;
/**
 * @since 2.11.0
 */
var getUnionSemigroup$1 = function (E) {
    var unionE = union$2(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Functor$1 = {
    URI: URI$3,
    map: _map$3
};
/**
 * @category mapping
 * @since 2.10.0
 */
var flap$1 = /*#__PURE__*/ flap$2(Functor$1);
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed$1 = {
    URI: URI$3,
    of: of$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex$1 = {
    URI: URI$3,
    map: _map$3,
    mapWithIndex: _mapWithIndex$2
};
/**
 * @category instances
 * @since 2.10.0
 */
var Apply$1 = {
    URI: URI$3,
    map: _map$3,
    ap: _ap$1
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.5.0
 */
var apFirst$1 = /*#__PURE__*/ apFirst$2(Apply$1);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.5.0
 */
var apSecond$1 = /*#__PURE__*/ apSecond$2(Apply$1);
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative$1 = {
    URI: URI$3,
    map: _map$3,
    ap: _ap$1,
    of: of$1
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain$1 = {
    URI: URI$3,
    map: _map$3,
    ap: _ap$1,
    chain: flatMap$1
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.5.0
 */
var chainFirst$1 = 
/*#__PURE__*/ chainFirst$2(Chain$1);
/**
 * @category instances
 * @since 2.7.0
 */
var Monad$1 = {
    URI: URI$3,
    map: _map$3,
    ap: _ap$1,
    of: of$1,
    chain: flatMap$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable$1 = {
    URI: URI$3,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2
};
/**
 * @category instances
 * @since 2.7.0
 */
var FoldableWithIndex$1 = {
    URI: URI$3,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    reduceWithIndex: _reduceWithIndex$2,
    foldMapWithIndex: _foldMapWithIndex$2,
    reduceRightWithIndex: _reduceRightWithIndex$2
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable$1 = {
    URI: URI$3,
    map: _map$3,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    traverse: _traverse$2,
    sequence: sequence$2
};
/**
 * @category instances
 * @since 2.7.0
 */
var TraversableWithIndex$1 = {
    URI: URI$3,
    map: _map$3,
    mapWithIndex: _mapWithIndex$2,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    traverse: _traverse$2,
    sequence: sequence$2,
    reduceWithIndex: _reduceWithIndex$2,
    foldMapWithIndex: _foldMapWithIndex$2,
    reduceRightWithIndex: _reduceRightWithIndex$2,
    traverseWithIndex: _traverseWithIndex$2
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt$1 = {
    URI: URI$3,
    map: _map$3,
    alt: _alt$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Comonad = {
    URI: URI$3,
    map: _map$3,
    extend: _extend$1,
    extract: extract
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
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.0.0
 */
var head$2 = head$3;
/**
 * @since 2.0.0
 */
var tail$1 = function (as) { return as.slice(1); };
/**
 * @since 2.0.0
 */
var last$2 = last$3;
/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
var init$1 = function (as) { return as.slice(0, -1); };
/**
 * @since 2.0.0
 */
var min = min$1;
/**
 * @since 2.0.0
 */
var max = max$1;
/**
 * @since 2.10.0
 */
var concatAll = function (S) {
    return function (as) {
        return as.reduce(S.concat);
    };
};
/**
 * Break an `Array` into its first element and remaining elements.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchLeft$1 = function (f) {
    return function (as) {
        return f(head$2(as), tail$1(as));
    };
};
/**
 * Break an `Array` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchRight$1 = function (f) {
    return function (as) {
        return f(init$1(as), last$2(as));
    };
};
/**
 * Apply a function to the head, creating a new `NonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyHead = function (f) {
    return function (as) {
        return __spreadArray$2([f(head$2(as))], tail$1(as), true);
    };
};
/**
 * Change the head, creating a new `NonEmptyArray`.
 *
 * @since 2.11.0
 */
var updateHead = function (a) { return modifyHead(function () { return a; }); };
/**
 * Apply a function to the last element, creating a new `NonEmptyArray`.
 *
 * @since 2.11.0
 */
var modifyLast = function (f) {
    return function (as) {
        return pipe(init$1(as), append$1(f(last$2(as))));
    };
};
/**
 * Change the last element, creating a new `NonEmptyArray`.
 *
 * @since 2.11.0
 */
var updateLast = function (a) { return modifyLast(function () { return a; }); };
/**
 * Places an element in between members of a `NonEmptyArray`, then folds the results using the provided `Semigroup`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate$2 = intercalate$3;
// -------------------------------------------------------------------------------------
// legacy
// -------------------------------------------------------------------------------------
/**
 * Alias of `flatMap`.
 *
 * @category legacy
 * @since 2.0.0
 */
var chain$1 = flatMap$1;
function groupSort(O) {
    var sortO = sort$1(O);
    var groupO = group(O);
    return function (as) { return (isNonEmpty$2(as) ? groupO(sortO(as)) : []); };
}
function filter$4(predicate) {
    return filterWithIndex$2(function (_, a) { return predicate(a); });
}
/**
 * Use [`filterWithIndex`](./Array.ts.html#filterwithindex) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var filterWithIndex$2 = function (predicate) {
    return function (as) {
        return fromArray(as.filter(function (a, i) { return predicate(i, a); }));
    };
};
/**
 * Use [`unprepend`](#unprepend) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
var uncons = unprepend;
/**
 * Use [`unappend`](#unappend) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
var unsnoc = unappend;
function cons$1(head, tail) {
    return tail === undefined ? prepend$1(head) : pipe(tail, prepend$1(head));
}
/**
 * Use [`append`](./Array.ts.html#append) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var snoc$1 = function (init, end) { return pipe(init, append$1(end)); };
/**
 * Use [`prependAll`](#prependall) instead.
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
var prependToAll$1 = prependAll$1;
/**
 * Use [`concatAll`](#concatall) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var fold = concatAll$1;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `NEA.Functor` instead of `NEA.nonEmptyArray`
 * (where `NEA` is from `import NEA from 'fp-ts/NonEmptyArray'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var nonEmptyArray = {
    URI: URI$3,
    of: of$1,
    map: _map$3,
    mapWithIndex: _mapWithIndex$2,
    ap: _ap$1,
    chain: flatMap$1,
    extend: _extend$1,
    extract: extract,
    reduce: _reduce$2,
    foldMap: _foldMap$2,
    reduceRight: _reduceRight$2,
    traverse: _traverse$2,
    sequence: sequence$2,
    reduceWithIndex: _reduceWithIndex$2,
    foldMapWithIndex: _foldMapWithIndex$2,
    reduceRightWithIndex: _reduceRightWithIndex$2,
    traverseWithIndex: _traverseWithIndex$2,
    alt: _alt$1
};

var NonEmptyArray = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Alt: Alt$1,
    Applicative: Applicative$1,
    Apply: Apply$1,
    Chain: Chain$1,
    Comonad: Comonad,
    Do: Do$1,
    Foldable: Foldable$1,
    FoldableWithIndex: FoldableWithIndex$1,
    Functor: Functor$1,
    FunctorWithIndex: FunctorWithIndex$1,
    Monad: Monad$1,
    Pointed: Pointed$1,
    Traversable: Traversable$1,
    TraversableWithIndex: TraversableWithIndex$1,
    URI: URI$3,
    alt: alt$1,
    altW: altW$1,
    ap: ap$1,
    apFirst: apFirst$1,
    apS: apS$1,
    apSecond: apSecond$1,
    append: append$1,
    appendW: appendW$1,
    bind: bind$1,
    bindTo: bindTo$1,
    chain: chain$1,
    chainFirst: chainFirst$1,
    chainWithIndex: chainWithIndex$1,
    chop: chop$1,
    chunksOf: chunksOf$1,
    concat: concat$1,
    concatAll: concatAll,
    concatW: concatW$1,
    cons: cons$1,
    copy: copy$1,
    duplicate: duplicate$1,
    extend: extend$1,
    extract: extract,
    filter: filter$4,
    filterWithIndex: filterWithIndex$2,
    flap: flap$1,
    flatMap: flatMap$1,
    flatten: flatten$1,
    fold: fold,
    foldMap: foldMap$3,
    foldMapWithIndex: foldMapWithIndex$3,
    fromArray: fromArray,
    fromReadonlyNonEmptyArray: fromReadonlyNonEmptyArray,
    getEq: getEq$3,
    getSemigroup: getSemigroup$1,
    getShow: getShow$3,
    getUnionSemigroup: getUnionSemigroup$1,
    group: group,
    groupBy: groupBy,
    groupSort: groupSort,
    head: head$2,
    init: init$1,
    insertAt: insertAt$2,
    intercalate: intercalate$2,
    intersperse: intersperse$1,
    isNonEmpty: isNonEmpty$2,
    isOutOfBound: isOutOfBound$2,
    last: last$2,
    let: let_$1,
    makeBy: makeBy$1,
    map: map$3,
    mapWithIndex: mapWithIndex$2,
    matchLeft: matchLeft$1,
    matchRight: matchRight$1,
    max: max,
    min: min,
    modifyAt: modifyAt$1,
    modifyHead: modifyHead,
    modifyLast: modifyLast,
    nonEmptyArray: nonEmptyArray,
    of: of$1,
    prepend: prepend$1,
    prependAll: prependAll$1,
    prependToAll: prependToAll$1,
    prependW: prependW$1,
    range: range$1,
    reduce: reduce$3,
    reduceRight: reduceRight$3,
    reduceRightWithIndex: reduceRightWithIndex$3,
    reduceWithIndex: reduceWithIndex$3,
    replicate: replicate$1,
    reverse: reverse$2,
    rotate: rotate$1,
    sequence: sequence$2,
    snoc: snoc$1,
    sort: sort$1,
    sortBy: sortBy$1,
    splitAt: splitAt$1,
    tail: tail$1,
    traverse: traverse$3,
    traverseWithIndex: traverseWithIndex$2,
    unappend: unappend,
    uncons: uncons,
    union: union$2,
    uniq: uniq$1,
    unprepend: unprepend,
    unsafeInsertAt: unsafeInsertAt$1,
    unsafeUpdateAt: unsafeUpdateAt$3,
    unsnoc: unsnoc,
    unzip: unzip$1,
    updateAt: updateAt$1,
    updateHead: updateHead,
    updateLast: updateLast,
    zip: zip$1,
    zipWith: zipWith$1
});

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * @category refinements
 * @since 2.11.0
 */
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var Eq$1 = {
    equals: function (first, second) { return first === second; }
};
/**
 * @category instances
 * @since 2.10.0
 */
var Ord$1 = {
    equals: Eq$1.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
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
/**
 * Test whether a `ReadonlyArray` is non empty.
 *
 * @category refinements
 * @since 2.5.0
 */
var isNonEmpty$1 = isNonEmpty$3;
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchW$1 = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty$1(as) ? onNonEmpty(as) : onEmpty();
    };
};
/**
 * @category pattern matching
 * @since 2.11.0
 */
var match$1 = matchW$1;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
var isOutOfBound$1 = isOutOfBound$3;
function lookup$2(i, as) {
    return as === undefined ? function (as) { return lookup$2(i, as); } : isOutOfBound$1(i, as) ? none : some$3(as[i]);
}
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
var head$1 = function (as) { return (isNonEmpty$1(as) ? some$3(head$3(as)) : none); };
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
var last$1 = function (as) { return (isNonEmpty$1(as) ? some$3(last$3(as)) : none); };
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
var findIndex$1 = function (predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$3(i);
            }
        }
        return none;
    };
};
function findFirst$2(predicate) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            if (predicate(as[i])) {
                return some$3(as[i]);
            }
        }
        return none;
    };
}
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
var findFirstMap$1 = function (f) {
    return function (as) {
        for (var i = 0; i < as.length; i++) {
            var out = f(as[i]);
            if (isSome(out)) {
                return out;
            }
        }
        return none;
    };
};
function findLast$1(predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return some$3(as[i]);
            }
        }
        return none;
    };
}
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
var findLastMap$1 = function (f) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            var out = f(as[i]);
            if (isSome(out)) {
                return out;
            }
        }
        return none;
    };
};
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   readonly a: number
 *   readonly b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
var findLastIndex$1 = function (predicate) {
    return function (as) {
        for (var i = as.length - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return some$3(i);
            }
        }
        return none;
    };
};
function elem$2(E) {
    return function (a, as) {
        if (as === undefined) {
            var elemE_1 = elem$2(E);
            return function (as) { return elemE_1(a, as); };
        }
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        for (; i < as.length; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
/** @internal */
var _chainRecDepthFirst$1 = function (a, f) { return pipe(a, chainRecDepthFirst$1(f)); };
/** @internal */
var _chainRecBreadthFirst$1 = function (a, f) { return pipe(a, chainRecBreadthFirst$1(f)); };
/**
 * @category folding
 * @since 2.5.0
 */
var foldMapWithIndex$2 = function (M) {
    return function (f) {
        return function (fa) {
            return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty);
        };
    };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduce$2 = function (b, f) {
    return reduceWithIndex$2(b, function (_, b, a) { return f(b, a); });
};
/**
 * @category folding
 * @since 2.5.0
 */
var foldMap$2 = function (M) {
    var foldMapWithIndexM = foldMapWithIndex$2(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceWithIndex$2 = function (b, f) { return function (fa) {
    var len = fa.length;
    var out = b;
    for (var i = 0; i < len; i++) {
        out = f(i, out, fa[i]);
    }
    return out;
}; };
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRight$2 = function (b, f) {
    return reduceRightWithIndex$2(b, function (_, a, b) { return f(a, b); });
};
/**
 * @category folding
 * @since 2.5.0
 */
var reduceRightWithIndex$2 = function (b, f) { return function (fa) {
    return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
}; };
/**
 * @category instances
 * @since 2.5.0
 */
var getShow$2 = function (S) { return ({
    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
}); };
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
var getEq$2 = function (E) {
    return fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
};
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
var getOrd$1 = function (O) {
    return fromCompare(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return Ord$1.compare(aLen, bLen);
    });
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecDepthFirst$1 = function (f) {
    return function (a) {
        var todo = __spreadArray$1([], f(a), true);
        var out = [];
        while (todo.length > 0) {
            var e = todo.shift();
            if (isLeft(e)) {
                todo.unshift.apply(todo, f(e.left));
            }
            else {
                out.push(e.right);
            }
        }
        return out;
    };
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecBreadthFirst$1 = function (f) {
    return function (a) {
        var initial = f(a);
        var todo = [];
        var out = [];
        function go(e) {
            if (isLeft(e)) {
                f(e.left).forEach(function (v) { return todo.push(v); });
            }
            else {
                out.push(e.right);
            }
        }
        for (var _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
            var e = initial_1[_i];
            go(e);
        }
        while (todo.length > 0) {
            go(todo.shift());
        }
        return out;
    };
};
/**
 * @category unsafe
 * @since 2.5.0
 */
var unsafeUpdateAt$2 = function (i, a, as) {
    return isNonEmpty$1(as) ? unsafeUpdateAt$4(i, a, as) : as;
};
function every$2(predicate) {
    return function (as) { return as.every(predicate); };
}
/**
 * Places an element in between members of a `ReadonlyArray`, then folds the results using the provided `Monoid`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate$1 = function (M) {
    var intercalateM = intercalate$3(M);
    return function (middle) { return match$1(function () { return M.empty; }, intercalateM(middle)); };
};

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/Array'
 *
 * assert.strictEqual(isEmpty([]), true)
 * assert.strictEqual(isEmpty(['a']), false)
 *
 * @category refinements
 * @since 2.0.0
 */
var isEmpty$1 = function (as) { return as.length === 0; };
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
 *
 * @example
 * import { isNonEmpty } from 'fp-ts/Array'
 *
 * assert.strictEqual(isNonEmpty([]), false)
 * assert.strictEqual(isNonEmpty(['a']), true)
 *
 * @category refinements
 * @since 2.0.0
 */
var isNonEmpty = isNonEmpty$2;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Prepend an element to the front of a `Array`, creating a new `NonEmptyArray`.
 *
 * @example
 * import { prepend } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
 *
 * @since 2.10.0
 */
var prepend = prepend$1;
/**
 * Less strict version of [`prepend`](#prepend).
 *
 * @example
 * import { prependW } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([2, 3, 4], prependW("a")), ["a", 2, 3, 4]);
 *
 * @since 2.11.0
 */
var prependW = prependW$1;
/**
 * Append an element to the end of a `Array`, creating a new `NonEmptyArray`.
 *
 * @example
 * import { append } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @since 2.10.0
 */
var append = append$1;
/**
 * Less strict version of [`append`](#append).
 *
 * @example
 * import { appendW } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], appendW("d")), [1, 2, 3, "d"]);
 *
 * @since 2.11.0
 */
var appendW = appendW$1;
/**
 * Return a `Array` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from 'fp-ts/Array'
 *
 * const double = (i: number): number => i * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 * assert.deepStrictEqual(makeBy(-3, double), [])
 * assert.deepStrictEqual(makeBy(4.32164, double), [0, 2, 4, 6])
 *
 * @category constructors
 * @since 2.0.0
 */
var makeBy = function (n, f) { return (n <= 0 ? [] : makeBy$1(f)(n)); };
/**
 * Create a `Array` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 * assert.deepStrictEqual(replicate(-3, 'a'), [])
 * assert.deepStrictEqual(replicate(2.985647, 'a'), ['a', 'a'])
 *
 * @category constructors
 * @since 2.0.0
 */
var replicate = function (n, a) { return makeBy(n, function () { return a; }); };
function fromPredicate$1(predicate) {
    return function (a) { return (predicate(a) ? [a] : []); };
}
// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------
/**
 * Create an array from an `Option`. The resulting array will contain the content of the
 * `Option` if it is `Some` and it will be empty if the `Option` is `None`.
 *
 * @example
 * import { fromOption } from 'fp-ts/Array'
 * import { option } from "fp-ts";
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(option.some("a"), fromOption),["a"])
 * assert.deepStrictEqual(pipe(option.none, fromOption),[])
 *
 * @category conversions
 * @since 2.11.0
 */
var fromOption = function (ma) { return (isNone(ma) ? [] : [ma.value]); };
/**
 * Create an array from an `Either`. The resulting array will contain the content of the
 * `Either` if it is `Right` and it will be empty if the `Either` is `Left`.
 *
 * @example
 * import { fromEither } from 'fp-ts/Array'
 * import { either } from "fp-ts";
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(either.right("r"), fromEither), ["r"]);
 * assert.deepStrictEqual(pipe(either.left("l"), fromEither), []);
 *
 * @category conversions
 * @since 2.11.0
 */
var fromEither = function (e) { return (isLeft(e) ? [] : [e.right]); };
/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @example
 * import { matchW } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const matcherW = matchW(
 *   () => "No elements",
 *   (as) => as.length
 * );
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], matcherW), 4);
 * assert.deepStrictEqual(pipe([], matcherW), "No elements");
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty(as) ? onNonEmpty(as) : onEmpty();
    };
};
/**
 * Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
 * it passes the array to `onNonEmpty` and returns the result.
 *
 * @example
 * import { match } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const matcher = match(
 *   () => "No elements",
 *   (as) => `Found ${as.length} element(s)`
 * );
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], matcher), "Found 4 element(s)");
 * assert.deepStrictEqual(pipe([], matcher), "No elements");
 *
 * @category pattern matching
 * @since 2.11.0
 */
var match = matchW;
/**
 * Less strict version of [`matchLeft`](#matchleft). It will work when `onEmpty` and
 * `onNonEmpty` have different return types.
 *
 * @example
 * import { matchLeftW } from 'fp-ts/Array'
 *
 * const f = matchLeftW(
 *   () => 0,
 *   (head: string, tail: string[]) => `Found "${head}" followed by ${tail.length} elements`
 * );
 * assert.strictEqual(f(["a", "b", "c"]), 'Found "a" followed by 2 elements');
 * assert.strictEqual(f([]), 0);
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchLeftW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty(as) ? onNonEmpty(head$2(as), tail$1(as)) : onEmpty();
    };
};
/**
 * Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
 * it passes the array to `onNonEmpty` broken into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from 'fp-ts/Array'
 *
 * const len: <A>(as: Array<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchLeft = matchLeftW;
/**
 * Alias of [`matchLeft`](#matchleft).
 *
 * @category pattern matching
 * @since 2.0.0
 */
var foldLeft = matchLeft;
/**
 * Less strict version of [`matchRight`](#matchright). It will work when `onEmpty` and
 * `onNonEmpty` have different return types.
 *
 * @example
 * import { matchRightW } from 'fp-ts/Array'
 *
 * const f = matchRightW(
 *   () => 0,
 *   (head: string[], tail: string) => `Found ${head.length} elements folllowed by "${tail}"`
 * );
 * assert.strictEqual(f(["a", "b", "c"]), 'Found 2 elements folllowed by "c"');
 * assert.strictEqual(f([]), 0);
 *
 * @category pattern matching
 * @since 2.11.0
 */
var matchRightW = function (onEmpty, onNonEmpty) {
    return function (as) {
        return isNonEmpty(as) ? onNonEmpty(init$1(as), last$2(as)) : onEmpty();
    };
};
/**
 * Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
 * it passes the array to `onNonEmpty` broken  into its initial elements and the last element.
 *
 * @example
 * import { matchRight } from 'fp-ts/Array'
 *
 * const len: <A>(as: Array<A>) => number = matchRight(
 *   () => 0,
 *   (head, _) => 1 + len(head)
 * );
 * assert.strictEqual(len([1, 2, 3]), 3);
 *
 * @category pattern matching
 * @since 2.10.0
 */
var matchRight = matchRightW;
/**
 * Alias of [`matchRight`](#matchright).
 *
 * @category pattern matching
 * @since 2.0.0
 */
var foldRight = matchRight;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Same as [`chain`](#chain), but passing also the index to the iterating function.
 *
 * @example
 * import { chainWithIndex, replicate } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (index: number, x: string) => replicate(2, `${x}${index}`);
 * assert.deepStrictEqual(pipe(["a", "b", "c"], chainWithIndex(f)), ["a0", "a0", "b1", "b1", "c2", "c2"]);
 *
 * @category sequencing
 * @since 2.7.0
 */
var chainWithIndex = function (f) {
    return function (as) {
        var out = [];
        for (var i = 0; i < as.length; i++) {
            out.push.apply(out, f(i, as[i]));
        }
        return out;
    };
};
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @example
 * import { scanLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @since 2.0.0
 */
var scanLeft = function (b, f) {
    return function (as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[0] = b;
        for (var i = 0; i < len; i++) {
            out[i + 1] = f(out[i], as[i]);
        }
        return out;
    };
};
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @since 2.0.0
 */
var scanRight = function (b, f) {
    return function (as) {
        var len = as.length;
        var out = new Array(len + 1);
        out[len] = b;
        for (var i = len - 1; i >= 0; i--) {
            out[i] = f(as[i], out[i + 1]);
        }
        return out;
    };
};
/**
 * Calculate the number of elements in a `Array`.
 *
 * @example
 * import { size } from 'fp-ts/Array'
 *
 * assert.strictEqual(size(["a","b","c"]),3)
 *
 * @since 2.10.0
 */
var size$1 = function (as) { return as.length; };
/**
 * Test whether an array contains a particular index
 *
 * @example
 * import { isOutOfBound } from 'fp-ts/Array'
 *
 * assert.strictEqual(isOutOfBound(1,["a","b","c"]),false)
 * assert.strictEqual(isOutOfBound(-1,["a","b","c"]),true)
 * assert.strictEqual(isOutOfBound(3,["a","b","c"]),true)
 *
 * @since 2.0.0
 */
var isOutOfBound = isOutOfBound$2;
// TODO: remove non-curried overloading in v3
/**
 * This function provides a safe way to read a value at a particular index from an array.
 * It returns a `none` if the index is out of bounds, and a `some` of the element if the
 * index is valid.
 *
 * @example
 * import { lookup } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 2.0.0
 */
var lookup$1 = lookup$2;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.0.0
 */
var head = head$1;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.0.0
 */
var last = last$1;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.0.0
 */
var tail = function (as) { return (isNonEmpty(as) ? some$3(tail$1(as)) : none); };
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.0.0
 */
var init = function (as) { return (isNonEmpty(as) ? some$3(init$1(as)) : none); };
/**
 * Keep only a max number of elements from the start of an `Array`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { takeLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3, 4, 5]), [1, 2]);
 * assert.deepStrictEqual(takeLeft(7)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
 * assert.deepStrictEqual(takeLeft(0)([1, 2, 3, 4, 5]), []);
 * assert.deepStrictEqual(takeLeft(-1)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
 *
 * @since 2.0.0
 */
var takeLeft = function (n) {
    return function (as) {
        return isOutOfBound(n, as) ? copy(as) : as.slice(0, n);
    };
};
/**
 * Keep only a max number of elements from the end of an `Array`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { takeRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5]);
 * assert.deepStrictEqual(takeRight(7)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
 * assert.deepStrictEqual(takeRight(0)([1, 2, 3, 4, 5]), []);
 * assert.deepStrictEqual(takeRight(-1)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
 *
 * @since 2.0.0
 */
var takeRight = function (n) {
    return function (as) {
        return isOutOfBound(n, as) ? copy(as) : n === 0 ? [] : as.slice(-n);
    };
};
function takeLeftWhile(predicate) {
    return function (as) {
        var out = [];
        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
            var a = as_1[_i];
            if (!predicate(a)) {
                break;
            }
            out.push(a);
        }
        return out;
    };
}
var spanLeftIndex = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var _a = splitAt(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
        return { init: init, rest: rest };
    };
}
/**
 * Creates a new `Array` which is a copy of the input dropping a max number of elements from the start.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { dropLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3]);
 * assert.deepStrictEqual(dropLeft(5)([1, 2, 3]), []);
 * assert.deepStrictEqual(dropLeft(0)([1, 2, 3]), [1, 2, 3]);
 * assert.deepStrictEqual(dropLeft(-2)([1, 2, 3]), [1, 2, 3]);
 *
 * @since 2.0.0
 */
var dropLeft = function (n) {
    return function (as) {
        return n <= 0 || isEmpty$1(as) ? copy(as) : n >= as.length ? [] : as.slice(n, as.length);
    };
};
/**
 * Creates a new `Array` which is a copy of the input dropping a max number of elements from the end.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { dropRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3]), [1]);
 * assert.deepStrictEqual(dropRight(5)([1, 2, 3]), []);
 * assert.deepStrictEqual(dropRight(0)([1, 2, 3]), [1, 2, 3]);
 * assert.deepStrictEqual(dropRight(-2)([1, 2, 3]), [1, 2, 3]);
 *
 * @since 2.0.0
 */
var dropRight = function (n) {
    return function (as) {
        return n <= 0 || isEmpty$1(as) ? copy(as) : n >= as.length ? [] : as.slice(0, as.length - n);
    };
};
function dropLeftWhile(predicate) {
    return function (as) { return as.slice(spanLeftIndex(as, predicate)); };
}
/**
 * `findIndex` returns an `Option` containing the first index for which a predicate holds.
 * It returns `None` if no element satisfies the predicate.
 * Similar to [`findFirst`](#findFirst) but returning the index instead of the element.
 *
 * @example
 * import { findIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.0.0
 */
var findIndex = findIndex$1;
function findFirst$1(predicate) {
    return findFirst$2(predicate);
}
/**
 * Given a selector function which takes an element and returns an option,
 * this function applies the selector to each element of the array and
 * returns the first `Some` result. Otherwise it returns `None`.
 *
 * @example
 * import { findFirstMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string;
 *   readonly age: number;
 * }
 *
 * const persons: Array<Person> = [
 *   { name: "John", age: 16 },
 *   { name: "Mary", age: 45 },
 *   { name: "Joey", age: 28 },
 * ];
 *
 * const nameOfPersonAbove18 = (p: Person) => (p.age <= 18 ? none : some(p.name));
 * const nameOfPersonAbove70 = (p: Person) => (p.age <= 70 ? none : some(p.name));
 * assert.deepStrictEqual(findFirstMap(nameOfPersonAbove18)(persons), some("Mary"));
 * assert.deepStrictEqual(findFirstMap(nameOfPersonAbove70)(persons), none);
 *
 * @since 2.0.0
 */
var findFirstMap = findFirstMap$1;
function findLast(predicate) {
    return findLast$1(predicate);
}
/**
 * Given a selector function which takes an element and returns an option,
 * this function applies the selector to each element of the array starting from the
 * end and returns the last `Some` result. Otherwise it returns `None`.
 *
 * @example
 * import { findLastMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   readonly name: string;
 *   readonly age: number;
 * }
 *
 * const persons: Array<Person> = [
 *   { name: "John", age: 16 },
 *   { name: "Mary", age: 45 },
 *   { name: "Joey", age: 28 },
 * ];
 *
 * const nameOfPersonAbove18 = (p: Person) => (p.age <= 18 ? none : some(p.name));
 * const nameOfPersonAbove70 = (p: Person) => (p.age <= 70 ? none : some(p.name));
 * assert.deepStrictEqual(findLastMap(nameOfPersonAbove18)(persons), some("Joey"));
 * assert.deepStrictEqual(findLastMap(nameOfPersonAbove70)(persons), none);
 *
 * @since 2.0.0
 */
var findLastMap = findLastMap$1;
/**
 * Returns the index of the last element of the list which matches the predicate.
 * It returns an `Option` containing the index or `None` if not found.
 *
 * @example
 * import { findLastIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   readonly a: number
 *   readonly b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
 *
 * @since 2.0.0
 */
var findLastIndex = findLastIndex$1;
/**
 * This function takes an array and makes a new array containing the same elements.
 *
 * @since 2.0.0
 */
var copy = function (as) { return as.slice(); };
/**
 * Insert an element at the specified index, creating a new array,
 * or returning `None` if the index is out of bounds.
 *
 * @example
 * import { insertAt } from 'fp-ts/Array'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.0.0
 */
var insertAt$1 = function (i, a) {
    return function (as) {
        return i < 0 || i > as.length ? none : some$3(unsafeInsertAt(i, a, as));
    };
};
/**
 * Change the element at the specified index, creating a new array,
 * or returning `None` if the index is out of bounds.
 *
 * @example
 * import { updateAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.0.0
 */
var updateAt = function (i, a) { return modifyAt(i, function () { return a; }); };
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds.
 *
 * @example
 * import { deleteAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.0.0
 */
var deleteAt$1 = function (i) {
    return function (as) {
        return isOutOfBound(i, as) ? none : some$3(unsafeDeleteAt(i, as));
    };
};
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds.
 *
 * @example
 * import { modifyAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.0.0
 */
var modifyAt = function (i, f) {
    return function (as) {
        return isOutOfBound(i, as) ? none : some$3(unsafeUpdateAt$1(i, f(as[i]), as));
    };
};
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 2.0.0
 */
var reverse$1 = function (as) { return (isEmpty$1(as) ? [] : as.slice().reverse()); };
/**
 * Takes an `Array` of `Either` and produces a new `Array` containing
 * the values of all the `Right` elements in the same order.
 *
 * @example
 * import { rights } from 'fp-ts/Array'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 2.0.0
 */
var rights = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
};
/**
 * Takes an `Array` of `Either` and produces a new `Array` containing
 * the values of all the `Left` elements in the same order.
 *
 * @example
 * import { lefts } from 'fp-ts/Array'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.0.0
 */
var lefts = function (as) {
    var r = [];
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
};
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @since 2.0.0
 */
var sort = function (O) {
    return function (as) {
        return as.length <= 1 ? copy(as) : as.slice().sort(O.compare);
    };
};
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @since 2.0.0
 */
var zipWith = function (fa, fb, f) {
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
};
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return zipWith(as, bs, function (a, b) { return [a, b]; });
}
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.0.0
 */
var unzip = function (as) {
    var fa = [];
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
};
/**
 * Creates a new `Array`, prepending an element to every member of the input `Array`.
 *
 * @example
 * import { prependAll } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.10.0
 */
var prependAll = function (middle) {
    var f = prependAll$1(middle);
    return function (as) { return (isNonEmpty(as) ? f(as) : []); };
};
/**
 * Creates a new `Array` placing an element in between members of the input `Array`.
 *
 * @example
 * import { intersperse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 2.9.0
 */
var intersperse = function (middle) {
    var f = intersperse$1(middle);
    return function (as) { return (isNonEmpty(as) ? f(as) : copy(as)); };
};
/**
 * Creates a new `Array` rotating the input `Array` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 2.0.0
 */
var rotate = function (n) {
    var f = rotate$1(n);
    return function (as) { return (isNonEmpty(as) ? f(as) : copy(as)); };
};
// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of an `Array`. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an `Array<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
 *
 * @since 2.0.0
 */
var elem$1 = elem$2;
/**
 * Creates a new `Array` removing duplicate elements, keeping the first occurrence of an element,
 * based on a `Eq<A>`.
 *
 * @example
 * import { uniq } from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 2.0.0
 */
var uniq = function (E) {
    var f = uniq$1(E);
    return function (as) { return (isNonEmpty(as) ? f(as) : copy(as)); };
};
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/Array'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.0.0
 */
var sortBy = function (ords) {
    var f = sortBy$1(ords);
    return function (as) { return (isNonEmpty(as) ? f(as) : copy(as)); };
};
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq } from 'fp-ts/Eq'
 * import * as A from 'fp-ts/Array'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
 *   return A.chop(as => {
 *     const { init, rest } = pipe(as, A.spanLeft((a: A) => S.equals(a, as[0])))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 2.0.0
 */
var chop = function (f) {
    var g = chop$1(f);
    return function (as) { return (isNonEmpty(as) ? g(as) : []); };
};
/**
 * Splits an `Array` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.0.0
 */
var splitAt = function (n) {
    return function (as) {
        return n >= 1 && isNonEmpty(as) ? splitAt$1(n)(as) : isEmpty$1(as) ? [copy(as), []] : [[], copy(as)];
    };
};
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 2.0.0
 */
var chunksOf = function (n) {
    var f = chunksOf$1(n);
    return function (as) { return (isNonEmpty(as) ? f(as) : []); };
};
/**
 * @category lifting
 * @since 2.11.0
 */
var fromOptionK = function (f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromOption(f.apply(void 0, a));
    };
};
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        return isNonEmpty(input)
            ? flatMap(head$2(input), function (a) { return go(pipe(scope, append(a)), tail$1(input)); })
            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
                : [];
    };
    return go([], input);
}
/**
 * @since 2.11.0
 */
var concatW = function (second) {
    return function (first) {
        return isEmpty$1(first) ? copy(second) : isEmpty$1(second) ? copy(first) : first.concat(second);
    };
};
/**
 * @since 2.11.0
 */
var concat = concatW;
function union$1(E) {
    var unionE = union$2(E);
    return function (first, second) {
        if (second === undefined) {
            var unionE_1 = union$1(E);
            return function (second) { return unionE_1(second, first); };
        }
        return isNonEmpty(first) && isNonEmpty(second)
            ? unionE(second)(first)
            : isNonEmpty(first)
                ? copy(first)
                : copy(second);
    };
}
function intersection$1(E) {
    var elemE = elem$1(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var intersectionE_1 = intersection$1(E);
            return function (ys) { return intersectionE_1(ys, xs); };
        }
        return xs.filter(function (a) { return elemE(a, ys); });
    };
}
function difference$1(E) {
    var elemE = elem$1(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var differenceE_1 = difference$1(E);
            return function (ys) { return differenceE_1(ys, xs); };
        }
        return xs.filter(function (a) { return !elemE(a, ys); });
    };
}
var _map$2 = function (fa, f) { return pipe(fa, map$2(f)); };
/* istanbul ignore next */
var _mapWithIndex$1 = function (fa, f) { return pipe(fa, mapWithIndex$1(f)); };
var _ap = function (fab, fa) { return pipe(fab, ap(fa)); };
/* istanbul ignore next */
var _filter$1 = function (fa, predicate) { return pipe(fa, filter$3(predicate)); };
/* istanbul ignore next */
var _filterMap$1 = function (fa, f) { return pipe(fa, filterMap$1(f)); };
/* istanbul ignore next */
var _partition$1 = function (fa, predicate) {
    return pipe(fa, partition$1(predicate));
};
/* istanbul ignore next */
var _partitionMap$1 = function (fa, f) { return pipe(fa, partitionMap$1(f)); };
/* istanbul ignore next */
var _partitionWithIndex$1 = function (fa, predicateWithIndex) { return pipe(fa, partitionWithIndex$1(predicateWithIndex)); };
/* istanbul ignore next */
var _partitionMapWithIndex$1 = function (fa, f) { return pipe(fa, partitionMapWithIndex$1(f)); };
/* istanbul ignore next */
var _alt = function (fa, that) { return pipe(fa, alt(that)); };
var _reduce$1 = function (fa, b, f) { return pipe(fa, reduce$1(b, f)); };
/* istanbul ignore next */
var _foldMap$1 = function (M) {
    var foldMapM = foldMap$1(M);
    return function (fa, f) { return pipe(fa, foldMapM(f)); };
};
/* istanbul ignore next */
var _reduceRight$1 = function (fa, b, f) { return pipe(fa, reduceRight$1(b, f)); };
/* istanbul ignore next */
var _reduceWithIndex$1 = function (fa, b, f) {
    return pipe(fa, reduceWithIndex$1(b, f));
};
/* istanbul ignore next */
var _foldMapWithIndex$1 = function (M) {
    var foldMapWithIndexM = foldMapWithIndex$1(M);
    return function (fa, f) { return pipe(fa, foldMapWithIndexM(f)); };
};
/* istanbul ignore next */
var _reduceRightWithIndex$1 = function (fa, b, f) {
    return pipe(fa, reduceRightWithIndex$1(b, f));
};
/* istanbul ignore next */
var _filterMapWithIndex$1 = function (fa, f) { return pipe(fa, filterMapWithIndex$1(f)); };
/* istanbul ignore next */
var _filterWithIndex$1 = function (fa, predicateWithIndex) { return pipe(fa, filterWithIndex$1(predicateWithIndex)); };
/* istanbul ignore next */
var _extend = function (fa, f) { return pipe(fa, extend(f)); };
/* istanbul ignore next */
var _traverse$1 = function (F) {
    var traverseF = traverse$2(F);
    return function (ta, f) { return pipe(ta, traverseF(f)); };
};
/* istanbul ignore next */
var _traverseWithIndex$1 = function (F) {
    var traverseWithIndexF = traverseWithIndex$1(F);
    return function (ta, f) { return pipe(ta, traverseWithIndexF(f)); };
};
var _chainRecDepthFirst = _chainRecDepthFirst$1;
var _chainRecBreadthFirst = _chainRecBreadthFirst$1;
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
 * Makes an empty `Array`, useful for building a [`Monoid`](#Monoid)
 *
 * @since 2.7.0
 */
var zero = function () { return []; };
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: Array<A>) => Array<B>`.
 * In practice it applies the base function to each element of the array and collects the
 * results in a new array.
 *
 * @example
 * import { map } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (n: number) => n * 2;
 * assert.deepStrictEqual(pipe([1, 2, 3], map(f)), [2, 4, 6]);
 *
 * @category mapping
 * @since 2.0.0
 */
var map$2 = function (f) { return function (fa) { return fa.map(function (a) { return f(a); }); }; };
/**
 * @example
 * import { ap, map, of } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * // a curried function with 3 input parameteres
 * const f = (s1: string) => (n: number) => (s2: string) => s1 + n + s2;
 *
 * // let's use `ap` to iterate `f` over an array for each input parameter
 * assert.deepStrictEqual(pipe(["a", "b"], map(f), ap([1, 2]), ap(["😀", "😫", "😎"])), [
 *   "a1😀", "a1😫", "a1😎",
 *   "a2😀", "a2😫", "a2😎",
 *   "b1😀", "b1😫", "b1😎",
 *   "b2😀", "b2😫", "b2😎",
 * ]);
 *
 * // given Array implements the Applicative interface with the `of` method,
 * // we can write exactly the same thing in a more symmetric way
 * // using `of` on `f` and `ap` on each array in input
 * assert.deepStrictEqual(
 *   pipe(of(f), ap(["a", "b"]), ap([1, 2]), ap(["😀", "😫", "😎"])),
 *   pipe(["a", "b"], map(f), ap([1, 2]), ap(["😀", "😫", "😎"]))
 * );
 *
 * @since 2.0.0
 */
var ap = function (fa) {
    return flatMap(function (f) { return pipe(fa, map$2(f)); });
};
/**
 * Composes computations in sequence, using the return value of one computation to
 * determine the next computation.
 *
 * In other words it takes a function `f` that produces an array from a single element of
 * the base type `A` and returns a new function which applies `f` to each element of the
 * input array (like [`map`](#map)) and, instead of returning an array of arrays, concatenates the
 * results into a single array (like [`flatten`](#flatten)).
 *
 * @example
 * import { flatMap, map, replicate } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (n: number) => replicate(n, `${n}`);
 * assert.deepStrictEqual(pipe([1, 2, 3], map(f)), [["1"], ["2", "2"], ["3", "3", "3"]]);
 * assert.deepStrictEqual(pipe([1, 2, 3], flatMap(f)), ["1", "2", "2", "3", "3", "3"]);
 *
 * @category sequencing
 * @since 2.14.0
 */
var flatMap = /*#__PURE__*/ dual(2, function (ma, f) {
    return pipe(ma, chainWithIndex(function (i, a) { return f(a, i); }));
});
/**
 * Takes an array of arrays of `A` and flattens them into an array of `A`
 * by concatenating the elements of each array in order.
 *
 * @example
 * import { flatten } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(flatten([["a"], ["b", "c"], ["d", "e", "f"]]), ["a", "b", "c", "d", "e", "f"]);
 *
 * @category sequencing
 * @since 2.5.0
 */
var flatten = /*#__PURE__*/ flatMap(identity);
/**
 * Same as [`map`](#map), but the iterating function takes both the index and the value
 * of the element.
 *
 * @example
 * import { mapWithIndex } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (i: number, s: string) => `${s} - ${i}`;
 * assert.deepStrictEqual(pipe(["a", "b", "c"], mapWithIndex(f)), ["a - 0", "b - 1", "c - 2"]);
 *
 * @category mapping
 * @since 2.0.0
 */
var mapWithIndex$1 = function (f) { return function (fa) {
    return fa.map(function (a, i) { return f(i, a); });
}; };
/**
 * Maps an array with an iterating function that takes the index and the value of
 * each element and returns an `Option`. It keeps only the `Some` values discarding
 * the `None`s.
 *
 * Same as [`filterMap`](#filterMap), but with an iterating function which takes also
 * the index as input.
 *
 * @example
 * import { filterMapWithIndex } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 * import { option } from "fp-ts";
 *
 * const f = (i: number, s: string) => (i % 2 === 1 ? option.some(s.toUpperCase()) : option.none);
 * assert.deepStrictEqual(pipe(["a", "no", "neither", "b"], filterMapWithIndex(f)), ["NO", "B"]);
 *
 * @category filtering
 * @since 2.0.0
 */
var filterMapWithIndex$1 = function (f) {
    return function (fa) {
        var out = [];
        for (var i = 0; i < fa.length; i++) {
            var optionB = f(i, fa[i]);
            if (isSome(optionB)) {
                out.push(optionB.value);
            }
        }
        return out;
    };
};
/**
 * Maps an array with an iterating function that returns an `Option`
 * and it keeps only the `Some` values discarding the `None`s.
 *
 * @example
 * import { filterMap } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 * import { option } from "fp-ts";
 *
 * const f = (s: string) => s.length === 1 ? option.some(s.toUpperCase()) : option.none;
 * assert.deepStrictEqual(pipe(["a", "no", "neither", "b"], filterMap(f)), ["A", "B"]);
 *
 * @category filtering
 * @since 2.0.0
 */
var filterMap$1 = function (f) {
    return filterMapWithIndex$1(function (_, a) { return f(a); });
};
/**
 * Compact an array of `Option`s discarding the `None` values and
 * keeping the `Some` values. It returns a new array containing the values of
 * the `Some` options.
 *
 * @example
 * import { compact } from 'fp-ts/Array'
 * import { option } from "fp-ts";
 *
 * assert.deepStrictEqual(compact([option.some("a"), option.none, option.some("b")]), ["a", "b"]);
 *
 * @category filtering
 * @since 2.0.0
 */
var compact$1 = /*#__PURE__*/ filterMap$1(identity);
/**
 * Separate an array of `Either`s into `Left`s and `Right`s, creating two new arrays:
 * one containing all the left values and one containing all the right values.
 *
 * @example
 * import { separate } from 'fp-ts/Array'
 * import { either } from "fp-ts";
 *
 * assert.deepStrictEqual(separate([either.right("r1"), either.left("l1"), either.right("r2")]), {
 *   left: ["l1"],
 *   right: ["r1", "r2"],
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var separate$1 = function (fa) {
    var left = [];
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return separated(left, right);
};
/**
 * Given an iterating function that is a `Predicate` or a `Refinement`,
 * `filter` creates a new `Array` containing the elements of the original
 * `Array` for which the iterating function is `true`.
 *
 * @example
 * import { filter } from 'fp-ts/Array'
 * import { isString } from "fp-ts/lib/string";
 *
 * assert.deepStrictEqual(filter(isString)(["a", 1, {}, "b", 5]), ["a", "b"]);
 * assert.deepStrictEqual(filter((x:number) => x > 0)([-3, 1, -2, 5]), [1, 5]);
 *
 * @category filtering
 * @since 2.0.0
 */
var filter$3 = function (predicate) {
    return function (as) {
        return as.filter(predicate);
    };
};
/**
 * Given an iterating function that is a `Predicate` or a `Refinement`,
 * `partition` creates two new `Array`s: `right` containing the elements of the original
 * `Array` for which the iterating function is `true`, `left` containing the elements
 * for which it is false.
 *
 * @example
 * import { partition } from 'fp-ts/Array'
 * import { isString } from "fp-ts/lib/string";
 *
 * assert.deepStrictEqual(partition(isString)(["a", 1, {}, "b", 5]), { left: [1, {}, 5], right: ["a", "b"] });
 * assert.deepStrictEqual(partition((x: number) => x > 0)([-3, 1, -2, 5]), { left: [-3, -2], right: [1, 5] });
 *
 * @category filtering
 * @since 2.0.0
 */
var partition$1 = function (predicate) {
    return partitionWithIndex$1(function (_, a) { return predicate(a); });
};
/**
 * Same as [`partition`](#partition), but passing also the index to the iterating function.
 *
 * @example
 * import { partitionWithIndex } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(partitionWithIndex((index, x: number) => index < 3 && x > 0)([-2, 5, 6, 7]), {
 *   left: [-2, 7],
 *   right: [5, 6],
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var partitionWithIndex$1 = function (predicateWithIndex) {
    return function (as) {
        var left = [];
        var right = [];
        for (var i = 0; i < as.length; i++) {
            var b = as[i];
            if (predicateWithIndex(i, b)) {
                right.push(b);
            }
            else {
                left.push(b);
            }
        }
        return separated(left, right);
    };
};
/**
 * Given an iterating function that returns an `Either`,
 * `partitionMap` applies the iterating function to each element and it creates two `Array`s:
 * `right` containing the values of `Right` results, `left` containing the values of `Left` results.
 *
 * @example
 * import { partitionMap } from 'fp-ts/Array'
 * import { Either, left, right } from "fp-ts/lib/Either";
 *
 * const upperIfString = <B>(x: B): Either<B, string> =>
 *   typeof x === "string" ? right(x.toUpperCase()) : left(x);
 * assert.deepStrictEqual(partitionMap(upperIfString)([-2, "hello", 6, 7, "world"]), {
 *   left: [-2, 6, 7],
 *   right: [ 'HELLO', 'WORLD' ],
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var partitionMap$1 = function (f) { return partitionMapWithIndex$1(function (_, a) { return f(a); }); };
/**
 * Same as [`partitionMap`](#partitionMap), but passing also the index to the iterating function.
 *
 * @example
 * import { partitionMapWithIndex } from 'fp-ts/Array'
 * import { Either, left, right } from "fp-ts/lib/Either";
 *
 * const upperIfStringBefore3 = <B>(index: number, x: B): Either<B, string> =>
 *   index < 3 && typeof x === "string" ? right(x.toUpperCase()) : left(x);
 * assert.deepStrictEqual(partitionMapWithIndex(upperIfStringBefore3)([-2, "hello", 6, 7, "world"]), {
 *   left: [-2, 6, 7, "world"],
 *   right: ["HELLO"],
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var partitionMapWithIndex$1 = function (f) {
    return function (fa) {
        var left = [];
        var right = [];
        for (var i = 0; i < fa.length; i++) {
            var e = f(i, fa[i]);
            if (e._tag === 'Left') {
                left.push(e.left);
            }
            else {
                right.push(e.right);
            }
        }
        return separated(left, right);
    };
};
/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as A from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     A.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category error handling
 * @since 2.9.0
 */
var altW = function (that) {
    return function (fa) {
        return fa.concat(that());
    };
};
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Array` concatenates the inputs into a single array.
 *
 * @example
 * import * as A from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     A.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
var alt = altW;
/**
 * Same as [`filter`](#filter), but passing also the index to the iterating function.
 *
 * @example
 * import { filterWithIndex } from 'fp-ts/Array';
 *
 * const f = (index: number, x: number) => x > 0 && index <= 2;
 * assert.deepStrictEqual(filterWithIndex(f)([-3, 1, -2, 5]), [1]);
 *
 * @category filtering
 * @since 2.0.0
 */
var filterWithIndex$1 = function (predicateWithIndex) {
    return function (as) {
        return as.filter(function (b, i) { return predicateWithIndex(i, b); });
    };
};
/**
 * Given an iterating function that takes `Array<A>` as input, `extend` returns
 * an array containing the results of the iterating function applied to the whole input
 * `Array`, then to the input `Array` without the first element, then to the input
 * `Array` without the first two elements, etc.
 *
 * @example
 * import { extend } from 'fp-ts/Array'
 *
 * const f = (a: string[]) => a.join(",");
 * assert.deepStrictEqual(extend(f)(["a", "b", "c"]), ["a,b,c", "b,c", "c"]);
 *
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return wa.map(function (_, i) { return f(wa.slice(i)); });
}; };
/**
 * `duplicate` returns an array containing the whole input `Array`,
 * then to the input `Array` dropping the first element, then to the input
 * `Array` dropping the first two elements, etc.
 *
 * @example
 * import { duplicate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(duplicate(["a", "b", "c"]), [["a", "b", "c"], ["b", "c"], ["c"]]);
 *
 * @since 2.0.0
 */
var duplicate = /*#__PURE__*/ extend(identity);
/**
 * Map and fold an `Array`.
 * Map the `Array` passing each value to the iterating function.
 * Then fold the results using the provided `Monoid`.
 *
 * @example
 * import { foldMap } from 'fp-ts/Array'
 *
 * const monoid = { concat: (a: string, b: string) => a + b, empty: "" };
 * const f = (s: string) => s.toUpperCase()
 * assert.deepStrictEqual(foldMap(monoid)(f)(["a", "b", "c"]), "ABC");
 *
 * @category folding
 * @since 2.0.0
 */
var foldMap$1 = foldMap$2;
/**
 * Same as [`foldMap`](#foldMap) but passing also the index to the iterating function.
 *
 * @example
 * import { foldMapWithIndex } from 'fp-ts/Array'
 *
 * const monoid = { concat: (a: string, b: string) => a + b, empty: "" };
 * const f = (index:number, s: string) => `${s.toUpperCase()}(${index})`
 * assert.deepStrictEqual(foldMapWithIndex(monoid)(f)(["a", "b", "c"]), "A(0)B(1)C(2)");
 *
 * @category folding
 * @since 2.0.0
 */
var foldMapWithIndex$1 = foldMapWithIndex$2;
/**
 * Reduces an `Array`.
 *
 * `reduce` executes the supplied iterating function on each element of the array,
 * in order, passing in the element and the return value from the calculation on the preceding element.
 *
 * The first time that the iterating function is called there is no "return value of the
 * previous calculation", the initial value is used in its place.
 *
 * @example
 * import { reduce } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(reduce(5, (acc: number, cur: number) => acc * cur)([2, 3]), 5 * 2 * 3);
 *
 * @category folding
 * @since 2.0.0
 */
var reduce$1 = reduce$2;
/**
 * Same as [`reduce`](#reduce) but passing also the index to the iterating function.
 *
 * @example
 * import { reduceWithIndex } from 'fp-ts/Array'
 *
 * const f = (index: number, acc: string, cur: unknown) =>
 *   acc + (typeof cur === "string" ? cur.toUpperCase() + index : "");
 * assert.deepStrictEqual(reduceWithIndex("", f)([2, "a", "b", null]), "A1B2");
 *
 * @category folding
 * @since 2.0.0
 */
var reduceWithIndex$1 = reduceWithIndex$2;
/**
 * Same as [`reduce`](#reduce) but applied from the end to the start.
 *
 * *Note*: the iterating function in this case takes the accumulator as the last argument.
 *
 * @example
 * import { reduceRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(reduceRight("", (cur: string, acc: string) => acc + cur)(["a", "b", "c"]), "cba");
 *
 * @category folding
 * @since 2.0.0
 */
var reduceRight$1 = reduceRight$2;
/**
 * Same as [`reduceRight`](#reduceRight) but passing also the index to the iterating function.
 *
 * @example
 * import { reduceRightWithIndex } from 'fp-ts/Array'
 *
 * const f = (index: number, cur: unknown, acc: string) =>
 *   acc + (typeof cur === "string" ? cur.toUpperCase() + index : "");
 * assert.deepStrictEqual(reduceRightWithIndex("", f)([2, "a", "b", null]), "B2A1");
 *
 * @category folding
 * @since 2.0.0
 */
var reduceRightWithIndex$1 = reduceRightWithIndex$2;
/**
 * Given an iterating function that returns a `HKT` (higher kinded type), `traverse`
 * applies the iterating function to each element of the `Array` and then [`sequence`](#sequence)-s
 * the results using the provided `Applicative`.
 *
 * E.g. suppose you have an `Array` and you want to format each element with a function
 * that returns a result or an error as `f = (a: A) => Either<Error, B>`, using `traverse`
 * you can apply `f` to all elements and directly obtain as a result an `Either<Error,Array<B>>`
 * i.e. an `Array<B>` if all the results are `B`, or an `Error` if some of the results
 * are `Error`s.
 *
 * @example
 * import { traverse } from 'fp-ts/Array'
 * import { Applicative, left, right } from "fp-ts/lib/Either";
 *
 * const f = (x: unknown) =>
 *   typeof x === "string" ? right(x.toUpperCase()) : left(new Error("not a string"));
 * assert.deepStrictEqual(traverse(Applicative)(f)(["a", "b"]), right(["A", "B"]));
 * assert.deepStrictEqual(traverse(Applicative)(f)(["a", 5]), left(new Error("not a string")));
 *
 * @category traversing
 * @since 2.6.3
 */
var traverse$2 = function (F) {
    var traverseWithIndexF = traverseWithIndex$1(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
/**
 * `sequence` takes an `Array` where elements are `HKT<A>` (higher kinded type) and,
 * using an applicative of that `HKT`, returns an `HKT` of `Array<A>`.
 * E.g. it can turn an `Array<Either<Error, string>>` into an `Either<Error, Array<string>>`.
 *
 * `sequence` requires an `Applicative` of the `HKT` you are targeting, e.g. to turn an
 * `Array<Either<E, A>>` into an `Either<E, Array<A>>`, it needs an
 * `Applicative` for `Either`, to to turn an `Array<Option<A>>` into an `Option<Array<A>>`,
 * it needs an `Applicative` for `Option`.
 *
 * @example
 * import { sequence } from 'fp-ts/Array'
 * import { Applicative, left, right } from "fp-ts/lib/Either";
 *
 * assert.deepStrictEqual(sequence(Applicative)([right("a"), right("b")]), right(["a", "b"]));
 * assert.deepStrictEqual(
 *   sequence(Applicative)([right("a"), left(new Error("not a string"))]),
 *   left(new Error("not a string"))
 * );
 *
 * @category traversing
 * @since 2.6.3
 */
var sequence$1 = function (F) {
    return function (ta) {
        return _reduce$1(ta, F.of(zero()), function (fas, fa) {
            return F.ap(F.map(fas, function (as) { return function (a) { return pipe(as, append(a)); }; }), fa);
        });
    };
};
/**
 * Same as [`traverse`](#traverse) but passing also the index to the iterating function.
 *
 * @example
 * import { traverseWithIndex } from 'fp-ts/Array'
 * import { Applicative, left, right } from "fp-ts/lib/Either";
 *
 * const f = (index:number, x:unknown) =>
 *   typeof x === "string" ? right(x.toUpperCase() + index) : left(new Error("not a string"));
 * assert.deepStrictEqual(traverseWithIndex(Applicative)(f)(["a", "b"]), right(["A0", "B1"]));
 * assert.deepStrictEqual(traverseWithIndex(Applicative)(f)(["a", 5]), left(new Error("not a string")));
 *
 * @category sequencing
 * @since 2.6.3
 */
var traverseWithIndex$1 = function (F) {
    return function (f) {
        return reduceWithIndex$1(F.of(zero()), function (i, fbs, a) {
            return F.ap(F.map(fbs, function (bs) { return function (b) { return pipe(bs, append(b)); }; }), f(i, a));
        });
    };
};
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
 * `unfold` takes a function `f` which returns an `Option` of a tuple containing an outcome
 * value and an input for the following iteration.
 * `unfold` applies `f` to the initial value `b` and then recursively to the second
 * element of the tuple contained in the returned `option` of the previous
 * calculation until `f` returns `Option.none`.
 *
 * @example
 * import { unfold } from 'fp-ts/Array'
 * import { option } from 'fp-ts'
 *
 * const f = (n: number) => {
 *   if (n <= 0) return option.none;
 *   const returnValue = n * 2;
 *   const inputForNextRound = n - 1;
 *   return option.some([returnValue, inputForNextRound] as const);
 * };
 * assert.deepStrictEqual(unfold(5, f), [10, 8, 6, 4, 2]);
 *
 * @since 2.6.6
 */
var unfold = function (b, f) {
    var out = [];
    var bb = b;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        var mt = f(bb);
        if (isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            out.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return out;
};
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI$2 = 'Array';
/**
 * `getShow` makes a `Show` for an `Array<A>` from a `Show` for
 * an `A`.
 *
 * @example
 * import { getShow } from 'fp-ts/Array'
 *
 * const numShow = { show: (n: number) => (n >= 0 ? `${n}` : `(${-n})`) };
 * assert.deepStrictEqual(getShow(numShow).show([-2, -1, 0, 1]), "[(2), (1), 0, 1]");
 *
 * @category instances
 * @since 2.0.0
 */
var getShow$1 = getShow$2;
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
var getMonoid$1 = function () { return ({
    concat: getSemigroup().concat,
    empty: []
}); };
/**
 * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/Array'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.0.0
 */
var getEq$1 = getEq$2;
/**
 * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/Array'
 * import * as S from 'fp-ts/string'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 * @category instances
 * @since 2.0.0
 */
var getOrd = getOrd$1;
/**
 * Get a `Semigroup` based on the union of the elements of `Array`s.
 * Elements which equal according to the provided `Eq` are included
 * only once in the result.
 * See also [`getUnionMonoid`](#getUnionMonoid).
 *
 * @example
 * import { getUnionSemigroup } from 'fp-ts/Array';
 * import { Eq } from 'fp-ts/number';
 *
 * const S = getUnionSemigroup<number>(Eq);
 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1, 2, 3]);
 *
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (E) {
    var unionE = union$1(E);
    return {
        concat: function (first, second) { return unionE(second)(first); }
    };
};
/**
 * Get a `Monoid` based on the union of the elements of `Array`s.
 * Elements which equal according to the provided `Eq` are included
 * only once in the result.
 *
 * @example
 * import { getUnionMonoid } from 'fp-ts/Array'
 * import { Eq } from 'fp-ts/number';
 *
 * const M = getUnionMonoid<number>(Eq);
 * assert.deepStrictEqual(M.concat([1, 2], [2, 3]), [1, 2, 3]);
 * assert.deepStrictEqual(M.empty,[]);
 *
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (E) { return ({
    concat: getUnionSemigroup(E).concat,
    empty: []
}); };
/**
 * Get a `Semigroup` based on the intersection of the elements of `Array`s.
 * Only elements present in the two arrays which are equal according to the
 * provided `Eq` are included in the result.
 *
 * @example
 * import { getIntersectionSemigroup } from 'fp-ts/Array'
 * import { Eq } from 'fp-ts/number';
 *
 * const S = getIntersectionSemigroup<number>(Eq);
 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [2]);
 *
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (E) {
    var intersectionE = intersection$1(E);
    return {
        concat: function (first, second) { return intersectionE(second)(first); }
    };
};
/**
 * Get a `Magma` for `Array` where the `concat` function is the differnce between
 * the first and the second array, i.e. the result contains all the elements of the
 * first array for which their is no equal element in the second array according
 * to the `Eq` provided.
 *
 *
 * @example
 * import { getDifferenceMagma } from 'fp-ts/Array'
 * import { Eq } from 'fp-ts/number';
 *
 * const S = getDifferenceMagma<number>(Eq);
 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1]);
 *
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function (E) {
    var differenceE = difference$1(E);
    return {
        concat: function (first, second) { return differenceE(second)(first); }
    };
};
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI$2,
    map: _map$2
};
/**
 * Given an input an `Array` of functions, `flap` returns an `Array` containing
 * the results of applying each function to the given input.
 *
 * @example
 * import { flap } from 'fp-ts/Array'
 *
 * const funs = [
 *   (n: number) => `Double: ${n * 2}`,
 *   (n: number) => `Triple: ${n * 3}`,
 *   (n: number) => `Square: ${n * n}`,
 * ];
 * assert.deepStrictEqual(flap(4)(funs), ['Double: 8', 'Triple: 12', 'Square: 16']);
 *
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ flap$2(Functor);
/**
 * @category instances
 * @since 2.10.0
 */
var Pointed = {
    URI: URI$2,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex = {
    URI: URI$2,
    map: _map$2,
    mapWithIndex: _mapWithIndex$1
};
/**
 * @category instances
 * @since 2.10.0
 */
var Apply = {
    URI: URI$2,
    map: _map$2,
    ap: _ap
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.5.0
 */
var apFirst = /*#__PURE__*/ apFirst$2(Apply);
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.5.0
 */
var apSecond = /*#__PURE__*/ apSecond$2(Apply);
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    of: of
};
/**
 * @category instances
 * @since 2.10.0
 */
var Chain = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    chain: flatMap
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @example
 * import * as A from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     A.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     A.chainFirst(() => [])
 *   ),
 *   []
 * )
 *
 * @category sequencing
 * @since 2.0.0
 */
var chainFirst = 
/*#__PURE__*/ chainFirst$2(Chain);
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    of: of,
    chain: flatMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var Unfoldable = {
    URI: URI$2,
    unfold: unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI$2,
    map: _map$2,
    alt: _alt
};
/**
 * @category instances
 * @since 2.11.0
 */
var Zero = {
    URI: URI$2,
    zero: zero
};
/**
 * @category do notation
 * @since 2.11.0
 */
var guard = /*#__PURE__*/ guard$1(Zero, Pointed);
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    of: of,
    alt: _alt,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI$2,
    map: _map$2,
    extend: _extend
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI$2,
    compact: compact$1,
    separate: separate$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI$2,
    map: _map$2,
    compact: compact$1,
    separate: separate$1,
    filter: _filter$1,
    filterMap: _filterMap$1,
    partition: _partition$1,
    partitionMap: _partitionMap$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var FilterableWithIndex = {
    URI: URI$2,
    map: _map$2,
    mapWithIndex: _mapWithIndex$1,
    compact: compact$1,
    separate: separate$1,
    filter: _filter$1,
    filterMap: _filterMap$1,
    partition: _partition$1,
    partitionMap: _partitionMap$1,
    partitionMapWithIndex: _partitionMapWithIndex$1,
    partitionWithIndex: _partitionWithIndex$1,
    filterMapWithIndex: _filterMapWithIndex$1,
    filterWithIndex: _filterWithIndex$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI$2,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var FoldableWithIndex = {
    URI: URI$2,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    reduceWithIndex: _reduceWithIndex$1,
    foldMapWithIndex: _foldMapWithIndex$1,
    reduceRightWithIndex: _reduceRightWithIndex$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI$2,
    map: _map$2,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    traverse: _traverse$1,
    sequence: sequence$1
};
/**
 * @category instances
 * @since 2.7.0
 */
var TraversableWithIndex = {
    URI: URI$2,
    map: _map$2,
    mapWithIndex: _mapWithIndex$1,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    reduceWithIndex: _reduceWithIndex$1,
    foldMapWithIndex: _foldMapWithIndex$1,
    reduceRightWithIndex: _reduceRightWithIndex$1,
    traverse: _traverse$1,
    sequence: sequence$1,
    traverseWithIndex: _traverseWithIndex$1
};
var _wither = /*#__PURE__*/ witherDefault(Traversable, Compactable);
var _wilt = /*#__PURE__*/ wiltDefault(Traversable, Compactable);
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI$2,
    map: _map$2,
    compact: compact$1,
    separate: separate$1,
    filter: _filter$1,
    filterMap: _filterMap$1,
    partition: _partition$1,
    partitionMap: _partitionMap$1,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    traverse: _traverse$1,
    sequence: sequence$1,
    wither: _wither,
    wilt: _wilt
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecDepthFirst = chainRecDepthFirst$1;
/**
 * @category instances
 * @since 2.11.0
 */
var ChainRecDepthFirst = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRecDepthFirst
};
/**
 * @category sequencing
 * @since 2.11.0
 */
var chainRecBreadthFirst = chainRecBreadthFirst$1;
/**
 * @category instances
 * @since 2.11.0
 */
var ChainRecBreadthFirst = {
    URI: URI$2,
    map: _map$2,
    ap: _ap,
    chain: flatMap,
    chainRec: _chainRecBreadthFirst
};
/**
 * Filter values inside a context.
 *
 * @since 2.11.0
 */
var filterE = /*#__PURE__*/ filterE$1(Witherable);
/**
 * @category instances
 * @since 2.11.0
 */
var FromEither = {
    URI: URI$2,
    fromEither: fromEither
};
/**
 * @category lifting
 * @since 2.11.0
 */
var fromEitherK = /*#__PURE__*/ fromEitherK$1(FromEither);
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeInsertAt = unsafeInsertAt$1;
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeUpdateAt$1 = function (i, a, as) {
    return isNonEmpty(as) ? unsafeUpdateAt$3(i, a, as) : [];
};
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeDeleteAt = function (i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * `every` tells if the provided predicate holds true for every element in the `Array`.
 *
 * @example
 * import { every } from 'fp-ts/Array'
 *
 * assert.equal(every((x: number) => x >= 0)([1, 2, 3]), true);
 * assert.equal(every((x: number) => x >= 0)([-1, 2, 3]), false);
 *
 * @since 2.9.0
 */
var every$1 = every$2;
/**
 * `some` tells if the provided predicate holds true at least for one element in the `Array`.
 *
 * @example
 * import { some } from 'fp-ts/Array'
 *
 * assert.equal(some((x: number) => x >= 0)([1, 2, 3]), true);
 * assert.equal(some((x: number) => x >= 10)([1, 2, 3]), false);
 *
 * @since 2.9.0
 */
var some$2 = function (predicate) {
    return function (as) {
        return as.some(predicate);
    };
};
/**
 * Alias of [`some`](#some)
 *
 * @since 2.11.0
 */
var exists = some$2;
/**
 * Places an element in between members of an `Array`, then folds the results using the provided `Monoid`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 2.12.0
 */
var intercalate = intercalate$1;
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
 * @category do notation
 * @since 2.8.0
 */
var apS = /*#__PURE__*/ apS$2(Apply);
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
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `NonEmptyArray` module instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var range = range$1;
/**
 * Use a new `[]` instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var empty$1 = [];
/**
 * Use `prepend` instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var cons = cons$1;
/**
 * Use `append` instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var snoc = snoc$1;
/**
 * Use `prependAll` instead
 *
 * @category zone of death
 * @since 2.9.0
 * @deprecated
 */
var prependToAll = prependAll;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `A.Functor` instead of `A.array`
 * (where `A` is from `import A from 'fp-ts/Array'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var array = {
    URI: URI$2,
    compact: compact$1,
    separate: separate$1,
    map: _map$2,
    ap: _ap,
    of: of,
    chain: flatMap,
    filter: _filter$1,
    filterMap: _filterMap$1,
    partition: _partition$1,
    partitionMap: _partitionMap$1,
    mapWithIndex: _mapWithIndex$1,
    partitionMapWithIndex: _partitionMapWithIndex$1,
    partitionWithIndex: _partitionWithIndex$1,
    filterMapWithIndex: _filterMapWithIndex$1,
    filterWithIndex: _filterWithIndex$1,
    alt: _alt,
    zero: zero,
    unfold: unfold,
    reduce: _reduce$1,
    foldMap: _foldMap$1,
    reduceRight: _reduceRight$1,
    traverse: _traverse$1,
    sequence: sequence$1,
    reduceWithIndex: _reduceWithIndex$1,
    foldMapWithIndex: _foldMapWithIndex$1,
    reduceRightWithIndex: _reduceRightWithIndex$1,
    traverseWithIndex: _traverseWithIndex$1,
    extend: _extend,
    wither: _wither,
    wilt: _wilt
};

var _Array = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Alt: Alt,
    Alternative: Alternative,
    Applicative: Applicative,
    Apply: Apply,
    Chain: Chain,
    ChainRecBreadthFirst: ChainRecBreadthFirst,
    ChainRecDepthFirst: ChainRecDepthFirst,
    Compactable: Compactable,
    Do: Do,
    Extend: Extend,
    Filterable: Filterable,
    FilterableWithIndex: FilterableWithIndex,
    Foldable: Foldable,
    FoldableWithIndex: FoldableWithIndex,
    FromEither: FromEither,
    Functor: Functor,
    FunctorWithIndex: FunctorWithIndex,
    Monad: Monad,
    Pointed: Pointed,
    Traversable: Traversable,
    TraversableWithIndex: TraversableWithIndex,
    URI: URI$2,
    Unfoldable: Unfoldable,
    Witherable: Witherable,
    Zero: Zero,
    alt: alt,
    altW: altW,
    ap: ap,
    apFirst: apFirst,
    apS: apS,
    apSecond: apSecond,
    append: append,
    appendW: appendW,
    array: array,
    bind: bind,
    bindTo: bindTo,
    chain: chain,
    chainFirst: chainFirst,
    chainRecBreadthFirst: chainRecBreadthFirst,
    chainRecDepthFirst: chainRecDepthFirst,
    chainWithIndex: chainWithIndex,
    chop: chop,
    chunksOf: chunksOf,
    compact: compact$1,
    comprehension: comprehension,
    concat: concat,
    concatW: concatW,
    cons: cons,
    copy: copy,
    deleteAt: deleteAt$1,
    difference: difference$1,
    dropLeft: dropLeft,
    dropLeftWhile: dropLeftWhile,
    dropRight: dropRight,
    duplicate: duplicate,
    elem: elem$1,
    empty: empty$1,
    every: every$1,
    exists: exists,
    extend: extend,
    filter: filter$3,
    filterE: filterE,
    filterMap: filterMap$1,
    filterMapWithIndex: filterMapWithIndex$1,
    filterWithIndex: filterWithIndex$1,
    findFirst: findFirst$1,
    findFirstMap: findFirstMap,
    findIndex: findIndex,
    findLast: findLast,
    findLastIndex: findLastIndex,
    findLastMap: findLastMap,
    flap: flap,
    flatMap: flatMap,
    flatten: flatten,
    foldLeft: foldLeft,
    foldMap: foldMap$1,
    foldMapWithIndex: foldMapWithIndex$1,
    foldRight: foldRight,
    fromEither: fromEither,
    fromEitherK: fromEitherK,
    fromOption: fromOption,
    fromOptionK: fromOptionK,
    fromPredicate: fromPredicate$1,
    getDifferenceMagma: getDifferenceMagma,
    getEq: getEq$1,
    getIntersectionSemigroup: getIntersectionSemigroup,
    getMonoid: getMonoid$1,
    getOrd: getOrd,
    getSemigroup: getSemigroup,
    getShow: getShow$1,
    getUnionMonoid: getUnionMonoid,
    getUnionSemigroup: getUnionSemigroup,
    guard: guard,
    head: head,
    init: init,
    insertAt: insertAt$1,
    intercalate: intercalate,
    intersection: intersection$1,
    intersperse: intersperse,
    isEmpty: isEmpty$1,
    isNonEmpty: isNonEmpty,
    isOutOfBound: isOutOfBound,
    last: last,
    lefts: lefts,
    let: let_,
    lookup: lookup$1,
    makeBy: makeBy,
    map: map$2,
    mapWithIndex: mapWithIndex$1,
    match: match,
    matchLeft: matchLeft,
    matchLeftW: matchLeftW,
    matchRight: matchRight,
    matchRightW: matchRightW,
    matchW: matchW,
    modifyAt: modifyAt,
    of: of,
    partition: partition$1,
    partitionMap: partitionMap$1,
    partitionMapWithIndex: partitionMapWithIndex$1,
    partitionWithIndex: partitionWithIndex$1,
    prepend: prepend,
    prependAll: prependAll,
    prependToAll: prependToAll,
    prependW: prependW,
    range: range,
    reduce: reduce$1,
    reduceRight: reduceRight$1,
    reduceRightWithIndex: reduceRightWithIndex$1,
    reduceWithIndex: reduceWithIndex$1,
    replicate: replicate,
    reverse: reverse$1,
    rights: rights,
    rotate: rotate,
    scanLeft: scanLeft,
    scanRight: scanRight,
    separate: separate$1,
    sequence: sequence$1,
    size: size$1,
    snoc: snoc,
    some: some$2,
    sort: sort,
    sortBy: sortBy,
    spanLeft: spanLeft,
    splitAt: splitAt,
    tail: tail,
    takeLeft: takeLeft,
    takeLeftWhile: takeLeftWhile,
    takeRight: takeRight,
    traverse: traverse$2,
    traverseWithIndex: traverseWithIndex$1,
    unfold: unfold,
    union: union$1,
    uniq: uniq,
    unsafeDeleteAt: unsafeDeleteAt,
    unsafeInsertAt: unsafeInsertAt,
    unsafeUpdateAt: unsafeUpdateAt$1,
    unzip: unzip,
    updateAt: updateAt,
    wilt: wilt,
    wither: wither,
    zero: zero,
    zip: zip,
    zipWith: zipWith
});

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
        map: _map$1,
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
var _map$1 = function (fa, f) { return pipe(fa, map$1()); };
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
var Eq = {
    equals: function (first, second) { return first === second; }
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
var Ord = {
    equals: Eq.equals,
    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
};

/**
 * Calculate the number of key/value pairs in a `ReadonlyRecord`,
 *
 * @example
 * import { size } from "fp-ts/ReadonlyRecord";
 *
 * assert.deepStrictEqual(size({ a: true, b: 2, c: "three" }), 3);
 *
 * @since 2.5.0
 */
var size = function (r) { return Object.keys(r).length; };
/**
 * Test whether a `ReadonlyRecord` is empty.
 *
 * @example
 * import { isEmpty } from "fp-ts/ReadonlyRecord"
 *
 * assert.deepStrictEqual(isEmpty({}), true);
 * assert.deepStrictEqual(isEmpty({ a: 3 }), false);
 * @since 2.5.0
 */
var isEmpty = function (r) {
    for (var k in r) {
        if (has$1.call(r, k)) {
            return false;
        }
    }
    return true;
};
var keys_ = function (O) {
    return function (r) {
        return Object.keys(r).sort(O.compare);
    };
};
function collect(O) {
    if (typeof O === 'function') {
        return collect(Ord)(O);
    }
    var keysO = keys_(O);
    return function (f) {
        return function (r) {
            var out = [];
            for (var _i = 0, _a = keysO(r); _i < _a.length; _i++) {
                var key = _a[_i];
                out.push(f(key, r[key]));
            }
            return out;
        };
    };
}
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
        if (has$1.call(r, k) && r[k] === a) {
            return r;
        }
        var out = Object.assign({}, r);
        out[k] = a;
        return out;
    };
};
/**
 * Test whether or not a key exists in a `ReadonlyRecord`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @example
 * import { has } from 'fp-ts/ReadonlyRecord'
 *
 * assert.deepStrictEqual(has("a", { a: 1, b: 2 }), true);
 * assert.deepStrictEqual(has("c", { a: 1, b: 2 }), false);
 *
 * @since 2.10.0
 */
var has = function (k, r) { return has$1.call(r, k); };
function deleteAt(k) {
    return function (r) {
        if (!has$1.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
function isSubrecord(E) {
    return function (me, that) {
        if (that === undefined) {
            var isSubrecordE_1 = isSubrecord(E);
            return function (that) { return isSubrecordE_1(that, me); };
        }
        for (var k in me) {
            if (!has$1.call(that, k) || !E.equals(me[k], that[k])) {
                return false;
            }
        }
        return true;
    };
}
function lookup(k, r) {
    if (r === undefined) {
        return function (r) { return lookup(k, r); };
    }
    return has$1.call(r, k) ? some$3(r[k]) : none;
}
/**
 * @since 2.5.0
 */
var empty = {};
function mapWithIndex(f) {
    return function (r) {
        var out = {};
        for (var k in r) {
            if (has$1.call(r, k)) {
                out[k] = f(k, r[k]);
            }
        }
        return out;
    };
}
function map(f) {
    return mapWithIndex(function (_, a) { return f(a); });
}
function reduceWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return reduceWithIndex(Ord).apply(void 0, args);
    }
    var keysO = keys_(args[0]);
    return function (b, f) { return function (fa) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa[k]);
        }
        return out;
    }; };
}
function foldMapWithIndex(O) {
    if ('compare' in O) {
        var keysO_1 = keys_(O);
        return function (M) {
            return function (f) {
                return function (fa) {
                    var out = M.empty;
                    var ks = keysO_1(fa);
                    var len = ks.length;
                    for (var i = 0; i < len; i++) {
                        var k = ks[i];
                        out = M.concat(out, f(k, fa[k]));
                    }
                    return out;
                };
            };
        };
    }
    return foldMapWithIndex(Ord)(O);
}
function reduceRightWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return reduceRightWithIndex(Ord).apply(void 0, args);
    }
    var keysO = keys_(args[0]);
    return function (b, f) { return function (fa) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa[k], out);
        }
        return out;
    }; };
}
/**
 * Create a `ReadonlyRecord` with one key/value pair.
 *
 * @example
 * import { singleton } from "fp-ts/ReadonlyRecord";
 *
 * assert.deepStrictEqual(singleton("a", 1), { a: 1 });
 *
 * @category constructors
 * @since 2.5.0
 */
var singleton = function (k, a) {
    var _a;
    return (_a = {}, _a[k] = a, _a);
};
function traverseWithIndex(F) {
    var traverseWithIndexOF = _traverseWithIndex(Ord)(F);
    return function (f) { return function (ta) { return traverseWithIndexOF(ta, f); }; };
}
function traverse$1(F) {
    var traverseOF = _traverse(Ord)(F);
    return function (f) { return function (ta) { return traverseOF(ta, f); }; };
}
function sequence(F) {
    return _sequence(Ord)(F);
}
function partitionMapWithIndex(f) {
    return function (r) {
        var left = {};
        var right = {};
        for (var k in r) {
            if (has$1.call(r, k)) {
                var e = f(k, r[k]);
                switch (e._tag) {
                    case 'Left':
                        left[k] = e.left;
                        break;
                    case 'Right':
                        right[k] = e.right;
                        break;
                }
            }
        }
        return separated(left, right);
    };
}
function partitionWithIndex(predicateWithIndex) {
    return function (r) {
        var left = {};
        var right = {};
        for (var k in r) {
            if (has$1.call(r, k)) {
                var a = r[k];
                if (predicateWithIndex(k, a)) {
                    right[k] = a;
                }
                else {
                    left[k] = a;
                }
            }
        }
        return separated(left, right);
    };
}
function filterMapWithIndex(f) {
    return function (r) {
        var out = {};
        for (var k in r) {
            if (has$1.call(r, k)) {
                var ob = f(k, r[k]);
                if (isSome(ob)) {
                    out[k] = ob.value;
                }
            }
        }
        return out;
    };
}
function filterWithIndex(predicateWithIndex) {
    return function (fa) {
        var out = {};
        var changed = false;
        for (var key in fa) {
            if (has$1.call(fa, key)) {
                var a = fa[key];
                if (predicateWithIndex(key, a)) {
                    out[key] = a;
                }
                else {
                    changed = true;
                }
            }
        }
        return changed ? out : fa;
    };
}
function fromFoldable(M, F) {
    var fromFoldableMapM = fromFoldableMap(M, F);
    return function (fka) { return fromFoldableMapM(fka, identity); };
}
function fromFoldableMap(M, F) {
    return function (ta, f) {
        return F.reduce(ta, {}, function (r, a) {
            var _a = f(a), k = _a[0], b = _a[1];
            r[k] = has$1.call(r, k) ? M.concat(r[k], b) : b;
            return r;
        });
    };
}
function every(predicate) {
    return function (r) {
        for (var k in r) {
            if (!predicate(r[k])) {
                return false;
            }
        }
        return true;
    };
}
/**
 * Test if at least one value in a `ReadonlyRecord` satisfies the predicate.
 *
 * @example
 * import { some } from "fp-ts/ReadonlyRecord"
 *
 * assert.deepStrictEqual(some((n: number) => n >= 0)({ a: 1, b: -2 }), true);
 * assert.deepStrictEqual(some((n: number) => n >= 0)({ a: -1, b: -2 }), false);
 *
 * @since 2.5.0
 */
function some$1(predicate) {
    return function (r) {
        for (var k in r) {
            if (predicate(r[k])) {
                return true;
            }
        }
        return false;
    };
}
function elem(E) {
    return function (a, fa) {
        if (fa === undefined) {
            var elemE_1 = elem(E);
            return function (fa) { return elemE_1(a, fa); };
        }
        for (var k in fa) {
            if (E.equals(fa[k], a)) {
                return true;
            }
        }
        return false;
    };
}
/**
 * Union of two `ReadonlyRecord`s.
 * Takes two `ReadonlyRecord`s and produces a `ReadonlyRecord` combining all the
 * entries of the two inputs.
 * It uses the `concat` function of the provided `Magma` to
 * combine the elements with the same key.
 *
 * @example
 * import { union } from "fp-ts/ReadonlyRecord";
 * import { Magma } from "fp-ts/Magma";
 *
 * const m1: Magma<number> = { concat: (x: number, y: number) => x + y };
 * assert.deepStrictEqual(union(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4, b: 2, c: 3 });
 * const m2: Magma<number> = { concat: (x: number) => x };
 * assert.deepStrictEqual(union(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 });
 *
 * @since 2.11.0
 */
var union = function (M) {
    return function (second) {
        return function (first) {
            if (isEmpty(first)) {
                return second;
            }
            if (isEmpty(second)) {
                return first;
            }
            var out = {};
            for (var k in first) {
                if (has(k, second)) {
                    out[k] = M.concat(first[k], second[k]);
                }
                else {
                    out[k] = first[k];
                }
            }
            for (var k in second) {
                if (!has(k, out)) {
                    out[k] = second[k];
                }
            }
            return out;
        };
    };
};
/**
 * Intersection of two `ReadonlyRecord`s.
 * Takes two `ReadonlyRecord`s and produces a `ReadonlyRecord` combining only the
 * entries of the two inputswith the same key.
 * It uses the `concat` function of the provided `Magma` to
 * combine the elements.
 *
 * @example
 * import { intersection } from "fp-ts/ReadonlyRecord";
 * import { Magma } from "fp-ts/Magma";
 *
 * const m1: Magma<number> = { concat: (x: number, y: number) => x + y };
 * assert.deepStrictEqual(intersection(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4});
 * const m2: Magma<number> = { concat: (x: number) => x };
 * assert.deepStrictEqual(intersection(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1});
 *
 * @since 2.11.0
 */
var intersection = function (M) {
    return function (second) {
        return function (first) {
            if (isEmpty(first) || isEmpty(second)) {
                return empty;
            }
            var out = {};
            for (var k in first) {
                if (has(k, second)) {
                    out[k] = M.concat(first[k], second[k]);
                }
            }
            return out;
        };
    };
};
/**
 * Difference between two `ReadonlyRecord`s.
 * Takes two `ReadonlyRecord`s and produces a `ReadonlyRecord` composed by the
 * entries of the two inputs, removing the entries with the same
 * key in both inputs.
 *
 * @example
 * import { difference } from "fp-ts/ReadonlyRecord";
 *
 * assert.deepStrictEqual(difference({ a: 1 })({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(difference({ a: 3 })({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(difference({ a: 3, c: 3 })({ a: 1, b: 2 }), { b: 2, c: 3 });
 *
 * @since 2.11.0
 */
var difference = function (second) {
    return function (first) {
        if (isEmpty(first)) {
            return second;
        }
        if (isEmpty(second)) {
            return first;
        }
        var out = {};
        for (var k in first) {
            if (!has(k, second)) {
                out[k] = first[k];
            }
        }
        for (var k in second) {
            if (!has(k, first)) {
                out[k] = second[k];
            }
        }
        return out;
    };
};
/** @internal */
var _map = function (fa, f) { return pipe(fa, map(f)); };
/** @internal */
/* istanbul ignore next */
var _mapWithIndex = function (fa, f) { return pipe(fa, mapWithIndex(f)); };
/** @internal */
/* istanbul ignore next */
var _reduce = function (O) {
    var reduceO = reduce(O);
    return function (fa, b, f) { return pipe(fa, reduceO(b, f)); };
};
/** @internal */
var _foldMap = function (O) { return function (M) {
    var foldMapM = foldMap(O)(M);
    return function (fa, f) { return pipe(fa, foldMapM(f)); };
}; };
/** @internal */
/* istanbul ignore next */
var _reduceRight = function (O) {
    var reduceRightO = reduceRight(O);
    return function (fa, b, f) { return pipe(fa, reduceRightO(b, f)); };
};
/** @internal */
/* istanbul ignore next */
var _filter = function (fa, predicate) {
    return pipe(fa, filter$2(predicate));
};
/** @internal */
/* istanbul ignore next */
var _filterMap = function (fa, f) { return pipe(fa, filterMap(f)); };
/** @internal */
/* istanbul ignore next */
var _partition = function (fa, predicate) { return pipe(fa, partition(predicate)); };
/** @internal */
/* istanbul ignore next */
var _partitionMap = function (fa, f) { return pipe(fa, partitionMap(f)); };
/** @internal */
/* istanbul ignore next */
var _reduceWithIndex = function (O) {
    var reduceWithIndexO = reduceWithIndex(O);
    return function (fa, b, f) { return pipe(fa, reduceWithIndexO(b, f)); };
};
/** @internal */
var _foldMapWithIndex = function (O) {
    var foldMapWithIndexO = foldMapWithIndex(O);
    return function (M) {
        var foldMapWithIndexM = foldMapWithIndexO(M);
        return function (fa, f) { return pipe(fa, foldMapWithIndexM(f)); };
    };
};
/** @internal */
/* istanbul ignore next */
var _reduceRightWithIndex = function (O) {
    var reduceRightWithIndexO = reduceRightWithIndex(O);
    return function (fa, b, f) { return pipe(fa, reduceRightWithIndexO(b, f)); };
};
/** @internal */
/* istanbul ignore next */
var _partitionMapWithIndex = function (fa, f) { return pipe(fa, partitionMapWithIndex(f)); };
/** @internal */
/* istanbul ignore next */
var _partitionWithIndex = function (fa, predicateWithIndex) {
    return pipe(fa, partitionWithIndex(predicateWithIndex));
};
/** @internal */
/* istanbul ignore next */
var _filterMapWithIndex = function (fa, f) { return pipe(fa, filterMapWithIndex(f)); };
/** @internal */
/* istanbul ignore next */
var _filterWithIndex = function (fa, predicateWithIndex) { return pipe(fa, filterWithIndex(predicateWithIndex)); };
/** @internal */
var _traverse = function (O) {
    var traverseWithIndexO = _traverseWithIndex(O);
    return function (F) {
        var traverseWithIndexOF = traverseWithIndexO(F);
        return function (ta, f) { return traverseWithIndexOF(ta, flow(SK, f)); };
    };
};
/** @internal */
var _sequence = function (O) {
    var traverseO = _traverse(O);
    return function (F) {
        var traverseOF = traverseO(F);
        return function (ta) { return traverseOF(ta, identity); };
    };
};
var _traverseWithIndex = function (O) {
    return function (F) {
        var keysO = keys_(O);
        return function (ta, f) {
            var ks = keysO(ta);
            if (ks.length === 0) {
                return F.of(empty);
            }
            var fr = F.of({});
            var _loop_1 = function (key) {
                fr = F.ap(F.map(fr, function (r) { return function (b) {
                    var _a;
                    return Object.assign({}, r, (_a = {}, _a[key] = b, _a));
                }; }), f(key, ta[key]));
            };
            for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
                var key = ks_1[_i];
                _loop_1(key);
            }
            return fr;
        };
    };
};
/**
 * Given a `Predicate`, it produces a new `ReadonlyRecord` keeping only the entries with a
 * value that satisfies the provided predicate.
 *
 * @example
 * import { filter } from "fp-ts/ReadonlyRecord"
 *
 * assert.deepStrictEqual(filter((s: string) => s.length < 4)({ a: "foo", b: "bar", c: "verylong" }), {
 *   a: "foo",
 *   b: "bar",
 * });
 *
 * @category filtering
 * @since 2.5.0
 */
var filter$2 = function (predicate) {
    return filterWithIndex(function (_, a) { return predicate(a); });
};
/**
 * Maps a `ReadonlyRecord` with an iterating function that returns an `Option`
 * and it keeps only the `Some` values discarding the `None`s.
 *
 * @example
 * import { filterMap } from "fp-ts/ReadonlyRecord"
 * import { option } from "fp-ts"
 *
 * const f = (s: string) => s.length < 4 ? option.some(`${s} is short`): option.none
 * assert.deepStrictEqual(filterMap(f)({ a: "foo", b: "bar", c: "verylong" }), {
 *   a: "foo is short",
 *   b: "bar is short",
 * });
 *
 * @category filtering
 * @since 2.5.0
 */
var filterMap = function (f) { return filterMapWithIndex(function (_, a) { return f(a); }); };
/**
 * Partition a `ReadonlyRecord` into two parts according to a `Predicate`.
 *
 * @example
 * import { partition } from "fp-ts/ReadonlyRecord"
 *
 * assert.deepStrictEqual(partition((s: string) => s.length < 4)({ a: "foo", b: "bar", c: "verylong" }), {
 *   left:{
 *     c: "verylong"
 *   },
 *   right: {
 *     a: "foo",
 *     b: "bar",
 *   },
 * });
 *
 * @category filtering
 * @since 2.5.0
 */
var partition = function (predicate) {
    return partitionWithIndex(function (_, a) { return predicate(a); });
};
/**
 * Maps a `ReadonlyRecord` with a function returning an `Either` and
 * partitions the resulting `ReadonlyRecord` into `Left`s and `Right`s.
 *
 * @example
 * import { partitionMap } from "fp-ts/ReadonlyRecord"
 * import { either } from "fp-ts"
 *
 * const f = (s: string) => (s.length < 4 ? either.right(`${s} is short`) : either.left(`${s} is not short`));
 * assert.deepStrictEqual(partitionMap(f)({ a: "foo", b: "bar", c: "verylong" }), {
 *   left: {
 *     c: "verylong is not short",
 *   },
 *   right: {
 *     a: "foo is short",
 *     b: "bar is short",
 *   },
 * });
 *
 * @category filtering
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return partitionMapWithIndex(function (_, a) { return f(a); });
};
function reduce() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        var reduceWithIndexO_1 = reduceWithIndex(args[0]);
        return function (b, f) { return reduceWithIndexO_1(b, function (_, b, a) { return f(b, a); }); };
    }
    return reduce(Ord).apply(void 0, args);
}
function foldMap(O) {
    if ('compare' in O) {
        var foldMapWithIndexO_1 = foldMapWithIndex(O);
        return function (M) {
            var foldMapWithIndexM = foldMapWithIndexO_1(M);
            return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
        };
    }
    return foldMap(Ord)(O);
}
function reduceRight() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 1) {
        var reduceRightWithIndexO_1 = reduceRightWithIndex(args[0]);
        return function (b, f) { return reduceRightWithIndexO_1(b, function (_, b, a) { return f(b, a); }); };
    }
    return reduceRight(Ord).apply(void 0, args);
}
/**
 * Compact a `ReadonlyRecord` of `Option`s discarding the `None` values and
 * keeping the `Some` values.
 *
 * @example
 * import { compact } from 'fp-ts/ReadonlyRecord'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(compact({ a: option.some("foo"), b: option.none, c: option.some("bar") }), {
 *   a: "foo",
 *   c: "bar",
 * });
 *
 * @category filtering
 * @since 2.5.0
 */
var compact = function (r) {
    var out = {};
    for (var k in r) {
        if (has$1.call(r, k)) {
            var oa = r[k];
            if (isSome(oa)) {
                out[k] = oa.value;
            }
        }
    }
    return out;
};
/**
 * Separate a `ReadonlyRecord` of `Either`s into `Left`s and `Right`s.
 *
 * @example
 * import { separate } from 'fp-ts/ReadonlyRecord'
 * import { either } from 'fp-ts'
 *
 * assert.deepStrictEqual(
 *   separate({ a: either.right("foo"), b: either.left("bar"), c: either.right("baz") }),
 *   {
 *     right: {
 *       a: "foo",
 *       c: "baz",
 *     },
 *     left: {
 *       b: "bar",
 *     },
 *   }
 * );
 *
 * @category filtering
 * @since 2.5.0
 */
var separate = function (r) {
    var left = {};
    var right = {};
    for (var k in r) {
        if (has$1.call(r, k)) {
            var e = r[k];
            if (isLeft(e)) {
                left[k] = e.left;
            }
            else {
                right[k] = e.right;
            }
        }
    }
    return separated(left, right);
};
function getShow(O) {
    if ('compare' in O) {
        return function (S) { return ({
            show: function (r) {
                var elements = collect(O)(function (k, a) { return "".concat(JSON.stringify(k), ": ").concat(S.show(a)); })(r).join(', ');
                return elements === '' ? '{}' : "{ ".concat(elements, " }");
            }
        }); };
    }
    return getShow(Ord)(O);
}
function getEq(E) {
    var isSubrecordE = isSubrecord(E);
    return fromEquals(function (x, y) { return isSubrecordE(x)(y) && isSubrecordE(y)(x); });
}
function getMonoid(S) {
    return {
        concat: function (first, second) {
            if (isEmpty(first)) {
                return second;
            }
            if (isEmpty(second)) {
                return first;
            }
            var r = Object.assign({}, first);
            for (var k in second) {
                if (has$1.call(second, k)) {
                    r[k] = has$1.call(first, k) ? S.concat(first[k], second[k]) : second[k];
                }
            }
            return r;
        },
        empty: empty
    };
}
/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category zone of death
 * @since 2.5.0
 * @deprecated
 */
var insertAt = upsertAt;
function hasOwnProperty(k, r) {
    return has$1.call(r === undefined ? this : r, k);
}

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
var isoAsLens = function (sa) { return lens$2(sa.get, flow(sa.reverseGet, constant)); };
/** @internal */
var isoAsPrism = function (sa) { return prism(flow(sa.get, some$4), sa.reverseGet); };
/** @internal */
var isoAsOptional = function (sa) {
    return optional(flow(sa.get, some$4), flow(sa.reverseGet, constant));
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
var lensAsOptional = function (sa) { return optional(flow(sa.get, some$4), sa.set); };
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
    return prism(flow(sa.getOption, chain$2(ab.getOption)), flow(ab.reverseGet, sa.reverseGet));
}; };
/** @internal */
var lensComposePrism = function (ab) { return function (sa) {
    return optionalComposeOptional(prismAsOptional(ab))(lensAsOptional(sa));
}; };
/** @internal */
var lensId = function () { return lens$2(identity, constant); };
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
    return pipe$1(sa, lensComposeLens(atReadonlyRecord().at(key)));
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
        return pipe$1(sa.getOption(s), fold$1(function () { return F.of(s); }, function (a) { return F.map(f(a), function (a) { return prismSet(a)(sa)(s); }); }));
    }; }; });
};
/** @internal */
var prismModifyOption = function (f) { return function (sa) { return function (s) {
    return pipe$1(sa.getOption(s), map$4(function (o) {
        var n = f(o);
        return n === o ? s : sa.reverseGet(n);
    }));
}; }; };
/** @internal */
var prismModify = function (f) { return function (sa) {
    var g = prismModifyOption(f)(sa);
    return function (s) {
        return pipe$1(g(s), getOrElse(function () { return s; }));
    };
}; };
/** @internal */
var prismSet = function (a) { return prismModify(function () { return a; }); };
/** @internal */
var prismComposeLens = function (ab) { return function (sa) {
    return optionalComposeOptional(lensAsOptional(ab))(prismAsOptional(sa));
}; };
/** @internal */
var prismFromNullable = function () { return prism(fromNullable$1, identity); };
/** @internal */
var prismFromPredicate = function (predicate) {
    return prism(fromPredicate$2(predicate), identity);
};
/** @internal */
var prismSome = function () { return prism(identity, some$4); };
/** @internal */
var prismRight = function () { return prism(fromEither$1, right$1); };
/** @internal */
var prismLeft = function () {
    return prism(function (s) { return (isLeft$1(s) ? some$4(s.left) : none$1); }, // TODO: replace with E.getLeft in v3
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
        return pipe$1(sa.getOption(s), fold$1(function () { return F.of(s); }, function (a) { return F.map(f(a), function (a) { return sa.set(a)(s); }); }));
    }; }; });
};
/** @internal */
var optionalModifyOption = function (f) { return function (optional) { return function (s) {
    return pipe$1(optional.getOption(s), map$4(function (a) {
        var n = f(a);
        return n === a ? s : optional.set(n)(s);
    }));
}; }; };
/** @internal */
var optionalModify = function (f) { return function (optional) {
    var g = optionalModifyOption(f)(optional);
    return function (s) {
        return pipe$1(g(s), getOrElse(function () { return s; }));
    };
}; };
/** @internal */
var optionalComposeOptional = function (ab) { return function (sa) {
    return optional(flow(sa.getOption, chain$2(ab.getOption)), function (b) { return optionalModify(ab.set(b))(sa); });
}; };
/** @internal */
var optionalIndex = function (i) { return function (sa) {
    return pipe$1(sa, optionalComposeOptional(indexReadonlyArray().index(i)));
}; };
/** @internal */
var optionalIndexNonEmpty = function (i) { return function (sa) { return pipe$1(sa, optionalComposeOptional(indexReadonlyNonEmptyArray().index(i))); }; };
/** @internal */
var optionalKey = function (key) { return function (sa) {
    return pipe$1(sa, optionalComposeOptional(indexReadonlyRecord().index(key)));
}; };
/** @internal */
var optionalFindFirst = function (predicate) {
    return optional(findFirst$2(predicate), function (a) { return function (s) {
        return pipe$1(findIndex$1(predicate)(s), fold$1(function () { return s; }, function (i) { return unsafeUpdateAt$2(i, a, s); }));
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
    return optional(findFirst$2(predicate), function (a) { return function (as) {
        return pipe$1(findIndex$1(predicate)(as), fold$1(function () { return as; }, function (i) { return unsafeUpdateAt(i, a, as); }));
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
    of: identity,
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
        return optional(function (as) { return lookup$2(i, as); }, function (a) { return function (as) {
            return pipe$1(lookup$2(i, as), fold$1(function () { return as; }, function () { return unsafeUpdateAt$2(i, a, as); }));
        }; });
    });
};
/** @internal */
var indexReadonlyNonEmptyArray = function () {
    return index$1(function (i) {
        return optional(function (as) { return lookup$2(i, as); }, function (a) { return function (as) {
            return pipe$1(lookup$2(i, as), fold$1(function () { return as; }, function () { return unsafeUpdateAt(i, a, as); }));
        }; });
    });
};
/** @internal */
var indexReadonlyRecord = function () {
    return index$1(function (k) {
        return optional(function (r) { return lookup(k, r); }, function (a) { return function (r) {
            if (r[k] === a || isNone$1(lookup(k, r))) {
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
        return lens$2(function (r) { return lookup(key, r); }, fold$1(function () { return deleteAt(key); }, function (a) { return insertAt(key, a); }));
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
var reverse = function (sa) { return iso$1(sa.reverseGet, sa.get); };
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
    return function (f) { return function (sa) { return function (s) { return pipe$1(sa.get(s), f, function (fa) { return F.map(fa, function (a) { return sa.set(a)(s); }); }); }; }; };
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
        return fromIso(reverse(this));
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
        return fromLens(pipe$1(this, asLens, compose$3(ab)));
    };
    /**
     * compose an `Iso` with a `Prism`
     *
     * @since 1.0.0
     */
    Iso.prototype.composePrism = function (ab) {
        return fromPrism(pipe$1(this, asPrism, compose$1(ab)));
    };
    /**
     * compose an `Iso` with an `Optional`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeOptional = function (ab) {
        return fromOptional(pipe$1(this, asOptional$2, compose$2(ab)));
    };
    /**
     * compose an `Iso` with a `Traversal`
     *
     * @since 1.0.0
     */
    Iso.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe$1(this, asTraversal$3, compose(ab)));
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
        return function (prop$1) { return fromLens(pipe$1(id(), prop(prop$1))); };
    };
    Lens.fromProps = function () {
        return function (props$1) { return fromLens(pipe$1(id(), props.apply(lens$1, props$1))); };
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
                if (isNone$1(osk)) {
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
        return fromOptional(pipe$1(this, asOptional$1, compose$2(ab)));
    };
    /**
     * compose a `Lens` with an `Traversal`
     *
     * @since 1.0.0
     */
    Lens.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe$1(this, asTraversal$2, compose(ab)));
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
        return fromLens(pipe$1(this, compose$3(pipe$1(ab, asLens))));
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
            if (isNone$1(os)) {
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
            return isNone$1(oa) ? M.empty : f(oa.value);
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
        return fromOptional(pipe$1(this, asOptional, compose$2(ab)));
    };
    /**
     * compose a `Prism` with a `Traversal`
     *
     * @since 1.0.0
     */
    Prism.prototype.composeTraversal = function (ab) {
        return fromTraversal(pipe$1(this, asTraversal, compose(ab)));
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
        return fromPrism(pipe$1(this, compose$1(pipe$1(ab, asPrism))));
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
new Prism(identity, some$4);
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
            return isNone$1(oa) ? M.empty : f(oa.value);
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
        return fromTraversal(pipe$1(this, asTraversal$1, compose(ab)));
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
        return fromOptional(pipe$1(this, compose$2(pipe$1(ab, asOptional$1))));
    };
    /**
     * compose an `Optional` with a `Prism`
     *
     * @since 1.0.0
     */
    Optional.prototype.composePrism = function (ab) {
        return fromOptional(pipe$1(this, compose$2(pipe$1(ab, asOptional))));
    };
    /**
     * compose an `Optional` with a `Iso`
     *
     * @since 1.0.0
     */
    Optional.prototype.composeIso = function (ab) {
        return fromOptional(pipe$1(this, compose$2(pipe$1(ab, asOptional$2))));
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
        return fromTraversal(pipe$1(this, compose(pipe$1(ab, asTraversal$2))));
    };
    /**
     * compose a `Traversal` with a `Prism`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composePrism = function (ab) {
        return fromTraversal(pipe$1(this, compose(pipe$1(ab, asTraversal))));
    };
    /**
     * compose a `Traversal` with a `Iso`
     *
     * @since 1.0.0
     */
    Traversal.prototype.composeIso = function (ab) {
        return fromTraversal(pipe$1(this, compose(pipe$1(ab, asTraversal$3))));
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
        this.getAll = foldMap(getMonoid$1())(of);
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
        return this.foldMapFirst(fromPredicate$2(p));
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
        return this.modify(constant(a));
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
        return pipe$1(codec.validate(u, c), map$5(i.wrap));
    }, function (a) { return codec.encode(i.unwrap(a)); });
}

const TransactionId = fromNewtype(lib.string);
const unTransactionId = iso().unwrap;
const transactionId = iso().wrap;
const idToTxId = (transactionId) => _function.pipe(transactionId, unTransactionId);

export { _foldMapWithIndex as $, filter$2 as A, filterMap as B, partition as C, partitionMap as D, reduce as E, foldMap as F, reduceRight as G, compact as H, separate as I, getShow as J, getEq as K, getMonoid as L, hasOwnProperty as M, NonEmptyArray as N, Ord as O, union as P, _map as Q, _mapWithIndex as R, _reduce as S, _foldMap as T, _reduceRight as U, _filter as V, _filterMap as W, _partition as X, _partitionMap as Y, _reduceWithIndex as Z, _Array as _, isSubrecord as a, _reduceRightWithIndex as a0, _partitionMapWithIndex as a1, _partitionWithIndex as a2, _filterMapWithIndex as a3, _filterWithIndex as a4, _traverse as a5, _sequence as a6, Foldable as a7, fromNewtype as a8, iso as a9, TransactionId as aa, unTransactionId as ab, transactionId as ac, idToTxId as ad, map as b, reduceRightWithIndex as c, singleton as d, traverse$1 as e, foldMapWithIndex as f, sequence as g, has as h, isEmpty as i, partitionWithIndex as j, filterMapWithIndex as k, lookup as l, mapWithIndex as m, filterWithIndex as n, fromFoldable as o, partitionMapWithIndex as p, fromFoldableMap as q, reduceWithIndex as r, size as s, traverseWithIndex as t, upsertAt as u, every as v, some$1 as w, elem as x, intersection as y, difference as z };
