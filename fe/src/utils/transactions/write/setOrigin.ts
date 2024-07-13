import { fhenixTestnet } from "@/utils/chains";
import {
  FHENIX_CORE_ABI,
  FHENIX_CORE_ADDRESS,
  FHENIX_EVM_ARBITRUM_ADDRESS,
} from "@/utils/constants";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { getTransactionReceipt } from "viem/actions";
import { arbitrumSepolia } from "viem/chains";

export default async function setOrigin({
  address,
}: {
  address: string;
}): Promise<any> {
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
      "0x" + FHENIX_EVM_ARBITRUM_ADDRESS.slice(2).padStart(64, "0"),
    ],
  });

  const tx = await walletClient.writeContract(request);
  console.log(tx);
  const receipt = await getTransactionReceipt(publicClient, {
    hash: tx,
  });

  return receipt;
}
