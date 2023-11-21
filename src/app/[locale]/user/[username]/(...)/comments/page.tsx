'use client';

import SimpleCard from '@/components/SimpleCard';
import { getPostsByUuid } from '@/lib/fetcher';
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
import { renderCell } from '@/hooks/use-render-cell';
import { Key } from 'react';

const myPostColumns = [
  // { key: 'id', label: 'Id' },
  { key: 'title', label: 'Title' },
  { key: 'boardId', label: 'Board' }, //TODO: boardName으로 대체
  { key: 'contents', label: 'Content' },
  { key: 'voteCounts', label: 'Votes' },
  { key: 'createdAt', label: 'Created' },
  // { key: 'updatedAt', label: 'Last Updated' },
  { key: 'actions', label: 'Actions' },
];

export default function CommentsPage() {
  const {
    //TODO: fetcher 변경(나의 모든 comments 불러오기)
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
    <div className="flex flex-col gap-8">
      <SimpleCard
        title={`My Comments(${myPosts?.length || 0})`}
        externalLink={``}
      >
        {isPostsLoading ? (
          <Spinner size="lg" color="default" />
        ) : (
          <Table //TODO: 10개 이상의 콘텐츠에 대해 pagenation
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
    </div>
  );
}
