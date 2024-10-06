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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import "@solana/wallet-adapter-react-ui/styles.css";
import { SendTokens } from "./components/Transaction";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="flex justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <ConnectionProvider endpoint={"https://api.testnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Toaster />
            <div className="flex flex-col h-screen justify-center">
              <div className="border p-8 bg-white rounded-xl shadow-lg">
                <span className="text-3xl flex justify-center mb-6 font-bold">
                  Decentralized App
                </span>
                <Tabs defaultValue="account" className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <div className="my-4 flex justify-center">
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
                  </TabsContent>
                  <TabsContent value="password">
                    <div className="my-4 flex justify-center">
                      <WalletMultiButton
                        style={{
                          backgroundColor: "black",
                        }}
                      />
                    </div>
                    <div className="flex justify-center my-2">
                      <ShowBalance />
                    </div>
                    <SendTokens />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
