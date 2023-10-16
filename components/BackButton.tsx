'use client';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = ({
  name,
  icon,
}: {
  name: string;
  icon?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <Button
      className="pl-0"
      variant="light"
      startContent={icon}
      onClick={() => router.back()}
    >
      {name}
    </Button>
  );
};

export default BackButton;
