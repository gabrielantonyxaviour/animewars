import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectButton() {
  const { connect } = useConnect();
  return (
    <button
      onClick={() => {
        connect({
          chainId: 8008135,
          connector: injected(),
        });
      }}
      className="p-4 border border-white rounded-lg"
    >
      Connect Wallet
    </button>
  );
}
