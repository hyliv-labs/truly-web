import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static files for Cloudflare Pages. next/image has no optimizer there.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
