import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { Avatar } from '@nextui-org/avatar';
import React from 'react';
import SignUp from '@/components/SignUp';
import { memebers } from '@/data/members';
import Link from 'next/link';

const JoinPage = async () => {
  return (
    <div className="absolute inset-0">
      <div className="flex flex-col items-center justify-center h-full max-w-xl gap-20 mx-auto">
        <Card classNames={{ base: 'bg-white dark:bg-zinc-700' }} shadow="none">
          <CardBody>
            <SignUp />
          </CardBody>

          <Divider />
          <CardFooter>
            <p>
              Wellcom to tubePlus! This Project created by{' '}
              {memebers.map((mem, index) => (
                <Chip
                  as={Link}
                  variant="flat"
                  classNames={{
                    base: 'duration-200 hover:-translate-y-1',
                    content: 'text-xs flex items-center gap-1',
                  }}
                  size="sm"
                  key={index}
                  href={`https://github.com/${mem.githubName}`}
                >
                  <Avatar
                    className="h-unit-lg w-unit-lg"
                    name={mem.githubName}
                    src={mem.avatar}
                  />
                  {mem.githubName}
                </Chip>
              ))}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default JoinPage;
