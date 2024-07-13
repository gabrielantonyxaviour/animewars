import { createClient } from "@supabase/supabase-js";
import { MAX_PLAYERS_COUNT } from "../constants";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function isRoomFull(roomCode: string): Promise<boolean> {
  try {
    let { data: count, error } = await supabase
      .from("players")
      .select("*", { count: "exact" })
      .eq("current_game", roomCode);

    if (count != null && count.length == MAX_PLAYERS_COUNT) return true;
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
