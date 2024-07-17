require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 5;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}
if (SECOND_PRIVATE_KEY) {
  accounts.push(SECOND_PRIVATE_KEY);
}

const networks = {
  fhenixTestnet: {
    url: "https://api.helium.fhenix.zone",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.BASESCAN_API_KEY || "UNSET",
    chainId: 8008135,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "tFHE",
    mailbox: "0x935A5B36C923CDFfD3986f2488E92Cf2D1d8c09D",
    core: "0x000000000000000000000000bfef5DE3805a60E7dcB079B616b8096bd96d3712",
  },
  zircuitTestnet: {
    url: "https://zircuit1.p2pify.com/",
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ZIRCUIT_API_KEY || "UNSET",
    chainId: 48899,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    mailbox: "0x09F1aF4e16728fcF340051055159F0f9D5e00b54",
    evm: "0xcfA34a6eAA2Db2E89f77E754B3Aa62BD82042556",
  },
  arbitrumSepolia: {
    url: "https://arb-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ARBISCAN_API_KEY || "UNSET",
    chainId: 421614,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    mailbox: "0xA03BF3Ab8f4ad4e6DF2Ab8627c6CBAA5bB4A645a",
    evm: "0x11C6E5451d010C43e04240EFC4696AC763fac19f",
  },
};

module.exports = {
  networks,
};
