"use client";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Image from "next/image";
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  formatEther,
  http,
  parseEther,
} from "viem";
import { arbitrumSepolia } from "viem/chains";

export default function Page() {
  const { address, status, chainId } = useAccount();
  const { data } = useBalance();
  const [currency, setCurrency] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-around select-none xl:w-[33%] lg:w-[50%] md:w-[70%] sm:w-[85%] w-full mx-auto relative">
      <Image
        className="absolute"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="back"
      />
      <div className="flex absolute top-2 left-4 w-full items-center justify-between">
        <div className="flex">
          <Image
            className="relative pt-4 "
            src="/logo.png"
            width={50}
            height={150}
            alt="back"
          />
          <Image
            className="relative pt-4 ml-4 my-auto"
            src="/logo-text.png"
            width={120}
            height={150}
            alt="back"
          />
        </div>
        <div className="font-semibold top-2 relative w-[90px] h-[50px] bg-black rounded-lg flex justify-center items-center cursor-pointer mr-8">
          <Image
            src="/misc/balance.png"
            width={90}
            height={50}
            alt="back"
            className="absolute contain bg-repeat-y"
          />
          <div className="flex justify-center w-full absolute">
            <Image
              className="relative right-2"
              src={"/logos/nouns.gif"}
              width={50}
              height={50}
              alt="back"
            />
            <p className="my-auto relative right-4 top-[1px] text-sm text-white">
              {data?.formatted}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-32">
        <Image
          src="/buttons/Shop.png"
          width={300}
          height={250}
          alt="back"
          className="mx-auto"
        />
        <div className="w-[460px] relative top-0">
          <Image
            src="/misc/lobbybox.png"
            width={460}
            height={600}
            alt="back"
            className="absolute top-0"
          />

          <div className="grid grid-cols-2 space-b-4 w-full relative top-24">
            <div className="flex flex-col justify-center items-center w-full">
              <Image
                src="/characters/akasa.png"
                width={120}
                height={200}
                alt="back"
              />
              <div
                className="font-semibold relative w-[60px] h-[70px] cursor-pointer"
                onClick={() => {
                  // approve token
                  // buy item
                }}
              >
                <Image
                  src="/misc/balance.png"
                  width={60}
                  height={70}
                  alt="back"
                  className="absolute"
                />
                <div className="flex justify-center w-full absolute top-1 ">
                  <Image
                    className="relative right-2"
                    src={"/logos/nouns.gif"}
                    width={50}
                    height={50}
                    alt="back"
                  />
                  <p className="my-auto relative right-4 top-[1px] text-sm text-white">
                    65
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <Image
                src="/characters/toji.png"
                width={120}
                height={200}
                alt="back"
              />
              <div
                className="font-semibold relative w-[60px] h-[70px] cursor-pointer"
                onClick={() => {}}
              >
                <Image
                  src="/misc/balance.png"
                  width={60}
                  height={70}
                  alt="back"
                  className="absolute"
                />
                <div className="flex justify-center w-full absolute top-1 ">
                  <Image
                    className="relative right-2"
                    src={"/logos/nouns.gif"}
                    width={50}
                    height={50}
                    alt="back"
                  />
                  <p className="my-auto relative right-4 top-[1px] text-sm text-white">
                    90
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <Image
                src="/characters/yorichi.png"
                width={120}
                height={200}
                alt="back"
              />
              <div
                className="font-semibold relative w-[60px] h-[70px] cursor-pointer"
                onClick={() => {}}
              >
                <Image
                  src="/misc/balance.png"
                  width={60}
                  height={70}
                  alt="back"
                  className="absolute"
                />
                <div className="flex justify-center w-full absolute top-1 ">
                  <Image
                    className="relative right-2"
                    src={"/logos/nouns.gif"}
                    width={50}
                    height={50}
                    alt="back"
                  />
                  <p className="my-auto relative right-4 top-[1px] text-sm text-white">
                    100
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <Image
                src="/characters/sanemi.png"
                width={120}
                height={200}
                alt="back"
              />
              <div
                className="font-semibold relative w-[60px] h-[70px] cursor-pointer"
                onClick={() => {}}
              >
                <Image
                  src="/misc/balance.png"
                  width={60}
                  height={70}
                  alt="back"
                  className="absolute"
                />
                <div className="flex justify-center w-full absolute top-1 ">
                  <Image
                    className="relative right-2"
                    src={"/logos/nouns.gif"}
                    width={50}
                    height={50}
                    alt="back"
                  />
                  <p className="my-auto relative right-4 top-[1px] text-sm text-white">
                    40
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
