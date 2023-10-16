import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import Image from 'next/image';
import UserAuthForm from './UserAuthForm';

const SignIn = () => {
  return (
    <>
      <Image
        className="mx-auto"
        alt="tubePlus"
        src={'/images/logo_tubePlus.png'}
        width={100}
        height={100}
      />

      <h1 className="text-3xl pb-unit-xl">Log In</h1>

      <div className="pb-unit-xl">
        <p className="text-md">
          By continuing, you are setting up MyCommu account and agree to out
          User Agreement and Privacy Policy.
        </p>
      </div>
      <Divider />
      {/* login button */}
      <UserAuthForm />
      <Divider />
      <div className="pt-unit-xl">
        New to TubePlus?{' '}
        <Link as={NextLink} className="ml-1" href="/signup">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
