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
import CommunityHeader from '@/components/headers/CommunityHeader';

import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import Footer from './footer';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'ko'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: 'tubePlus',
  description: 'Adavance Community App for Youtube creator and fans.',
};

type Props = {
  children: ReactNode;
  modal: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  modal,
  params: { locale },
}: Props) {
  let messages;
  try {
    console.log(`/${locale}.json`);
    messages = (await import(`../../../messages/${locale}.json`)).default;

    console.log(messages);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-900
                    min-h-screen h-full w-screen
                    overflow-y-auto scrollbar-none`}
      >
        <Providers>
          <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {modal}
              <Navbar />
              <CommunityHeader />
              {/* <SubNavbar /> */}

              <main
                className={`relative grid mx-auto max-w-[1524px] px-4 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-400 scrollbar-track-zinc-200
                        lg:gap-[.8rem]  lg:grid-cols-12
                        md:gap-unit-md  md:grid-cols-10
                        sm:gap-unit-sm  sm:grid-cols-8
                        x:gap-unit-xs   x:grid-cols-4
                        `}
              >
                {children}
              </main>

              <ScrollToTop />

              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
