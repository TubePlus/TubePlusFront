'use client';

import { getShorts, getShortsFromServer } from '@/lib/fetcher';
import { Skeleton } from '@nextui-org/skeleton';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image } from '@nextui-org/image';
import { Spinner } from '@nextui-org/spinner';
import { Card, CardFooter, CardHeader } from '@nextui-org/react';
import { User } from '@nextui-org/user';
import Link from 'next/link';

interface ShortsProps {
  videoTitle: string;
  ranking: number;
  videoCategory: string;
  thumbnailUrl: string;
  channelName: string;
  channelId: string;
  videoUrl: string;
}

const MainShorts = () => {
  const {
    isLoading: mockIsLoading,
    isError: mockIsError,
    error: mockError,
    data: mockData,
    refetch: mockRefetch,
  } = useQuery(['main-shorts-mock'], getShorts);
  const { isLoading, isError, error, data, refetch } = useQuery(
    ['main-shorts'],
    getShortsFromServer,
  );

  return !isLoading ? (
    <ScrollShadow orientation="horizontal" hideScrollBar>
      <div className="flex gap-2">
        {data?.data.map((s: ShortsProps) => (
          <Card
            key={s.channelId}
            className="shadow-none min-h-[320px] min-w-[200px] group"
          >
            <Link
              className="h-full w-full"
              href={`https://${s.videoUrl}`}
              target="_blank"
            >
              <div className="absolute w-full h-full z-[10] bg-default-900 group-hover:opacity-60 opacity-0 duration-300" />
              <CardHeader className="absolute -top-1 -left-1">
                <h1 className="w-8 h-8 flex justify-center items-center text-lg leading-4 font-semibold text-foreground bg-default-200 rounded-full">
                  {s.ranking}
                </h1>
              </CardHeader>

              <Image
                removeWrapper
                className="z-0 w-full h-full scale-[1.4] group-hover:scale-150 object-cover"
                alt={s.channelId}
                src={s.thumbnailUrl}
              />
              <CardFooter className="z-[15] absolute bottom-0 h-full items-end text-default-200">
                <div className="relative flex flex-col w-full text-ellipsis overflow-hidden">
                  <h1 className="w-full block text-sm font-semibold whitespace-nowrap line-clamp-1 text-ellipsis">
                    {s.channelName}
                  </h1>
                  <span className="text-sm">{s.videoCategory}</span>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </ScrollShadow>
  ) : (
    <Skeleton className="min-h-[320px] rounded-xl" /> // TODO: infinity일 경우 하나 씩
  );
};
export default MainShorts;
