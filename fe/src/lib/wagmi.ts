import { fhenixTestnet } from "@/utils/chains";
import { http, createConfig } from "@wagmi/core";
import { rootstockTestnet } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [rootstockTestnet, fhenixTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [rootstockTestnet.id]: http(
      `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [fhenixTestnet.id]: http(`https://api.helium.fhenix.zone`),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
