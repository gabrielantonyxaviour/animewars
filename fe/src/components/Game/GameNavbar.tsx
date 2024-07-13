import supabase from "@/utils/supabase";
import { Wallet } from "@dynamic-labs/sdk-react-core";

export default function GameNavbar({
  roomCode,
  primaryWallet,
}: {
  roomCode: string;
  primaryWallet: Wallet;
}) {
  return (
    <div className="flex justify-between w-full mb-2 pt-2 relative">
      <p className="text-2xl font-bold my-auto">Anime Wars</p>
      <p className="text-lg font-semibold my-auto">{roomCode}</p>
      <button
        className="text-white p-2 rounded-lg bg-red-700"
        onClick={async () => {
          const { data, error } = await supabase
            .from("players")
            .update({ current_game: null })
            .eq("address", address.toLowerCase())
            .select();

          if (error) {
            console.error("Error updating player:", error);
          } else if (data) {
            console.log("Player updated successfully:", data);
            window.location.href = "/";
          }
        }}
      >
        Leave Game
      </button>
    </div>
  );
}
