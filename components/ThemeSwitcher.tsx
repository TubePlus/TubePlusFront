'use client';
import { getAuthSession } from '@/lib/auth';
import { Button, Skeleton, Spinner, Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

export const ThemeSwitcher = ({ type }: { type: 'toggle' | 'button' }) => {
  const [mounted, setMounted] = useState(false); // hydration error 방지
  const { theme, setTheme, systemTheme } = useTheme(); // TODO: user를 위한 setThme() 사용 시 Handler 안에 넣어서 session 확인, 확인 후 post fetch
  const { data: session } = useSession();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!session?.user) {
      setTheme('system');
    }
  }, []); // TODO: Warning 의존성 배열에 setTheme 필요 - "mount 시에만 실행되어야 하기 때문에 추가하면 안됨"

  switch (type) {
    case 'toggle':
      return (
        <>
          <Switch
            size="sm"
            isSelected={theme === 'light'}
            onChange={toggleTheme}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
          />
        </>
      );

    case 'button':
      return mounted ? (
        <Button
          className="text-default-600"
          variant="light"
          radius="full"
          isIconOnly
          onClick={toggleTheme}
        >
          {theme === 'system' ? (
            systemTheme === 'light' ? (
              <MoonIcon width={20} height={20} />
            ) : (
              <SunIcon width={20} height={20} />
            )
          ) : theme === 'light' ? (
            <MoonIcon width={20} height={20} />
          ) : (
            <SunIcon width={20} height={20} />
          )}
        </Button>
      ) : (
        <div>
          <Skeleton className="flex rounded-lg w-10 h-10" />
        </div>
      );
  }
};
