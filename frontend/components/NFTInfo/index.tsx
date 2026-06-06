import Image from "next/image";
import { useState } from "react";

function NFTInfo() {

    const [data, setData] = useState([
        {
            title: "Minted",
            value: "23/100"
        },
         {
            title: "Mint Price",
            value: "0.001 ETH"
        },
         {
            title: "Remaining",
            value: "77"
        }
    ])

    return (
        <div className="text-[#c5c5c5] border-solid border-[#3a3a3a] border-[1px] 
        w-80 sm:w-[45%] rounded-xl sm:mt-4">
            <div className="flex justify-center p-8 flex-col items-center pb-0">
                <div>
                    <Image
                        src="https://ipfs.io/ipfs/bafybeihc67gqk33pfgyj5ybl32567tfxopsg2hbnzezsrwlitby55z23oe"
                        alt="DevBadge"
                        width={270}
                        height={270}
                        loading="eager"
                        className="rounded-lg"
                    />
                </div>
                <p className="font-bold text-2xl mt-4">DevBadge</p>
                <p className="text-[#a4a4a4] text-sm sm:text-base">Web3 Learner - Limited to 1 per wallet</p>
            </div>
            <div className="mt-0 flex justify-evenly flex-wrap sm:flex-row items-start sm:items-center h-40 sm:h-auto">
                {
                    data.map((d, i) => {
                        return (
                            <div key={i} className="flex items-center flex-col w-[40%] sm:w-40 border-solid border-[#3a3a3a] border-[1px] 
                            rounded-xl p-2 mt-4">
                                <p className="font-semibold text-[#cecece] ">{d.title}</p>
                                <p className="font-semibold text-2xl mt-1 text-[#929292]">{d.value}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div></div>
            <div></div>
        </div>
    )
}


export default NFTInfo;
