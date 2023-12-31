import { createSharedPathnamesNavigation } from 'next-intl/navigation';

/**
 * Locale Navigation
 */
export const locales = ['en', 'ko', 'ja', 'zh', 'es'] as const;
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
