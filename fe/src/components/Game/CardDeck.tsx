import { cards, MAX_PLAYERS_COUNT } from "@/utils/constants";
import checkCanAttack from "@/utils/games/play/checks/checkCanAttack";
import checkCardDisabled from "@/utils/games/play/checks/checkCardDisabled";
import discard from "@/utils/games/play/discard";
import equipArmour from "@/utils/games/play/eqiupArmour";
import equipPet from "@/utils/games/play/equipPet";
import usePotion from "@/utils/games/play/usePotion";
import useTrance from "@/utils/games/play/useTrance";
import { GameState, Player } from "@/utils/interface";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function CardDeck({
  gameState,
  setShowAttackOptions,
  roomCode,
}: {
  gameState: GameState;
  setShowAttackOptions: React.Dispatch<
    React.SetStateAction<null | (boolean | null)[]>
  >;
  roomCode: string;
}) {
  const { address, chainId } = useAccount();
  const players = gameState.players;
  const playerId = gameState.players.findIndex(
    (player) => player.address == (address ?? "").toLowerCase()
  );
  const isPlaying =
    gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].address ==
    (address ?? "").toLowerCase();
  const cardIds = gameState.players.filter(
    (player) => player.address.toLowerCase() == (address ?? "").toLowerCase()
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
                !(
                  gameState.currentPlay?.state == "waiting_for_discard" &&
                  (gameState.turn - 1) % MAX_PLAYERS_COUNT == playerId
                ) &&
                checkCardDisabled({
                  cardId: cardIndex,
                  player: players[playerId],
                  isPlaying,
                  spellsDisabled: gameState.turn < gameState.spellsDisabled,
                  currentPlay: gameState.currentPlay,
                })
                  ? {
                      filter: "brightness(50%)",
                      opacity: 0.5,
                      pointerEvents: "none",
                    }
                  : {}
              }
              onClick={() => {
                if (
                  gameState.currentPlay?.state == "waiting_for_discard" &&
                  (gameState.turn - 1) % MAX_PLAYERS_COUNT == playerId
                ) {
                  discard({
                    gameState,
                    address: address == undefined ? "0x" : address,
                    selectedCardIndex: cardIndex,
                    roomCode,
                    chainId: chainId ?? 0,
                  });
                  return;
                } else if (
                  checkCardDisabled({
                    cardId: cardIndex,
                    player: players[playerId],
                    isPlaying,
                    spellsDisabled: gameState.turn < gameState.spellsDisabled,
                    currentPlay: gameState.currentPlay,
                  })
                )
                  return;

                console.log(cards[cardIndex - 1].name == "Potion");

                if (cards[cardIndex - 1].name == "Attack") {
                  console.log("ATTACK");
                  setCardSelected(index);
                  setShowAttackOptions(checkCanAttack(players, playerId));
                } else if (cards[cardIndex - 1].kind == "armour") {
                  console.log("ARMOUR");
                  equipArmour(playerId, gameState, cardIndex - 1, roomCode);
                } else if (cards[cardIndex - 1].kind == "pet") {
                  console.log("PET");
                  equipPet(playerId, gameState, cardIndex - 1, roomCode);
                } else if (cards[cardIndex - 1].kind == "spell") {
                  // show spell
                } else if (cards[cardIndex - 1].name == "Potion") {
                  console.log("YEAAA");
                  usePotion(playerId, gameState, cardIndex, roomCode);
                } else if (cards[cardIndex - 1].name === "Trance") {
                  useTrance(playerId, gameState, cardIndex, roomCode);
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
