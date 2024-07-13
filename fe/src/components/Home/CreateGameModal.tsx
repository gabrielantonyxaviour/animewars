"use client";
import generateRandomCode from "@/utils/helpers/generateRandomCode";
import signWalletOwnership from "@/utils/helpers/signWalletOwnership";
import getPlayer from "@/utils/rooms/getPlayer";
import createRoom from "@/utils/rooms/createRoom";
import React, { useEffect } from "react";
import { createWalletClient, custom } from "viem";
import { useAccount } from "wagmi";
import Image from "next/image";

interface CreateGameModalProps {
  closeModal: () => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ closeModal }) => {
  const { address } = useAccount();
  const [name, setName] = React.useState("");
  const [pfp_id, setPfpId] = React.useState("");
  const [signature, setSignature] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string>("");

  useEffect(() => {
    (async function () {
      const playerData = await getPlayer((address as string).toLowerCase());
      console.log(playerData);
      console.log("ONLOY THIS DONT WORRY");
      if (playerData != null && playerData.success == true) {
        console.log("THIS CODE IS EXECUTED");
        setName(playerData.data.name);
        setPfpId(playerData.data.pfp_id);
      } else {
        setPfpId(generateRandomCode());
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="h-screen w-full bg-gray-800 opacity-50 "></div>

      <div className="absolute">
        <Image
          src="/buttons/Create.png"
          width={300}
          height={200}
          alt="back"
          className="mx-auto"
        />
        <div className="relative w-[450px] h-[200px]">
          <Image
            src="/modals/CreateGameModal.png"
            width={450}
            height={200}
            alt="back"
            className="absolute"
          />
          <div className="relative flex flex-col top-12">
            <div className="w-full flex justify-center space-x-2">
              <img
                src={`https://noun-api.com/beta/pfp?name=${pfp_id}&size=60`}
                alt="pfp"
                className="rounded-lg top-10 border"
                style={{
                  border: "10px solid transparent",
                  borderImageSource: 'url("/misc/border.png")',
                  borderImageSlice: 25,
                  borderImageRepeat: "round",
                }}
              />
              <div className="flex flex-col justify-end mb-2">
                <Image
                  src={"/buttons/refresh.png"}
                  width={30}
                  height={30}
                  alt="back"
                  className="cursor-pointer"
                  onClick={() => {
                    setPfpId(generateRandomCode());
                  }}
                />
              </div>
            </div>
            <Image
              src="/misc/Name.png"
              width={60}
              height={25}
              alt="back"
              className="ml-16 mt-4"
            />
            <input
              type="text"
              className="text-white focus:outline-none font-semibold bg-transparent rounded-lg w-[75%] h-[40%] mx-auto  p-3 my-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                backgroundImage: 'url("/misc/InputBox.png")',
                backgroundSize: "100% 100%",
              }}
            />
            <Image
              src="/misc/terms.png"
              width={120}
              height={60}
              alt="back"
              className="ml-16 mt-1"
            />
            <div
              className=" ml-16 mt-1 relative w-[120px] h-[30px] cursor-pointer flex justify-center items-center"
              onClick={async () => {
                if (signature != null) return;
                if (address == null) return;
                try {
                  const walletClient = createWalletClient({
                    transport: custom(window.ethereum!),
                  });
                  await signWalletOwnership(address, walletClient);
                  setSignature(true);
                  setError("");
                } catch (e) {
                  // setSignature(false);
                  console.log("Sign Wallet failed");
                }
              }}
              style={{
                backgroundImage: 'url("/buttons/ButtonOne.png")',
                backgroundSize: "100% 100%",
                opacity: signature == null ? 1 : 0.5,
              }}
            >
              <p className="text-[#454223] text-xs ">
                {signature == null ? "CLICK TO SIGN" : "✅ VERIFIED"}
              </p>
            </div>
            <div className="flex justify-end w-full">
              <div
                className=" mr-12 mt-1 relative w-[120px] h-[30px] cursor-pointer flex justify-center items-center"
                style={{
                  backgroundImage: 'url("/buttons/Rock.png")',
                  backgroundSize: "100% 100%",
                }}
              >
                <p className="text-[#454223] text-xs ">CREATE ROOM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-2xl ">CREATE GAME</p>
          <button
            className="text-white hover:text-gray-700"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <img
          src={`https://noun-api.com/beta/pfp?name=${pfp_id}&size=100`}
          alt="pfp"
          className="rounded-xl mx-auto"
        />
        <div className="flex justify-center">
          <button
            className="text-white border border-[1px] border-gray-300 rounded-lg p-2 my-2 "
            onClick={() => {
              setPfpId(generateRandomCode());
            }}
          >
            Change
          </button>
        </div>

        <p className="my-2">Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black font-semibold border border-[1px] border-gray-300 rounded-lg w-full p-2 mb-2"
        />

        <p className="mt-6 ">Terms & conditions</p>
        {signature == null ? (
          <button
            className="text-white border border-[1px] border-gray-300 rounded-lg p-2 my-2 "
            onClick={async () => {
              try {
                const walletClient = createWalletClient({
                  transport: custom(window.ethereum!),
                });
                await signWalletOwnership(walletClient);
                setSignature(true);
                setError("");
              } catch (e) {
                setSignature(false);
                console.log("Sign Wallet failed");
              }
            }}
          >
            Click to Sign
          </button>
        ) : signature ? (
          <button
            disabled
            className="text-white border border-[1px] border-green-600 rounded-lg p-2 my-2 "
          >
            Wallet Verified
          </button>
        ) : (
          <button
            disabled
            className="text-white border border-[1px] border-red-600 rounded-lg p-2 my-2 "
          >
            Wallet Verification failed
          </button>
        )}
        <div className="flex justify-center mt-4">
          {error.length > 0 ? (
            <button
              disabled
              className="text-white border border-[1px]  border-red-300 rounded-lg p-2 my-2 "
            >
              {error}
            </button>
          ) : (
            <button
              className="text-white border border-[1px] border-gray-300 rounded-lg p-2 my-2 "
              onClick={async () => {
                if (signature != true) {
                  setError("Please sign the terms and conditions");
                  return;
                }
                const roomCode = generateRandomCode();
                const createRoomData = await createRoom({
                  roomCode: roomCode,
                  address: (address as string).toLowerCase(),
                  pfpCode: pfp_id,
                  name: name,
                });
                console.log(createRoomData);
                if (createRoomData.success == false)
                  setError(createRoomData.data);
                else window.location.href = `/room?code=${roomCode}`;
              }}
            >
              Create Room
            </button>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default CreateGameModal;
