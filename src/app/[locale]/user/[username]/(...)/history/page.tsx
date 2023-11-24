'use client';

import SimpleCard from '@/components/SimpleCard';
import { renderCell } from '@/hooks/use-render-cell';
import { getPostsByUuid } from '@/lib/fetcher';
import { Progress } from '@nextui-org/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Spinner } from '@nextui-org/spinner';
import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';
import { useTranslations } from 'next-intl';

const myPostColumns = [
  // { key: 'id', label: 'Id' },
  { key: 'title', label: 'Title' },
  { key: 'boardId', label: 'Board' },
  { key: 'contents', label: 'Content' },
  { key: 'voteCounts', label: 'Votes' },
  { key: 'createdAt', label: 'Created' },
  // { key: 'updatedAt', label: 'Last Updated' },
  { key: 'actions', label: 'Actions' },
];

//TODO: 추후 renderCell 커스텀 필요할 경우 내부에서 정의
export default function HistoryPage() {
  const t = useTranslations();
  const {
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    data: myPosts,
    refetch: postsRefetch,
  } = useQuery(['my-posts-all'], () => {
    // return getPostsByUuid(user?.uuid as string);
    return getPostsByUuid('7a424347-b903-4abb-b97b-90ece0821e6f');
  });

  return (
    <section className="flex flex-col gap-8">
      <SimpleCard //TODO: 시간 순 모든 활동(이게 가능하면 아래 다른 card 필요 없음)
        title={`My Activities`}
        externalLink={``}
      >
        <Progress
          label={'test'}
          size="md"
          value={12}
          maxValue={100}
          formatOptions={{ style: 'currency', currency: 'ARS' }}
          showValueLabel={true}
        />
      </SimpleCard>

      <SimpleCard
        title={`${t('my-communities')}(${myPosts?.length || 0})`}
        externalLink={``}
      >
        {isPostsLoading ? (
          <Spinner size="lg" color="default" />
        ) : (
          <Table
            classNames={{}}
            checkboxesProps={{ classNames: { wrapper: 'mx-auto' } }}
            selectionMode="multiple"
            removeWrapper
          >
            <TableHeader
              className="" // background
              columns={myPostColumns}
            >
              {(column: { key: string; label: string }) => (
                <TableColumn
                  className={`${
                    column.key === 'contents' || column.key === 'voteCounts'
                      ? 'sm:table-cell x:hidden'
                      : ''
                  }`}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody>
              {myPosts.map((row: { key: Key }) => (
                <TableRow key={row.key}>
                  {columnKey => (
                    <TableCell
                      className={`text-xs ${
                        columnKey === 'contents' || columnKey === 'voteCounts'
                          ? 'sm:table-cell x:hidden'
                          : ''
                      }`}
                    >
                      {renderCell(row, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SimpleCard>

      <SimpleCard
        title={`${t('my-comments')}(${myPosts?.length || 0})`}
        externalLink={``}
      >
        {isPostsLoading ? (
          <Spinner size="lg" color="default" />
        ) : (
          <Table
            classNames={{}}
            checkboxesProps={{ classNames: { wrapper: 'mx-auto' } }}
            selectionMode="multiple"
            removeWrapper
          >
            <TableHeader
              className="" // background
              columns={myPostColumns}
            >
              {(column: { key: string; label: string }) => (
                <TableColumn
                  className={`${
                    column.key === 'contents' || column.key === 'voteCounts'
                      ? 'sm:table-cell x:hidden'
                      : ''
                  }`}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody>
              {myPosts.map((row: { key: Key }) => (
                <TableRow key={row.key}>
                  {columnKey => (
                    <TableCell
                      className={`text-xs ${
                        columnKey === 'contents' || columnKey === 'voteCounts'
                          ? 'sm:table-cell x:hidden'
                          : ''
                      }`}
                    >
                      {renderCell(row, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SimpleCard>
    </section>
  );
}
