"use client";

import Game from "@/components/Game";
import GameNavbar from "@/components/Game/GameNavbar";
import {
  cards,
  INITIAL_CARDS_DEALT,
  MAX_PLAYERS_COUNT,
} from "@/utils/constants";
import enterGame from "@/utils/games/enterGame";
import getGame from "@/utils/games/getGame";
import shuffleCards from "@/utils/games/shuffleCards";
import { GameState, Player } from "@/utils/interface";
import getPlayer from "@/utils/rooms/getPlayer";
import getRoomPlayers from "@/utils/rooms/getRoomPlayers";
import isRoomFull from "@/utils/rooms/isRoomfull";
import supabase from "@/utils/supabase";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const searchParams = useSearchParams();
  const { primaryWallet, isAuthenticated, sdkHasLoaded } = useDynamicContext();
  const roomCode = searchParams.get("code");
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    if (sdkHasLoaded && !isAuthenticated) window.location.href = "/";

    getGame(roomCode as string).then((game) => {
      console.log("GANEEES");
      console.log(game.data.state);
      setGameState(game.data.state);
    });
  }, []);

  useEffect(() => {
    if (primaryWallet == null) return;
    if (gameState != null && Object.keys(gameState).length == 0)
      getRoomPlayers(roomCode as string).then((roomPlayers) => {
        getPlayer(address.toLowerCase()).then((player) => {
          isRoomFull(roomCode as string).then((roomFull) => {
            console.log("ROOM FULL", roomFull);
            if (!roomFull) window.location.href = "/room?code=" + roomCode;
            console.log("ROOM PLAYERS");
            console.log(roomPlayers.data);
            console.log(player.data.id);
            if (player.data.id == roomPlayers.data[2].id) {
              // Get order
              const lordId = Math.floor(Math.random() * MAX_PLAYERS_COUNT);
              const order = shuffleCards([0, 1, 2, 3, 4]);
              const deck = shuffleCards(cards.map((card) => card.id));
              enterGame({
                code: roomCode as string,
                players: roomPlayers.data.map((player: any, index: number) => {
                  return {
                    id: player.id,
                    order: order[index],
                    name: player.name,
                    address: player.address,
                    pfp_id: player.pfp_id,
                    character: null,
                    equippedArmour: null,
                    equippedPet: null,
                    cards: new Array(INITIAL_CARDS_DEALT)
                      .fill(0)
                      .map(
                        (_, inner_index) =>
                          deck[index * INITIAL_CARDS_DEALT + inner_index]
                      ),
                    health: 0,
                    armour: 0,
                    tranceCooldown: 0,
                    poisonCooldown: 0,
                    isLord: index == lordId,
                    isAlive: true,
                  };
                }),
                deck: deck,
              }).then((res) => {
                console.log("ENTER GAME");
                console.log(res);
                setGameState(res.data.state);
              });
            }
          });
        });
      });
  }, [primaryWallet, gameState]);

  useEffect(() => {
    supabase
      .channel("realtime game changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `code=eq.${roomCode}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.new.state.turn == 0) {
            console.log("HERE IS THE PROBELMSMMMKDVSDJOFjSDIOJOK");
          }
          setGameState(payload.new.state as GameState);
        }
      )
      .subscribe();
  }, [supabase, roomCode, gameState, setGameState]);
  if (primaryWallet == null) return <div></div>;

  return (
    <div className="h-screen flex flex-col items-center space-y-4 select-none xl:w-[33%] lg:w-[50%] md:w-[70%] sm:w-[85%] w-full mx-auto relative">
      <Image
        className="absolute"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="back"
      />
      <GameNavbar roomCode={roomCode as string} primaryWallet={primaryWallet} />
      <Game
        gameState={gameState}
        roomCode={roomCode as string}
        primaryWallet={primaryWallet}
      />
    </div>
  );
}

export default Page;
