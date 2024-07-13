import { cards } from "@/utils/constants";
import checkCanAttack from "@/utils/games/play/checks/checkCanAttack";
import checkCardDisabled from "@/utils/games/play/checks/checkCardDisabled";
import discard from "@/utils/games/play/discard";
import equipArmour from "@/utils/games/play/eqiupArmour";
import { GameState, Player } from "@/utils/interface";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useState } from "react";

export default function CardDeck({
  primaryWallet,
  gameState,
  setShowAttackOptions,
  roomCode,
}: {
  primaryWallet: Wallet;
  gameState: GameState;
  setShowAttackOptions: React.Dispatch<
    React.SetStateAction<null | (boolean | null)[]>
  >;
  roomCode: string;
}) {
  const players = gameState.players;
  const playerId = gameState.players.findIndex(
    (player) => player.address == primaryWallet.address.toLowerCase()
  );
  const isPlaying =
    gameState.players[(gameState.turn - 1) % 5].address ==
    primaryWallet.address.toLowerCase();
  const cardIds = gameState.players.filter(
    (player) =>
      player.address.toLowerCase() == primaryWallet.address.toLowerCase()
  )[0].cards;
  const [cardSelected, setCardSelected] = useState<number | null>(null);
  return (
    <div className="relative w-full bottom-4">
      <div className="absolute inset-0 w-full h-full z-10  flex justify-center items-center">
        <div
          className="w-full h-full bg-repeat bg-contain"
          style={{ backgroundImage: "url('/deckbox.png')" }}
        ></div>
      </div>
      <div
        className="relative flex justify-center items-center w-full space-x-4 z-20  py-4 no-scrollbar"
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {cardIds.map((cardIndex, index) => (
          <>
            <Image
              key={index}
              src={cards[cardIndex - 1].image}
              width={80}
              height={60}
              alt="card"
              className={`rounded-lg cursor-pointer ${
                cardSelected == index
                  ? "scale-110"
                  : "hover:scale-110 transform transition-transform duration-200"
              }  ${index == 0 && "ml-2"}`}
              style={
                !(gameState.currentPlay?.state == "waiting_for_discard") &&
                checkCardDisabled({
                  cardId: cardIndex,
                  player: players[playerId],
                  isPlaying,
                  spellsDisabled: gameState.turn < gameState.spellsDisabled,
                })
                  ? {
                      filter: "brightness(50%)",
                      opacity: 0.5,
                      pointerEvents: "none",
                    }
                  : {}
              }
              onClick={() => {
                if (gameState.currentPlay?.state == "waiting_for_discard") {
                  discard({
                    gameState,
                    playerIndex: playerId,
                    selectedCardIndex: cardIndex,
                    roomCode,
                  });
                } else if (
                  checkCardDisabled({
                    cardId: cardIndex,
                    player: players[playerId],
                    isPlaying,
                    spellsDisabled: gameState.turn < gameState.spellsDisabled,
                  })
                )
                  return;
                if (cards[cardIndex - 1].name == "Attack") {
                  setCardSelected(index);
                  setShowAttackOptions(checkCanAttack(players, playerId));
                } else if (cards[cardIndex - 1].kind == "armour") {
                  if (players[playerId].equippedArmour != null) {
                    // TODO: Tell already equipped armour
                  } else {
                    equipArmour(playerId, gameState, cardIndex - 1, roomCode);
                  }
                } else if (cards[(cardIndex = 1)].kind == "pet") {
                  // equip pet
                } else if (cards[(cardIndex = 1)].kind == "spell") {
                  // show spell
                } else if (cards[cardIndex - 1].name == "Potion") {
                } else if (cards[cardIndex - 1].name == "Trance") {
                }
                // cards[cardIndex - 1];
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
}
