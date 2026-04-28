import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/kp/:slug",
        destination: "/kp/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
