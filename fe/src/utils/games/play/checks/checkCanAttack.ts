import { cards, characters, MAX_PLAYERS_COUNT } from "@/utils/constants";
import { Player } from "@/utils/interface";

export default function checkCanAttack(
  players: Player[],
  playerId: number
): (boolean | null)[] {
  const attacker = players[playerId];
  let attackRange = 1;
  const character = characters[attacker.character || 0];

  if (character.name == "Monkey D Luffy") attackRange += 1;
  if (attacker.equippedPet != null && cards[attacker.equippedPet].cardId == 13)
    attackRange += 1;

  let canAttack = new Array(MAX_PLAYERS_COUNT).fill(false);
  canAttack[attacker.order] = null;
  for (let i = 1; i <= attackRange; i++) {
    const attackPosition = (attacker.order + i) % MAX_PLAYERS_COUNT;
    if (i != 1 && players[i].character == 4) canAttack[attackPosition] = false;
    if (i == attackRange) {
      const defendingPlayer = players[i];
      if (
        defendingPlayer.equippedPet == null ||
        cards[defendingPlayer.equippedPet].id != 12
      )
        canAttack[attackPosition] = true;
    } else canAttack[attackPosition] = true;
  }

  return canAttack;
}
