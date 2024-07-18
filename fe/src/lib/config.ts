import { fhenixTestnet } from "@/utils/chains";
import { rootstockTestnet } from "viem/chains";
import { http, createConfig } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
export const config = createConfig({
  chains: [rootstockTestnet, fhenixTestnet],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask({
      dappMetadata: {
        name: "AnimeWars",
        url: "https://animewars.vercel.app",
        iconUrl: "https://animewars.vercel.app/logo.png",
      },
    }),
  ],
  transports: {
    [rootstockTestnet.id]: http(`https://mycrypto.testnet.rsk.co`),
    [fhenixTestnet.id]: http(`https://api.helium.fhenix.zone`),
  },
});
