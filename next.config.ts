import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // turbopack configuration disabled to avoid Turbopack/Rust SST write-batch crashes during dev
  // turbopack: {
  //   root: __dirname,
  // },
};

export default nextConfig;
