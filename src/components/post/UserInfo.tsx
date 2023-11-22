import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Avatar } from '@nextui-org/react';

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
  const userInfoMutation = useMutation<UserResponse, Error, UserProps>(() => {
    return fetch('https://tubeplus.duckdns.org/api/v1/users/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid: authorUuid }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    });
  });

  // 데이터 사용
  const user = userInfoMutation.data;

  return (
    <>
      {userInfoMutation.isLoading ? (
        <div>Loading...</div>
      ) : userInfoMutation.isError ? (
        <div>Error: {userInfoMutation.error.message}</div>
      ) : (
        <>
          <Avatar src={user?.profileImage} />
          <span className='font-semibold'>{user?.username}</span>
        </>
      )}
    </>
  );
}

export default UserInfo;
