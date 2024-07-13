import { cards, MAX_PLAYERS_COUNT, TRANCE_COOLDOWN } from "@/utils/constants";
import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";

export default async function usePotion(
  playerId: number,
  gameState: GameState,
  cardId: number,
  roomCode: string
) {
  const tempState = gameState;
  const usedPotion = cards[cardId];
  tempState.players[playerId].health += 1;
  tempState.currentPlay = {
    state: "potion",
    by: playerId,
    to: null,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn : 0,
    metadata: {
      cardId: cardId,
    },
  };
  tempState.players[playerId].cards = tempState.players[playerId].cards.filter(
    (c) => c != usedPotion.id - 1
  );
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
