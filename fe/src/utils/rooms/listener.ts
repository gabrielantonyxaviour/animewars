import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function roomListener({
  roomCode,
  players,
  setPlayers,
}: {
  roomCode: string;
  players: any[];
  setPlayers: any;
}) {
  console.log("listening to room", roomCode);

  supabase
    .channel("table_db_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "players",
        filter: `current_game=eq.${roomCode}`,
      },
      (payload) => {
        if (payload.eventType === "INSERT") {
          players.push(payload.new);
          setPlayers(players);
        } else if (payload.eventType === "DELETE") {
          console.log("PlAYER LEFT THE ROOM");
          console.log(payload);
          const removedId = payload.old.id;
          const newPlayers = players.filter(
            (player) => player.id !== removedId
          );
          setPlayers(newPlayers);
        }
      }
    )
    .subscribe();

  console.log("subsdribed to room changes " + roomCode);
}
