import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@c4/ui"],
  experimental: {
    turbo: {
      rules: {
        "*.css": {
          loaders: ["postcss-loader"],
          as: "*.css",
        },
      },
    },
  },
};

export default nextConfig;
