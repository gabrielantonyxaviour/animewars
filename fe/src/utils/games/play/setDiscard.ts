import { cards, MAX_PLAYERS_COUNT } from "@/utils/constants";
import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";

export default async function setDiscard({
  address,
  gameState,
  roomCode,
}: {
  address: string;
  gameState: GameState;
  roomCode: string;
}) {
  const tempState = gameState;
  let metadata = null;

  tempState.currentPlay = {
    state: "waiting_for_discard",
    by: gameState.players.filter((p) => p.address == address)[0].id,
    to: null,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn : 0,
    metadata: metadata,
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
