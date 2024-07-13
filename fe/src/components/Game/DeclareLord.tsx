import { characters } from "@/utils/constants";
import { Player } from "@/utils/interface";
import Image from "next/image";

export default function DeclareLord({
  lord,
  ack,
  acked,
}: {
  lord: Player;
  ack: () => void;
  acked: boolean;
}) {
  return (
    <div className="relative py-12 mb-4 flex flex-col space-y-4 justify-center items-center w-full">
      <Image
        src={"/box.png"}
        layout="fill"
        objectFit="contain"
        alt="back"
        className="absolute"
      />
      <p className="text-black text-center font-semibold text-2xl relative">
        {lord.name} is the Lord
      </p>

      <div className="w-[120px] relative">
        <div className=" border-white rounded-lg text-center w-[120px] h-[120px]">
          <Image
            src={characters[lord.character ?? 0].card}
            width={120}
            height={120}
            alt="character"
            className="rounded-lg"
          />
        </div>
        <button
          onClick={() => {
            // show player info
          }}
          className="absolute right-0 top-0 mx-auto"
        >
          <img
            src={`https://noun-api.com/beta/pfp?name=${lord.pfp_id}&size=100`}
            alt="pfp"
            className="w-8 h-8"
          />
        </button>
      </div>

      <button
        className={`${
          acked ? `bg-yellow-500` : `bg-green-500`
        }  rounded-lg font-semibold p-4 my-4 relative`}
        onClick={() => {
          ack();
        }}
      >
        {acked ? "Waiting" : "Start Game"}
      </button>
    </div>
  );
}
