import { cards } from "@/utils/constants";
import { GameState } from "@/utils/interface";
import inflictDamage from "./helpers/inflictDamage";
import supabase from "@/utils/supabase";

export default async function triggerAttack(
  attackerId: number,
  defenderId: number,
  gameState: GameState,
  usedAttackId: number,
  roomCode: string
) {
  let tempState = gameState;

  const attacker = tempState.players[attackerId];
  const defender = tempState.players[defenderId];

  let redAttack = attacker.cards.filter((c) => c < 16);
  let blackAttack = attacker.cards.filter((c) => c > 15 && c < 31);
  let redDodge = defender.cards.filter((c) => c > 30 && c < 46);
  let blackDodge = defender.cards.filter((c) => c > 45 && c < 60);

  let redAttackCount = redAttack.length;
  let blackAttackCount = blackAttack.length;
  let redDodgeCount = redDodge.length;
  let blackDodgeCount = blackDodge.length;

  if (defender.character == 0 || defender.equippedArmour == 9)
    blackAttackCount = 0;
  else if (defender.character == 5) redAttackCount = 0;

  const result =
    redAttackCount + blackAttackCount - redDodgeCount - blackDodgeCount;
  const attack =
    result > 0
      ? attacker.tranceCooldown > 0
        ? defender.character != 1
          ? 2
          : 1
        : 1
      : 0;
  let reverseDamageInflicted = 0;
  if (result > 0) {
    tempState = inflictDamage(
      tempState,
      tempState.players,
      attackerId,
      defenderId,
      attack
    );

    // Check if Shinobu is dying
    if (tempState.players[defenderId].health == 0) {
      // TODO: Trigger death sequence

      // SHinobu effect
      if (tempState.players[defenderId].character == 6) {
        reverseDamageInflicted = 2;
        tempState = inflictDamage(
          tempState,
          tempState.players,
          attackerId,
          defenderId,
          2
        );
      }
    }
  } else {
    // defence won
  }

  tempState.currentPlay = {
    state: "attack",
    by: attackerId,
    to: defenderId,
    move: tempState.currentPlay != null ? tempState.currentPlay.move + 1 : 0,
    turn: tempState.currentPlay != null ? tempState.currentPlay.turn : 0,
    metadata: {
      winner: result > 0 ? attackerId : defenderId,
      redAttack,
      blackAttack,
      redDodge,
      blackDodge,
      damageInflicted: attack,
      reverseDamageInflicted,
    },
  };
  if (result < 0) {
    tempState.players[attackerId].cards = attacker.cards.filter(
      (card) => card != usedAttackId
    );
  } else {
    tempState.players[defenderId].cards =
      redDodge.concat(blackDodge).length > 0
        ? defender.cards.filter(
            (card) => redDodge.concat(blackDodge)[0] == card
          )
        : defender.cards;
  }

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
