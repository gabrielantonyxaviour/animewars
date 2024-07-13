"use client";
import React, { use, useEffect, useState } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

import { baseSepolia } from "viem/chains";
import {
  createPublicClient,
  decodeAbiParameters,
  hexToBigInt,
  http,
} from "viem";
import {
  WORLDCOIN_TESTER_ABI,
  WORLDCOIN_TESTER_ADDRESS,
} from "@/utils/constants";

function Page() {
  const { primaryWallet, sdkHasLoaded, isAuthenticated } = useDynamicContext();
  const [proofState, setProofState] = useState<number>(0);
  const [txHash, setTxHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (sdkHasLoaded && !isAuthenticated) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <p className="font-bold text-5xl text-white">Anime Wars</p>
      {proofState == 0 ? (
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`}
          action="enter-game"
          signal={primaryWallet?.address as `0x${string}`}
          verification_level={VerificationLevel.Orb}
          onError={() => {
            setProofState(3);
          }}
          onSuccess={async (worldcoinData) => {
            const { merkle_root, proof, nullifier_hash, verification_level } =
              worldcoinData;
            setProofState(1);
            const walletClient = await createWalletClientFromWallet(
              primaryWallet as Wallet
            );
            const bigNumProofs = decodeAbiParameters(
              [{ type: "uint256[8]" }],
              proof as `0x${string}`
            )[0];
            const publicClient = createPublicClient({
              chain: baseSepolia,
              transport: http(
                `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
              ),
            });
            console.log("PARAMS");
            console.log([
              primaryWallet?.address,
              hexToBigInt(merkle_root as `0x${string}`),
              hexToBigInt(nullifier_hash as `0x${string}`),
              bigNumProofs,
            ]);
            try {
              const { request } = await publicClient.simulateContract({
                account: primaryWallet?.address as `0x${string}`,
                address: WORLDCOIN_TESTER_ADDRESS as `0x${string}`,
                abi: WORLDCOIN_TESTER_ABI,
                functionName: "verifyAndExecute",
                args: [
                  primaryWallet?.address,
                  hexToBigInt(merkle_root as `0x${string}`),
                  hexToBigInt(nullifier_hash as `0x${string}`),
                  bigNumProofs,
                ],
              });

              const tx = await walletClient.writeContract(request);
              console.log(tx);
              setTxHash(tx);
              setProofState(2);
            } catch (e) {
              console.log(e);
              setError((e as any).toString());
              setProofState(3);
            }
          }}
        >
          {({ open }) => (
            <button
              className="my-4 px-2 py-4 border border-white border-[1px] rounded-xl"
              onClick={open}
            >
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
      ) : proofState == 1 ? (
        <button className="my-4 px-2 py-4 border border-yellow-500 border-[1px] rounded-xl">
          Proof Generated. Verifiying on-chain...
        </button>
      ) : proofState == 2 ? (
        <button
          className="my-4 px-2 py-4 border border-green-500 border-[1px] rounded-xl"
          onClick={() => {
            setProofState(0);
          }}
        >
          Proof Verified on chain!
        </button>
      ) : (
        <button
          className="my-4 px-2 py-4 border border-red-500 border-[1px] rounded-xl"
          onClick={() => {
            setProofState(0);
          }}
        >
          Failed. Please try again.
        </button>
      )}
      {txHash.length > 0 && (
        <p className="my-4 font-semibold">Tx Hash: {txHash}</p>
      )}
    </div>
  );
}

export default Page;
