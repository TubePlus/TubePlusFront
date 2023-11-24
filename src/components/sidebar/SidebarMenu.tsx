import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Link as LocLink } from '@/navigation';
import { Tooltip } from '@nextui-org/react';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@nextui-org/skeleton';
import { useLocale, useTranslations } from 'next-intl';

interface SidebarMenuItemProps {
  name: string;
  href?: string;
  src?: string;
  icon?: any;
  locale?: string;
}
//TODO: onClick이 필요하다면 어떻게 해야 하나?(Subscription 같은 경우 endContent로 star 등이 추가될 수 있음)
const SidebarMenu = ({
  classNames,
  menuItem,
  startContentType,
  isRoot = false,
  isLocale = false,
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
  isLocale?: boolean;
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  return menuItem.map((item, index) => {
    const concatPath =
      item.href === '/' ? '/' + locale : '/' + locale + item.href;
    const isEqual = pathname === concatPath;

    return mounted ? (
      <>
        {!isLocale ? (
          <SbButtonItem
            item={item}
            startContentType={startContentType}
            index={index}
            isRoot={isRoot}
            isEqual={isEqual}
          />
        ) : (
          <SbLocaleItem
            item={item}
            index={index}
            isRoot={isRoot}
            isEqual={isEqual}
          />
        )}
        {isRoot && <SbRootItem index={index} item={item} isEqual={isEqual} />}
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

const SbRootItem = ({
  index,
  item,
  isEqual,
}: {
  index: number;
  item: SidebarMenuItemProps;
  isEqual: boolean;
}) => {
  const t = useTranslations('Home');

  return (
    <Tooltip radius="sm" placement="right" content={t(`sidebar.${item.name}`)}>
      <Button
        key={`${item.name}-${index}`}
        className={`w-[90%] bg-opacity-50
                  lg:hidden
                  md:flex md:w-[90%] md:mx-auto
                  x:hidden
                  ${isEqual ? '' : ''}
                  `}
        variant={isEqual ? 'solid' : 'light'}
        as={Link || ''}
        href={item.href || ''} // TODO:onClick Router로 이동
        isIconOnly
      >
        {item.icon ? <item.icon /> : 1}
      </Button>
    </Tooltip>
  );
};

const SbButtonItem = ({
  item,
  index,
  classNames,
  startContentType,
  isRoot,
  isEqual,
}: {
  item: SidebarMenuItemProps;
  classNames?: {
    button?: string;
    defaultBgColor?: string;
    activeBgColor?: string;
    startIcon?: string;
  };
  index: number;
  startContentType?: 'icon' | 'avatar';
  isRoot: boolean;
  isEqual: boolean;
}) => {
  const t = useTranslations('Home');

  return (
    <Button
      key={`${item.name}-${index}`} //Error: Key Props error 표시되지만 문제 없음
      className={`${classNames?.button} lg:flex lg:justify-start
                      ${isRoot && 'md:hidden'}
                      x:flex x:justify-start
                      min-h-unit-10 mx-auto w-[95%] bg-opacity-50
                      ${
                        isEqual
                          ? `${classNames?.activeBgColor || ''}`
                          : `${classNames?.defaultBgColor || ''}`
                      }
                    `}
      variant={isEqual ? 'solid' : 'light'}
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
      {startContentType === 'avatar' ? item.name : t(`sidebar.${item.name}`)}
    </Button>
  );
};

const SbLocaleItem = ({
  item,
  index,
  classNames,
  startContentType,
  isRoot,
  isEqual,
}: {
  item: SidebarMenuItemProps;
  classNames?: {
    button?: string;
    defaultBgColor?: string;
    activeBgColor?: string;
    startIcon?: string;
  };
  index: number;
  startContentType?: 'icon' | 'avatar';
  isRoot: boolean;
  isEqual: boolean;
}) => {
  const t = useTranslations('Home');
  const thisLocale = item.locale!.substring(2, -1);

  //TODO: hadleClick으로 Server에 언어 변경 요청

  return (
    <LocLink
      key={`${item.name}-${index}`} //Error: Key Props error 표시되지만 문제 없음
      className={`${classNames?.button} lg:flex lg:justify-start lg:px-4
                      ${isRoot && 'md:hidden'}
                      x:flex x:justify-start x:px-4
                      min-h-unit-10 mx-auto w-[95%] bg-opacity-50
                    `}
      href={'/'}
      locale={thisLocale as any}
    >
      {t(`sidebar.${item.name}`)}
    </LocLink>
  );
};

export { SbRootItem, SbButtonItem, SbLocaleItem };
