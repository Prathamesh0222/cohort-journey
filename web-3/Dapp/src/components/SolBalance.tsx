import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const ShowBalance = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    async function getBalance() {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    }
    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div>
      <div>
        <span className="font-semibold">Balance:</span> {balance} SOL
      </div>
    </div>
  );
};
