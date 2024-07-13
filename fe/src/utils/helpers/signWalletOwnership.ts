import { WalletClient } from "viem";

const signWalletOwnership = async (
  address: `0x${string}`,
  walletClient: WalletClient
) => {
  const signature = await walletClient.signMessage({
    account: address,
    message:
      "By signing this message, I understand the rules of AnimeWars and agree to the terms and conditions of the game.",
  });

  console.log("signature", signature);
  return "signature";
};

export default signWalletOwnership;
