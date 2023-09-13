'use strict';

var Either = require('./Either-e3415b14.js');
var TaskEither = require('./TaskEither-eeafc71f.js');

/**
 * Unsafe utilties to remove fp-ts from the end user API.
 */
function unsafeEither(e) {
    return Either.Either.match((err) => {
        throw err;
    }, (res) => res)(e);
}
async function unsafeTaskEither(te) {
    const res = await te();
    return unsafeEither(res);
}
function tryCatchDefault(f) {
    return TaskEither.TaskEither.tryCatch(f, (err) => {
        if (err instanceof Error)
            return err;
        else
            return new Error(String(err));
    });
}

exports.tryCatchDefault = tryCatchDefault;
exports.unsafeEither = unsafeEither;
exports.unsafeTaskEither = unsafeTaskEither;
