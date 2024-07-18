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
    confirmations: 3,
    nativeCurrencySymbol: "tFHE",
    mailbox: "0x935A5B36C923CDFfD3986f2488E92Cf2D1d8c09D",
    core32:
      "0x0000000000000000000000000e05DeD233Bf02192ba72B00f3aF3Cd904D2AcC6",
    core: "0x0e05DeD233Bf02192ba72B00f3aF3Cd904D2AcC6",
  },
  rootstockTestnet: {
    url: "https://mycrypto.testnet.rsk.co",
    gasPrice: undefined,
    nonce: undefined,
    accounts: [TEST_PRIVATE_KEY],
    chainId: 31,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "TRBTC",
    mailbox: "0xA03BF3Ab8f4ad4e6DF2Ab8627c6CBAA5bB4A645a",
    evm: "0xd37ca03a13bD2725306Fec4071855EE556037e2e",
    evm32: "0x000000000000000000000000d37ca03a13bD2725306Fec4071855EE556037e2e",
  },
};

module.exports = {
  networks,
};
