import { http, createConfig } from "@wagmi/core";
import {
  arbitrumSepolia,
  optimismSepolia,
  avalancheFuji,
  sepolia,
  baseSepolia,
} from "@wagmi/core/chains";

export const config = createConfig({
  chains: [
    arbitrumSepolia,
    optimismSepolia,
    avalancheFuji,
    sepolia,
    baseSepolia,
  ],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [avalancheFuji.id]: http(`https://api.avax-test.network/ext/bc/C/rpc`),
    [arbitrumSepolia.id]: http(
      `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [baseSepolia.id]: http(
      `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [optimismSepolia.id]: http(
      `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
