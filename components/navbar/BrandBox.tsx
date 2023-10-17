'use client';

import { NavbarBrand } from '@nextui-org/navbar';
import { Image } from '@nextui-org/image';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import SidebarHamburgerButton from './SidebarHamburgerButton';
import { useRouter } from 'next/navigation';
import { Tablet } from '../Responsive';
import Link from 'next/link';

const BrandBox = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <NavbarBrand className="min-w-fit max-w-[145px] flex-grow-0 gap-2">
      <SidebarHamburgerButton className="tablet:hidden" />

      <Link className="flex cursor-pointer" href={'/'}>
        <Image
          alt="logo"
          src="/images/logo_tubePlus.png"
          width={32}
          height={32}
        />

        <Tablet>
          <p className="font-bold text-zinc-800 dark:text-zinc-200 ml-1">
            TubePlus
          </p>
        </Tablet>
      </Link>
    </NavbarBrand>
  ) : (
    <div className="max-w-[145px] flex items-center gap-2">
      <Skeleton className="rounded-full h-10 w-10 tablet:hidden" />
      <Skeleton className="rounded-lg h-8 w-8" />
      <Skeleton className="rounded-lg h-8 w-20 mobileL:hidden tablet:block" />
      <div></div>
    </div>
  );
};

export default BrandBox;
