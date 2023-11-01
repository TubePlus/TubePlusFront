import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import Image from 'next/image';
import JoinButton from './JoinButton';

const SignUp = () => {
  return (
    <>
      <Image
        className="mx-auto"
        alt="tubePlus"
        src={'/images/logo_tubePlus.png'}
        width={100}
        height={100}
      />

      <h1 className="text-3xl pb-unit-xl">Welcome!</h1>

      <div className="pb-unit-xl">
        <p className="text-md">
          By continuing, you are setting up MyCommu account and agree to out
          User Agreement and Privacy Policy.
        </p>
      </div>

      <Divider />

      {/* client */}
      <JoinButton />

      <Divider />
      <div className="pt-unit-xl">
        Already a member of TubePlus?{' '}
        <Link as={NextLink} className="ml-1" href="/login">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
