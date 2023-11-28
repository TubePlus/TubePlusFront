'use client';

import { communityCategory } from '@/data/sidebar';
import { getRanksfromMock } from '@/lib/fetcher';
import { Chip } from '@nextui-org/chip';
import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Skeleton } from '@nextui-org/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection,
} from '@nextui-org/table';
import { useQuery } from '@tanstack/react-query';
import React, { Key, useState } from 'react';
import { useTranslations } from 'next-intl';
import { User } from '@nextui-org/user';
import { cn } from '@nextui-org/system-rsc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const rankingTableColumn = [
  { key: 'id', label: 'order' },
  { key: 'username', label: 'creator' },
  { key: 'communityName', label: 'community' },
  { key: 'views', label: 'avg-view' },
  { key: 'youtubeSubscribers', label: 'subscribers' },
  { key: 'view-subs', label: 'view-subs' },
  { key: 'communityMembers', label: 'members' },
];

const CreatorRanking = () => {
  const [categoryFilter, setCategoryFilter] = useState<Selection>('all');
  const [categoryFilterChip, setCategoryFilterChip] = useState(() => [
    { code: 'all' },
    ...communityCategory,
  ]);
  const {
    isLoading,
    isError: isPostsError,
    error: postsError,
    data,
    refetch: postsRefetch,
  } = useQuery(['community-ranking'], getRanksfromMock);

  const filteredItems = React.useMemo(() => {
    if (data) {
      let filteredCreator = [...data];

      if (
        categoryFilter !== 'all' &&
        Array.from(categoryFilter).length !== communityCategory.length
      ) {
        filteredCreator = filteredCreator.filter(c =>
          Array.from(categoryFilter).includes(c.communityCategory),
        );
      }

      return filteredCreator;
    } else return data;
  }, [categoryFilter, data]);

  const handleCategoryFilter = (categoryKey: string) => {
    console.log(categoryKey);
    if (categoryKey === 'all') {
      setCategoryFilter('all');
    } else {
      setCategoryFilter(new Set(categoryKey.split(',')));
    }
  };
  const router = useRouter();
  const t = useTranslations('Home');

  const rankingCell = (row: any, columnKey: Key) => {
    type Rows = (typeof row)[0];
    const cellValue = row[columnKey as keyof Rows];

    switch (columnKey) {
      case 'id': //TODO: order 로 변경
        return <div className="text-center">{row.id}</div>;
      case 'username':
        return (
          <div className="whitespace-nowrap">
            <User
              classNames={{ description: 'italic' }}
              avatarProps={{
                classNames: { img: 'hover:scale-125' },
                src: row.profileImage,
              }}
              name={row.username}
              description={`@${row.youtubeHandler}`}
            />
          </div>
        );

      case 'communityName':
        return (
          <div className="flex flex-col line-clamp-1 text-ellipsis">
            <span className="text-tiny line-clamp-1 text-ellipsis">
              {t(`category.${row.communityCategory}`)}
            </span>
            <Link
              className="cursor-pointer text-sm line-clamp-1 text-ellipsis hover:font-semibold hover:text-red-500"
              href={`/tube/${row.id}`}
            >
              {row.communityName}
            </Link>
          </div>
        );

      case 'views':
        return <div className="text-center">{row.views}</div>;

      case 'youtubeSubscribers':
        return <div className="text-center">{row.youtubeSubscribers}</div>;

      case 'communityMembers':
        return <div className="text-center">{row.communityMembers}</div>;

      case 'view-subs':
        return (
          <div className="text-center">
            {row.views}/{row.youtubeSubscribers}
          </div>
        );

      default:
        return cellValue;
      // return null;
    }
  };

  return !isLoading ? (
    <Table
      classNames={{
        th: [
          'bg-transparent',
          'text-default-500',
          'border-b',
          'border-divider',
        ],
        base: 'border border-default-300 rounded-xl p-4 min-h-[658px]',
      }}
      topContent={
        <div id="community" className="flex sm:gap-8 x:gap-4 items-center">
          <ScrollShadow orientation="horizontal" hideScrollBar className="">
            <div className="flex gap-2">
              {/* {Array.from(categoryFilter).includes()} */}
              {categoryFilterChip.map(cate => (
                <Chip
                  className={cn(
                    `cursor-pointer`,
                    `${
                      (Array.from(categoryFilter).includes(cate.code) ||
                        categoryFilter.toString() === cate.code) &&
                      'bg-black text-white dark:bg-zinc-100 dark:text-black'
                    }`,
                  )}
                  key={cate.code}
                  onClick={() => handleCategoryFilter(cate.code)}
                >
                  {t(`category.${cate.code}`)}
                </Chip>
              ))}
            </div>
          </ScrollShadow>
          <Button variant="light" radius="full" size="sm">
            {t('see-all')}
          </Button>
        </div>
      }
      isCompact
      removeWrapper
    >
      <TableHeader
        className="" // background
        columns={rankingTableColumn}
      >
        {(column: { key: string; label: string }) => (
          <TableColumn
            className={`${
              column.key === 'communityMembers'
                ? 'text-center'
                : column.key === 'id'
                ? 'w-10'
                : column.key === 'communityName'
                ? 'sm:table-cell xs:hidden'
                : column.key === 'view-subs'
                ? 'sm:hidden x:table-cell'
                : column.key === 'views' || column.key === 'youtubeSubscribers'
                ? 'sm:table-cell x:hidden'
                : ''
            }`}
          >
            {t(`table-head.${column.label}`)}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody>
        {filteredItems &&
          filteredItems.map((row: { key: Key }) => (
            <TableRow key={row.key}>
              {columnKey => (
                <TableCell
                  onClick={() => router.push(`/tube/${row.key}`)}
                  className={`text-xs ${
                    columnKey === 'communityName'
                      ? 'sm:table-cell xs:hidden'
                      : columnKey === 'view-subs'
                      ? 'sm:hidden x:table-cell'
                      : columnKey === 'views' ||
                        columnKey === 'youtubeSubscribers'
                      ? 'sm:table-cell x:hidden'
                      : ''
                  }`}
                >
                  {rankingCell(row, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  ) : (
    <Skeleton className="w-full h-[565px] rounded-xl" />
  );
};

export default CreatorRanking;
