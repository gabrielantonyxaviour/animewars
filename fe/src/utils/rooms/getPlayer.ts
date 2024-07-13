import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function getPlayer(
  address: string
): Promise<{ success: boolean; data: any }> {
  try {
    let { data: player, error } = await supabase
      .from("players")
      .select(
        `*,
      current_game (
        code,
        game_state
      )`
      )
      .eq("address", address);
    console.log(player);
    if (player == null || player?.length == 0)
      return { success: false, data: "Player not found" };
    else
      return {
        success: true,
        data: player[0],
      };
  } catch (e) {
    console.log(e);
    return { success: false, data: "Supabase error" };
  }
}
