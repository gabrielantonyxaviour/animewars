import { characters } from "@/utils/constants";
import { GamePlay, GameState, Player } from "@/utils/interface";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import HealthAndArmour from "./HealthAndArmour";
import PlayerCard from "./PlayerCard";

export default function PlayersRoster({
  showAttackOptions,
  gameState,
  setShowAttackOptions,
  roomCode,
}: {
  roomCode: string;
  gameState: GameState;
  showAttackOptions: null | (boolean | null)[];
  setShowAttackOptions: React.Dispatch<
    React.SetStateAction<null | (boolean | null)[]>
  >;
}) {
  return (
    <div
      className="w-full no-scrollbar"
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <div className="flex justify-around space-x-4">
        {gameState.players != null &&
          gameState.players
            .sort((a, b) => a.order - b.order)
            .map((player, index) => (
              <PlayerCard
                setShowAttackOptions={setShowAttackOptions}
                gameState={gameState}
                index={index}
                player={player}
                roomCode={roomCode}
                isAttackable={
                  showAttackOptions != null && showAttackOptions[index]
                    ? true
                    : false
                }
              />
            ))}
      </div>
    </div>
  );
}
