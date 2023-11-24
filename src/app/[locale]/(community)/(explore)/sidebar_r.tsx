'use client';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';
import {
  ExternalLinkIcon,
  GlobeIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { Tooltip } from '@nextui-org/tooltip';
import { SbButtonItem } from '@/components/sidebar/SidebarMenu';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const linkList = [
  {
    name: 'random-community',
    href: '/community',
    icon: GlobeIcon,
  },
  {
    name: 'latest-posts',
    href: '/latest-posts',
    icon: Pencil2Icon,
  },
];

const SidebarR = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations('SidebarRight.Community');

  return (
    <Card
      className="sticky top-[5.55rem]
                        x:border border-default-300 shadow-none"
      shadow="none"
    >
      <CardHeader
        className="flex justify-between
                            border-b-1 border-default-300 bg-default-200"
      >
        <h2 className="font-bold">{t('title')}</h2>
      </CardHeader>

      <CardBody className="gap-2">
        {linkList.map((item, index) => {
          const concatPath =
            item.href === '/' ? '/' + locale : '/' + locale + item.href;
          const isEqual = pathname === concatPath;

          return (
            <Button
              key={index}
              className={`lg:flex lg:justify-start
                      x:flex x:justify-start
                      min-h-unit-10 w-full bg-opacity-50
                      ${
                        isEqual
                          ? 'bg-default-200'
                          : 'bg-default-50 hover:bg-default-100'
                      }
                    `}
              as={Link}
              href={item.href}
              startContent={<item.icon />}
            >
              {t(item.name)}
            </Button>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default SidebarR;
