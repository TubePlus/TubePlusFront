import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import LogInButton from './LogInButton';
import TubePlusLogo from '@/components/TubePlusLogo';

const SignIn = () => {
  return (
    <>
      <TubePlusLogo classNames={{ base: 'flex justify-center' }} />

      <h1 className="text-2xl">Log In</h1>

      <div className="pb-4">
        <p className="text-sm">
          By continuing, you are setting up MyCommu account and agree to out
          User Agreement and Privacy Policy.
        </p>
      </div>

      <Divider />

      {/* client */}
      <LogInButton />

      <Divider />

      <div className="py-4">
        New to TubePlus?{' '}
        <Link as={NextLink} className="ml-1" href="/join">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
