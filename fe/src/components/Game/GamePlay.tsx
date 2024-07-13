import { GameState } from "@/utils/interface";
import ChooseCharacter from "./ChooseCharacter";
import DeclareLord from "./DeclareLord";
import acknowledgeLord from "@/utils/games/acknowledgeLord";
import { useEffect, useState } from "react";
import WaitingForMove from "./WaitingForMove";
import Equipped from "./Equipped";
import AttackSummary from "./AttackSummary";
import WaitingForDiscard from "./WaitingForDiscard";
import Potion from "./Potion";
import Trance from "./Trance";
import { useAccount } from "wagmi";

export default function GamePlay({
  gameState,
  roomCode,
}: {
  gameState: GameState;
  roomCode: string;
}) {
  const [acked, setAcked] = useState<boolean>(false);
  const { address } = useAccount();
  return (
    <div className="flex-1 bg-white flex flex-col w-full">
      {gameState.currentPlay != null ? (
        gameState.currentPlay.state == "choose_character" ? (
          <ChooseCharacter
            gameState={gameState}
            roomCode={roomCode as string}
          />
        ) : gameState.currentPlay.state == "declare_lord" ? (
          <DeclareLord
            acked={acked}
            lord={gameState.players.filter((player) => player.role == 0)[0]}
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
            address={(address ?? "").toLowerCase()}
          />
        ) : gameState.currentPlay.state == "equip_armour" ||
          gameState.currentPlay.state == "equip_pet" ? (
          <Equipped
            roomCode={roomCode}
            gameState={gameState}
            address={address ?? ""}
            cardId={gameState.currentPlay.metadata.cardId}
          />
        ) : gameState.currentPlay.state == "attack" ? (
          <AttackSummary
            roomCode={roomCode}
            gameState={gameState}
            address={(address ?? "").toLowerCase()}
          />
        ) : gameState.currentPlay.state == "waiting_for_discard" ? (
          <WaitingForDiscard
            roomCode={roomCode}
            gameState={gameState}
            address={(address ?? "").toLowerCase()}
          />
        ) : gameState.currentPlay.state == "potion" ? (
          <Potion
            cardId={gameState.currentPlay.metadata.cardId}
            roomCode={roomCode}
            gameState={gameState}
            address={(address ?? "").toLowerCase()}
          />
        ) : (
          gameState.currentPlay.state == "trance" && (
            <Trance
              cardId={gameState.currentPlay.metadata.cardId}
              roomCode={roomCode}
              gameState={gameState}
              address={(address ?? "").toLowerCase()}
            />
          )
        )
      ) : (
        <div>Waiting for Players to join the game...</div>
      )}
    </div>
  );
}
