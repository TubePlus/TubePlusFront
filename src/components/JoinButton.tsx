'use client';

import { baseUrl, endpointPrefix } from '@/lib/fetcher';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import { User } from '@nextui-org/user';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { userInfo } from 'os';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
const redirectUrl = 'http://localhost:3000/join';
const scope = 'openid profile email https://www.googleapis.com/auth/youtube';

// FIXME: 회원가입 직후 로그인 화면으로 이동시키기
interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
}

const JoinButton = () => {
  const [username, setUsername] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations('Auth');
  const searchParams = useSearchParams();

  const signUpWithGoogle = async () => {
    setIsLoading(true);

    try {
      // 중복 검사
      const url = new URL(
        baseUrl + endpointPrefix + '/users/' + username + '/duplicate',
      );
      const response = await fetch(url, {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const isDuplicate = await response.json();
      console.log(isDuplicate);

      if (isDuplicate.code == 'S001') {
        setIsInvalid(false);
        localStorage.setItem('username', username);
        console.log('중복검사완료');

        signUp();
      } else {
        Swal.fire({
          icon: 'error',
          title: t('signup-fail-title'),
          text: t('signup-duplicate-description'),
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            htmlContainer: '!break-words',
            actions:
              'w-full flex justify-end px-4 pt-2 border-t border-default-200',
            confirmButton: 'min-w-unit-20',
          },
        });
        setIsInvalid(true);
        setInvalidMsg(`${username}이 이미 존재하거나 유효하지 않습니다!`);
      }
      // await signIn('google', { redirect: false });
    } catch (error) {
      // toast notification
      if(error instanceof Error) {
        alert(`${error.message}\n API is not working...`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    const codeUrl = `https://accounts.google.com/o/oauth2/auth?scope=${rawurlencode(
      scope,
    )}&access_type=online&response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;
    router.push(codeUrl);
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    const getAccessToken = async () => {
      const getToken = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: code!,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUrl,
          grant_type: 'authorization_code',
        }),
      });
      const tokens = await getToken.json();
      console.log('[INFO] tokens in getAccessToken method...', tokens);
      return tokens.access_token;
    };

    const getUserInfo = async (accessToken: string) => {
      console.log('accessToken in getUserInfo method...', accessToken);
      const getUser = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const userInfo = await getUser.json();
      console.log('[INFO] userInfo in getUserInfo method...', userInfo);
      return userInfo;
    };

    const saveUser = async (
      accessToken: string,
      userInfo: { email: string; locale: string; username: string },
    ) => {
      const postBody = {
        username: localStorage.getItem('username'),
        email: userInfo.email,
        token: accessToken, // token for YoutubeAPI
        locale: userInfo.locale,
      };

      console.log('[INFO] Check user infomation body', postBody);

      const signUpResponse = await fetch(
        baseUrl + endpointPrefix + '/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(postBody),
        },
      );
      const result = await signUpResponse.json();
      console.log(result);
      if (result.code === 'S001') {
        Swal.fire({
          icon: 'success',
          title: t('signup-welcome-title'),
          text: t('signup-welcome-description'),
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            htmlContainer: '!break-words',
            actions:
              'w-full flex justify-end px-4 pt-2 border-t border-default-200',
            confirmButton: 'min-w-unit-20',
          },
        });
      }
    };

    if (code) {
      getAccessToken().then(accessToken =>
        getUserInfo(accessToken).then(userInfo =>
          saveUser(accessToken, userInfo),
        ),
      );
    }
  }, []);

  return (
    <form className="flex flex-col gap-4 py-unit-md">
      <Input
        classNames={{
          inputWrapper: 'h-unit-14',
          input: 'text-lg',
        }}
        type="text"
        variant="bordered"
        labelPlacement="inside"
        label="Username"
        value={username}
        onValueChange={setUsername}
        isInvalid={isInvalid}
        errorMessage={isInvalid && invalidMsg}
        required
      />
      <Button
        className="px-unit-xs h-unit-13 hover:scale-[1.01]"
        type="submit"
        radius="full"
        fullWidth
        isLoading={isLoading}
        startContent={
          session ? (
            <User
              classNames={{
                description: 'text-zinc-600',
              }}
              avatarProps={{
                src: session.user.image as string,
                isBordered: true,
              }}
              name={`Continue as ${session.user.name}`}
              description={session.user.email}
            />
          ) : (
            <Image
              alt="google"
              width={36}
              height={36}
              src="/images/logo_google.svg"
            />
          )
        }
        endContent={
          session ? (
            <Image
              alt="google"
              width={36}
              height={36}
              src="/images/logo_google.svg"
            />
          ) : null
        }
        onClick={signUpWithGoogle}
      >
        {!session && t('continue-with-google')}
      </Button>
    </form>
  );
};

export default JoinButton;

function rawurlencode(str: string) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}