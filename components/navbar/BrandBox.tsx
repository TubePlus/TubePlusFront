'use client';

import { NavbarBrand } from '@nextui-org/navbar';
import { Image } from '@nextui-org/image';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import SidebarHamburgerButton from './SidebarHamburgerButton';
import { useRouter } from 'next/navigation';
import { Md } from '../Responsive';
import Link from 'next/link';

const BrandBox = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // TODO: 사용하지 않으면 제거 요망

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <NavbarBrand className="min-w-fit max-w-[145px] flex-grow-0 gap-2">
      <SidebarHamburgerButton className="md:hidden" />

      <Link className="flex cursor-pointer" href={'/'}>
        <Image
          alt="logo"
          src="/images/logo_tubePlus.png"
          width={32}
          height={32}
        />

        <Md>
          <p className="font-bold ml-1">TubePlus</p>
        </Md>
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
