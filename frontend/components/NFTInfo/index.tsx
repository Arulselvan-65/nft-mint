import Image from "next/image";
import { useEffect, useState } from "react";
import { useWalletClient, useAccount } from "wagmi";
import { BrowserProvider } from "ethers";
import { ethers } from "ethers";
import contractData from "@/utils/DevBadge.json";
import { createPublicClient, http, formatEther } from "viem";
import { sepolia, hardhat } from "viem/chains";

function NFTInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [txStatus, setTxSatus] = useState("loading");
    const [contract, setContract] = useState();
    const [data, setData] = useState([
        {
            title: "",
            value: ""
        }
    ]);

    const { data: walletClient } = useWalletClient();
    const { address, isConnected, chain } = useAccount();

    useEffect(() => {
        const client = createPublicClient({
            chain: hardhat,
            transport: http('http://10.37.63.142:8545/')
        });

        const readContract = async () => {
            const address = contractData.contractAddress as `0x${string}`;
            const abi = contractData.abi;

            const totalSupply: any = await client.readContract({
                address: address,
                abi: contractData.abi,
                functionName: "MAX_SUPPLY",
            }) || 0;

            const mintPrice: any = await client.readContract({
                address: address,
                abi: contractData.abi,
                functionName: "MINT_PRICE",
            }) || 0;

            const tokenId: any = await client.readContract({
                address: address,
                abi: contractData.abi,
                functionName: "nextTokenId",
            }) || 0;

            const tokenData = [];
            tokenData.push({ "title": "Minted", value: `${tokenId + 1}/100` });
            tokenData.push({ "title": "Mint Price", value: `${formatEther(mintPrice)} ETH` });
            tokenData.push({ "title": "Remaining", value: `${totalSupply - tokenId}` });
            setData(tokenData);
        }
        readContract();
    }, []);

    const handleMint = async () => {
        setIsModalOpen(true);

        const signer = await getSigner();
        const contract = new ethers.Contract(contractData.contractAddress, contractData.abi, signer);
        console.log(contract);
        console.log(await contract.nextTokenId());

    }

    const getSigner = async () => {
        if (!walletClient) return;
        const provider = new BrowserProvider(walletClient.transport);
        const signer = await provider.getSigner();
        return signer;
    }
    return (
        <>
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
                <div className="flex justify-center">
                    <button className="w-72 h-12 bg-[#245f9e] rounded-lg m-4 font-bold text-lg"
                        onClick={handleMint}>Mint Now</button>
                </div>
            </div>
        </>
    )
}


export default NFTInfo;
