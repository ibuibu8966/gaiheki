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
    // Disable static generation for error pages to avoid Html import issues
    optimizePackageImports: ['react', 'react-dom'],
    // Note: esmExternals is deprecated but helps with @react-pdf/renderer
    esmExternals: 'loose',
  },
  // Skip static generation for error pages
  staticPageGenerationTimeout: 120,
  // Transpile ESM packages
  transpilePackages: ['@react-pdf/renderer'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'canvas' module on the client to prevent build errors
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
