const signWalletOwnership = async (primaryWallet: any) => {
  if (!primaryWallet) return;

  const signature = await primaryWallet.connector.signMessage(
    "By signing this message, I understand the rules of AnimeWars and agree to the terms and conditions of the game."
  );

  console.log("signature", signature);
  return signature;
};

export default signWalletOwnership;
