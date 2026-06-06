'use client'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

const config = getDefaultConfig({
    appName: 'DevBadge',
    projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    chains: [hardhat, sepolia],
    transports: {
        [hardhat.id]: http('http://10.37.63.142:8545/'),
        [sepolia.id]: http(`${process.env.NEXT_PUBLIC_INFURA_RPC_URL}`)
    },
    ssr: true
});

export default config;