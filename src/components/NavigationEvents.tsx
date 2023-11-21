'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import useGlobalState from '@/hooks/use-global-state';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useGlobalState('sidebarStatus');

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  }, [pathname, searchParams]);

  return null;
}
