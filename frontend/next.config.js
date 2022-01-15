/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT
  }
};

module.exports = nextConfig;
