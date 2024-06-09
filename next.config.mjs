/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    AUT: process.env.AUT,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'https://eea6-128-201-83-206.ngrok-free.app',
      },
    ];
  },
  images: {
    domains: ['https://d22fxaf9t8d39k.cloudfront.net',
              'https://www.apple.com',
              'https://http2.mlstatic.com',
              'https://store.storeimages.cdn-apple.com/'],
  },
};

export default nextConfig;

