import { GameState } from "../interface";
import supabase from "../supabase";

export default async function acknowledgeLord({
  roomCode,
  state,
}: {
  roomCode: string;
  state: GameState;
}) {
  const tempState = state;
  if (tempState.currentPlay == null)
    return { success: false, data: "Game state error. Current PLay is null" };
  tempState.currentPlay.metadata.count += 1;
  if (tempState.currentPlay.metadata.count == tempState.players.length) {
    tempState.currentPlay.state = "waiting_for_move";
    tempState.turn = 1;
    tempState.currentPlay.metadata = {
      player: 0,
    };
  }

  const { data: gameState, error } = await supabase
    .from("games")
    .update({ state: tempState })
    .eq("code", roomCode)
    .select();

  if (gameState == null) return { success: false, data: "Game not found" };
  else return { success: true, data: gameState[0] };
}
