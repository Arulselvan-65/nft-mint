
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {

    return (
        <>
        <div className="flex justify-between h-20 bg-zinc-900 items-center p-3 sm:p-10">
            <div className="text-xl sm:text-3xl font-bold text-[#3898ff]">DevBadge</div>
            <div>
                 <ConnectButton chainStatus="none"/>
            </div>
        </div>
        </>
    )

}


export default Navbar;