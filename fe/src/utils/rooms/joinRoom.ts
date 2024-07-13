import isRoomExists from "./isRoomExists";
import getPlayer from "./getPlayer";
import { createClient } from "@supabase/supabase-js";
import isRoomFull from "./isRoomfull";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function joinRoom({
  roomCode,
  address,
  pfpCode,
  name,
}: {
  roomCode: string;
  address: string;
  pfpCode: string;
  name: string;
}): Promise<{ success: boolean; data: string }> {
  try {
    console.log(roomCode);
    const roomExists = await isRoomExists(roomCode);
    if (!roomExists) return { success: false, data: "Game does not exist" };
    const roomFull = await isRoomFull(roomCode);
    if (roomFull) return { success: false, data: "Room is full" };
    else {
      const fetchedPlayerData = await getPlayer(address);
      if (fetchedPlayerData.success) {
        if (fetchedPlayerData.data.current_game != null) {
          if (fetchedPlayerData.data.current_game.code == roomCode)
            return { success: false, data: "You already joined this room" };
          if (fetchedPlayerData.data.current_game.game_state == 2)
            return { success: false, data: "You are playing another game" };
          if (fetchedPlayerData.data.current_game.game_state == 1)
            return { success: false, data: "You already joined another room" };
        }
        let { data: playerData } = await supabase
          .from("players")
          .update({ current_game: roomCode, pfp_id: pfpCode, name: name })
          .eq("address", address)
          .select();
        if (playerData != null)
          return { success: true, data: "Player updated" };
        else return { success: false, data: "Failed to update player" };
      } else {
        let { data: playerData } = await supabase
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
        if (playerData != null) return { success: true, data: "Player added" };
        else return { success: false, data: "Failed to add player" };
      }
    }
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
