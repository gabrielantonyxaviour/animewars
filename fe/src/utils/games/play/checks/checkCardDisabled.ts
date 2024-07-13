import { cards, characters } from "@/utils/constants";
import { Player } from "@/utils/interface";

export default function checkCardDisabled({
  cardId,
  isPlaying,
  player,
  spellsDisabled,
}: {
  cardId: number;
  isPlaying: boolean;
  player: Player;
  spellsDisabled: boolean;
}) {
  if (!isPlaying) return true;

  if (player.health > 2 && cards[cardId].name == "Trance") return true;

  if (player.armour != null && cards[cardId].kind == "armour") return true;

  if (
    cards[cardId].name == "Potion" &&
    player.health == characters[player.character || 0].maxHealth
  )
    return true;

  if (cards[cardId].name == "Dodge") return true;

  if (cards[cardId].cardId == 14) return true;

  return false;
}
