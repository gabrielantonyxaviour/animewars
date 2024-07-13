import { fhenixTestnet } from "@/utils/chains";
import Image from "next/image";
import { arbitrumSepolia, zircuitTestnet } from "viem/chains";
import { useAccount, useBalance } from "wagmi";

export default function WalletButton() {
  const { address, chain } = useAccount();
  const { data } = useBalance();

  return (
    <div className="flex items-center justify-between space-x-4 relative mb-20">
      <Image
        src="/buttons/Wallet.png"
        width={300}
        height={20}
        alt="wallet"
        className="absolute z-1"
      />
      {chain?.id == arbitrumSepolia.id ? (
        <Image
          src="/logos/arbitrum.png"
          width={30}
          height={30}
          alt="arbitrum"
          className="rounded-full relative"
        />
      ) : chain?.id == zircuitTestnet.id ? (
        <Image
          src="/logos/zircuit.jpeg"
          width={20}
          height={20}
          alt="zircuit"
          className="relative "
        />
      ) : (
        chain?.id == fhenixTestnet.id && (
          <Image
            src="/logos/fhenix.png"
            width={20}
            height={20}
            alt="fhenix"
            className="relative "
          />
        )
      )}
      <p className="font-light text-white text-lg relative text-center flex-1">
        {address?.slice(0, 6) + "..." + address?.slice(-6)}
      </p>
      <p className="text-white relative  flex-1 pr-2">
        {data != undefined ? data.value : "0"}&nbsp;
        {chain != undefined ? chain.nativeCurrency.symbol : "ETH"} &nbsp;
      </p>
    </div>
  );
}
