import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export const TokenLaunchpad = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const { connection } = useConnection();
  const wallet = useWallet();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSymbolChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value);
  };

  const handleSupplyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialSupply(e.target.value);
  };

  const createToken = async () => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        mintKeypair.publicKey,
        9,
        wallet.publicKey!,
        wallet.publicKey,
        TOKEN_PROGRAM_ID,
      ),
    );

    transaction.feePayer = wallet.publicKey!;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(mintKeypair);
  };

  return (
    <div className="space-y-3 w-full">
      <Input
        value={name}
        onChange={handleNameChange}
        type="text"
        placeholder="Name"
      />
      <Input
        value={symbol}
        onChange={handleSymbolChange}
        type="text"
        placeholder="Symbol"
      />
      <Input
        value={imageURL}
        onChange={handleImageChange}
        type="text"
        placeholder="ImageURL"
      />
      <Input
        value={initialSupply}
        onChange={handleSupplyChange}
        type="text"
        placeholder="Initial Supply"
      />
      <Button className="w-full" onClick={createToken}>
        Create a Token
      </Button>
    </div>
  );
};
