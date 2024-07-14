import { MAX_PLAYERS_COUNT } from "@/utils/constants";
import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";

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
  const tempState = gameState;
  console.log("PLAYER address", address);
  console.log("SELECTED CARD INDEX", selectedCardIndex);
  const playerIndex = tempState.players.findIndex(
    (player) => player.address == address
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
