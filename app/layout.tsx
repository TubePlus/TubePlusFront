import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Desktop, Mobile, Tablet } from '@/components/Responsive';

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
    <html lang="en">
      <body
        className={`${inter.className} h-screen w-screen bg-zinc-100 dark:bg-zinc-800`}
      >
        <Providers>
          {modal}
          <Navbar />
          <Desktop>
            <div className="max-w-[1524px] grid grid-cols-12 gap-unit-lg m-auto overflow-y-auto">
              {children}
            </div>
          </Desktop>

          <Tablet>
            <div className="max-w-[1024px] grid grid-cols-10 gap-unit-lg m-auto overflow-y-auto">
              {children}
            </div>
          </Tablet>

          <Mobile>
            <div className="max-w-[640px] grid grid-cols-4 gap-unit-lg m-auto overflow-y-auto">
              {children}
            </div>
          </Mobile>
        </Providers>
      </body>
    </html>
  );
}
