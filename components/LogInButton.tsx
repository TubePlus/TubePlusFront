'use client';

import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import { User } from '@nextui-org/user';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
}

const LoginButton = ({ forJoin }: { forJoin: boolean }) => {
  const [username, setUsername] = useState('');
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      if (!forJoin) {
        // await signIn('google', { callbackUrl: '/' });
      } else {
        console.log('username', username);
        await signIn('google-custom', { username, callbackUrl: '/' });
      }
    } catch (error) {
      // toast notification
      alert('Err: Login Failure!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 py-unit-md">
      <Input
        classNames={{
          inputWrapper: 'h-unit-14 dark:bg-zinc-600',
          input: 'text-xl',
        }}
        type="text"
        variant="bordered"
        labelPlacement="inside"
        label="Username"
        value={username}
        onValueChange={setUsername}
        required
      />
      <Button
        className="px-unit-xs h-unit-13 dark:bg-zinc-200/20 hover:scale-[1.01]"
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
        onClick={loginWithGoogle}
      >
        {!session && 'Continue with Google'}
      </Button>
    </form>
  );
};

export default LoginButton;
