import { cards, INITIAL_CARDS_DEALT, MAX_PLAYERS_COUNT } from "../constants";
import { GameState, Player } from "../interface";
import supabase from "../supabase";

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
