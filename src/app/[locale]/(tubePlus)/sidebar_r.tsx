import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Tooltip } from '@nextui-org/tooltip';

const SidebarR = () => {
  return (
    <div
      className="col-span-3 pt-2 w-full
                    md:block x:hidden
      "
    >
      <Card
        className="sticky top-[5.55rem]
                        x:border border-default-300 shadow-none"
        shadow="none"
      >
        <CardHeader
          className="flex justify-between
                            border-b-1 border-default-300 bg-default-200"
        >
          <h2 className="font-bold">More About Aces!</h2>
          <Tooltip content="TubePlus Notion Page">
            <Button
              as={Link}
              size="sm"
              isIconOnly
              href="https://www.notion.so/About-TubePlus-9183790a57494cacbfe6164f9929b0ad"
            >
              <ExternalLinkIcon />
            </Button>
          </Tooltip>
        </CardHeader>

        <CardBody>
          <Link
            className="hover:text-red-600 hover:font-semibold duration-200"
            href={'/about'}
          >
            About TubePlus
          </Link>
          <Link
            className="hover:text-red-600 hover:font-semibold duration-200"
            href={'/team'}
          >
            Contact to Team Aces
          </Link>
          <Link
            className="hover:text-red-600 hover:font-semibold duration-200"
            href={'/help'}
          >
            Help Center
          </Link>

          <Link
            className="hover:text-red-600 hover:font-semibold duration-200"
            href={'/policies-agreements'}
          >
            Policies and Agreements
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default SidebarR;
