import * as S from "@marlowe.io/wallet/nodejs";
export declare function mkRuntimeLifecycle({ runtimeURL, context, privateKeyBech32, }: {
    runtimeURL: string;
    context: S.Context;
    privateKeyBech32: string;
}): Promise<import("../../../apis/runtimeLifecycle.js").RuntimeLifecycle>;
