import { T as TaskEither } from './TaskEither-dac321fc.js';
import { E as Either } from './Either-d9970dbd.js';
import fs from 'fs';
import { promisify } from 'util';

const readFromFile = promisify(fs.readFile);
const getFileContents = (path) => TaskEither.tryCatch(() => readFromFile(path, "utf-8"), Either.toError);

export { getFileContents };
