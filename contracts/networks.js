require("@chainlink/env-enc").config();

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 5;

const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;

const REAL_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY; // TODO: Replace with real private key

const networks = {
  fhenixTestnet: {
    url: "https://api.helium.fhenix.zone",
    gasPrice: undefined,
    nonce: undefined,
    accounts: [TEST_PRIVATE_KEY],
    chainId: 8008135,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "tFHE",
    mailbox: "0x935A5B36C923CDFfD3986f2488E92Cf2D1d8c09D",
    core32:
      "0x00000000000000000000000069559ee144e3499f385934894868656Cf8F35d6A",
    core: "0x69559ee144e3499f385934894868656Cf8F35d6A",
  },
  arbitrumSepolia: {
    url: "https://arb-sepolia.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY,
    gasPrice: undefined,
    nonce: undefined,
    accounts: [TEST_PRIVATE_KEY],
    verifyApiKey: process.env.ARBISCAN_API_KEY || "UNSET",
    chainId: 421614,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    mailbox: "0xA03BF3Ab8f4ad4e6DF2Ab8627c6CBAA5bB4A645a",
    evm: "",
  },
  rootstockTestnet: {
    url: "https://mycrypto.testnet.rsk.co",
    gasPrice: undefined,
    nonce: undefined,
    accounts: [TEST_PRIVATE_KEY],
    chainId: 31,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "TRBTC",
    mailbox: "",
    rootstock: "",
  },
  rootstockMainnet: {
    url: "https://public-node.rsk.co",
    gasPrice: undefined,
    nonce: undefined,
    accounts: [REAL_PRIVATE_KEY],
    chainId: 30,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "RBTC",
    mailbox: "",
    rootstock: "",
  },
};

module.exports = {
  networks,
};
