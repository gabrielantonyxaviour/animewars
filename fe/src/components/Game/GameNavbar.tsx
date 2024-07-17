import supabase from "@/utils/supabase";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function GameNavbar({ roomCode }: { roomCode: string }) {
  const { address, status } = useAccount();
  return (
    <div
      className="flex justify-between w-full mb-2 py-2 -top-4 relative bg-repeat bg-contain"
      style={{
        backgroundImage: `url(/deckbox.png)`,
      }}
    >
      <div className="flex space-x-1 items-center">
        <Image src="/logo.png" width={40} height={150} alt="back" />
        <Image src="/logo-text.png" width={100} height={150} alt="back" />
      </div>
      <p className="text-lg font-semibold my-auto text-black">{roomCode}</p>
      <div
        className="w-[80px] h-[40px] mr-4 cursor-pointer flex justify-center items-center"
        style={{
          backgroundImage: 'url("/buttons/Rock.png")',
          backgroundSize: "100% 100%",
        }}
        onClick={async () => {
          if (status != "connected") return;
          const { data, error } = await supabase
            .from("players")
            .update({ current_game: null })
            .eq("address", (address ?? "").toLowerCase())
            .select();

          if (error) {
            console.error("Error updating player:", error);
          } else if (data) {
            console.log("Player updated successfully:", data);
            window.location.href = "/";
          }
        }}
      >
        <p className="text-[#454223] text-xs ">LEAVE GAME</p>
      </div>
    </div>
  );
}
