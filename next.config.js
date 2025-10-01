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
  assetPrefix: isProd ? '/portfolio' : '',
  basePath: isProd ? '/portfolio' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/portfolio' : '',
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