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
      {acked ? (
        <div
          className="font-semibold top-6 relative w-[180px] h-[70px]"
          onClick={() => {}}
        >
          <Image
            src="/buttons/Wallet.png"
            width={180}
            height={70}
            alt="back"
            className="absolute"
          />
          <p className="absolute left-16 top-1 text-md text-white">WAITING</p>
        </div>
      ) : (
        <div
          className="font-semibold top-6 relative w-[200px] h-[70px] cursor-pointer hover:scale-110 transform transition-transform duration-200"
          onClick={() => {
            ack();
          }}
        >
          <Image
            src="/buttons/ButtonOne.png"
            className="absolute "
            width={200}
            height={70}
            alt="back"
          />
          <p className="absolute left-16 top-3 text-md text-black">
            START GAME
          </p>
        </div>
      )}
    </div>
  );
}
