import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import ScrollToTop from '@/components/ui/ScrollToTop';

import 'swiper/swiper-bundle.css';
import 'swiper/modules';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'tubePlus',
  description: 'Adavance Community App for Youtube creator and fans.',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-900
                    min-h-screen h-full w-screen
                    overflow-y-auto scrollbar-none`}
      >
        <Providers>
          {modal}
          <Navbar />
          {/* <SubNavbar /> */}

          <div
            className={`relative grid mx-auto max-w-[1524px] px-4 scrollbar-thin
                        lg:gap-[.8rem]  lg:grid-cols-12
                        md:gap-unit-md  md:grid-cols-10
                        sm:gap-unit-sm  sm:grid-cols-8
                        x:gap-unit-xs   x:grid-cols-4
                        `}
          >
            {children}
          </div>

          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
