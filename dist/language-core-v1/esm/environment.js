import { l as lib } from './index-ca7ac053.js';
import { ISO8601, datetoIso8601 } from '@marlowe.io/adapter/time';

const mkEnvironment = (start) => (end) => ({
    validityStart: datetoIso8601(start),
    validityEnd: datetoIso8601(end),
});
const Environment = lib.type({
    validityStart: ISO8601,
    validityEnd: ISO8601,
});

export { Environment, mkEnvironment };
