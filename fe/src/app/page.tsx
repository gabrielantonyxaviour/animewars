"use client";
import ConnectButton from "@/components/ConnectButton";
import CreateGameModal from "@/components/Home/CreateGameModal";
import JoinGameModal from "@/components/Home/JoinGameModal";
import { fhenixTestnet } from "@/utils/chains";
import {
  FHENIX_CORE_ABI,
  FHENIX_CORE_ADDRESS,
  FHENIX_EVM_ARBITRUM_ADDRESS,
} from "@/utils/constants";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { useAccount } from "wagmi";

function Page() {
  const { address, status } = useAccount();

  const [enableCreateGameModal, setEnableCreateGameModal] =
    React.useState(false);
  const [enableJoinGameModal, setEnableJoinGameModal] = React.useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-around space-y-4 select-none xl:w-[33%] lg:w-[50%] md:w-[70%] sm:w-[85%] w-full mx-auto relative">
      <Image
        className="absolute"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="back"
      />
      <Image
        className="relative pt-24"
        src="/logo-text.png"
        width={250}
        height={150}
        alt="back"
      />
      <div className="relative flex flex-col text-center">
        <ConnectButton />

        {status == "connected" && (
          <button
            onClick={async () => {
              try {
                const walletClient = createWalletClient({
                  chain: fhenixTestnet,
                  transport: custom(window.ethereum!),
                });

                const publicClient = createPublicClient({
                  chain: fhenixTestnet,
                  transport: http(fhenixTestnet.rpcUrls.default.http[0]),
                });
                const { request } = await publicClient.simulateContract({
                  account: address as `0x${string}`,
                  address: FHENIX_CORE_ADDRESS as `0x${string}`,
                  abi: FHENIX_CORE_ABI,
                  functionName: "setOrigin",
                  args: [
                    arbitrumSepolia.id,
                    "0x" +
                      FHENIX_EVM_ARBITRUM_ADDRESS.slice(2).padStart(64, "0"),
                  ],
                });

                const tx = await walletClient.writeContract(request);
                console.log(tx);
              } catch (e) {
                console.log("TRANSACTION FAILED");
                console.log(e);
              }
            }}
            className="text-white font-bold text-2xl border border-2 border-white p-4 rounded-xl"
          >
            Fhenix, SetOrigin
          </button>
        )}
        {false && status == "connected" && (
          <>
            <button
              onClick={() => {
                setEnableCreateGameModal(true);
              }}
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              New Game
            </button>
            <button
              onClick={() => {
                setEnableJoinGameModal(true);
              }}
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              Join Game
            </button>

            <Link
              href="/worldcoin"
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              Test Worldcoin
            </Link>
            <Link
              href="/pyth"
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              Test Pyth
            </Link>
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
