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
import { Card } from '@nextui-org/card';
import { Badge } from '@nextui-org/badge';
import { Tooltip } from '@nextui-org/tooltip';

const UserBox = () => {
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
  const userRole =
    fromUser?.role == 'ADMIN'
      ? fromUser.role
      : fromUser?.isCreator
      ? 'CREATOR'
      : fromUser?.role;

  const roleColor =
    fromUser?.role == 'ADMIN'
      ? 'danger'
      : fromUser?.isCreator
      ? 'warning'
      : fromUser?.role === 'MEMBER'
      ? 'success'
      : 'default';

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
      className={`relative flex flex-col gap-2
                  py-4 px-4 h-fit rounded-2xl shadow-small
                  border border-zinc-400/50
                `}
    >
      {!isError ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-3">
            <Avatar
              classNames={{
                base: ['md:basis-24 x:basis-36 h-full shrink-0'],
              }}
              name={fromUser?.username || user?.username}
              src={fromUser?.profileImage! || user?.image}
              radius="lg"
              isBordered={fromUser?.isCreator}
            />

            <div className="flex flex-col justify-between gap-2 w-full text-xs overflow-hidden">
              <div className="flex flex-col gap-2">
                <div
                  className="flex gap-4 items-center
                            justify-between"
                >
                  <span className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                    {fromUser?.username || user?.username}
                  </span>

                  <Button
                    className={`h-6 min-w-[60px] w-[60px] text-[.6rem] leading-3
                              flex
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
                    {userRole}
                  </Button>
                </div>

                <span
                  //TODO: Box 사이즈에 따라 ellipsis 적용되어야 함.
                  className="text-zinc-600 dark:text-zinc-300 italic
                            whitespace-nowrap overflow-hidden text-ellipsis
                            "
                >
                  {fromUser?.email || user?.email}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="mt-1">Locale: {fromUser?.locale}</span>

                <span className="md:hidden x:line-clamp-2 text-ellipsis text-sm">
                  {fromUser?.bio ||
                    'this area is for user bio. this area is for user bio. this area is for user bio.'}
                </span>
              </div>
            </div>
          </div>

          {
            // fromUser?.bio &&
            <div className="md:flex x:hidden px-1 text-sm">
              {fromUser?.bio ||
                'this area is for user bio. this area is for user bio. this area is for user bio.'}
            </div>
          }

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
                button: '!w-full',
                defaultBgColor: '',
                activeBgColor: '',
              }}
              menuItem={profileMemusDynamic}
              startContentType="icon"
              isRoot={false}
            />
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <SidebarMenu
              classNames={{
                button: '!w-full',
                defaultBgColor: '',
                activeBgColor: '',
              }}
              menuItem={profileMemusStatic}
              startContentType="icon"
              isRoot={false}
            />
          </div>
        </div>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: error as string }} />
      )}
    </Card>
  );
};

export default UserBox;
