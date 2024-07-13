import { GameState } from "@/utils/interface";
import ChooseCharacter from "./ChooseCharacter";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import DeclareLord from "./DeclareLord";
import acknowledgeLord from "@/utils/games/acknowledgeLord";
import { useEffect, useState } from "react";
import WaitingForMove from "./WaitingForMove";
import Equipped from "./Equipped";
// import triggerEndMove from "@/utils/transactions/write/triggerEndMove";
import AttackSummary from "./AttackSummary";
import WaitingForDiscard from "./WaitingForDiscard";

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
            roomCode={roomCode}
            gameState={gameState}
            address={primaryWallet.address.toLowerCase()}
          />
        ) : gameState.currentPlay.state == "equip_armour" ||
          gameState.currentPlay.state == "equip_pet" ? (
          <Equipped
            roomCode={roomCode}
            gameState={gameState}
            address={primaryWallet.address}
            cardId={gameState.currentPlay.metadata.cardId}
          />
        ) : gameState.currentPlay.state == "attack" ? (
          <AttackSummary
            roomCode={roomCode}
            gameState={gameState}
            address={primaryWallet.address.toLowerCase()}
          />
        ) : (
          gameState.currentPlay.state == "waiting_for_discard" && (
            <WaitingForDiscard
              roomCode={roomCode}
              gameState={gameState}
              address={primaryWallet.address.toLowerCase()}
            />
          )
        )
      ) : (
        <div>Waiting for Players to join the game...</div>
      )}
    </div>
  );
}
