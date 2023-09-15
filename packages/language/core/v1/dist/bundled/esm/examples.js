import { c as close } from './close-76c8b0ab.js';
import { r as role } from './party-2b7ee6d1.js';
import './index-ca7ac053.js';
import './token-e1a1eafb.js';

const mkSwapContract = (request) => ({
    when: [
        {
            case: {
                party: role(request.provider.roleName),
                deposits: request.provider.value.amount,
                of_token: request.provider.value.token,
                into_account: role(request.provider.roleName),
            },
            then: {
                when: [
                    {
                        case: {
                            party: role(request.swapper.roleName),
                            deposits: request.swapper.value.amount,
                            of_token: request.swapper.value.token,
                            into_account: role(request.swapper.roleName),
                        },
                        then: {
                            pay: request.provider.value.amount,
                            token: request.provider.value.token,
                            from_account: role(request.provider.roleName),
                            to: { party: role(request.swapper.roleName) },
                            then: {
                                pay: request.swapper.value.amount,
                                token: request.swapper.value.token,
                                from_account: role(request.swapper.roleName),
                                to: { party: role(request.provider.roleName) },
                                then: close,
                            },
                        },
                    },
                ],
                timeout: request.swapper.depositTimeout,
                timeout_continuation: {
                    pay: request.provider.value.amount,
                    token: request.provider.value.token,
                    from_account: role(request.provider.roleName),
                    to: { party: role(request.provider.roleName) },
                    then: close,
                },
            },
        },
    ],
    timeout: request.provider.depositTimeout,
    timeout_continuation: close,
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
    when: [{ case: { notify_if: true }, then: close }],
    timeout: notifyTimeout,
    timeout_continuation: close,
});

export { swapTokenToken as SwapADAToken, oneNotifyTrue };
