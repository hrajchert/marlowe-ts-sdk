/**
 * Unsafe utilties to remove fp-ts from the end user API.
 */
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
export function unsafeEither(e) {
    return E.match((err) => {
        throw err;
    }, (res) => res)(e);
}
export async function unsafeTaskEither(te) {
    const res = await te();
    return unsafeEither(res);
}
export function tryCatchDefault(f) {
    return TE.tryCatch(f, (err) => {
        if (err instanceof Error)
            return err;
        else
            return new Error(String(err));
    });
}
