"use client";
import generateRandomCode from "@/utils/helpers/generateRandomCode";
import signWalletOwnership from "@/utils/helpers/signWalletOwnership";
import getPlayer from "@/utils/rooms/getPlayer";
import createRoom from "@/utils/rooms/createRoom";
import React, { useEffect } from "react";
import { createWalletClient, custom } from "viem";
import { useAccount } from "wagmi";

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
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <div></div>
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
      </div>
    </div>
  );
};

export default CreateGameModal;
