'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Skeleton } from '@nextui-org/skeleton';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';

const SearchBox = ({
  className,
  type,
}: {
  className?: string;
  type: 'input' | 'button';
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  switch (type) {
    case 'input':
      return mounted ? (
        <Input
          className={`${className} min-w-[150px] w-full`}
          variant="bordered"
          fullWidth
          radius="full"
          placeholder="Search TubePlus"
          startContent={
            <MagnifyingGlassIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      ) : (
        <div>
          <Skeleton className="min-w-[150px] w-full h-10 rounded-full" />
        </div>
      );
    case 'button':
      return mounted ? (
        <Button
          className={`${className}`}
          variant="light"
          radius="full"
          isIconOnly
        >
          <MagnifyingGlassIcon />
        </Button>
      ) : (
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      );
  }
};

export default SearchBox;
