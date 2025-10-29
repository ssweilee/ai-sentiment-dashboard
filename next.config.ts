import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    turbo: {},
  },
  turbopack: {
    root: __dirname, 
  },
};

export default nextConfig;