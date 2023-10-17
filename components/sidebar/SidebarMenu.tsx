import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from '@nextui-org/skeleton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface SidebarMenuItemProps {
  name: string;
  href?: string;
  src?: string;
  icon?: any;
}

//TODO: onClick이 필요하다면 어떻게 해야 하나?(Subscription 같은 경우 endContent로 star 등이 추가될 수 있음)
const SidebarMenu = ({
  menuItem,
  startContentType,
}: {
  menuItem: SidebarMenuItemProps[];
  startContentType?: 'icon' | 'avatar';
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return menuItem.map((item, index) => {
    return mounted ? (
      <Button
        key={`${item.name}-${index}`} //Error: Key Props error 표시되지만 문제 없음
        variant={pathname === item.href ? 'solid' : 'light'}
        as={Link || ''}
        href={item.href || ''} // TODO:onClick Router로 이동
        fullWidth
        className="justify-start min-h-unit-10"
        startContent={
          startContentType == 'icon' ? (
            <item.icon />
          ) : startContentType == 'avatar' ? (
            <Avatar size="sm" src={item.src} />
          ) : (
            ''
          )
        }
      >
        {item.name}
      </Button>
    ) : (
      <div>
        <Skeleton key={index} className="h-8 rounded-lg my-1" />
      </div>
    );
  });
};

export default SidebarMenu;
