import { E as Either } from './Either-d9970dbd.js';
import { T as TaskEither } from './TaskEither-dac321fc.js';

/**
 * Unsafe utilties to remove fp-ts from the end user API.
 */
function unsafeEither(e) {
    return Either.match((err) => {
        throw err;
    }, (res) => res)(e);
}
async function unsafeTaskEither(te) {
    const res = await te();
    return unsafeEither(res);
}
function tryCatchDefault(f) {
    return TaskEither.tryCatch(f, (err) => {
        if (err instanceof Error)
            return err;
        else
            return new Error(String(err));
    });
}

export { tryCatchDefault, unsafeEither, unsafeTaskEither };
