/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './imageLoader.js'
  },
  // No basePath or assetPrefix for root domain deployment
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
  // Performance optimizations (production only)
  ...(isProd && {
    compiler: {
      removeConsole: true,
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
  })
}

module.exports = nextConfig