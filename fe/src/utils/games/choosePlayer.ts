import { createPublicClient, createWalletClient, custom, http } from "viem";
import { ARBITRUM_TESTNET, characters, EVM_ABI } from "../constants";
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

  const walletClient = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum!),
  });

  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  });

  if (chainId != arbitrumSepolia.id) {
    await walletClient.switchChain({ id: arbitrumSepolia.id });
  }
  const { request } = await publicClient.simulateContract({
    chain: arbitrumSepolia,
    address: ARBITRUM_TESTNET,
    account: address,
    abi: EVM_ABI,
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
