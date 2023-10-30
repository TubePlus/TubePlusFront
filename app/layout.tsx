import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import ScrollToTop from '@/components/ui/ScrollToTop';

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
        className={`${inter.className} h-full w-screen bg-zinc-100 dark:bg-zinc-800 scrollbar-none`}
      >
        <Providers>
          {modal}
          <Navbar />

          <div
            className={`grid m-auto overflow-y-auto scrollbar-thin
                        desktop:gap-unit-lg tablet:gap-unit-md mobileL:gap-unit-md mobileM:gap-unit-sm
                        desktop:max-w-[1524px] tablet:max-w-[1024px] mobileL:max-w-[640px] mobileM:max-w-[640px]
                        desktop:grid-cols-12 tablet:grid-cols-10 mobileL:grid-cols-8 mobileM:grid-cols-4`}
          >
            {children}
          </div>

          <ScrollToTop />

        </Providers>
      </body>
    </html>
  );
}
