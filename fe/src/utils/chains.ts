import { defineChain } from "viem";

export const fhenixTestnet = defineChain({
  id: 8008135,
  name: "Fhenix Testnet",
  nativeCurrency: { name: "FHENIX", symbol: "tFHE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.helium.fhenix.zone"] },
  },
  blockExplorers: {
    default: {
      name: "Helium Explorer",
      url: "https://explorer.helium.fhenix.zone/",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    ensUniversalResolver: {
      address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
      blockCreated: 16773775,
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601,
    },
  },
});

export const rootstackTestnet = defineChain({
  id: 31,
  name: "Rootstack Testnet",
  nativeCurrency: { name: "RBTC", symbol: "RBTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mycrypto.testnet.rsk.co"] },
  },
  blockExplorers: {
    default: {
      name: "Rootstock Explorer",
      url: "https://explorer.testnet.rootstock.io/",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    ensUniversalResolver: {
      address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
      blockCreated: 16773775,
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601,
    },
  },
});
