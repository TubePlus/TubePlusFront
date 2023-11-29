'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { User } from '@nextui-org/user';

import Swal from 'sweetalert2';

const LoginButton = () => {
  const locale = useLocale();
  const t = useTranslations('Auth');

  const router = useRouter();

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    await signIn('google', {
      // callbackUrl: '/',
      redirect: false,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString && !session?.user) {
      Swal.fire({
        icon: 'error',
        title: t('login-fail-title'),
        text: t('login-fail-description'),
        // timer: 3000,
        // timerProgressBar: true,
        customClass: {
          htmlContainer: '!break-words',
          actions:
            'w-full flex justify-end px-4 pt-2 border-t border-default-200',
          confirmButton: 'min-w-unit-20',
        },
      });
    } else if (session?.user.is_retrieved) {
      Swal.fire({
        icon: 'error',
        title: t('login-welcomeback-title'),
        text: t('login-welcomeback-description'),
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          htmlContainer: '!break-words',
          actions:
            'w-full flex justify-end px-4 pt-2 border-t border-default-200',
          confirmButton: 'min-w-unit-20',
        },
      }).then(() => {
        router.push('/');
      });
    }
  }, []);

  return (
    <form className="flex flex-col gap-4 py-unit-md">
      <Button
        className="px-unit-xs h-unit-13 hover:scale-[1.01] duration-300"
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
              width={28}
              height={28}
              src="/images/logo_google.svg"
            />
          )
        }
        endContent={
          session ? (
            <Image
              alt="google"
              width={28}
              height={28}
              src="/images/logo_google.svg"
            />
          ) : null
        }
        // onClick={loginWithGoogle}
        onClick={ () => {Swal.fire({
          icon: 'error',
          title: t('login-fail-title'),
          text: t('login-fail-description'),
          timer: 10000,
          timerProgressBar: true,
          customClass: {
            htmlContainer: '!break-words',
            actions:
              'w-full flex justify-end px-4 pt-2 border-t border-default-200',
            confirmButton: 'min-w-unit-20',
          },
        });}}
      >
        {!session && t('continue-with-google')}
      </Button>
    </form>
  );
};

export default LoginButton;
