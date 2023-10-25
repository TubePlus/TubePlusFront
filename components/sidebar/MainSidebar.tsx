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

const MainSidebar = () => {
  const { data: session } = useSession();
  const username = session?.user.name; // TODO: 현재 google에서 전체 이름을 불러오고 있음. 기본값 별명(: young1ll)

  return (
    <div
      className={`flex flex-col gap-2 pt-4 pl-2 h-[calc(100vh-3rem-1px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-rounded-full`}
    >
      <SidebarMenu menuItem={defaultMenuItem} startContentType="icon" />

      <Divider />

      {session?.user ? (
        <>
          <Accordion className="px-0 tablet:hidden desktop:block" isCompact>
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
              />
            </AccordionItem>
          </Accordion>

          <Tooltip radius="sm" placement="right" content="My ubscription">
            <Button
              variant="light"
              as={Link}
              href={`/user/${username}/subscription`}
              className="flex w-full desktop:hidden"
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

      <SidebarMenu menuItem={resourceMenuItem} startContentType="icon" />

      <Divider />

      <div className="grid grid-cols-2 gap-1 tablet:hidden desktop:grid">
        <SidebarMenu menuItem={languages} />
      </div>
    </div>
  );
};

export default MainSidebar;
