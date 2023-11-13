'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  defaultMenuItem,
  languages,
  resourceMenuItem,
  subscribeMenuItem,
} from '@/data/sidebar';
import SidebarMenu from './SidebarMenu';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Tooltip } from '@nextui-org/tooltip';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { Accordion, AccordionItem } from '@nextui-org/accordion';

const MainSidebar = ({ isRoot = false }: { isRoot?: boolean }) => {
  const { data: session } = useSession();
  const username = session?.user.name; // TODO: 현재 google에서 전체 이름을 불러오고 있음. 기본값 별명(: young1ll)
  const [isMore, setIsMore] = useState();

  // TODO: static top-0
  return (
    <div
      className={`flex flex-col gap-2 pt-4 h-full
                  scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-rounded-full`}
    >
      <SidebarMenu
        menuItem={defaultMenuItem}
        startContentType="icon"
        isRoot={isRoot}
      />

      <Divider />

      {session?.user ? (
        <>
          <Accordion
            className={`px-2 ${isRoot ? 'lg:block md:hidden' : 'block'}`}
            isCompact
          >
            <AccordionItem
              title="My Subscription"
              classNames={{
                title: 'pl-unit-md text-sm',
                content: 'flex flex-col gap-2',
              }}
            >
              <SidebarMenu
                menuItem={subscribeMenuItem}
                startContentType="avatar"
                isRoot={isRoot}
              />
            </AccordionItem>
          </Accordion>

          <Tooltip radius="sm" placement="right" content="My ubscription">
            <Button
              variant="light"
              as={Link}
              href={`/user/${username}/subscription`}
              className={`flex w-[90%] mx-auto ${
                isRoot ? 'lg:hidden md:flex x:hidden' : 'hidden'
              }`}
              fullWidth
              isIconOnly
            >
              <LightningBoltIcon />
            </Button>
          </Tooltip>

          <Divider />
        </>
      ) : (
        <>
          {/* TODO: session.user 가 아니라, mounted or loading 에 대응해야함
          <div>
            <Skeleton className="h-8 py-1.5 rounded-lg" />
          </div>

          <Divider /> */}
        </>
      )}

      <SidebarMenu
        menuItem={resourceMenuItem}
        startContentType="icon"
        isRoot={isRoot}
      />

      <Divider />

      <div className="grid grid-cols-2 gap-1 px-1 md:hidden lg:grid">
        <SidebarMenu menuItem={languages} isRoot={isRoot} />
      </div>
    </div>
  );
};

export default MainSidebar;
