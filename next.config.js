/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/login_m',
        destination: '/login',
      },
    ];
  },
};

module.exports = nextConfig;

// module.exports = withTwin({
//     ...nextConfig,
//     // reactStrictMode: true,
// });
