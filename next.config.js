/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://api.pinata.cloud/:path*',
      },
      {
        source: '/:path*',
        destination: 'https://upload.nftlabs.co/:path*',
      },      
    ]
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'gateway.ipfscdn.io', 
      'bigfancdn.ams3.digitaloceanspaces.com',
      'prezano.mypinata.cloud',
      'uploads-ssl.webflow.com',
      'gateway.thirdweb.dev',
      'api.pinata.cloud',
      'upload.nftlabs.co'
    ],
  },
}

module.exports = nextConfig
