import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",        // Minimal deployment — no full node_modules needed
  compress: true,              // Gzip responses
  poweredByHeader: false,      // Remove X-Powered-By header
  productionBrowserSourceMaps: false, // Skip source maps to save disk/memory
  images: {
    unoptimized: true,         // Skip image optimization server (saves ~100MB RAM)
  },
  experimental: {
    workerThreads: false,      // Disable worker threads (saves memory on 1 vCPU)
  },
};

export default nextConfig;
