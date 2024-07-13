import { GameState } from "@/utils/interface";
import ChooseCharacter from "./ChooseCharacter";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import DeclareLord from "./DeclareLord";
import acknowledgeLord from "@/utils/games/acknowledgeLord";
import { useEffect, useState } from "react";
import WaitingForMove from "./WaitingForMove";
import Equipped from "./Equipped";
import triggerEndMove from "@/utils/transactions/write/triggerEndMove";
import AttackSummary from "./AttackSummary";

export default function GamePlay({
  gameState,
  roomCode,
  primaryWallet,
}: {
  gameState: GameState;
  roomCode: string;
  primaryWallet: Wallet;
}) {
  const [acked, setAcked] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  useEffect(() => {
    if (timeLeft === 0) {
      triggerEndMove();
    }

    setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
    }, 1000);
  }, [timeLeft]);
  return (
    <div className="flex-1 bg-white flex flex-col w-full">
      {gameState.currentPlay != null ? (
        gameState.currentPlay.state == "choose_character" ? (
          <ChooseCharacter
            gameState={gameState}
            primaryWallet={primaryWallet}
            roomCode={roomCode as string}
          />
        ) : gameState.currentPlay.state == "declare_lord" ? (
          <DeclareLord
            acked={acked}
            lord={
              gameState.players.filter((player) => player.isLord == true)[0]
            }
            ack={() => {
              acknowledgeLord({
                roomCode: roomCode,
                state: gameState,
              }).then((val: any) => {
                setAcked(true);
              });
            }}
          />
        ) : gameState.currentPlay.state == "waiting_for_move" ? (
          <WaitingForMove
            timeLeft={timeLeft}
            gameState={gameState}
            address={primaryWallet.address.toLowerCase()}
          />
        ) : gameState.currentPlay.state == "equip_armour" ||
          gameState.currentPlay.state == "equip_pet" ? (
          <Equipped
            gameState={gameState}
            address={primaryWallet.address}
            cardId={gameState.currentPlay.metadata.cardId}
            timeLeft={timeLeft}
          />
        ) : (
          gameState.currentPlay.state == "attack" && (
            <AttackSummary gameState={gameState} />
          )
        )
      ) : (
        <div>Waiting for Players to join the game...</div>
      )}
    </div>
  );
}
