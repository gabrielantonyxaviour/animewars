require("@nomicfoundation/hardhat-toolbox");
require("hardhat-dependency-compiler");
require("hardhat-contract-sizer");
require("./tasks");
const { networks } = require("./networks");

const REPORT_GAS =
  process.env.REPORT_GAS?.toLowerCase() === "true" ? true : false;

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
};
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.19",
        settings: SOLC_SETTINGS,
      },
    ],
  },

  networks: {
    ...networks,
  },
  etherscan: {
    apiKey: {
      zircuitTestnet: networks.zircuitTestnet.verifyApiKey,
      arbitrumSepolia: networks.arbitrumSepolia.verifyApiKey,
      fhenixTestnet: networks.fhenixTestnet.verifyApiKey,
    },
    customChains: [
      {
        network: "zircuitTestnet",
        chainId: networks.zircuitTestnet.chainId,
        urls: {
          apiURL: "https://explorer.zircuit.com/api/contractVerifyHardhat",
          browserURL: "https://explorer.zircuit.com/",
        },
      },
      {
        network: "fhenixTestnet",
        chainId: networks.fhenixTestnet.chainId,
        urls: {
          apiURL: "https://api.helium.fhenix.zone",
          browserURL: "https://explorer.helium.fhenix.zone",
        },
      },
      {
        network: "arbitrumSepolia",
        chainId: networks.arbitrumSepolia.chainId,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./build/cache",
    artifacts: "./build/artifacts",
  },
  mocha: {
    timeout: 200000,
  },
};
