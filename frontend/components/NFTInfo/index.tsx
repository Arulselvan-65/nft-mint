'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useWalletClient, useAccount } from "wagmi";
import { BrowserProvider } from "ethers";
import { ethers } from "ethers";
import contractData from "@/utils/DevBadge.json";
import { createPublicClient, http, formatEther } from "viem";
import TransactionModal from "../TransactionModal";
import { toast } from "react-toastify";
import { sepolia, hardhat } from "viem/chains";

function NFTInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [txStatus, setTxStatus] = useState("fetching");
    const [contract, setContract] = useState<ethers.Contract | undefined>(undefined);
    const [data, setData] = useState([
        { title: "", value: "" }
    ]);
    const [hasMinted, setHasMinted] = useState(false);
    const [mintedTokenId, setMintedTokenId] = useState(0);

    const { data: walletClient } = useWalletClient();
    const { address, isConnected, chain } = useAccount();

    useEffect(() => {
        const client = createPublicClient({
            chain: process.env.NEXT_PUBLIC_ENVIRONMENT == "dev" ? sepolia : hardhat,
            transport: process.env.NEXT_PUBLIC_ENVIRONMENT == "dev"
                ? http(`${process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL}`)
                : http("http://127.0.0.1:8545")
        });

        const readContract = async () => {
            try {
                setTxStatus("fetching");
                setIsModalOpen(true);

                const contractAddress = contractData.contractAddress as `0x${string}`;

                if (isConnected) {
                    const hasMinted: any = await client.readContract({
                        address: contractAddress,
                        abi: contractData.abi,
                        functionName: "hasMinted",
                        args: [address]
                    });
                    setHasMinted(hasMinted);

                    if (hasMinted) {
                        const mintedTokenId: any = await client.readContract({
                            address: contractAddress,
                            abi: contractData.abi,
                            functionName: "mintedTokenId",
                            args: [address]
                        });
                        setMintedTokenId(mintedTokenId);
                    }

                    setIsModalOpen(false);
                    return;
                }

                const totalSupply: any = await client.readContract({
                    address: contractAddress,
                    abi: contractData.abi,
                    functionName: "MAX_SUPPLY",
                }) || 0;

                const mintPrice: any = await client.readContract({
                    address: contractAddress,
                    abi: contractData.abi,
                    functionName: "MINT_PRICE",
                }) || 0;

                const tokenId: any = await client.readContract({
                    address: contractAddress,
                    abi: contractData.abi,
                    functionName: "nextTokenId",
                }) || 0;

                const tokenData = [];
                tokenData.push({ title: "Minted", value: `${tokenId}/100` });
                tokenData.push({ title: "Mint Price", value: `${formatEther(mintPrice)} ETH` });
                tokenData.push({ title: "Remaining", value: `${totalSupply - tokenId}` });
                setData(tokenData);

                setIsModalOpen(false);
            } catch (err) {
                console.error(err);
                setTxStatus("error");
            }
        };

        readContract();
    }, [isConnected, address]);

    useEffect(() => {
        const getSigner = async () => {
            if (!walletClient) return;
            const provider = new BrowserProvider(walletClient.transport);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                contractData.contractAddress,
                contractData.abi,
                signer
            );
            setContract(contract);
        };
        getSigner();
    }, [isConnected, address, chain, walletClient]);

    const handleMint = async () => {
        try {
            setTxHash("");
            setTxStatus("loading");
            setIsModalOpen(true);
            const tx = await contract?.safeMint({ value: ethers.parseEther("0.001") });
            await tx.wait();
            setTxHash(tx.hash);
            setTxStatus("success");
            toast.success("NFT Minted Successfully!");
        } catch (err: any) {
            setTxStatus("error");
            if (err.code === 4001 || err.code === "ACTION_REJECTED") {
                toast.error("Transaction denied by user");
                return;
            }
            const decodedError: any = contract?.interface.parseError(err.data);
            switch (decodedError?.name) {
                case "AlreadyMinted":
                    toast.error("You have already minted this NFT.");
                    break;
                case "InsufficientPayment":
                    toast.error("Insufficient ETH sent for minting.");
                    break;
                case "ExceedsMintLimit":
                    toast.error("The maximum mint limit has been reached.");
                    break;
                default:
                    toast.error(`Contract error: ${decodedError?.name ?? "Unknown"}`);
            }
        }
    };

    return (
        <>
            {isModalOpen && (
                <TransactionModal
                    status={txStatus}
                    txhash={txHash}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <div className="text-[#c5c5c5] border-solid border-[#3a3a3a] border-[1px] 
                            w-80 sm:w-[45%] rounded-xl h-auto sm:mt-4">
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
                    <p className="font-bold text-2xl mt-4">
                        {`DevBadge ${hasMinted ? `#${mintedTokenId}` : ""}`}
                    </p>
                    {hasMinted
                        ? "NFT already minted for this wallet."
                        : <p className="text-[#a4a4a4] text-sm sm:text-base">Web3 Learner - Limited to 1 per wallet</p>
                    }
                </div>

                {hasMinted ? (
                    <div className="flex justify-center mt-4 mb-4">
                        <a
                            href={`https://sepolia.etherscan.io/nft/${contractData.contractAddress}/${mintedTokenId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-3 rounded-xl
                                       border border-[#3a3a3a] bg-[#181819]
                                       hover:bg-[#1f2937] transition-all duration-200
                                       text-white font-medium"
                        >
                            <span>View NFT on Etherscan</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="mt-0 flex justify-evenly flex-wrap sm:flex-row items-start sm:items-center sm:h-auto">
                            {data.map((d, i) => (
                                <div key={i} className="flex items-center flex-col w-[40%] sm:w-40 border-solid border-[#3a3a3a] border-[1px] 
                                                         rounded-xl p-2 mt-4">
                                    <p className="font-semibold text-[#cecece]">{d.title}</p>
                                    <p className="font-semibold text-2xl mt-1 text-[#929292]">{d.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="w-72 h-12 bg-[#3b99fd] rounded-lg m-4 font-bold text-lg text-white"
                                onClick={handleMint}
                            >
                                Mint Now
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default NFTInfo;