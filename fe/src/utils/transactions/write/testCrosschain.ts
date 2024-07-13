import { fhenixTestnet } from "@/utils/chains";
import { FHENIX_EVM_ABI, FHENIX_EVM_ARBITRUM_ADDRESS } from "@/utils/constants";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { arbitrumSepolia } from "viem/chains";

export default async function testCrosschain({
  address,
  chainId,
  targetChainId,
}: {
  address: string;
  chainId: number;
  targetChainId: number;
}): Promise<any> {
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
    address: FHENIX_EVM_ARBITRUM_ADDRESS as `0x${string}`,
    abi: FHENIX_EVM_ABI,
    functionName: "testing",
    args: [fhenixTestnet.id],
  });

  const tx = await walletClient.writeContract(request);
  console.log(tx);

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });

  return receipt;
}
