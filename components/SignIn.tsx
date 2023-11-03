import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import Image from 'next/image';
import LogInButton from './LogInButton';

const SignIn = () => {
  return (
    <>
      <Image
        className="mx-auto w-auto"
        alt="tubePlus"
        src={'/images/logo_tubePlus.png'}
        width={100}
        height={100}
      />

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
