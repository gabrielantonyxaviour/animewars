import { GameState } from "@/utils/interface";
import PlayersRoster from "./PlayersRoster";
import GamePlay from "./GamePlay";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import CardDeck from "./CardDeck";
import { useState } from "react";

export default function Game({
  gameState,
  roomCode,
  primaryWallet,
}: {
  gameState: GameState | null;
  roomCode: string;
  primaryWallet: Wallet;
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
        <GamePlay
          gameState={gameState}
          roomCode={roomCode as string}
          primaryWallet={primaryWallet}
        />
        {gameState.currentPlay?.state != "choose_character" && (
          <CardDeck
            gameState={gameState}
            primaryWallet={primaryWallet}
            setShowAttackOptions={setShowAttackOptions}
            roomCode={roomCode}
          />
        )}
      </>
    )
  );
}
