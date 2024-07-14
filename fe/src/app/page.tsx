"use client";
import ConnectButton from "@/components/ConnectButton";
import CreateGameModal from "@/components/Home/CreateGameModal";
import JoinGameModal from "@/components/Home/JoinGameModal";
import WalletButton from "@/components/WalletButton";
import setOrigin from "@/utils/transactions/write/setOrigin";
import testCrosschain from "@/utils/transactions/write/testCrosschain";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { arbitrumSepolia } from "viem/chains";
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
      <Image
        className="relative pt-24"
        src="/logo-text.png"
        width={250}
        height={150}
        alt="back"
      />
      <div className="relative flex flex-col text-center space-y-2">
        {status == "connected" ? <WalletButton /> : <ConnectButton />}
        {/* {false ||
          (status == "connected" && (
            <div className="mt-4 flex flex-col space-y-4">
              <button
                onClick={async () => {
                  try {
                    const receipt = await setOrigin({
                      address: address as `0x${string}`,
                    });
                    console.log(receipt);
                  } catch (e) {
                    console.log("TRANSACTION FAILED");
                    console.log(e);
                  }
                }}
                className="text-white font-bold text-2xl border border-2 border-white p-4 rounded-xl"
              >
                SetOrigin
              </button>
              <button
                onClick={async () => {
                  try {
                    const receipt = await testCrosschain({
                      address,
                      chainId: chainId,
                      targetChainId: arbitrumSepolia.id,
                    });
                    console.log(receipt);
                  } catch (e) {
                    console.log("TRANSACTION FAILED");
                    console.log(e);
                  }
                }}
                className="text-white font-bold text-2xl border border-2 border-white p-4 rounded-xl"
              >
                Crosschain Testing
              </button>
            </div>
          ))} */}
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
            <div className="relative"></div>
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
