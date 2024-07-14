import { GameState } from "@/utils/interface";
import Image from "next/image";
import PlayerCard from "./PlayerCard";
import { cards, MAX_PLAYERS_COUNT } from "@/utils/constants";
import setDiscard from "@/utils/games/play/setDiscard";

export default function Trance({
  roomCode,
  gameState,
  address,
  cardId,
}: {
  roomCode: string;
  gameState: GameState;
  address: string;
  cardId: number;
}) {
  return (
    <div className="relative py-12 mt-12 mb-4 flex flex-col justify-center space-y-4 items-center  w-full z-50">
      <Image
        src={"/box.png"}
        layout="fill"
        objectFit="contain"
        alt="back"
        className="absolute"
      />
      <p className="text-xl relative text-black text-center">
        {gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].address ==
        (address ?? "").toLowerCase()
          ? "You "
          : gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].name}
        used Trance <br /> +2 HP and +1 ATK
      </p>
      <div className="flex space-x-8">
        <PlayerCard
          gameState={gameState}
          index={gameState.turn - 1}
          player={gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT]}
          isAttackable={false}
          roomCode={roomCode}
          setShowAttackOptions={null}
        />
        <Image
          src={cards[cardId].image}
          width={90}
          height={90}
          alt="card"
          className={`relative rounded-lg`}
        />
      </div>
      <button
        disabled={
          gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].address !=
          (address ?? "").toLowerCase()
        }
        onClick={() => {
          setDiscard({ gameState, roomCode, address });
        }}
        className="bg-red-500 p-2 rounded-lg relative"
      >
        {gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].address !=
        (address ?? "").toLowerCase()
          ? "Waiting for Turn"
          : "End Turn"}
      </button>
    </div>
  );
}
