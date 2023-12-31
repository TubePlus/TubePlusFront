'use client';

import { putTheme } from '@/lib/fetcher';
import { Button, Skeleton, Spinner, Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import React, { Suspense, useEffect, useState } from 'react';

export const ThemeSwitcher = ({ type }: { type: 'toggle' | 'button' }) => {
  const [mounted, setMounted] = useState(false); // hydration error 방지
  const { theme, setTheme, systemTheme } = useTheme(); // TODO: user를 위한 setThme() 사용 시 Handler 안에 넣어서 session 확인, 확인 후 post fetch
  const { data: session, update } = useSession();

  const fetchTheme = async () => {
    const response = await putTheme(session?.user.uuid as string);
    const { data } = await response.json();

    if (data.darkMode) setTheme('dark');
    else setTheme('light');
  };

  const toggleTheme = () => {
    if (session?.user) {
      fetchTheme();
      update();
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  // useEffect(() => {
  //   setMounted(true);
  //   if (!session?.user) {
  //     setTheme('system');
  //   } else {
  //     if (session.user.darkmode) setTheme('dark');
  //     else setTheme('light');
  //   }
  // }, [setTheme]); // TODO: Warning 의존성 배열에 setTheme 필요 - "mount 시에만 실행되어야 하기 때문에 추가하면 안됨"

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
      return (
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
      );
  }
};
