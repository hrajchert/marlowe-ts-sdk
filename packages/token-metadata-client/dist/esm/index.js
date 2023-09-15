const cardano_foundation_server_url = "https://raw.githubusercontent.com/cardano-foundation/cardano-token-registry/master/mappings/";
const iohk_server_url = "https://raw.githubusercontent.com/input-output-hk/metadata-registry-testnet/master/registry/";
export const lookupTokenMetadata = async (policyId, assetName, network) => {
    if (policyId === "" && assetName === "") {
        return {
            decimals: 6,
            ticker: network === "mainnet" ? "₳" : "t₳",
            name: "Ada",
            description: "Cardano ADA",
        };
    }
    else {
        const server_url = network === "mainnet" ? cardano_foundation_server_url : iohk_server_url;
        const response = await fetch(`${server_url}/${policyId + assetName}.json`);
        const json = await response.json();
        return {
            name: json.name.value,
            description: json.description.value,
            policy: json.policy,
            ticker: json.ticker?.value,
            url: json.url?.value,
            logo: json.logo?.value,
            decimals: json.decimals?.value,
        };
    }
};
export const formatToken = ({ decimals, ticker, name }, value) => `${value * 10 ** -(decimals || 0)} ${ticker || name}`;
