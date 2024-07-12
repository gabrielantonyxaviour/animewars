"use client";
import CreateGameModal from "@/components/Home/CreateGameModal";
import JoinGameModal from "@/components/Home/JoinGameModal";
import Loading from "@/components/Loading";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

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

      {isAuthenticated && (
        <div className="relative flex flex-col text-center">
          <DynamicWidget />

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
        </div>
      )}

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
