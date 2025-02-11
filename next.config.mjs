/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: '/graph-benchmark-website',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/graph-benchmark-website/' : '',
}

export default nextConfig
