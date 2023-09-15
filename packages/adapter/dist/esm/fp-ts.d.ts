/**
 * Unsafe utilties to remove fp-ts from the end user API.
 */
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
export declare function unsafeEither<E, A>(e: E.Either<E, A>): A;
export declare function unsafeTaskEither<E, A>(te: TE.TaskEither<E, A>): Promise<A>;
export declare function tryCatchDefault<A>(f: () => Promise<A>): TE.TaskEither<Error, A>;
