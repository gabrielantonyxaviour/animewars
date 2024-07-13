import { GameState } from "@/utils/interface";
import PlayerCard from "./PlayerCard";
import Image from "next/image";
import { useEffect } from "react";
// import triggerEndMove from "@/utils/transactions/write/triggerEndMove";

export default function WaitingForDiscard({
  roomCode,
  gameState,
  address,
}: {
  gameState: GameState;
  roomCode: string;
  address: string;
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
      <p className="text-3xl relative text-black">
        {gameState.players[(gameState.turn - 1) % 5].address ==
        (address ?? "").toLowerCase()
          ? "Choose Your"
          : gameState.players[(gameState.turn - 1) % 5].name + "'s"}
        &nbsp;discard
      </p>
      <PlayerCard
        gameState={gameState}
        index={gameState.turn - 1}
        player={gameState.players[(gameState.turn - 1) % 5]}
        isAttackable={false}
        roomCode={roomCode}
        setShowAttackOptions={null}
      />
      <button disabled className="bg-yellow-500 p-2 rounded-lg relative">
        Waiting for Discard...
      </button>
    </div>
  );
}
