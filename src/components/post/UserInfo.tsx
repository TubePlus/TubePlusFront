'use client'

import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar } from '@nextui-org/react';
import { getUserByUuid } from '@/lib/fetcher';

interface ServerResponse {
  data: UserResponse;
  message: string;
  code: string;
}

interface UserResponse {
  email: string;
  username: string;
  profileImage: string;
  locale: string;
  bio: string;
  dark: boolean;
  role: string;
  isCreator: boolean;
}

interface UserProps {
  uuid: string;
}

function UserInfo({ authorUuid }: { authorUuid: string }) {

  const { data : userInfo , isLoading, isError } = useQuery<ServerResponse | null>(['me'], async () => {
    if (authorUuid) {
      const data = await getUserByUuid(authorUuid);
      return data;
    }
    return null;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!userInfo) return <div>No data available</div>;

  return (
    <>
        <Avatar src={userInfo.data.profileImage} />
        <span className='font-semibold'>{userInfo.data.username}</span>
    </>
  );
}

export default UserInfo;
