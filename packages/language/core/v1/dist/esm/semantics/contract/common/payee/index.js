import * as t from "io-ts/lib/index.js";
import { AccountId } from "./account.js";
import { Party } from "./party.js";
export const Payee = t.union([
    t.type({ account: AccountId }),
    t.type({ party: Party }),
]);
