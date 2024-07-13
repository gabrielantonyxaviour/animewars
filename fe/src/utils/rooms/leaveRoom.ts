import isRoomExists from "./isRoomExists";
import { createClient } from "@supabase/supabase-js";
import getPlayer from "./getPlayer";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function leaveRoom({
  roomCode,
  address,
}: {
  roomCode: string;
  address: string;
}): Promise<{ success: boolean; data: string }> {
  try {
    console.log(roomCode);
    const fetchedPlayerData = await getPlayer(address);
    if (fetchedPlayerData.success) {
      if (fetchedPlayerData.data.current_game.code == roomCode) {
        let { data: playerData } = await supabase
          .from("players")
          .update({ current_game: null })
          .eq("address", address)
          .select();
        if (playerData != null) return { success: true, data: "Left the room" };
        else return { success: false, data: "Failed to leave room" };
      } else return { success: false, data: "Player not in the room" };
    } else return { success: false, data: "Failed to fetch player" };
  } catch (e) {
    console.log("SUPABASE ERROR");
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
