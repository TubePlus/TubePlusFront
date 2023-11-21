'use client';

import { getShorts, getShortsFromServer } from '@/lib/fetcher';
import { Skeleton } from '@nextui-org/skeleton';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Image } from '@nextui-org/image';
import { Spinner } from '@nextui-org/spinner';
import { Card, CardFooter, CardHeader } from '@nextui-org/react';
import { Chip } from '@nextui-org/chip';
import { User } from '@nextui-org/user';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Home');

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
            className="shadow-none min-h-[320px] min-w-[200px] border-0 border-red-500 hover:border-2 group"
          >
            <Link
              className="h-full w-full"
              href={`https://${s.videoUrl}`}
              target="_blank"
            >
              <div className="absolute w-full h-full z-[10] bg-default-200 group-hover:opacity-50 opacity-0 duration-300" />
              <div className="absolute w-full h-full z-[10] bg-gradient-to-t from-default-800 to-default-100/0 group-hover:opacity-0 opacity-50 duration-300" />
              <CardHeader className="absolute -top-1 -left-1">
                <h1
                  className="w-8 h-8 flex justify-center items-center text-lg leading-4 font-semibold
                              text-foreground bg-default-200
                              group-hover:text-default-100 group-hover:bg-red-600 duration-200
                              rounded-full"
                >
                  {s.ranking}
                </h1>
              </CardHeader>
              <Image
                removeWrapper
                className="z-0 w-full h-full scale-[1.4] group-hover:scale-150 object-cover"
                alt={s.channelId}
                src={s.thumbnailUrl}
              />
              <CardFooter className="z-[15] absolute bottom-0 h-full flex flex-col justify-end">
                <div className="relative w-full h-1/3 flex flex-col">
                  <span
                    className="absolute font-bold text-start break-all text-ellipsis line-clamp-4
                                    top-14 opacity-0 group-hover:top-0 group-hover:opacity-100 duration-300
                                    "
                  >
                    {s.videoTitle}
                  </span>
                </div>

                <div className="relative flex flex-col gap-1 w-full">
                  <Chip
                    className="line-clamp-1 text-ellipsis group-hover:bg-red-600 duration-200"
                    size="sm"
                  >
                    <span className="font-semibold group-hover:text-white duration-200">
                      {s.channelName}
                    </span>
                  </Chip>
                  <Chip
                    className="text-sm group-hover:bg-red-500 duration-200"
                    size="sm"
                  >
                    <span className="font-semibold group-hover:text-default-300 duration-200">
                      {t(`category.${s.videoCategory}`)}
                    </span>
                  </Chip>
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
