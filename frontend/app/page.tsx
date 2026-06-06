'use client'
import TransactionModal from "@/components/TransactionModal";
import WalletInfo from "@/components/WalletInfo";
import { useState } from "react";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [txStatus, setTxSatus] = useState("loading");

  function mint() {
    setTxHash("loading");
    setIsModalOpen(true);

  }




  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <div className="center">
        <WalletInfo />
      </div>
      {
        isModalOpen ?
          <TransactionModal status={txStatus} txhash={txHash} onClose={() => setIsModalOpen(false)} />
          : ""
      }

      <button onClick={mint}>HI</button>
    </div>
  );
}


export default Home;