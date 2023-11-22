import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import JoinButton from './JoinButton';
import TubePlusLogo from './TubePlusLogo';
import { useTranslations } from 'next-intl';

const SignUp = () => {
  const t = useTranslations('Auth');

  return (
    <>
      <TubePlusLogo classNames={{ base: 'flex justify-center' }} />

      <h1 className="text-2xl">{t('welcome')}!</h1>

      <div className="pb-4">
        <p className="text-sm">{t('auth-description')}</p>
      </div>

      <Divider />

      {/* client */}
      <JoinButton />

      <Divider />
      <div className="py-4">
        {t('already-have-account')}?{' '}
        <Link as={NextLink} className="ml-1" href="/login">
          {t('login')}
        </Link>
      </div>
    </>
  );
};

export default SignUp;
