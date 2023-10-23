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
        source: '/login-no-modal',
        destination: '/login',
      },
    ];
  },
};

module.exports = nextConfig;

// mock api 배너 테스트를 위한 임시 코드
module.exports = {
  images: {
    domains: ['loremflickr.com'], // 이미지 호스트 이름을 배열로 추가
  },
};

// module.exports = withTwin({
//     ...nextConfig,
//     // reactStrictMode: true,
// });
