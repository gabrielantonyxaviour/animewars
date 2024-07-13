import { fhenixTestnet } from "@/utils/chains";
import {
  FHENIX_EVM_ABI,
  FHENIX_EVM_ARBITRUM_ADDRESS,
  FHENIX_EVM_ZIRCUIT_ADDRESS,
} from "@/utils/constants";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";

export default async function instantiateGame({
  address,
  chainId,
  targetChainId,
  gameCode,
  players,
}: {
  address: string;
  chainId: number;
  targetChainId: number;
  gameCode: string;
  players: string[];
}) {
  const walletClient = createWalletClient({
    transport: custom(window.ethereum!),
  });
  if (chainId != targetChainId) {
    await walletClient.switchChain({ id: targetChainId });
  }

  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(arbitrumSepolia.rpcUrls.default.http[0]),
  });
  const { request } = await publicClient.simulateContract({
    chain: arbitrumSepolia,
    account: address as `0x${string}`,
    address: (chainId == arbitrumSepolia.id
      ? FHENIX_EVM_ARBITRUM_ADDRESS
      : FHENIX_EVM_ZIRCUIT_ADDRESS) as `0x${string}`,
    abi: FHENIX_EVM_ABI,
    functionName: "instantiateGame",
    args: [gameCode, players, fhenixTestnet.id],
  });

  const tx = await walletClient.writeContract(request);
  console.log(tx);

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });

  return receipt;
}
