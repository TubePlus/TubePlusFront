import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ko'] as const;
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
