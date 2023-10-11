import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

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
                className={`${inter.className} bg-gradient-to-tl from-zinc-400 dark:from-zinc-900 via-zinc-50 to-zinc-400 dark:via-zinc-800 dark:to-zinc-900`}>
                <Providers>
                    <Navbar />

                    {children}
                    {modal}
                </Providers>
            </body>
        </html>
    );
}
