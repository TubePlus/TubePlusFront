'use client';

import { getShorts } from '@/lib/fetcher';
import { Skeleton } from '@nextui-org/skeleton';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image } from '@nextui-org/image';
import { Spinner } from '@nextui-org/spinner';
import { Card, CardFooter, CardHeader } from '@nextui-org/react';
import { User } from '@nextui-org/user';

interface ShortsProps {
  id: string;
  createdAt: string;
  username: string;
  thumbnail: string;
  youtubeName: string;
  youtubeHandler: string;
  communityName: string;
  profileImage: string;
}

const MainShorts = () => {
  const { isLoading, isError, error, data, refetch } = useQuery(
    ['main-shorts'],
    getShorts,
  );

  return !isLoading ? (
    <ScrollShadow orientation="horizontal" hideScrollBar>
      <div className="flex gap-2">
        {data.map((s: ShortsProps) => (
          <Card
            key={s.id}
            className="shadow-none min-h-[320px] min-w-[200px] group"
          >
            <div className="absolute w-full h-full z-[10] bg-default-900 group-hover:opacity-60 opacity-0 duration-300" />

            <Image
              removeWrapper
              className="z-0 w-auto h-full scale-110 group-hover:scale-125 -translate-y-4 object-cover"
              alt={s.id}
              src={s.thumbnail}
            />
            <CardFooter className="z-[15] absolute bottom-0 h-full items-end text-default-200">
              <div className="relative">
                <User
                  className="absolute bottom-0 group-hover:bottom-10 text-default-foreground group-hover:text-default-50 duration-300"
                  classNames={{
                    name: 'font-semibold',
                    description: 'italic text-tiny',
                  }}
                  avatarProps={{
                    alt: s.username,
                    src: s.profileImage,
                    // className: '!w-6 !h-6',
                  }}
                  name={s.username}
                  description={`@${s.youtubeHandler}`}
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 duration-400 grid grid-cols-2 gap-1 items-center text-small">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {s.communityName}
                </span>
                <span className="text-tiny text-end">
                  {s.createdAt.split('T')[0]}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollShadow>
  ) : (
    <Skeleton className="min-h-[320px] rounded-xl" /> // TODO: infinity일 경우 하나 씩
  );
};
export default MainShorts;
