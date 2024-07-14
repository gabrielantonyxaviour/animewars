"use client";
import ConnectButton from "@/components/ConnectButton";
import CreateGameModal from "@/components/Home/CreateGameModal";
import JoinGameModal from "@/components/Home/JoinGameModal";
import WalletButton from "@/components/WalletButton";
import { fhenixTestnet } from "@/utils/chains";
import {
  FHENIX_EVM_ABI,
  FHENIX_EVM_ARBITRUM_ADDRESS,
  FHENIX_EVM_ZIRCUIT_ADDRESS,
  ONLY_ZIRCUIT,
} from "@/utils/constants";
import setOrigin from "@/utils/transactions/write/setOrigin";
import testCrosschain from "@/utils/transactions/write/testCrosschain";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";
import { useAccount } from "wagmi";

function Page() {
  const { address, status, chainId } = useAccount();
  const [enableCreateGameModal, setEnableCreateGameModal] =
    React.useState(false);
  const [enableJoinGameModal, setEnableJoinGameModal] = React.useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-around select-none xl:w-[33%] lg:w-[50%] md:w-[70%] sm:w-[85%] w-full mx-auto relative">
      <Image
        className="absolute"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="back"
      />
      <div className="flex flex-col items-center">
        <Image
          className="relative pt-24"
          src="/logo.png"
          width={200}
          height={150}
          alt="back"
        />
        <Image
          className="relative pt-4"
          src="/logo-text.png"
          width={250}
          height={150}
          alt="back"
        />
      </div>

      <div className="relative flex flex-col text-center space-y-2">
        {status == "connected" ? <WalletButton /> : <ConnectButton />}
        {status == "connected" && (
          <>
            <Image
              src="/buttons/Create.png"
              width={240}
              height={100}
              alt="arbitrum"
              className="cursor-pointer"
              onClick={() => {
                setEnableCreateGameModal(true);
              }}
            />

            <Image
              src="/buttons/Join.png"
              width={240}
              height={100}
              alt="arbitrum"
              className="cursor-pointer"
              onClick={() => {
                setEnableJoinGameModal(true);
              }}
            />
            <Image
              src="/buttons/Shop.png"
              width={240}
              height={100}
              alt="arbitrum"
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/shop";
              }}
            />
          </>
        )}
      </div>

      {enableJoinGameModal && (
        <JoinGameModal closeModal={() => setEnableJoinGameModal(false)} />
      )}
      {enableCreateGameModal && (
        <CreateGameModal closeModal={() => setEnableCreateGameModal(false)} />
      )}
    </div>
  );
}

export default Page;
