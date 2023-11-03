import React from 'react';
import SignUp from '@/components/SignUp';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';

const JoinPage = async () => {
  return (
    <div
      className="relative col-span-full
                  flex justify-center h-[calc(100vh-3rem)]"
    >
      <div className="flex flex-col items-center justify-center">
        <Card
          className="max-w-lg"
          classNames={{ base: 'border border-default' }}
          shadow="none"
        >
          <CardHeader className="justify-between">
            <Button size="sm" variant="flat">
              <ArrowLeftIcon />

              <h2>Home</h2>
            </Button>
          </CardHeader>

          <CardBody>
            <SignUp />
          </CardBody>

          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default JoinPage;
