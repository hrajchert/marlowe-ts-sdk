export interface TokenMetadata {
    /** A human-readable name for the subject, suitable for use in an interface. */
    name: string;
    /** A human-readable description for the subject, suitable for use in an interface. */
    description: string;
    /** The base16-encoded CBOR representation of the monetary policy script, used to verify ownership. Optional in the case of Plutus scripts as verification is handled elsewhere. */
    policy?: string;
    /** A human-readable ticker name for the subject, suitable for use in an interface. */
    ticker?: string;
    /** A HTTPS URL (web page relating to the token). */
    url?: string;
    /** A PNG image file as a byte string. */
    logo?: string;
    /** How many decimals to the token. */
    decimals?: number;
}
export declare const lookupTokenMetadata: (policyId: string, assetName: string, network: "mainnet" | "preview" | "preprod") => Promise<TokenMetadata>;
export declare const formatToken: ({ decimals, ticker, name }: TokenMetadata, value: number) => string;
