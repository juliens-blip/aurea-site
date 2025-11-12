// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Airtable (anciens articles)
      { protocol: "https", hostname: "v5.airtableusercontent.com" },
      { protocol: "https", hostname: "dl.airtable.com" },
      // Dropbox (nouveaux articles)
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      { protocol: "https", hostname: "www.dropbox.com" }, // au cas où tu gardes des liens ?dl=1
    ],
  },
};

export default nextConfig;
