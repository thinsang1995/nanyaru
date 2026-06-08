import type { NextConfig } from "next";

const CMS_BASE = "https://cleaning.nanyaru.com";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.ngrok-free.app'],
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/home/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cleaning/register',
        destination: `${CMS_BASE}/register`,
        permanent: true,
      },
      {
        source: '/cleaning/cleaning-thankyou',
        destination: `${CMS_BASE}/cleaning-thankyou`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
