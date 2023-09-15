/* eslint-disable sort-keys-fix/sort-keys-fix */
import { close } from "../semantics/contract/close.js";
/**
 * Marlowe Example : A contract with One Step (one true notify)
 */
export const oneNotifyTrue = (notifyTimeout) => ({
    when: [{ case: { notify_if: true }, then: close }],
    timeout: notifyTimeout,
    timeout_continuation: close,
});
