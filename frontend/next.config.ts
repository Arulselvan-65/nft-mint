import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [new URL('https://ipfs.io/ipfs/**')],
  },
};

export default nextConfig;
