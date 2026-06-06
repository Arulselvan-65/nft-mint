'use client'
import TransactionModal from "@/components/TransactionModal";
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
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black">
      <h1 className="text-red-50">HI</h1>
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