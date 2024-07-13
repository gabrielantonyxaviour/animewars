"use client";
import getRoomPlayers from "@/utils/rooms/getRoomPlayers";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import supabase from "@/utils/supabase";
import { MAX_PLAYERS_COUNT } from "@/utils/constants";
import { useAccount } from "wagmi";

export default function Page() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("code");
  const [players, setPlayers] = React.useState<any[]>([]);
  const { address, status } = useAccount();

  useEffect(() => {
    if (status !== "connected") {
      window.location.href = "/";
    }
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
  }, [supabase, players, setPlayers]);
  return (
    <div
      className="h-screen flex flex-col justify-center items-center space-y-4"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <p className="text-5xl font-bold">Anime Wars</p>
      <p className="text-2xl font-semibold">Room Code: {roomCode}</p>
      <p>Total Players Count: {players.length}</p>
      <div className="flex w-full justify-around">
        {players.map((player: any) => (
          <div className="p-4 border border-2 border-white rounded-xl text-center">
            <img
              src={`https://noun-api.com/beta/pfp?name=${player.pfp_id}&size=100`}
              alt="pfp"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p>{player.name}</p>
            <p className="text-gray-500">{`${player.address.slice(
              0,
              10
            )}...${player.address.slice(-8)}`}</p>
          </div>
        ))}
        {players.length != MAX_PLAYERS_COUNT &&
          new Array(MAX_PLAYERS_COUNT - players.length)
            .fill(0)
            .map((_, index) => (
              <div
                className="p-4 border border-2 border-white rounded-xl text-center "
                key={index}
              >
                <img
                  src={`/profile.jpg`}
                  alt="pfp"
                  className="w-16 h-16 rounded-full mx-auto"
                />
                <p>Waiting for Player</p>
                <p className="text-gray-500">0x00000000...00000000</p>
              </div>
            ))}
      </div>
      <button
        className="text-white p-2 my-4 rounded-lg bg-red-700"
        onClick={async () => {
          const { data, error } = await supabase
            .from("players")
            .update({ current_game: null })
            .eq("address", (address ?? "").toLowerCase())
            .select(); // Ensure this line is only used if you're querying updated rows

          if (error) {
            console.error("Error updating player:", error);
          } else if (data) {
            console.log("Player updated successfully:", data);
            window.location.href = "/";
          }
        }}
      >
        Leave Room
      </button>
      {players.length < MAX_PLAYERS_COUNT ? (
        <button className="text-white p-2 rounded-lg bg-yellow-700" disabled>
          Waiting for Players
        </button>
      ) : (
        <button
          className="text-white p-2 rounded-lg bg-green-600 "
          onClick={() => {
            window.location.href = `/game?code=${roomCode}`;
          }}
        >
          Join Game
        </button>
      )}
    </div>
  );
}
