import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3005/api/:path*', // Redirect to your backend API
      },
    ];
  },
};
export default nextConfig;
