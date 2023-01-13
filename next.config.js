/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
]

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  env: {
    ENDPOINT_URI: process.env.ENDPOINT_URI || "",
    DEFAULT_LANG: process.env.DEFAULT_LANG || "en"
  },
})

module.exports = nextConfig
