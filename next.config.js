/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://10.10.1.84:3333/:path*' },
    ];
  },
};
module.exports = nextConfig;
