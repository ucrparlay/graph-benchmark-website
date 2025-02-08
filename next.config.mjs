/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: '/graph-benchmark',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/graph-benchmark/' : '',
}

export default nextConfig
