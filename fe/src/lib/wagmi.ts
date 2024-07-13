import { fhenixTestnet } from "@/utils/chains";
import { http, createConfig } from "@wagmi/core";
import { arbitrumSepolia, zircuitTestnet } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [arbitrumSepolia, zircuitTestnet, fhenixTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [arbitrumSepolia.id]: http(
      `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [zircuitTestnet.id]: http(`https://zircuit1.p2pify.com/`),
    [fhenixTestnet.id]: http(`https://api.helium.fhenix.zone`),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
