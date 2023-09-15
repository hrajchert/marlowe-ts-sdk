import { AxiosInstance } from "axios";
import * as t from "io-ts/lib/index.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as O from "fp-ts/lib/Option.js";
import { Newtype } from "newtype-ts";
import { Contract } from "@marlowe.io/language-core-v1";
import { DecodingError } from "@marlowe.io/adapter/codec";
import { Tag, AddressesAndCollaterals } from "@marlowe.io/runtime-core";
import { ContractId } from "@marlowe.io/runtime-core";
export interface ContractsRange extends Newtype<{
    readonly ContractsRange: unique symbol;
}, string> {
}
export declare const ContractsRange: t.Type<ContractsRange, string, unknown>;
export declare const unContractsRange: (s: ContractsRange) => string;
export declare const contractsRange: (a: string) => ContractsRange;
export type GETHeadersByRange = (rangeOption: O.Option<ContractsRange>) => (tags: Tag[]) => TE.TaskEither<Error | DecodingError, GETByRangeResponse>;
export declare const getHeadersByRangeViaAxios: (axiosInstance: AxiosInstance) => GETHeadersByRange;
export type GETByRangeRawResponse = t.TypeOf<typeof GETByRangeRawResponse>;
export declare const GETByRangeRawResponse: t.TypeC<{
    data: t.TypeC<{
        results: t.ArrayC<t.TypeC<{
            links: t.TypeC<{
                contract: t.StringC;
                transactions: t.StringC;
            }>;
            resource: t.TypeC<{
                contractId: t.Type<ContractId, string, unknown>;
                roleTokenMintingPolicyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
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
        }>>;
    }>;
    previousRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
    nextRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
}>;
export type GETByRangeResponse = t.TypeOf<typeof GETByRangeResponse>;
export declare const GETByRangeResponse: t.TypeC<{
    headers: t.ArrayC<t.TypeC<{
        contractId: t.Type<ContractId, string, unknown>;
        roleTokenMintingPolicyId: t.Type<import("@marlowe.io/runtime-core").PolicyId, string, unknown>;
        version: t.LiteralC<"v1">;
        status: t.UnionC<[t.LiteralC<"unsigned">, t.LiteralC<"submitted">, t.LiteralC<"confirmed">]>;
        block: import("io-ts-types").OptionFromNullableC<t.TypeC<{
            slotNo: t.Type<number | bigint, bigint, unknown>;
            blockNo: t.Type<number | bigint, bigint, unknown>;
            blockHeaderHash: t.StringC;
        }>>;
        metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
        tags: t.RecordC<t.StringC, t.AnyC>;
    }>>;
    previousRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
    nextRange: import("io-ts-types").OptionFromNullableC<t.Type<ContractsRange, string, unknown>>;
}>;
export type POST = (postContractsRequest: PostContractsRequest, addressesAndCollaterals: AddressesAndCollaterals) => TE.TaskEither<Error | DecodingError, ContractTextEnvelope>;
export type PostContractsRequest = t.TypeOf<typeof PostContractsRequest>;
export declare const PostContractsRequest: t.IntersectionC<[t.TypeC<{
    contract: t.Type<Contract, Contract, unknown>;
    version: t.LiteralC<"v1">;
    tags: t.RecordC<t.StringC, t.AnyC>;
    metadata: t.RecordC<t.UnionC<[t.BigIntC, t.StringC]>, t.AnyC>;
    minUTxODeposit: t.NumberC;
}>, t.PartialC<{
    roles: t.UnionC<[t.StringC, t.RecordC<t.StringC, t.UnionC<[t.Type<import("@marlowe.io/runtime-core").AddressBech32, string, unknown>, t.TypeC<{
        address: t.Type<import("@marlowe.io/runtime-core").AddressBech32, string, unknown>;
        metadata: t.TypeC<{
            name: import("io-ts-types").OptionFromNullableC<t.StringC>;
            image: import("io-ts-types").OptionFromNullableC<t.StringC>;
            mediaType: t.StringC;
            description: t.StringC;
            files: t.ArrayC<t.TypeC<{
                name: t.StringC;
                src: t.StringC;
                mediaType: t.StringC;
            }>>;
        }>;
    }>]>>]>;
}>]>;
export type ContractTextEnvelope = t.TypeOf<typeof ContractTextEnvelope>;
export declare const ContractTextEnvelope: t.TypeC<{
    contractId: t.Type<ContractId, string, unknown>;
    tx: t.TypeC<{
        type: t.StringC;
        description: t.StringC;
        cborHex: t.StringC;
    }>;
}>;
export type PostResponse = t.TypeOf<typeof PostResponse>;
export declare const PostResponse: t.TypeC<{
    links: t.TypeC<{
        contract: t.StringC;
    }>;
    resource: t.TypeC<{
        contractId: t.Type<ContractId, string, unknown>;
        tx: t.TypeC<{
            type: t.StringC;
            description: t.StringC;
            cborHex: t.StringC;
        }>;
    }>;
}>;
export declare const postViaAxios: (axiosInstance: AxiosInstance) => POST;
