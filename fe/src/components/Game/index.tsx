import { GameState } from "@/utils/interface";
import PlayersRoster from "./PlayersRoster";
import GamePlay from "./GamePlay";
import CardDeck from "./CardDeck";
import { useState } from "react";

export default function Game({
  gameState,
  roomCode,
}: {
  gameState: GameState | null;
  roomCode: string;
}) {
  const [showAttackOptions, setShowAttackOptions] = useState<
    null | (boolean | null)[]
  >(null);
  return (
    gameState != null &&
    Object.keys(gameState).length != 0 && (
      <>
        <PlayersRoster
          gameState={gameState}
          roomCode={roomCode}
          showAttackOptions={showAttackOptions}
          setShowAttackOptions={setShowAttackOptions}
        />
        <GamePlay gameState={gameState} roomCode={roomCode as string} />
        {gameState.currentPlay?.state != "choose_character" && (
          <CardDeck
            gameState={gameState}
            setShowAttackOptions={setShowAttackOptions}
            roomCode={roomCode}
          />
        )}
      </>
    )
  );
}
