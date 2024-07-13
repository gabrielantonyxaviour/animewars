"use client";
import CreateGameModal from "@/components/Home/CreateGameModal";
import JoinGameModal from "@/components/Home/JoinGameModal";
import Loading from "@/components/Loading";
import { fhenixTestnet } from "@/utils/chains";
import {
  FHENIX_CORE_ABI,
  FHENIX_CORE_ADDRESS,
  FHENIX_EVM_ARBITRUM_ADDRESS,
} from "@/utils/constants";
import {
  createWalletClientFromWallet,
  DynamicWidget,
  useDynamicContext,
  Wallet,
} from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { createPublicClient, http } from "viem";
import { arbitrumSepolia } from "viem/chains";

function Page() {
  const { primaryWallet, isAuthenticated, sdkHasLoaded } = useDynamicContext();

  const [enableCreateGameModal, setEnableCreateGameModal] =
    React.useState(false);
  const [enableJoinGameModal, setEnableJoinGameModal] = React.useState(false);

  return sdkHasLoaded ? (
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
        <DynamicWidget />

        <button
          onClick={async () => {
            const walletClient = await createWalletClientFromWallet(
              primaryWallet as Wallet
            );

            const publicClient = createPublicClient({
              chain: fhenixTestnet,
              transport: http(),
            });

            try {
              const res = await publicClient.simulateContract({
                account: primaryWallet?.address as `0x${string}`,
                address: FHENIX_CORE_ADDRESS as `0x${string}`,
                abi: FHENIX_CORE_ABI,
                functionName: "setOrigin",
                args: [
                  arbitrumSepolia.id,
                  "0x" + FHENIX_EVM_ARBITRUM_ADDRESS.slice(2).padStart(64, "0"),
                ],
              });
              console.log(res);
            } catch (e) {
              console.log("TRANSACTION FAILED");
              console.log(e);
            }
          }}
          className="text-black font-bold text-2xl border border-2 border-black rounded-xl"
        >
          Fhenix, SetOrigin
        </button>
        {/* {isAuthenticated && (
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
        )} */}
      </div>

      {enableJoinGameModal && (
        <JoinGameModal
          primaryWallet={primaryWallet}
          closeModal={() => setEnableJoinGameModal(false)}
        />
      )}
      {enableCreateGameModal && (
        <CreateGameModal
          primaryWallet={primaryWallet}
          closeModal={() => setEnableCreateGameModal(false)}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}

export default Page;
