import { createPublicClient, createWalletClient, custom, http } from "viem";
import {
  characters,
  FHENIX_EVM_ABI,
  FHENIX_EVM_ARBITRUM_ADDRESS,
  FHENIX_EVM_ZIRCUIT_ADDRESS,
  ONLY_ZIRCUIT,
} from "../constants";
import { GameState } from "../interface";
import supabase from "../supabase";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";
import { fhenixTestnet } from "../chains";
import { useAccount } from "wagmi";

export default async function choosePlayer({
  roomCode,
  state,
  address,
  characterId,
  chainId,
}: {
  roomCode: string;
  state: GameState;
  address: `0x${string}`;
  characterId: number;
  chainId: number;
}) {
  const tempState = state;
  const playerIndex = tempState.players.findIndex(
    (player) => player.address === address
  );
  tempState.players[playerIndex].character = characterId;
  if (tempState.currentPlay == null) {
    tempState.currentPlay = {
      state: "choose_character",
      by: playerIndex,
      to: null,
      move: 0,
      turn: 1,
      metadata: {
        count: 0,
      },
    };
  }
  const chain = ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia;

  const walletClient = createWalletClient({
    transport: custom(window.ethereum!),
  });

  if (chainId != chain.id) {
    await walletClient.switchChain({ id: chainId || 0 });
  }
  const publicClient = createPublicClient({
    chain: ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia,
    transport: http(),
  });
  const { request } = await publicClient.simulateContract({
    chain: ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia,
    account: address,
    address: ONLY_ZIRCUIT
      ? FHENIX_EVM_ZIRCUIT_ADDRESS
      : FHENIX_EVM_ARBITRUM_ADDRESS,
    abi: FHENIX_EVM_ABI,
    functionName: "signUp",
    args: [
      roomCode,
      playerIndex.toString(),
      characterId.toString(),
      fhenixTestnet.id,
      address,
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
  tempState.currentPlay.metadata.count += 1;
  tempState.players[playerIndex].health = characters[characterId].maxHealth;
  if (tempState.currentPlay.metadata.count == tempState.players.length) {
    tempState.currentPlay.state = "declare_lord";
    tempState.currentPlay.metadata.count = 0;
  }

  const { data: gameState, error } = await supabase
    .from("games")
    .update({ state: tempState })
    .eq("code", roomCode)
    .select();

  if (gameState == null) return { success: false, data: "Game not found" };
  else return { success: true, data: gameState[0] };
}
