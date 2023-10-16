'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { DesktopValue, MobileValue, Tablet, TabletValue } from '../Responsive';
import {
  EnvelopeOpenIcon,
  GlobeIcon,
  HomeIcon,
  IdCardIcon,
  VideoIcon,
} from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import Link from 'next/link';
import { Avatar } from '@nextui-org/avatar';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@nextui-org/skeleton';

const defaultMenuItem = [
  {
    name: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    name: 'Community',
    icon: GlobeIcon,
    href: '/community',
  },
];

const subscribeMenuItem = [
  {
    name: '조빵일',
    src: 'https://avatars.githubusercontent.com/u/122770896?v=4',
    href: '/community/young1ll',
  },
  {
    name: '짐짝맨',
    src: 'https://yt3.ggpht.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s68-c-k-c0x00ffffff-no-rj',
    href: '/community/jimjjackman',
  },
  {
    name: '당신이 알았던 이야기',
    src: 'https://yt3.ggpht.com/ytc/APkrFKYwpvzECeLqP488RVUntxR4QDMdOIHJYTwQGnhm=s68-c-k-c0x00ffffff-no-rj',
    href: '/community/youknowstory',
  },
  {
    name: '좌왁굳의 게임방송',
    src: 'https://yt3.ggpht.com/TfNiEYiPS4wX6BWXerod80xL3pB8RvRLHiEDiPTPo1ZOIsgYivENAGTu2Sax_YJ-8g9SCHtvFw=s68-c-k-c0x00ffffff-no-rj',
    href: '/community/leftgoodgame',
  },
];

const resourceMenuItem = [
  {
    name: 'About TubePlus',
    icon: VideoIcon,
    href: '/about',
  },
  {
    name: 'Help',
    icon: EnvelopeOpenIcon,
    href: '/help',
  },
  {
    name: 'Policies and Agreements',
    icon: IdCardIcon,
    href: '/policies-agreements',
  },
];

const languages = [
  {
    name: '한국어',
  },
  {
    name: 'English',
  },
  {
    name: '日本語',
  },
  {
    name: '中国话',
  },
  {
    name: 'Español',
  },
];

const MainSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isDesktop = DesktopValue();
  const isTablet = TabletValue();
  const isMobile = MobileValue();

  return (
    //TODO: Sidebar 에서 상속해서 사용: 보류
    //TODO: Sidebar Skeleton 적용
    <div
      className={`relative block overflow-y-auto order-first isolate border-r border-solid border-divider dark:border-zinc-200/20 ${
        isDesktop
          ? 'col-span-3'
          : isTablet
          ? 'col-span-4'
          : isMobile
          ? '!fixed !left-full'
          : ''
      } `}
    >
      <div className="pt-4 px-4 w-full flex flex-col gap-2 h-[calc(100vh-3rem-1px)]">
        {/* 100vh - var(--navbar-height) - 1px */}
        {defaultMenuItem.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={index}
              variant={pathname === item.href ? 'solid' : 'light'}
              as={Link}
              href={item.href}
              fullWidth
              className="justify-start"
              startContent={<IconComponent />}
            >
              {item.name}
            </Button>
          );
        })}

        <Divider />

        {session?.user && (
          <>
            <Accordion className="px-0" isCompact>
              <AccordionItem
                title="My Subscription"
                classNames={{
                  title: 'pl-unit-md text-sm',
                  content: 'flex flex-col gap-2',
                }}
              >
                {subscribeMenuItem.map((item, index) => (
                  <Button
                    key={index}
                    variant="flat"
                    as={Link}
                    href={item.href}
                    fullWidth
                    className="justify-start"
                    startContent={<Avatar size="sm" src={item.src} />}
                  >
                    {item.name}
                  </Button>
                ))}
              </AccordionItem>
            </Accordion>

            <Divider />
          </>
        )}

        {resourceMenuItem.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={index}
              variant="light"
              as={Link}
              href={item.href}
              fullWidth
              className="justify-start"
              startContent={<IconComponent />}
            >
              {item.name}
            </Button>
          );
        })}

        <Divider />

        <div className="grid grid-cols-2 gap-1">
          {languages.map((item, index) => (
            <Button
              key={index}
              variant="light"
              fullWidth
              size="sm"
              className="justify-start"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
