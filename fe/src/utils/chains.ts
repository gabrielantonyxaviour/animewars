import { defineChain } from "viem";

// export const incoTestnet = defineChain({
//   id: 1,
//   name: "Inco Testnet",
//   nativeCurrency: { name: "t", symbol: "ETH", decimals: 18 },
//   rpcUrls: {
//     default: { http: ["https://cloudflare-eth.com"] },
//   },
//   blockExplorers: {
//     default: { name: "Etherscan", url: "https://etherscan.io" },
//   },
//   contracts: {
//     ensRegistry: {
//       address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
//     },
//     ensUniversalResolver: {
//       address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
//       blockCreated: 16773775,
//     },
//     multicall3: {
//       address: "0xca11bde05977b3631167028862be2a173976ca11",
//       blockCreated: 14353601,
//     },
//   },
// });

export const fhenixTestnet = defineChain({
  id: 18008135,
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
  contracts: {},
});
