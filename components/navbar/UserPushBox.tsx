'use client'; // TODO: client for skeleton, push event and SSE fetching
import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { BellIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';

const UserPushBox = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <>
      <NavbarItem>
        <Button variant="light" isIconOnly radius="full">
          <BellIcon />
        </Button>
      </NavbarItem>
    </>
  ) : (
    <div>
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
};

export default UserPushBox;
