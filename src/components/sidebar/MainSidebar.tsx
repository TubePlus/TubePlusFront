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
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

const MainSidebar = ({ isRoot = false }: { isRoot?: boolean }) => {
  const { data: session } = useSession();
  const username = session?.user.username; // TODO: 현재 google에서 전체 이름을 불러오고 있음. 기본값 별명(: young1ll)
  const [isMore, setIsMore] = useState();
  const t = useTranslations('Home');

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

      {session?.user && (
        <UserSidebar
          uuid={session?.user?.uuid as string}
          username={session?.user?.username as string}
          isRoot={isRoot}
        />
      )}

      <SidebarMenu
        menuItem={resourceMenuItem}
        startContentType="icon"
        isRoot={isRoot}
      />

      <Divider />

      <div className="grid grid-cols-2 gap-1 px-1 md:hidden lg:grid">
        <SidebarMenu menuItem={languages} isRoot={isRoot} isLocale />
      </div>
    </div>
  );
};

export default MainSidebar;

const UserSidebar = ({
  uuid,
  username,
  isRoot,
}: {
  uuid: string;
  username: string;
  isRoot: boolean;
}) => {
  const t = useTranslations('Home');

  const getCommunitiesByUuid = (uuid: string) => {
    const res = fetch(
      '/communities/users/me/joined-communities?page=0&size=5',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userUuid: uuid,
        }),
      },
    );
  };
  //TODO: user가 가입한 커뮤니티 리스트 표시
  const { data } = useQuery(['users-communities'], () => {
    return getCommunitiesByUuid(uuid);
  });

  // console.log(data);
  return (
    <>
      <Accordion
        className={`px-2 ${isRoot ? 'lg:block md:hidden' : 'block'}`}
        isCompact
      >
        <AccordionItem
          title={t(`sidebar.my-subscription`)}
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

      <Tooltip
        radius="sm"
        placement="right"
        content={t(`sidebar.my-subscription`)}
      >
        <Button
          variant="light"
          as={Link}
          href={`/user/${username}/favorites`}
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
  );
};
