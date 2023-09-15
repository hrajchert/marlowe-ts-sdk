'use strict';

var close = require('./close-0faf1095.cjs');
var party = require('./party-234e637f.cjs');
require('./index-d60f2db2.cjs');
require('./token-fb2fc15b.cjs');

const mkSwapContract = (request) => ({
    when: [
        {
            case: {
                party: party.role(request.provider.roleName),
                deposits: request.provider.value.amount,
                of_token: request.provider.value.token,
                into_account: party.role(request.provider.roleName),
            },
            then: {
                when: [
                    {
                        case: {
                            party: party.role(request.swapper.roleName),
                            deposits: request.swapper.value.amount,
                            of_token: request.swapper.value.token,
                            into_account: party.role(request.swapper.roleName),
                        },
                        then: {
                            pay: request.provider.value.amount,
                            token: request.provider.value.token,
                            from_account: party.role(request.provider.roleName),
                            to: { party: party.role(request.swapper.roleName) },
                            then: {
                                pay: request.swapper.value.amount,
                                token: request.swapper.value.token,
                                from_account: party.role(request.swapper.roleName),
                                to: { party: party.role(request.provider.roleName) },
                                then: close.close,
                            },
                        },
                    },
                ],
                timeout: request.swapper.depositTimeout,
                timeout_continuation: {
                    pay: request.provider.value.amount,
                    token: request.provider.value.token,
                    from_account: party.role(request.provider.roleName),
                    to: { party: party.role(request.provider.roleName) },
                    then: close.close,
                },
            },
        },
    ],
    timeout: request.provider.depositTimeout,
    timeout_continuation: close.close,
});

var swapTokenToken = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mkSwapContract: mkSwapContract
});

/* eslint-disable sort-keys-fix/sort-keys-fix */
/**
 * Marlowe Example : A contract with One Step (one true notify)
 */
const oneNotifyTrue = (notifyTimeout) => ({
    when: [{ case: { notify_if: true }, then: close.close }],
    timeout: notifyTimeout,
    timeout_continuation: close.close,
});

exports.SwapADAToken = swapTokenToken;
exports.oneNotifyTrue = oneNotifyTrue;
