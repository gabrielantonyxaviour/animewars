"use client";
import generateRandomCode from "@/utils/helpers/generateRandomCode";
import signWalletOwnership from "@/utils/helpers/signWalletOwnership";
import getPlayer from "@/utils/rooms/getPlayer";
import isRoomExists from "@/utils/rooms/isRoomExists";
import isRoomFull from "@/utils/rooms/isRoomfull";
import joinRoom from "@/utils/rooms/joinRoom";
import { sign } from "crypto";
import React, { useEffect } from "react";

interface JoinGameModalProps {
  closeModal: () => void;
  primaryWallet: any;
}

const JoinGameModal: React.FC<JoinGameModalProps> = ({
  closeModal,
  primaryWallet,
}) => {
  const [name, setName] = React.useState("");
  const [pfp_id, setPfpId] = React.useState("");
  const [roomCode, setRoomCode] = React.useState("");
  const [signature, setSignature] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string>("");

  useEffect(() => {
    (async function () {
      const playerData = await getPlayer(
        (primaryWallet.address as string).toLowerCase()
      );
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <div></div>
          <p className="font-bold text-2xl ">JOIN GAME</p>
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

        <p className="my-2">Room Code</p>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => {
            setRoomCode(e.target.value);
            setError("");
          }}
          className="text-black font-semibold border border-[1px] border-gray-300 rounded-lg w-full p-2"
        />
        <p className="mt-6 ">Terms & conditions</p>
        {signature == null ? (
          <button
            className="text-white border border-[1px] border-gray-300 rounded-lg p-2 my-2 "
            onClick={async () => {
              try {
                await signWalletOwnership(primaryWallet);
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

                const joinRoomData = await joinRoom({
                  roomCode: roomCode,
                  address: (primaryWallet.address as string).toLowerCase(),
                  pfpCode: pfp_id,
                  name: name,
                });
                console.log(joinRoomData);
                if (joinRoomData.success == false) setError(joinRoomData.data);
                else window.location.href = `/room?code=${roomCode}`;
              }}
            >
              Join Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinGameModal;