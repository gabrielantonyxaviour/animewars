import Image from "next/image";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectButton() {
  const { connect } = useConnect();
  return (
    <Image
      src="/buttons/ConnectWallet.png"
      width={300}
      height={100}
      alt="arbitrum"
      className="cursor-pointer mb-32"
      onClick={() => {
        connect({
          chainId: 8008135,
          connector: injected(),
        });
      }}
    />
  );
}
