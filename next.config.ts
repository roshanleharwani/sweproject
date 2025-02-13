import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-7cf6be04756e4997be8420c6b6cdcacc.r2.dev',
      },
    ],
  },
};

export default nextConfig;
