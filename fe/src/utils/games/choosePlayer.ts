import { characters } from "../constants";
import { GameState } from "../interface";
import supabase from "../supabase";

export default async function choosePlayer({
  roomCode,
  state,
  address,
  characterId,
}: {
  roomCode: string;
  state: GameState;
  address: string;
  characterId: number;
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
