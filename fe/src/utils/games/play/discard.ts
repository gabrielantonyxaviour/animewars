import { fhenixTestnet } from "@/utils/chains";
import {
  ARBITRUM_TESTNET,
  EVM_ABI,
  MAX_PLAYERS_COUNT,
} from "@/utils/constants";
import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";

export default async function discard({
  gameState,
  address,
  roomCode,
  selectedCardIndex,
  chainId,
}: {
  gameState: GameState;
  address: `0x${string}`;
  roomCode: string;
  selectedCardIndex: number;
  chainId: number;
}) {
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
  tempState.players[(tempState.turn - 1) % MAX_PLAYERS_COUNT].cards = new Array(
    8
  )
    .fill(0)
    .map(() => Math.floor(Math.random() * 108));

  const walletClient = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum!),
  });

  if (chainId != arbitrumSepolia.id) {
    await walletClient.switchChain({ id: arbitrumSepolia.id });
  }
  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  });
  const { request } = await publicClient.simulateContract({
    chain: arbitrumSepolia,
    address: ARBITRUM_TESTNET,
    abi: EVM_ABI,
    account: address,
    functionName: "makeMove",
    args: [
      roomCode,
      playerIndex,
      [
        [playerIndex, 1, 0],
        [playerIndex, 3, 2],
      ],
      fhenixTestnet.id,
      address,
    ],
  });
  const tx = await walletClient.writeContract(request);
  console.log("PLAYER CHOSEN");
  console.log(tx);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(receipt);

  if (
    tempState.players[(tempState.turn - 1) % MAX_PLAYERS_COUNT].cards.length < 8
  ) {
    tempState.players[(tempState.turn - 1) % MAX_PLAYERS_COUNT].cards.push(
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
