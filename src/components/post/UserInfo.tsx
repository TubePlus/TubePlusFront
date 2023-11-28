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


  const { data: userInfo, isLoading, isError } = useQuery<ServerResponse | null>(
    ['userInfo', authorUuid],
    () => getUserByUuid(authorUuid),
    {
      enabled: !!authorUuid,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!userInfo || !userInfo.data) return <div><Avatar /></div>;


  return (
    <>
      <div className='flex flex-nowrap gap-3 pb-2'>
      <Avatar src={userInfo.data.profileImage} />
      <span className='font-semibold'>{userInfo.data.username}</span>
      </div>
    </>
  );
}

export default UserInfo;