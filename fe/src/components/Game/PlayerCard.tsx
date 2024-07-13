import { cards, characters } from "@/utils/constants";
import { GamePlay, GameState, Player } from "@/utils/interface";
import Image from "next/image";
import HealthAndArmour from "./HealthAndArmour";
import triggerAttack from "@/utils/games/play/triggerAttack";

export default function PlayerCard({
  index,
  player,
  gameState,
  isAttackable,
  roomCode,
  setShowAttackOptions,
}: {
  index: number;
  player: Player;
  gameState: GameState;
  isAttackable: boolean;
  roomCode: string;
  setShowAttackOptions: React.Dispatch<
    React.SetStateAction<null | (boolean | null)[]>
  > | null;
}) {
  return (
    <div
      key={index}
      className={`w-[90px] cursor-pointer relative ${
        gameState != null && (gameState.turn - 1) % 5 == index
          ? "bg-green-500"
          : isAttackable
          ? "bg-red-500"
          : ""
      }`}
      onClick={() => {
        if (isAttackable) {
          console.log("Attacking Player");
          console.log(gameState.players[gameState.turn - 1]);
          console.log("Defending Player");
          console.log(player);
          console.log("Game State");
          console.log(gameState.turn - 1);
          console.log(player.order);
          triggerAttack(
            gameState.turn - 1,
            player.order,
            gameState,
            cards[index].id - 1,
            roomCode
          );
          if (setShowAttackOptions != null) setShowAttackOptions(null);
        }
      }}
    >
      <div className="border-white rounded-lg text-center w-[90px] h-[90px]">
        {player.character != null ? (
          <Image
            src={characters[player.character].card}
            width={90}
            height={90}
            alt="character"
            className=" rounded-lg"
          />
        ) : (
          <Image
            src={"/profile.jpg"}
            width={90}
            height={90}
            alt="character"
            className="rounded-lg"
          />
        )}
      </div>
      <button
        onClick={() => {
          // show player info
        }}
        className="absolute right-1 top-1 mx-auto"
      >
        <img
          src={`https://noun-api.com/beta/pfp?name=${player.pfp_id}&size=100`}
          alt="pfp"
          className="w-8 h-8"
        />
      </button>
      <HealthAndArmour
        maxArmour={
          player.character == null ? 4 : characters[player.character].maxArmour
        }
        maxHealth={
          player.character == null ? 4 : characters[player.character].maxHealth
        }
        armour={player.character == null ? 0 : player.armour}
        health={player.character == null ? 0 : player.health}
      />
    </div>
  );
}
