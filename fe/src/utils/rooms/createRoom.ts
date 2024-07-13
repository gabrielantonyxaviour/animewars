import getPlayer from "./getPlayer";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function createRoom({
  roomCode,
  address,
  pfpCode,
  name,
}: {
  roomCode: string;
  address: string;
  pfpCode: string;
  name: string;
}): Promise<{ success: boolean; data: any }> {
  try {
    console.log({
      roomCode: roomCode,
      address: address,
      pfpCode: pfpCode,
      name: name,
    });
    const fetchedPlayerData = await getPlayer(address);
    console.log(fetchedPlayerData);
    if (fetchedPlayerData.success && fetchedPlayerData.data != null) {
      console.log(fetchedPlayerData);
      if (
        fetchedPlayerData.data.current_game != null &&
        (fetchedPlayerData.data.current_game.game_state == 1 ||
          fetchedPlayerData.data.current_game.game_state == 2)
      ) {
        return { success: false, data: "Player already joined a room" };
      }
      await supabase
        .from("games")
        .insert([{ code: roomCode, state: {}, game_state: 1 }]);
      let { data: playerData } = await supabase
        .from("players")
        .update({ current_game: roomCode, pfp_id: pfpCode, name: name })
        .eq("address", address)
        .select();
      if (playerData == null)
        return { success: false, data: "Failed to update player" };
    } else {
      let { data: insertGameData, error: insertGameError } = await supabase
        .from("games")
        .insert([{ code: roomCode, state: "{}", game_state: 1 }])
        .select();
      console.log("CREATE ROOM DATA");
      console.log(insertGameData);
      console.log("ERROR");
      console.log(insertGameError);
      let { data: playerData, error } = await supabase
        .from("players")
        .insert([
          {
            address: address,
            pfp_id: pfpCode,
            name: name,
            current_game: roomCode,
          },
        ])
        .select();
      if (playerData == null)
        return { success: false, data: "Failed to add player" };
    }
    return { success: true, data: "Room created" };
  } catch (e) {
    console.log("SUPABASE ERROR");
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
