'use client'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev';

const config = getDefaultConfig({
    appName: 'DevBadge',
    projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    chains: isDev ? [sepolia] : [hardhat, sepolia],
    transports: {
        [sepolia.id]: http(`${process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL}`)
    },
    ssr: true
});

export default config;
