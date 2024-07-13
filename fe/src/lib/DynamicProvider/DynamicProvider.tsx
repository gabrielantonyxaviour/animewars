"use client";

import { PropsWithChildren } from "react";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { zircuitTestnet } from "viem/chains";
import { fhenixTestnet } from "@/utils/chains";

export const DynamicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
      chainId: 421614,
      chainName: "Arbitrum Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/arbitrum.svg"],
      name: "Arbitrum Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 421614,
      rpcUrls: [
        `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      ],
      vanityName: "Arb Sepolia",
    },
    {
      blockExplorerUrls: [zircuitTestnet.blockExplorers.default.url],
      chainId: zircuitTestnet.id,
      chainName: "Zircuit Testnet",
      iconUrls: ["https://animewars.vercel.app/logos/zircuit.jpeg"],
      name: "Zircuit Testnet",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: zircuitTestnet.id,
      rpcUrls: [zircuitTestnet.rpcUrls.default.http[0]],
      vanityName: "Zircuit",
    },
    {
      blockExplorerUrls: [fhenixTestnet.blockExplorers.default.url],
      chainId: fhenixTestnet.id,
      chainName: "Fhenix Testnet",
      iconUrls: ["https://animewars.vercel.app/logos/fhenix.png"],
      name: "Fhenix Testnet",
      nativeCurrency: {
        decimals: 18,
        name: "Fhenix",
        symbol: "tFHE",
      },
      networkId: fhenixTestnet.id,
      rpcUrls: [fhenixTestnet.rpcUrls.default.http[0]],
      vanityName: "Fhenix",
    },
  ];
  return (
    <DynamicContextProvider
      theme="dark"
      settings={{
        overrides: {
          evmNetworks: evmNetworks,
        },
        appLogoUrl: "https://testnet.luffyprotocol.com/logo.png",
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
        appName: "Luffy Protocol",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
