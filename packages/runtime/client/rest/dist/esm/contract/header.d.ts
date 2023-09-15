import * as t from "io-ts/lib/index.js";
import { PolicyId } from "@marlowe.io/runtime-core";
import { ContractId } from "@marlowe.io/runtime-core";
export type Header = t.TypeOf<typeof Header>;
export declare const Header: t.TypeC<{
    contractId: t.Type<ContractId, string, unknown>;
    roleTokenMintingPolicyId: t.Type<PolicyId, string, unknown>;
    version: t.LiteralC<"v1">;
    status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
    block: import("io-ts-types").OptionFromNullableC<t.TypeC<{
        slotNo: t.Type<number | bigint, bigint, unknown>;
        blockNo: t.Type<number | bigint, bigint, unknown>;
        blockHeaderHash: t.StringC;
    }>>;
    metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
    tags: t.RecordC<t.StringC, t.AnyC>;
}>;
