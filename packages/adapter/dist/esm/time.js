import * as t from "io-ts/lib/index.js";
import { pipe } from "fp-ts/lib/function.js";
import { format, formatISO } from "date-fns";
export const ISO8601 = t.string;
export const POSIXTime = t.number;
export const datetoIso8601 = (date) => pipe(date, (date) => format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
export const datetoIso8601Bis = (date) => pipe(date, formatISO);
// a minute in milliseconds
export const MINUTES = 1000 * 60;
