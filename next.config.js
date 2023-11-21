const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      },
    ],
  },

  async rewrites() {
    console.log('Rewrites called');
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/login_m',
            destination: '/login',
          },
        ]
      : [];
  },
});

module.exports = nextConfig;
