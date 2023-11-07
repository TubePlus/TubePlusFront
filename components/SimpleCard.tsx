import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import React from 'react';
import Link from 'next/link';

const SimpleCard = ({
  title,
  externalLink,
  children,
}: {
  title: string;
  externalLink: string;
  children?: React.ReactNode;
}) => {
  return (
    <Card className="p-4 gap-5 border border-zinc-400/50">
      <CardHeader className="p-0 justify-between">
        <h2 className="px-2">{title}</h2>
        <Button
          as={Link}
          href={externalLink}
          className="bg-content3/0 hover:bg-content3"
          size="sm"
          variant="flat"
          isIconOnly
        >
          <ExternalLinkIcon />
        </Button>
      </CardHeader>

      <CardBody className="p-0 h-full">{children}</CardBody>
    </Card>
  );
};

export default SimpleCard;
