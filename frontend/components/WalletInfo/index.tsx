import { useAccount } from "wagmi";
function WalletInfo () {
    const { address, isConnected } = useAccount();
    
     return (
        <>
            {
                isConnected ?
                    (
                        <div className="text-[#c5c5c5] items-center w-80 sm:w-[60%] h-auto justify-between flex p-16 sm:mt-10" style={{
                            border: "1px #3a3a3a solid", borderRadius: "12px", padding: "15px", flexWrap: "wrap"
                        }}>
                            <div style={{ justifyItems: "flex-start" }}>
                                <p>Wallet</p>
                                <p>{address?.slice(0, 8)}...{address?.slice(-6)}</p>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <div style={{
                                        borderRadius: "50%", height: "10px", width: "10px",
                                        backgroundColor: "green", marginRight: "10px"
                                    }}></div>
                                    <p>Connected</p>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    ""
            }
        </>
    )

}

export default WalletInfo;