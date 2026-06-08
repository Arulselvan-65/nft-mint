'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

function Navbar() {

    return (
        <>
            <div className="flex justify-between h-20 bg-zinc-900 items-center p-3 sm:p-10">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="DevBadge Logo" width={40} height={40} />
                    <span className="text-xl sm:text-3xl font-bold text-[#3898ff]">DevBadge</span>
                </div>
                <div>
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            mounted,
                        }) => {
                            if (!mounted) return null;

                            if (!account) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        className="h-10 px-4 rounded-xl bg-[#3898ff] text-white      
                                            font-bold text-sm border border-white/10 shadow-sm"
                                        >
                                        Connect Wallet
                                    </button>
                                );
                            }

                            if (chain?.unsupported) {
                                return (
                                    <button 
                                    onClick={openChainModal}
                                     className="h-10 px-4 rounded-xl bg-[#ff3838] text-white      
                                            font-medium text-sm border border-white/10 shadow-sm"
                                    >
                                        Wrong Network
                                    </button>
                                );
                            }

                            return (
                                <button
                                    onClick={openAccountModal}
                                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                                >
                                    {account.displayName}
                                </button>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>
            </div>
        </>
    )

}


export default Navbar;