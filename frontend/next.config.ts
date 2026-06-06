import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['10.37.63.142'],
  images: {
    remotePatterns: [new URL('https://ipfs.io/ipfs/**')],
  },
};

export default nextConfig;
