import { GameState, Player } from "@/utils/interface";

export default function inflictDamage(
  gameState: GameState,
  players: Player[],
  defenderId: number,
  damage: number
): GameState {
  const tempState = gameState;
  const defender = players[defenderId];
  const availableDamage = damage;

  if (availableDamage < defender.armour) {
    tempState.players[defenderId].armour = defender.armour - availableDamage;
    return tempState;
  } else if (availableDamage == defender.armour) {
    tempState.players[defenderId].armour = 0;
    return tempState;
  } else {
    tempState.players[defenderId].armour = 0;
    tempState.players[defenderId].health =
      defender.health - (availableDamage - defender.armour);
    return tempState;
  }
}
