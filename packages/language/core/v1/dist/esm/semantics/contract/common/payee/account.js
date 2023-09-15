import * as t from "io-ts/lib/index.js";
import { Party } from "./party.js";
import { Token } from "../token.js";
export const AccountId = Party;
export const Account = t.tuple([t.tuple([AccountId, Token]), t.bigint]);
export const Accounts = t.array(Account);
