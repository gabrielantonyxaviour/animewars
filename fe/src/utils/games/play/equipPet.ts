import { cards, characters } from "@/utils/constants";
import { GameState, Player } from "@/utils/interface";
import supabase from "@/utils/supabase";
import { ConfigSource } from "@worldcoin/idkit/internal";

export default async function equipPet(
  playerId: number,
  gameState: GameState,
  cardId: number,
  roomCode: string
) {
  const tempState = gameState;
  const usedCard = cards[cardId];

  tempState.currentPlay = {
    state: "equip_pet",
    by: playerId,
    to: playerId,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn : 0,
    metadata: {
      cardId: cardId,
    },
  };

  tempState.players[playerId].equippedPet = cardId;
  tempState.players[playerId].cards = gameState.players[playerId].cards.filter(
    (card) => card != usedCard.id
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
