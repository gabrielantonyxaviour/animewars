import { fhenixTestnet } from "@/utils/chains";
import {
  FHENIX_EVM_ABI,
  FHENIX_EVM_ARBITRUM_ADDRESS,
  FHENIX_EVM_ZIRCUIT_ADDRESS,
  MAX_PLAYERS_COUNT,
  ONLY_ZIRCUIT,
} from "@/utils/constants";
import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";
import { useAccount } from "wagmi";

export default async function discard({
  gameState,
  address,
  roomCode,
  selectedCardIndex,
}: {
  gameState: GameState;
  address: string;
  roomCode: string;
  selectedCardIndex: number;
}) {
  const { chainId } = useAccount();
  const tempState = gameState;
  console.log("PLAYER address", address);
  console.log("SELECTED CARD INDEX", selectedCardIndex);
  const playerIndex = tempState.players.findIndex(
    (player) => player.address.toLowerCase() == address.toLowerCase()
  );
  tempState.players[playerIndex].cards = tempState.players[
    playerIndex
  ].cards.filter((card) => card != selectedCardIndex);
  tempState.currentPlay = {
    state: "waiting_for_move",
    by: (tempState.turn + 1) % MAX_PLAYERS_COUNT,
    to: null,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn + 1 : 0,
    metadata: null,
  };
  tempState.turn += 1;

  const walletClient = createWalletClient({
    transport: custom(window.ethereum!),
  });
  const chain = ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia;

  if (chainId != chain.id) {
    await walletClient.switchChain({ id: chainId || 0 });
  }
  const publicClient = createPublicClient({
    chain: ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia,
    transport: http(),
  });
  const { request } = await publicClient.simulateContract({
    chain: ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia,
    address: ONLY_ZIRCUIT
      ? FHENIX_EVM_ZIRCUIT_ADDRESS
      : FHENIX_EVM_ARBITRUM_ADDRESS,
    abi: FHENIX_EVM_ABI,
    functionName: "makeMove",
    args: [
      roomCode,
      playerIndex.toString(),
      [
        [playerIndex, 1, 0],
        [playerIndex, 3, 2],
      ],
      fhenixTestnet.id,
      address as `0x${string}`,
    ],
    value: BigInt("0"),
  });
  const tx = await walletClient.writeContract(request);
  console.log("PLAYER CHOSEN");
  console.log(tx);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(receipt);

  if (tempState.players[tempState.turn - 1].cards.length < 8) {
    tempState.players[tempState.turn - 1].cards.push(
      Math.floor(Math.random() * 108)
    );
  }

  const { data, error } = await supabase
    .from("games")
    .update({ state: tempState })
    .eq("code", roomCode)
    .select();

  if (data == null) return { success: false, data: "Game not found" };
  else {
    return {
      success: true,
      data: data[0],
    };
  }
}
