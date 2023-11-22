'use client'

import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar } from '@nextui-org/react';
import { getUserByUuid } from '@/lib/fetcher';

interface UserResponse {
  email: string;
  username: string;
  profileImage: string;
  language: string;
  bio: string;
  dark: boolean;
  role: string;
  isCreator: boolean;
}

interface UserProps {
  uuid: string;
}


function UserInfo({ authorUuid }: { authorUuid: string }) {

  const { data , isLoading, isError } = useQuery<UserResponse | null>(['me'], async () => {
    if (authorUuid) {
      const data = await getUserByUuid(authorUuid);
      return data;
    }
    return null;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data) return <div>No data available</div>;

  // const { data : userInfo, isLoading : isInfoLoading, isError : isInfoError } = useMutation<UserResponse, Error, UserProps>(() => {
  //   return fetch('https://tubeplus.duckdns.org/api/v1/users/info', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ uuid: authorUuid }),
  //   }).then((res) => {
  //     if (!res.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return res.json();
  //   });
  // });

  // console.log(userInfo)

  // if (isInfoLoading) return <div>Loading...</div>;
  // if (isInfoError) return <div>Error fetching data</div>;

  console.log(data)

  return (
    <>
          <Avatar src={data.profileImage} />
          <span className='font-semibold'>{data.username}</span>
    </>
  );
}

export default UserInfo;
