import * as t from "io-ts/lib/index.js";
import { WithdrawalId } from "@marlowe.io/runtime-core";
export type WithdrawalHeader = t.TypeOf<typeof WithdrawalHeader>;
export declare const WithdrawalHeader: t.TypeC<{
    withdrawalId: t.Type<WithdrawalId, string, unknown>;
    status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
    block: import("io-ts-types/lib/optionFromNullable.js").OptionFromNullableC<t.TypeC<{
        slotNo: t.Type<number | bigint, bigint, unknown>;
        blockNo: t.Type<number | bigint, bigint, unknown>;
        blockHeaderHash: t.StringC;
    }>>;
}>;
