'use client';

import { NavbarBrand } from '@nextui-org/navbar';
import { Image } from '@nextui-org/image';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import SidebarHamburgerButton from './SidebarHamburgerButton';
import { usePathname, useRouter } from 'next/navigation';
import { Md } from '../Responsive';
import Link from 'next/link';
import TubePlusLogo from '../TubePlusLogo';
import { useSession } from 'next-auth/react';

const BrandBox = ({ locale }: { locale: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const hamburgerDisallowedUrl = [
    '/',
    `/${locale}`,
    `/${locale}/team`,
    `/${locale}/about`,
    `/${locale}/help`,
    `/${locale}/user-agreements`,
    `/${locale}/policies-agreements`,
    `/${locale}/community`,
    `/${locale}/latest-posts`,
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: sidebar onclick 활성화 시 주석 해제
  // useEffect(() => {
  //   if (session?.user) {
  //     router.push('/' + session?.user.locale);
  //   }
  // }, [session?.user.locale]);

  return mounted ? (
    <NavbarBrand className="min-w-fit max-w-[145px] flex-grow-0 gap-2">
      <SidebarHamburgerButton
        className={`${
          hamburgerDisallowedUrl.includes(pathname) ? 'md:hidden' : ''
        }`}
      />

      <Link className="flex cursor-pointer items-center" href={'/'}>
        <TubePlusLogo classNames={{ logo: 'w-8 h-8' }} />

        <p
          className="font-bold ml-1 pt-[2px]
                      lg:flex md:hidden x:flex"
        >
          TubePlus
        </p>
      </Link>
    </NavbarBrand>
  ) : (
    <div className="max-w-[145px] flex items-center gap-2">
      <Skeleton className="rounded-full h-10 w-10 md:hidden" />
      <Skeleton className="rounded-lg h-8 w-8" />
      <Skeleton className="rounded-lg h-8 w-20 sm:hidden md:block" />
      <div></div>
    </div>
  );
};

export default BrandBox;
