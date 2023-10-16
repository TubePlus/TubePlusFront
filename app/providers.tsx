'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <NextThemeProvider attribute="class">{children}</NextThemeProvider>
      </SessionProvider>
    </NextUIProvider>
  )
}
