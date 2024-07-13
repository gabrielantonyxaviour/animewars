import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getRoomPlayers(
  roomCode: string
): Promise<{ success: boolean; data: any }> {
  try {
    let { data: players, error } = await supabase
      .from("players")
      .select("*")
      .eq("current_game", roomCode);
    console.log("PLAYERS");
    console.log(players);
    if (players == null || players?.length == 0)
      return { success: false, data: "Player not found" };
    else
      return {
        success: true,
        data: players,
      };
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
