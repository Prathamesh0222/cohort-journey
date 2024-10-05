import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { RequestAirdrop } from "./components/RequestAirdrop";
import { ShowBalance } from "./components/SolBalance";

import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  return (
    <div className="flex justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col h-screen justify-center">
              <div className="border p-8 bg-white rounded-xl shadow-lg">
                <span className="text-3xl flex justify-center mb-4 font-bold">
                  Decentralized App
                </span>
                <div className="mb-4 flex justify-center">
                  <WalletMultiButton
                    style={{
                      backgroundColor: "black",
                    }}
                  />
                </div>
                <RequestAirdrop />
                <div className="border p-2 rounded-lg mt-2">
                  <ShowBalance />
                </div>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
