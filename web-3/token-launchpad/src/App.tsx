import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TokenLaunchpad } from "./components/TokenLaunchpad";

function App() {
  return (
    <div className="flex justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <ConnectionProvider endpoint={"https://api.testnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col h-screen justify-center">
              <div className="border p-8 bg-white rounded-xl shadow-lg">
                <span className="text-3xl flex justify-center mb-6 font-bold">
                  Token Launchpad
                </span>
                <div className="my-4 flex justify-center">
                  <WalletMultiButton
                    style={{
                      backgroundColor: "black",
                    }}
                  />
                </div>
                <TokenLaunchpad />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
