/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@monorepo/ui', '@monorepo/utils'],
};

module.exports = nextConfig;
