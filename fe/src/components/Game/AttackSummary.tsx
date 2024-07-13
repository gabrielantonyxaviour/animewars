import { GameState } from "@/utils/interface";
import Image from "next/image";
import { useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { cards } from "@/utils/constants";
import setDiscard from "@/utils/games/play/setDiscard";

export default function AttackSummary({
  roomCode,
  gameState,
  address,
}: {
  roomCode: string;
  address: string;
  gameState: GameState;
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
        {gameState != null
          ? gameState.currentPlay?.metadata.winner == gameState.currentPlay?.to
            ? gameState.players[gameState.currentPlay?.to || 0].name +
              " dodged the attack"
            : gameState.players[(gameState.turn - 1) % 5].name +
              " damaged " +
              gameState.players[gameState.currentPlay?.to || 0].name +
              " by " +
              gameState.currentPlay?.metadata.damageInflicted
          : ""}
      </p>
      <div className="flex space-x-8">
        <PlayerCard
          gameState={gameState}
          roomCode={roomCode}
          setShowAttackOptions={null}
          index={-1}
          player={gameState.players[(gameState.turn - 1) % 5]}
          isAttackable={false}
        />
        <PlayerCard
          gameState={gameState}
          roomCode={roomCode}
          setShowAttackOptions={null}
          index={-1}
          player={gameState.players[(gameState.currentPlay?.to || 0) % 5]}
          isAttackable={false}
        />
      </div>
      <p className="text-2xl text-black relative">Summary</p>
      <div className="text-center text-md text-black relative">
        <p>
          {gameState.players[gameState.currentPlay?.by || 0].name}&apos;s
          attack:{" "}
          {gameState.currentPlay?.metadata.redAttack.length +
            gameState.currentPlay?.metadata.blackAttack.length}
        </p>
        <p>
          {gameState.players[gameState.currentPlay?.to || 0].name}&apos;s
          defence:{" "}
          {gameState.currentPlay?.metadata.redDodge.length +
            gameState.currentPlay?.metadata.blackDodge.length}
        </p>
      </div>

      <button
        disabled={
          gameState.players[(gameState.turn - 1) % 5].address !=
          address.toLowerCase()
        }
        onClick={() => {
          setDiscard({ gameState, roomCode, address });
        }}
        className="bg-red-500 p-2 rounded-lg relative"
      >
        {gameState.players[(gameState.turn - 1) % 5].address !=
        address.toLowerCase()
          ? "Waiting for Turn"
          : "End Turn"}
      </button>
    </div>
  );
}
