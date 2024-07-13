import { GameState, Player } from "@/utils/interface";

export default function inflictDamage(
  gameState: GameState,
  players: Player[],
  attackerId: number,
  defenderId: number,
  damage: number
): GameState {
  const tempState = gameState;
  const attacker = players[attackerId];
  const defender = players[defenderId];
  // attacker won

  if (damage == 1)
    tempState.players[defenderId].armour =
      defender.armour > 0 ? defender.armour - 1 : defender.health - 1;
  else {
    tempState.players[defenderId].armour =
      defender.armour > 1 ? defender.armour - 2 : 0;
    tempState.players[defenderId].health =
      defender.armour > 1
        ? defender.health
        : defender.armour == 1
        ? defender.health - 1
        : defender.health - 2;
  }

  return tempState;
}
