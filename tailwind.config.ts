import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // TODO: tailwind 상세 설정 추가(커스터마이징 필요 시)
    screen: {
      sm: '640px',
      // @media (min-width: 640px) {...}
      md: '768px',
      // @media (min-width: 768px) {...}
      lg: '1024px',
      // @media (min-width: 1024px) {...}
    },
  },
  plugins: [require('tailwindcss-animate'), nextui()],
};
