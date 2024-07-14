import { GameState } from "@/utils/interface";
import Image from "next/image";
import { useEffect } from "react";
import PlayerCard from "./PlayerCard";
import { cards, MAX_PLAYERS_COUNT } from "@/utils/constants";
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
            : gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].name +
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
          player={gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT]}
          isAttackable={false}
        />
        <PlayerCard
          gameState={gameState}
          roomCode={roomCode}
          setShowAttackOptions={null}
          index={-1}
          player={
            gameState.players[
              (gameState.currentPlay?.to || 0) % MAX_PLAYERS_COUNT
            ]
          }
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
      {gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].address !=
      (address ?? "").toLowerCase() ? (
        <div
          className="font-semibold top-6 relative w-[180px] h-[70px]"
          onClick={() => {}}
        >
          <Image
            src="/buttons/Wallet.png"
            width={180}
            height={70}
            alt="back"
            className="absolute"
          />
          <p className="absolute left-10 top-2 text-sm text-white">
            WAITING FOR TURN
          </p>
        </div>
      ) : (
        <div
          className="font-semibold top-6 relative w-[200px] h-[70px] cursor-pointer hover:scale-110 transform transition-transform duration-200"
          onClick={() => {
            setDiscard({ gameState, roomCode, address });
          }}
        >
          <Image
            src="/buttons/ButtonOne.png"
            className="absolute "
            width={200}
            height={70}
            alt="back"
          />
          <p className="absolute left-10 top-2 text-md text-black">END TURN</p>
        </div>
      )}
    </div>
  );
}
