import { cards, MAX_PLAYERS_COUNT } from "@/utils/constants";
import { GameState } from "@/utils/interface";
import supabase from "@/utils/supabase";

export default async function useSpell(
  playerId: number,
  gameState: GameState,
  cardId: number,
  roomCode: string
) {
  const tempState = gameState;
  const usedSpell = cards[cardId];
  let metadata = null;
  if (usedSpell.cardId == 16) {
    const damages = tempState.players.map((player, index) => {
      if (index != playerId) {
        player.cards.findIndex((c) => cards[c].cardId == 14);
        if (index == -1) {
          tempState.players[index].health -= 1;
          if (tempState.players[index].health == 0) {
            // TODO: Trigger death sequence
          }
          return 1;
        } else return 0;
      } else return 0;
    });
  } else {
    tempState.spellsDisabled =
      tempState.spellsDisabled == 0 || tempState.spellsDisabled < tempState.turn
        ? tempState.turn + MAX_PLAYERS_COUNT
        : tempState.spellsDisabled + MAX_PLAYERS_COUNT;
  }

  tempState.currentPlay = {
    state: "spell",
    by: gameState.players[playerId].id,
    to: null,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn : 0,
    metadata: metadata,
  };
  tempState.players[playerId].cards.filter((c) => c == usedSpell.id);
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
