import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.linkareer.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.linkareer.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gmjd-contest.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    domains: [
      'via.placeholder.com',
      'media-cdn.linkareer.com',
      'api.linkareer.com',
      'lh3.googleusercontent.com',
      'gmjd-contest.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
