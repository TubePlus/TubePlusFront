'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <NextUIProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme={
          session?.user.darkmode
            ? 'dark'
            : !session?.user.darkmode
            ? 'light'
            : 'system'
        }
        enableSystem
      >
        {children}
      </NextThemeProvider>
    </NextUIProvider>
  );
}
