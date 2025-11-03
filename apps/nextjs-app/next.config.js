/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@monorepo/packages/ui', '@monorepo/packages/utils'],
};

module.exports = nextConfig;
