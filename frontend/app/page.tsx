'use client'
import WalletInfo from "@/components/WalletInfo";
import NFTInfo from "@/components/NFTInfo";

function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <div className="center">
        <WalletInfo />
        <NFTInfo />
      </div>
    </div>
  );
}


export default Home;