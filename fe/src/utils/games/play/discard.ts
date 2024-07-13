import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";

export default async function discard({
  gameState,
  playerIndex,
  roomCode,
  selectedCardIndex,
}: {
  gameState: GameState;
  playerIndex: number;
  roomCode: string;
  selectedCardIndex: number;
}) {
  const tempState = gameState;
  console.log("PLAYER INDEX", playerIndex);
  console.log("SELECTED CARD INDEX", selectedCardIndex);
  tempState.players[playerIndex].cards = tempState.players[
    playerIndex
  ].cards.filter((card, index) => card != selectedCardIndex);
  tempState.turn += 1;
  tempState.currentPlay = {
    state: "waiting_for_move",
    by: (tempState.turn + 1) % 5,
    to: null,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn + 1 : 0,
    metadata: null,
  };

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
