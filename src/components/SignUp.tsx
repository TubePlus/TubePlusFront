import React from 'react';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import JoinButton from './JoinButton';
import TubePlusLogo from './TubePlusLogo';

const SignUp = () => {
  return (
    <>
      <TubePlusLogo classNames={{ base: 'flex justify-center' }} />

      <h1 className="text-2xl">Welcome!</h1>

      <div className="pb-4">
        <p className="text-sm">
          By continuing, you are setting up MyCommu account and agree to out
          User Agreement and Privacy Policy.
        </p>
      </div>

      <Divider />

      {/* client */}
      <JoinButton />

      <Divider />
      <div className="py-4">
        Already a member of TubePlus?{' '}
        <Link as={NextLink} className="ml-1" href="/login">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
