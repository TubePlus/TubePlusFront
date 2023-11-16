import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import ScrollToTop from '@/components/ui/ScrollToTop';

import 'swiper/swiper-bundle.css';
import 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import TubePlusLogo from '@/components/TubePlusLogo';
import { ThemeProvider } from './theme-provider';
import { usePathname } from 'next/navigation';
import CommunityHeader from '@/components/headers/CommunityHeader';

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
        <ThemeProvider>
          {modal}
          <Navbar />
          <CommunityHeader />
          {/* <SubNavbar /> */}

          
          <main
            className={`relative grid mx-auto max-w-[1524px] px-4 scrollbar-thin
                        lg:gap-[.8rem]  lg:grid-cols-12
                        md:gap-unit-md  md:grid-cols-10
                        sm:gap-unit-sm  sm:grid-cols-8
                        x:gap-unit-xs   x:grid-cols-4
                        `}
            >
              {children}
            </main>

            <ScrollToTop />
          </ThemeProvider>
        </Providers>

        {/* Footer */}
        <section className="w-full border-t-1 border-default-300 mx-auto p-0 pb-8">
          <div className="xl:max-w-[1400px] lg:max-w-[1200px] md:max-w-[992px] sm:max-w-[640px] mx-auto pt-9">
            <div className="flex gap-x-12 gap-y-5 justify-center items-center flex-wrap-reverse px-4">
              <div className="flex items-center gap-2">
                <TubePlusLogo classNames={{ base: 'w-[64px] grayscale' }} />
                <div
                  className="flex gap-1 items-center
                                md:flex-col md:justify-between
                                x:flex-row
                                "
                >
                  <h3 className="text-xl leading-6">TubePlus</h3>

                  <p className="text-sm">©2023 Aces</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-24 gap-y-1 justify-center items-center text-sm">
                <span>Terms</span>
                <span>Privacy</span>
                <span>Security</span>
                <span>Status</span>
                <span>Docs</span>
                <span>About</span>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
