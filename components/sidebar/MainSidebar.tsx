'use client';
import { Divider } from '@nextui-org/divider';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { useSession } from 'next-auth/react';
import {
  defaultMenuItem,
  languages,
  resourceMenuItem,
  subscribeMenuItem,
} from '@/data/sidebar';
import SidebarMenu from './SidebarMenu';
import { useEffect, useState } from 'react';

const MainSidebar = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`${
        mounted ? '!flex' : '!hidden'
      } flex pt-4 px-4 flex-col gap-2 h-[calc(100vh-3rem-1px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-rounded-full`}
    >
      <SidebarMenu menuItem={defaultMenuItem} startContentType="icon" />

      <Divider />

      {session?.user ? (
        <>
          <Accordion className="px-0" isCompact>
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

      <div className="grid grid-cols-2 gap-1">
        <SidebarMenu menuItem={languages} />
      </div>
    </div>
  );
};

export default MainSidebar;
