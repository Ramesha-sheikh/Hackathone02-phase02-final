/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rameesha12123214-todophase02-backend.hf.space/',
  },
  images: {
    unoptimized: true,
    domains: ['via.placeholder.com'],
  },
};

module.exports = nextConfig;