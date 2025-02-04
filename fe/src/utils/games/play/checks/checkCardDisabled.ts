import { cards, characters } from "@/utils/constants";
import { GamePlay, Player } from "@/utils/interface";

export default function checkCardDisabled({
  cardId,
  isPlaying,
  player,
  spellsDisabled,
  currentPlay,
}: {
  cardId: number;
  isPlaying: boolean;
  player: Player;
  spellsDisabled: boolean;
  currentPlay: GamePlay | null;
}) {
  if (!isPlaying) return true;

  if (currentPlay != null && currentPlay.state == "attack") return true;
  if (player.health > 2 && cards[cardId].name == "Trance") return true;
  if (player.equippedArmour != null && cards[cardId].kind == "armour")
    return true;
  if (player.equippedPet != null && cards[cardId].kind == "pet") return true;
  if (
    cards[cardId].name == "Potion" &&
    player.health == characters[player.character || 0].maxHealth
  )
    return true;

  if (cards[cardId].name == "Dodge") return true;

  if (cards[cardId].cardId == 14) return true;

  if (spellsDisabled && cards[cardId].kind == "spell") return true;

  return false;
}
