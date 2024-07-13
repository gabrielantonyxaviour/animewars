import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function isRoomExists(roomCode: string): Promise<boolean> {
  try {
    console.log(roomCode);
    let { data: games, error } = await supabase
      .from("games")
      .select("*")
      .eq("code", roomCode);

    console.log(games);
    if (games?.length == 0) return false;
    else return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
