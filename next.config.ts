import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily ignore build errors for deployment
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    // Skip error page generation during build
    skipTrailingSlashRedirect: true,
  },
};

export default nextConfig;
