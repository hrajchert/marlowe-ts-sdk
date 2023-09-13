import { mkRestClient } from '@marlowe.io/runtime-rest-client/index.js';
import * as S from '@marlowe.io/wallet/nodejs';
import { mkRuntimeLifecycle as mkRuntimeLifecycle$1 } from './overRestAPI.js';
import './tx-9a41f3d4.js';
import '@marlowe.io/wallet/api';
import '@marlowe.io/runtime-core';
import '@marlowe.io/runtime-rest-client/transaction';
import '@marlowe.io/adapter/fp-ts';
import '@marlowe.io/language-core-v1/environment';

async function mkRuntimeLifecycle({ runtimeURL, context, privateKeyBech32, }) {
    const wallet = await S.SingleAddressWallet.Initialise(context, privateKeyBech32);
    const restClient = mkRestClient(runtimeURL);
    return mkRuntimeLifecycle$1(restClient, wallet);
}

export { mkRuntimeLifecycle };
