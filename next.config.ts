import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This wildcard allows any hostname
      },
    ],
  },
}

export default nextConfig
