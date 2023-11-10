'use client';

import { communityCategory } from '@/data/sidebar';
import { rankingCell } from '@/hooks/use-render-cell';
import { getRanks } from '@/lib/fetcher';
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
} from '@nextui-org/table';
import { useQuery } from '@tanstack/react-query';
import React, { Key } from 'react';

const rankingTableColumn = [
  { key: 'id', label: 'Order' },
  { key: 'username', label: 'Creator' },
  { key: 'communityName', label: 'Community' },
  { key: 'views', label: 'Avg.Views' },
  { key: 'youtubeSubscribers', label: 'Subscribers' },
  { key: 'view-subs', label: 'View/Subs.' },
  { key: 'communityMembers', label: 'Members' },
];

const CreatorRanking = () => {
  const {
    isLoading,
    isError: isPostsError,
    error: postsError,
    data,
    refetch: postsRefetch,
  } = useQuery(['community-ranking'], getRanks);

  return !isLoading ? (
    <Table
      className="!gap-2"
      classNames={{
        th: [
          'bg-transparent',
          'text-default-500',
          'border-b',
          'border-divider',
        ],
      }}
      topContent={
        <div className="flex sm:gap-8 x:gap-4 items-center">
          <ScrollShadow orientation="horizontal" hideScrollBar className="">
            <div className="flex gap-2">
              {communityCategory.map(cate => (
                <Chip key={cate.code}>{cate.label}</Chip>
              ))}
            </div>
          </ScrollShadow>
          <Button variant="light" radius="full" size="sm">
            See all
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
            className={` ${
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
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody>
        {data &&
          data.map((row: { key: Key }) => (
            <TableRow key={row.key}>
              {columnKey => (
                <TableCell
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
