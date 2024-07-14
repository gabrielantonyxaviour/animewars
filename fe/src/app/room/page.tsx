"use client";
import getRoomPlayers from "@/utils/rooms/getRoomPlayers";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import supabase from "@/utils/supabase";
import { MAX_PLAYERS_COUNT } from "@/utils/constants";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function Page() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const [players, setPlayers] = React.useState<any[]>([]);
  const { address, status } = useAccount();

  useEffect(() => {
    getRoomPlayers(roomCode || "").then((res) => {
      if (res.success) {
        setPlayers(res.data);
      }
    });
  }, []);

  useEffect(() => {
    supabase
      .channel("realtime room changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
        },
        (payload) => {
          console.log("Change received!", payload);
          if (payload.eventType == "INSERT") {
            if (payload.new.current_game == roomCode) {
              console.log("PLAYER JOINED THE ROOM");
              console.log(payload.new);
              setPlayers([...players, payload.new]);
            }
          }
          if (payload.eventType == "UPDATE") {
            if (payload.new.current_game == roomCode) {
              console.log("PLAYER JOINED THE ROOM");
              console.log(payload.new);
              setPlayers([...players, payload.new]);
            } else if (
              payload.new.current_game == null &&
              players.some((player) => player.id == payload.new.id)
            ) {
              console.log("PLAYER LEFT THE ROOM");
              console.log(payload.new);
              setPlayers(
                players.filter((player) => player.id != payload.new.id)
              );
            }
          }
        }
      )
      .subscribe();
    if (players.length == MAX_PLAYERS_COUNT) {
      window.location.href = `/game?code=${roomCode}`;
    }
  }, [supabase, players, setPlayers]);
  return (
    <div className="h-screen flex flex-col items-center justify-around select-none xl:w-[33%] lg:w-[50%] md:w-[70%] sm:w-[85%] w-full mx-auto relative">
      <Image
        className="absolute"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="back"
      />
      <div className="flex absolute top-12 left-25 items-center">
        <Image
          className="relative pt-4 "
          src="/logo.png"
          width={70}
          height={150}
          alt="back"
        />
        <Image
          className="relative pt-4 ml-4"
          src="/logo-text.png"
          width={150}
          height={150}
          alt="back"
        />
      </div>
      <div className="absolute top-32">
        <Image
          src="/buttons/Lobby.png"
          width={300}
          height={200}
          alt="back"
          className="mx-auto"
        />
        <div className="w-[460px] relative top-0">
          <Image
            src="/misc/lobbybox.png"
            width={460}
            height={600}
            alt="back"
            className="absolute top-0"
          />
          <div className="text-center font-semibold relative top-16 text-black">
            <p>
              WAITING FOR PLAYERS... {players.length}/{MAX_PLAYERS_COUNT}
            </p>
            <p className="text-sm">Room code : {roomCode}</p>
            {players.map((player: any) => (
              <div className="w-[80%] flex justify-center mx-auto mt-2 ">
                <img
                  src={`https://noun-api.com/beta/pfp?name=${player.pfp_id}&size=70`}
                  alt="pfp"
                  className="rounded-lg border relative -right-3"
                  style={{
                    border: "11px solid transparent",
                    borderImageSource: 'url("/misc/border.png")',
                    borderImageSlice: 20,
                    borderImageRepeat: "round",
                    zIndex: 10,
                  }}
                />
                <div className="relative -left-3 w-[400px] my-2">
                  <Image
                    src="/misc/WoodBoard.png"
                    width={400}
                    height={100}
                    alt="back"
                    className="absolute "
                  />
                  <div className="relative text-start text-white ml-8 mt-4">
                    <p>{player.name}</p>
                    <p>
                      {player.address.slice(0, 10)}...{player.address.slice(-8)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className="h-screen flex flex-col justify-center items-center space-y-4"
    //   style={{
    //     backgroundImage: "url('/background.png')",
    //   }}
    // >
    //   <p className="text-5xl font-bold">Anime Wars</p>
    //   <p className="text-2xl font-semibold">Room Code: {roomCode}</p>
    //   <p>Total Players Count: {players.length}</p>
    //   <div className="flex w-full justify-around">
    //     {players.map((player: any) => (
    //       <div className="p-4 border border-2 border-white rounded-xl text-center">
    //         <img
    //           src={`https://noun-api.com/beta/pfp?name=${player.pfp_id}&size=100`}
    //           alt="pfp"
    //           className="w-16 h-16 rounded-full mx-auto"
    //         />
    //         <p>{player.name}</p>
    //         <p className="text-gray-500">{`${player.address.slice(
    //           0,
    //           10
    //         )}...${player.address.slice(-8)}`}</p>
    //       </div>
    //     ))}
    //     {players.length != MAX_PLAYERS_COUNT &&
    //       new Array(MAX_PLAYERS_COUNT - players.length)
    //         .fill(0)
    //         .map((_, index) => (
    //           <div
    //             className="p-4 border border-2 border-white rounded-xl text-center "
    //             key={index}
    //           >
    //             <img
    //               src={`/profile.jpg`}
    //               alt="pfp"
    //               className="w-16 h-16 rounded-full mx-auto"
    //             />
    //             <p>Waiting for Player</p>
    //             <p className="text-gray-500">0x00000000...00000000</p>
    //           </div>
    //         ))}
    //   </div>
    //   <button
    //     className="text-white p-2 my-4 rounded-lg bg-red-700"
    //     onClick={async () => {
    //       const { data, error } = await supabase
    //         .from("players")
    //         .update({ current_game: null })
    //         .eq("address", (address ?? "").toLowerCase())
    //         .select(); // Ensure this line is only used if you're querying updated rows

    //       if (error) {
    //         console.error("Error updating player:", error);
    //       } else if (data) {
    //         console.log("Player updated successfully:", data);
    //         window.location.href = "/";
    //       }
    //     }}
    //   >
    //     Leave Room
    //   </button>
    //   {players.length < MAX_PLAYERS_COUNT ? (
    //     <button className="text-white p-2 rounded-lg bg-yellow-700" disabled>
    //       Waiting for Players
    //     </button>
    //   ) : (
    //     <button
    //       className="text-white p-2 rounded-lg bg-green-600 "
    //       onClick={() => {
    //         window.location.href = `/game?code=${roomCode}`;
    //       }}
    //     >
    //       Join Game
    //     </button>
    //   )}
    // </div>
  );
}
