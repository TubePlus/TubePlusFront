import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/react';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@nextui-org/skeleton';

interface SidebarMenuItemProps {
  name: string;
  href?: string;
  src?: string;
  icon?: any;
}

//TODO: onClick이 필요하다면 어떻게 해야 하나?(Subscription 같은 경우 endContent로 star 등이 추가될 수 있음)
const SidebarMenu = ({
  classNames,
  menuItem,
  startContentType,
  isRoot = false,
}: {
  classNames?: {
    button?: string;
    defaultBgColor?: string;
    activeBgColor?: string;
    startIcon?: string;
  };
  menuItem: SidebarMenuItemProps[];
  startContentType?: 'icon' | 'avatar';
  isRoot?: boolean;
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return menuItem.map((item, index) => {
    return mounted ? (
      <>
        <Button
          key={`${item.name}-${index}`} //Error: Key Props error 표시되지만 문제 없음
          className={`${classNames?.button} lg:flex lg:justify-start
                     ${isRoot && 'md:hidden'}
                     x:flex x:justify-start
                     min-h-unit-10 mx-auto w-[95%] bg-opacity-50
                     ${
                       pathname === item.href
                         ? `${classNames?.activeBgColor || ''}`
                         : `${classNames?.defaultBgColor || ''}`
                     }
                    `}
          variant={pathname === item.href ? 'solid' : 'light'}
          as={Link || ''}
          href={item.href || ''} // TODO:onClick Router로 이동
          startContent={
            startContentType == 'icon' ? (
              <item.icon className={classNames?.startIcon} />
            ) : startContentType == 'avatar' ? (
              <Avatar size="sm" src={item.src} />
            ) : (
              ''
            )
          }
        >
          {item.name}
        </Button>

        {isRoot && (
          <Tooltip radius="sm" placement="right" content={item.name}>
            <Button
              key={`${item.name}-${index}`}
              className={`w-[90%] bg-opacity-50
                      lg:hidden
                      md:flex md:w-[90%] md:mx-auto
                      x:hidden
                      ${pathname === item.href ? '' : ''}
                      `}
              variant={pathname === item.href ? 'solid' : 'light'}
              as={Link || ''}
              href={item.href || ''} // TODO:onClick Router로 이동
              isIconOnly
            >
              {item.icon && <item.icon />}
            </Button>
          </Tooltip>
        )}
      </>
    ) : (
      <div>
        <Skeleton
          key={index}
          className={`h-8 rounded-lg my-1${isRoot ? 'w-[90%]' : 'w-full'}`}
        />
      </div>
    );
  });
};

export default SidebarMenu;
