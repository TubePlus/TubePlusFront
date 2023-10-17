'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useState } from 'react';

export const queryClient = new QueryClient(); // defaultOption으로 초기값 설정 가능

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SessionProvider>
          <NextThemeProvider attribute="class">{children}</NextThemeProvider>
        </SessionProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
