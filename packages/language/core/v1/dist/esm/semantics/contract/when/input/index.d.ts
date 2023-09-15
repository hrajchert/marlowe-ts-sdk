import * as t from "io-ts/lib/index.js";
import { Contract } from "../../index.js";
export type BuiltinByteString = t.TypeOf<typeof BuiltinByteString>;
export declare const BuiltinByteString: t.StringC;
export type InputContent = t.TypeOf<typeof InputContent>;
export declare const InputContent: t.UnionC<[t.TypeC<{
    input_from_party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    that_deposits: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>, t.TypeC<{
    for_choice_id: t.Type<import("../../common/value.js").ChoiceId, import("../../common/value.js").ChoiceId, unknown>;
    input_that_chooses_num: t.BigIntC;
}>, t.LiteralC<"input_notify">]>;
export type NormalInput = t.TypeOf<typeof NormalInput>;
export declare const NormalInput: t.UnionC<[t.TypeC<{
    input_from_party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    that_deposits: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>, t.TypeC<{
    for_choice_id: t.Type<import("../../common/value.js").ChoiceId, import("../../common/value.js").ChoiceId, unknown>;
    input_that_chooses_num: t.BigIntC;
}>, t.LiteralC<"input_notify">]>;
export type MerkleizedInput = t.TypeOf<typeof MerkleizedInput>;
export declare const MerkleizedInput: t.IntersectionC<[t.UnionC<[t.TypeC<{
    input_from_party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    that_deposits: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>, t.TypeC<{
    for_choice_id: t.Type<import("../../common/value.js").ChoiceId, import("../../common/value.js").ChoiceId, unknown>;
    input_that_chooses_num: t.BigIntC;
}>, t.LiteralC<"input_notify">]>, t.PartialC<{
    continuation_hash: t.StringC;
    merkleized_continuation: t.Type<Contract, Contract, unknown>;
}>]>;
export type Input = t.TypeOf<typeof Input>;
export declare const Input: t.UnionC<[t.UnionC<[t.TypeC<{
    input_from_party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    that_deposits: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>, t.TypeC<{
    for_choice_id: t.Type<import("../../common/value.js").ChoiceId, import("../../common/value.js").ChoiceId, unknown>;
    input_that_chooses_num: t.BigIntC;
}>, t.LiteralC<"input_notify">]>, t.IntersectionC<[t.UnionC<[t.TypeC<{
    input_from_party: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
    that_deposits: t.BigIntC;
    of_token: t.TypeC<{
        currency_symbol: t.StringC;
        token_name: t.StringC;
    }>;
    into_account: t.UnionC<[t.TypeC<{
        address: t.StringC;
    }>, t.TypeC<{
        role_token: t.StringC;
    }>]>;
}>, t.TypeC<{
    for_choice_id: t.Type<import("../../common/value.js").ChoiceId, import("../../common/value.js").ChoiceId, unknown>;
    input_that_chooses_num: t.BigIntC;
}>, t.LiteralC<"input_notify">]>, t.PartialC<{
    continuation_hash: t.StringC;
    merkleized_continuation: t.Type<Contract, Contract, unknown>;
}>]>]>;
