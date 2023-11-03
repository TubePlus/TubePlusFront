'use client';

import { getUserByUuid } from '@/lib/fetcher';
import { Button } from '@nextui-org/button';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import React, { useEffect } from 'react';
import { Avatar } from '@nextui-org/avatar';
import { Divider } from '@nextui-org/divider';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import { profileMemusStatic } from '@/data/sidebar';
import Link from 'next/link';
import { GlobeIcon, HomeIcon } from '@radix-ui/react-icons';
import { Card } from '@nextui-org/react';

const MyPageSidebar = () => {
  const session = useSession();
  const user = session.data?.user;

  const { isLoading, isError, error, data, refetch } = useQuery(
    ['me'],
    async () => {
      if (user?.uuid) {
        const data = await getUserByUuid(user?.uuid as string);
        return data;
      }
      return null;
    },
  );

  useEffect(() => {
    refetch();
  }, [refetch, user]);

  const fromUser = data?.data;

  const profileMemusDynamic = [
    {
      name: 'Overview',
      icon: HomeIcon,
      href: `/user/${user?.username}`,
    },
    {
      name: 'My Community',
      icon: GlobeIcon,
      href: `/user/${user?.username}/my-community`,
    },
  ];

  return (
    <Card
      className={`flex flex-col gap-2
                  py-4 px-4 h-fit rounded-2xl shadow-small
                  border border-zinc-400/50
                `}
    >
      {!isError ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-3">
            <Avatar
              classNames={{ base: 'min-w-[85px] min-h-[85px]' }}
              src={fromUser?.profileImage! || user?.image}
              radius="lg"
              size="lg"
              isBordered={fromUser?.isCreator}
            />

            <div className="flex flex-col gap-1 text-xs w-full">
              <div>
                <div
                  className="flex gap-1 items-center
                              justify-between"
                >
                  <span className="text-lg font-semibold max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {fromUser?.username || user?.username}
                  </span>

                  <Button
                    className={`h-6 min-w-[60px] w-[60px] text-[.6rem] leading-3
                            ${
                              fromUser?.role == 'ADMIN'
                                ? 'border-danger-700 text-danger-700'
                                : fromUser?.isCreator
                                ? 'border-warning-700 text-warning-700'
                                : 'border-success-700 text-success-700'
                            }`}
                    variant="bordered"
                    radius="full"
                    disabled
                  >
                    {fromUser?.role == 'ADMIN'
                      ? fromUser.role
                      : fromUser?.isCreator
                      ? 'CREATOR'
                      : fromUser?.role}
                  </Button>
                </div>

                <span
                  className="text-zinc-600 dark:text-zinc-300
                            max-w-full overflow-hidden text-ellipsis"
                >
                  {fromUser?.email || user?.email}
                </span>
              </div>

              <span className="mt-1">Locale: {fromUser?.locale}</span>
            </div>
          </div>

          {fromUser?.bio && <div className="px-1">{fromUser.bio}</div>}

          <Button
            className="flex items-center h-10 leading-10
                      bg-success-700 dark:bg-success-200 
                      text-success-100 dark:text-success-800
                      "
            as={Link}
            href="/settings/account"
          >
            Edit Profile
          </Button>

          {fromUser?.link && (
            <div className="flex gap-2 px-1">
              {fromUser.link.map(
                ({ link, index }: { link: string; index: number }) => (
                  <span key={index}>{link}</span>
                ),
              )}
            </div>
          )}

          <Divider />

          <div className="flex flex-col gap-2">
            <SidebarMenu
              classNames={{
                defaultBgColor: '',
                activeBgColor: '',
              }}
              menuItem={profileMemusDynamic}
              startContentType="icon"
            />
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <SidebarMenu
              classNames={{
                defaultBgColor: '',
                activeBgColor: '',
              }}
              menuItem={profileMemusStatic}
              startContentType="icon"
            />
          </div>
        </div>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: error as string }} />
      )}
    </Card>
  );
};

export default MyPageSidebar;
