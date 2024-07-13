"use client";

import { PropsWithChildren } from "react";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const DynamicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://testnet.snowtrace.io/"],
      chainId: 43113,
      chainName: "Avalanche Fuji",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/avax.svg"],
      name: "Avalanche Fuji",
      nativeCurrency: {
        decimals: 18,
        name: "Avalanche",
        symbol: "AVAX",
      },
      networkId: 43113,
      rpcUrls: [`https://api.avax-test.network/ext/bc/C/rpc`],
      vanityName: "Avax Fuji",
    },
    {
      blockExplorerUrls: ["https://sepolia.etherscan.io/"],
      chainId: 11155111,
      chainName: "Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
      name: "Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 11155111,
      rpcUrls: [
        "https://eth-sepolia.g.alchemy.com/v2/" +
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      ],
      vanityName: "Sepolia",
    },
    {
      blockExplorerUrls: ["https://sepolia.basescan.org/"],
      chainId: 84532,
      chainName: "Base Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
      name: "Base Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 84532,
      rpcUrls: [
        "https://base-sepolia.g.alchemy.com/v2/" +
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      ],
      vanityName: "Base Sepolia",
    },
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
      blockExplorerUrls: ["https://sepolia-optimism.etherscan.io/"],
      chainId: 11155420,
      chainName: "Optimism Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/optimism.svg"],
      name: "Optimism Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 11155420,
      rpcUrls: [
        `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      ],
      vanityName: "OP Sepolia",
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
