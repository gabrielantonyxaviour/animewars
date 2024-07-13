import { characters } from "@/utils/constants";
import choosePlayer from "@/utils/games/choosePlayer";
import { GameState } from "@/utils/interface";
import { Wallet } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";

export default function ChooseCharacter({
  gameState,
  primaryWallet,
  roomCode,
}: {
  gameState: GameState;
  primaryWallet: Wallet;
  roomCode: string;
}) {
  return gameState.players[
    gameState.players.findIndex(
      (player) =>
        player.address.toLowerCase() == primaryWallet.address.toLowerCase()
    )
  ].character == null ? (
    <div className="relative w-[70%] py-12 mb-4 flex flex-col space-y-4 justify-center items-center w-full">
      {gameState.players.filter(
        (player) =>
          player.address.toLowerCase() ==
          (primaryWallet as any).address.toLowerCase()
      )[0].isLord ? (
        <>
          <Image
            src={"/box.png"}
            layout="fill"
            objectFit="contain"
            alt="back"
            className="absolute"
          />
          <p className="relative text-black text-center font-semibold text-2xl">
            You are the LORD
          </p>
          <p className="relative text-black text-center  ">
            Choose your character for the game
          </p>
          <div className="flex justify-around my-4 ">
            {characters.slice(0, 2).map((character, index) => (
              <button
                key={index}
                onClick={() => {
                  if (primaryWallet == null) return;

                  choosePlayer({
                    roomCode: roomCode as string,
                    state: gameState,
                    address: primaryWallet.address.toLowerCase(),
                    characterId: index,
                  }).then(() => {
                    console.log("CHOOSED PLAYER");
                  });
                }}
              >
                <Image
                  src={character.card}
                  width={120}
                  className=" hover:scale-110 transform transition-transform duration-200"
                  height={120}
                  alt="character"
                  key={index}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (primaryWallet == null) return;

              choosePlayer({
                roomCode: roomCode as string,
                state: gameState,
                address: primaryWallet.address.toLowerCase(),
                characterId: 2,
              }).then(() => {
                console.log("CHOOSED PLAYER");
              });
            }}
          >
            <Image
              src={characters[2].card}
              width={120}
              className=" hover:scale-110 transform transition-transform duration-200"
              height={120}
              alt="character"
              key={2}
            />
          </button>
        </>
      ) : (
        <>
          <Image
            src={"/box.png"}
            layout="fill"
            objectFit="contain"
            alt="back"
            className="absolute"
          />
          <p className="relative text-black text-center font-semibold text-2xl">
            You are a {"TRAITOR"}
          </p>
          <p className="relative text-black text-center">
            Choose your character for the game
          </p>
          <div className="relative flex justify-around my-4">
            {characters.slice(3, 6).map((character, index) => (
              <button
                key={index}
                onClick={() => {
                  if (primaryWallet == null) return;

                  choosePlayer({
                    roomCode: roomCode as string,
                    state: gameState,
                    address: primaryWallet.address.toLowerCase(),
                    characterId: character.id - 1,
                  });
                }}
              >
                <Image
                  src={character.card}
                  width={120}
                  height={120}
                  alt="character"
                  className=" hover:scale-110 transform transition-transform duration-200"
                  key={index}
                />
              </button>
            ))}
          </div>
          <div className="relative flex justify-around my-4 mx-16">
            {characters.slice(6, 8).map((character, index) => (
              <button
                key={index}
                onClick={() => {
                  if (primaryWallet == null) return;

                  choosePlayer({
                    roomCode: roomCode as string,
                    state: gameState,
                    address: primaryWallet.address.toLowerCase(),
                    characterId: character.id - 1,
                  }).then((returndata: any) => {
                    console.log("CHOOSED PLAYER");
                    console.log(returndata);
                  });
                }}
              >
                <Image
                  src={character.card}
                  width={120}
                  height={120}
                  alt="character"
                  key={index}
                  className=" hover:scale-110 transform transition-transform duration-200"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="w-[70%] bg-white py-4">
      <p className="text-black text-center font-semibold text-2xl">
        You chose{" "}
        {
          characters[
            gameState.players[
              gameState.players.findIndex(
                (player) =>
                  player.address.toLowerCase() ==
                  primaryWallet.address.toLowerCase()
              )
            ].character || 0
          ].name
        }
      </p>
      <p className="text-black text-center  ">
        Waiting for other players {gameState.currentPlay?.metadata.count}/5
      </p>
      <div className="flex justify-center my-4 ">
        <Image
          src={
            characters[
              gameState.players[
                gameState.players.findIndex(
                  (player) =>
                    player.address.toLowerCase() ==
                    primaryWallet.address.toLowerCase()
                )
              ].character || 0
            ].card
          }
          width={120}
          height={120}
          alt="character"
        />
      </div>
    </div>
  );
}
