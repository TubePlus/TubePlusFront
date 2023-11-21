'use client';

import {
  getCommunitiesByUuid,
  getFavoritesByUuid,
  getPostsByUuid,
} from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { rankingCell, renderCell } from '@/hooks/use-render-cell';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Spinner } from '@nextui-org/spinner';
import SimpleCard from '@/components/SimpleCard';
import { Key } from 'react';

interface UserPageProps {
  params: {
    username: string;
  };
}

const latestPostColumns = [
  // { key: 'id', label: 'Id' },
  { key: 'title', label: 'Title' },
  { key: 'boardId', label: 'Board' }, //TODO: boardName으로 대체
  { key: 'contents', label: 'Content' },
  { key: 'voteCounts', label: 'Votes' },
  { key: 'createdAt', label: 'Created' },
  // { key: 'updatedAt', label: 'Last Updated' },
  { key: 'actions', label: 'Actions' },
];

const myCommunityColumns = [
  { key: 'id', label: 'Order' },
  { key: 'username', label: 'Creator' },
  { key: 'communityName', label: 'Community' },
  { key: 'views', label: 'Avg.Views' },
  { key: 'youtubeSubscribers', label: 'Subscribers' },
  { key: 'view-subs', label: 'View/Subs.' },
  { key: 'communityMembers', label: 'Members' },
];

export default function UserPage({ params }: UserPageProps) {
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

  const {
    isLoading: isCommuinitiesLoading,
    isError: isCommunitiesError,
    error: communitiesError,
    data: myCommunities,
    refetch: communitiesRefetch,
  } = useQuery(['my-communities-all'], () => {
    // return getMyJoinedCommunities(user?.uuid as string);
    return getCommunitiesByUuid('7a424347-b903-4abb-b97b-90ece0821e6f');
  });

  const {
    isLoading: isFavoritesLoading,
    isError: isFavoritesError,
    error: favoritesError,
    data: myFavorites,
    refetch: favoritesRefetch,
  } = useQuery(['my-favorites-all'], () => {
    // return getPostsByUuid(user?.uuid as string);
    return getFavoritesByUuid('7a424347-b903-4abb-b97b-90ece0821e6f');
  });

  return (
    <div
      className={`lg:col-start-4   lg:col-end-13  lg:pl-0 
                  md:col-start-4   md:col-end-9   md:pl-0 
                  sm:col-span-full
                  xs:col-span-full
                  flex flex-col gap-y-10 gap-unit-md z-0 scrollbar-thin`}
    >
      <SimpleCard title={`My Posts(${myPosts?.length || 0})`} externalLink={``}>
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
              columns={latestPostColumns}
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
              {myPosts?.map((row: { key: Key }) => (
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
        title={`My Communities(${myPosts?.length || 0})`}
        externalLink={``}
      >
        {isCommuinitiesLoading ? (
          <Spinner size="lg" color="default" />
        ) : (
          <Table
            classNames={{}}
            checkboxesProps={{ classNames: { wrapper: 'mx-auto' } }}
            removeWrapper
          >
            <TableHeader
              className="" // background
              columns={myCommunityColumns}
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
              {myCommunities?.map((row: { key: Key }) => (
                <TableRow key={row.key}>
                  {columnKey => (
                    <TableCell
                      className={`text-xs ${
                        columnKey === 'contents' || columnKey === 'voteCounts'
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
        )}
      </SimpleCard>

      <SimpleCard
        title={`My Favorites(${myPosts?.length || 0})`}
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
              columns={latestPostColumns}
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
              {myPosts?.map((row: { key: Key }) => (
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
