import { GameState } from "@/utils/interface";
import PlayerCard from "./PlayerCard";
import Image from "next/image";
import { useEffect } from "react";
// import triggerEndMove from "@/utils/transactions/write/triggerEndMove";
import setDiscard from "@/utils/games/play/setDiscard";
import { MAX_PLAYERS_COUNT } from "@/utils/constants";

export default function WaitingForMove({
  roomCode,
  gameState,
  address,
}: {
  gameState: GameState;
  roomCode: string;
  address: string;
}) {
  useEffect(() => {
    console.log("GAME STAETATFOEDFJNOSDIFVOISFNVS");
    console.log(gameState);
  }, []);
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
        {gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].address ==
        (address ?? "").toLowerCase()
          ? "Your"
          : gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT].name +
            "'s"}
        &nbsp;turn
      </p>
      <PlayerCard
        gameState={gameState}
        index={gameState.turn - 1}
        player={gameState.players[(gameState.turn - 1) % MAX_PLAYERS_COUNT]}
        isAttackable={false}
        roomCode={roomCode}
        setShowAttackOptions={null}
      />
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
          <p className="absolute left-16 top-3 text-md text-black">END TURN</p>
        </div>
      )}
    </div>
  );
}
