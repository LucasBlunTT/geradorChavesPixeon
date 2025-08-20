/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true }, // se você usa <Image/>
  trailingSlash: true, // opcional: gera .../index.html
};
module.exports = nextConfig;
