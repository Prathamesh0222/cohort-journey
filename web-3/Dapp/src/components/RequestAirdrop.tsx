import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ChangeEvent, useState } from "react";

export const RequestAirdrop = () => {
  const [amount, setAmount] = useState<number>(LAMPORTS_PER_SOL);
  const wallet = useWallet();
  const { connection } = useConnection();

  function requestAirdrop() {
    const publicKey = wallet.publicKey;
    if (publicKey) {
      connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAmount(Number(e.target.value));
          }}
          className="w-full border rounded-lg p-2"
          type="text"
          placeholder="Amount.."
        />
        <button
          onClick={requestAirdrop}
          className="px-4 py-2 text-white bg-black rounded-lg"
        >
          AirDrop
        </button>
      </div>
      <div className="border p-2 rounded-lg mt-2">
        <span className="font-semibold">Public Key:</span>{" "}
        {wallet.publicKey?.toBase58()}
      </div>
    </div>
  );
};
