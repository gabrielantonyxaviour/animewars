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
      "0x00000000000000000000000079E72dCc5beEE7F288c7e73C5052FEEBb9C491d9",
    core: "0x79E72dCc5beEE7F288c7e73C5052FEEBb9C491d9",
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
    evm: "0x5494EE4a6d7D087DEbAfc2C16340cCE93f763D38",
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
