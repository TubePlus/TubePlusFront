'use client';

import {
  getCommunitiesByUuid,
  getFavoritesByUuid,
  getPostsByUuid,
} from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import OverviewTableCard from '@/components/OverviewTableCard';
import { renderCell } from '@/hooks/use-render-cell';

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
    // return getPostsByUuid(user?.uuid as string);
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

  const session = useSession();
  const user = session.data?.user;

  const { username } = params;

  // FIXME: Access by User Role
  // useEffect(() => {
  //   if (!user) {
  //     alert('접근 권한이 없습니다!');
  //     redirect('/');
  //   }
  // }, [user]);

  return (
    <div
      className={`lg:col-start-4   lg:col-end-13  lg:pl-0 
                  md:col-start-4   md:col-end-9   md:pl-0 
                  sm:col-span-full
                  xs:col-span-full
                  flex flex-col gap-y-10 gap-unit-md z-0 scrollbar-thin`}
    >
      <OverviewTableCard
        cardTitle="My Posts"
        cardLink={`/user/${username}/history`}
        isError={isPostsError}
        isLoading={isPostsLoading}
        tableColumns={latestPostColumns}
        tableRows={myPosts}
        renderCell={renderCell}
      />

      <OverviewTableCard
        cardTitle="My Communities"
        cardLink={`/user/${username}/my-community`}
        isError={isPostsError}
        isLoading={isPostsLoading}
        tableColumns={latestPostColumns}
        tableRows={myPosts}
        renderCell={renderCell}
      />

      <OverviewTableCard
        cardTitle="My Favorites"
        cardLink={`/user/${username}/favorites`}
        isError={isPostsError}
        isLoading={isPostsLoading}
        tableColumns={latestPostColumns}
        tableRows={myPosts}
        renderCell={renderCell}
      />
    </div>
  );
}
