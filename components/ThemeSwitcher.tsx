'use client';
import { getAuthSession } from '@/lib/auth';
import { Button, Skeleton, Spinner, Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

export const ThemeSwitcher = ({ type }: { type: 'toggle' | 'button' }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false); // hydration error 방지
  const { theme, setTheme, systemTheme } = useTheme(); // TODO: user를 위한 setThme() 사용 시 Handler 안에 넣어서 session 확인, 확인 후 post fetch

  useEffect(() => {
    setMounted(true);
    async () => {
      const session = await getAuthSession();
      if (!session?.user) {
        setTheme('system');
      }
    };
  }, []); // TODO: Warning 의존성 배열에 setTheme 필요 - "mount 시에만 실행되어야 하기 때문에 추가하면 안됨"

  switch (type) {
    case 'toggle':
      return (
        <>
          <Switch
            size="sm"
            isSelected={theme === 'light'}
            onChange={() =>
              theme === 'light' ? setTheme('dark') : setTheme('light')
            }
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
          />
          {pathname === '/test' ? (
            <div className="text-sm">
              <p>System: {systemTheme}</p>
              <p>Theme: {theme}</p>
            </div>
          ) : null}
        </>
      );

    case 'button':
      return mounted ? (
        <Button
          isIconOnly
          onClick={() =>
            theme === 'light' ? setTheme('dark') : setTheme('light')
          }
        >
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      ) : (
        <div>
          <Skeleton className="flex rounded-lg w-10 h-10" />
        </div>
      );
  }
};
