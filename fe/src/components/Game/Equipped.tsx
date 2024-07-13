import { GameState } from "@/utils/interface";
import Image from "next/image";
import { cards } from "@/utils/constants";
import PlayerCard from "./PlayerCard";
import setDiscard from "@/utils/games/play/setDiscard";

export default function Equipped({
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
        {gameState.players[(gameState.turn - 1) % 5].address ==
        address.toLowerCase()
          ? "You "
          : gameState.players[(gameState.turn - 1) % 5].name}
        equipped <br /> {cards[cardId].name}
      </p>
      <div className="flex space-x-8">
        <PlayerCard
          gameState={gameState}
          index={gameState.turn - 1}
          player={gameState.players[(gameState.turn - 1) % 5]}
          isAttackable={false}
          roomCode={roomCode}
          setShowAttackOptions={null}
        />
        <Image
          src={cards[cardId].image}
          width={100}
          height={100}
          alt="card"
          className={`relative rounded-lg`}
        />
      </div>
      <button
        onClick={() => {
          setDiscard({ gameState, roomCode, address });
        }}
        className="bg-red-500 p-2 rounded-lg relative"
      >
        End Turn
      </button>
    </div>
  );
}