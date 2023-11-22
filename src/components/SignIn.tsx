import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import LogInButton from './LogInButton';
import TubePlusLogo from '@/components/TubePlusLogo';
import { useTranslations } from 'next-intl';

const SignIn = () => {
  const t = useTranslations('Auth');

  return (
    <>
      <TubePlusLogo classNames={{ base: 'flex justify-center' }} />

      <h1 className="text-2xl">{t('login')}</h1>

      <div className="pb-4">
        <p className="text-sm">{t('auth-description')}</p>
      </div>

      <Divider />

      {/* client */}
      <LogInButton />

      <Divider />

      <div className="py-4">
        {t('new-here')}?
        <Link as={NextLink} className="ml-1 italic" href="/join">
          {t('register')}
        </Link>
      </div>
    </>
  );
};

export default SignIn;
