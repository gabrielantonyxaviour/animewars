import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getGame(
  gameCode: string
): Promise<{ success: boolean; data: any }> {
  try {
    let { data: game, error } = await supabase
      .from("games")
      .select(`*`)
      .eq("code", gameCode);
    console.log(game);
    if (game == null || game?.length == 0)
      return { success: false, data: "Player not found" };
    else
      return {
        success: true,
        data: game[0],
      };
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
