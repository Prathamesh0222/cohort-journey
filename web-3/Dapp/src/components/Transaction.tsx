import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Buffer } from "buffer";

(window as any).Buffer = Buffer;

export const SendTokens = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTo(e.target.value);
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value);

  async function SendTokens() {
    if (!to || !amount) {
      alert("Please provide valid details");
      return;
    }

    try {
      setIsSending(true);

      if (!wallet.connected || !wallet.publicKey) {
        alert("Wallet not connected");
        setIsSending(false);
        return;
      }
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
    } catch (error) {
      console.log("Tranasction failed", error);
      console.error("Error sending tokens:", error);
      alert("Failed to send tokens");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      <div className="mb-2">
        <span className="font-semibold text-sm">User's Public Key</span>
        <Input
          type="text"
          placeholder="Recipient's public key"
          value={to}
          onChange={handleToChange}
        />
      </div>
      <div className="mb-2">
        <span className="font-semibold text-sm">Amount</span>
        <Input
          type="text"
          placeholder="Amount in SOL"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <Button className="w-full mt-2" onClick={SendTokens} disabled={isSending}>
        {isSending ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};
