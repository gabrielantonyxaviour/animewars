import { fhenixTestnet } from "@/utils/chains";
import { http, createConfig } from "wagmi";
import { arbitrumSepolia, zircuitTestnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [arbitrumSepolia, zircuitTestnet, fhenixTestnet],
  connectors: [injected()],
  transports: {
    [arbitrumSepolia.id]: http(
      `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [zircuitTestnet.id]: http(`https://zircuit1.p2pify.com/`),
    [fhenixTestnet.id]: http(`https://api.helium.fhenix.zone`),
  },
});
