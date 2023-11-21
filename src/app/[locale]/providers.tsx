'use client';
import { useRouter } from '@/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider, useSession } from 'next-auth/react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useEffect, useState } from 'react';

export const queryClient = new QueryClient(); // defaultOption으로 초기값 설정 가능

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
