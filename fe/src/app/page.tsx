"use client";
import CreateGameModal from "@/components/Home/CreateGameModal";
import JoinGameModal from "@/components/Home/JoinGameModal";
import Loading from "@/components/Loading";
import {
  useEmbeddedWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import Link from "next/link";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";

function Page() {
  const { primaryWallet, isAuthenticated, sdkHasLoaded } = useDynamicContext();

  const [enableCreateGameModal, setEnableCreateGameModal] =
    React.useState(false);
  const [enableJoinGameModal, setEnableJoinGameModal] = React.useState(false);
  const {
    createEmbeddedWallet,
    createOrRestoreSession,
    isSessionActive,
    sendOneTimeCode,
    userHasEmbeddedWallet,
  } = useEmbeddedWallet();
  const [result, setResult] = useState("");

  const oneTimeCodeSent = useRef(false);

  useEffect(() => {
    const startSession = () => {
      try {
        if (isSessionActive) return;
        createOrRestoreSession({
          oneTimeCode: "",
        });
      } catch (err) {
        return;
      }
    };

    // startSession();
  }, []);

  const onSendOneTimeCodeHandler = async () => {
    if (!userHasEmbeddedWallet()) await createEmbeddedWallet();

    if (!isSessionActive) {
      try {
        await sendOneTimeCode();
        oneTimeCodeSent.current = true;
        return;
      } catch (e) {
        console.error(e);
      }
    } else return;
  };

  const onCreateSessionHandler: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      if (!primaryWallet || !userHasEmbeddedWallet()) return;

      const otc = event.currentTarget.otc.value;

      await createOrRestoreSession({ oneTimeCode: otc })
        .then((result) => setResult(result))
        .catch((error) => setResult(JSON.stringify(error, null, 2)));
    } catch (err) {
      console.log(err);
    }
  };

  return sdkHasLoaded ? (
    <div className="h-screen flex flex-col items-center justify-around space-y-4 select-none xl:w-[33%] lg:w-[50%] md:w-[70%] sm:w-[85%] w-full mx-auto relative">
      <Image
        className="absolute"
        src="/background.png"
        layout="fill"
        objectFit="cover"
        alt="back"
      />
      <Image
        className="relative pt-24"
        src="/logo-text.png"
        width={250}
        height={150}
        alt="back"
      />
      {/* <DynamicWidget /> */}
      {!isSessionActive && (
        <div>
          {!oneTimeCodeSent.current && (
            <button onClick={onSendOneTimeCodeHandler}>Start session</button>
          )}
          {oneTimeCodeSent.current && (
            <form
              onSubmit={onCreateSessionHandler}
              className="create-session-method"
            >
              <p>Enter one-time code sent to email to create a session</p>

              <input
                required
                name="otc"
                type="text"
                placeholder="One-time code"
              />
              <br />
              <button type="submit">Create session</button>
            </form>
          )}
        </div>
      )}

      {/* <div className="relative flex flex-col text-center">
        {isAuthenticated && (
          <>
            <button
              onClick={() => {
                setEnableCreateGameModal(true);
              }}
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              New Game
            </button>
            <button
              onClick={() => {
                setEnableJoinGameModal(true);
              }}
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              Join Game
            </button>

            <Link
              href="/worldcoin"
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              Test Worldcoin
            </Link>
            <Link
              href="/pyth"
              className="border border-[1px] border-white py-4 px-6 rounded-xl"
            >
              Test Pyth
            </Link>
          </>
        )}
      </div> */}

      {enableJoinGameModal && (
        <JoinGameModal
          primaryWallet={primaryWallet}
          closeModal={() => setEnableJoinGameModal(false)}
        />
      )}
      {enableCreateGameModal && (
        <CreateGameModal
          primaryWallet={primaryWallet}
          closeModal={() => setEnableCreateGameModal(false)}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}

export default Page;
