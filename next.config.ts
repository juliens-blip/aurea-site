// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ici tu peux ajouter d'autres options globales si besoin
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "v5.airtableusercontent.com" },
      { protocol: "https", hostname: "dl.airtable.com" },
    ],
  },
};

export default nextConfig;
