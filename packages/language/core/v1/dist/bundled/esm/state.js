import { l as lib } from './index-ca7ac053.js';
import { b as Accounts, V as ValueId, C as ChoiceId } from './account-c787daee.js';
import './party-2b7ee6d1.js';
import './token-e1a1eafb.js';

const MarloweState = lib.type({
    accounts: Accounts,
    boundValues: lib.array(lib.tuple([ValueId, lib.bigint])),
    choices: lib.array(lib.tuple([ChoiceId, lib.bigint])),
    minTime: lib.bigint,
});

export { MarloweState };
