import { createPublicClient, createWalletClient, custom, http } from "viem";
import {
  FHENIX_EVM_ABI,
  FHENIX_EVM_ARBITRUM_ADDRESS,
  FHENIX_EVM_ZIRCUIT_ADDRESS,
  INITIAL_CARDS_DEALT,
  MAX_PLAYERS_COUNT,
  ONLY_ZIRCUIT,
} from "../constants";
import { GameState, Player } from "../interface";
import supabase from "../supabase";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";
import { fhenixTestnet } from "../chains";

export default async function enterGame({
  code,
  players,
  deck,
}: {
  code: string;
  players: Player[];
  deck: number[];
}) {
  const tempDeck = deck.slice(INITIAL_CARDS_DEALT * MAX_PLAYERS_COUNT);
  const initGameState: GameState = {
    turn: 1,
    players: players,
    deck: tempDeck,
    spellsDisabled: 0,
    initTransaction: "",
    currentPlay: {
      state: "choose_character",
      by: 0,
      to: null,
      move: 0,
      turn: 1,
      metadata: {
        count: 0,
      },
    },
    winner: null,
    gameState: "in progress",
  };

  const account = privateKeyToAccount(
    process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
  );

  const walletClient = createWalletClient({
    account,
    transport: custom(window.ethereum),
  });

  const publicClient = createPublicClient({
    chain: ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const { request } = await publicClient.simulateContract({
    chain: ONLY_ZIRCUIT ? zircuitTestnet : arbitrumSepolia,
    account: account.address,
    address: ONLY_ZIRCUIT
      ? FHENIX_EVM_ZIRCUIT_ADDRESS
      : FHENIX_EVM_ARBITRUM_ADDRESS,
    abi: FHENIX_EVM_ABI,
    functionName: "instantiateGame",
    args: [code, players.map((player) => player.address), fhenixTestnet.id],
  });
  const tx = await walletClient.writeContract(request);
  console.log("GAME INITIATED");
  console.log(tx);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(receipt);
  // initGameState.initTransaction = tx;
  // TODO: Get random number and update
  const { data: game, error } = await supabase
    .from("games")
    .update({ state: initGameState })
    .eq("code", code)
    .select();

  if (game == null) return { success: false, data: "Game not found" };
  else {
    return {
      success: true,
      data: game[0],
    };
  }
}
