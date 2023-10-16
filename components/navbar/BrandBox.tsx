'use client';
import { NavbarBrand } from '@nextui-org/navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Desktop, DesktopValue, Tablet } from '../Responsive';
import Link from 'next/link';
import { Skeleton } from '@nextui-org/skeleton';

const BrandBox = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = DesktopValue();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <NavbarBrand
      as={Link}
      href={'/'}
      className="min-w-fit max-w-[145px] flex-grow-0"
    >
      <Image
        alt="logo"
        src="/images/logo_tubePlus.png"
        width={32}
        height={32}
      />

      <Desktop>
        <p className="font-bold text-zinc-800 dark:text-zinc-200 ml-1">
          TubePlus
        </p>
      </Desktop>
    </NavbarBrand>
  ) : (
    <div className="max-w-[145px] flex items-center gap-2">
      <div>
        <Skeleton className="rounded-lg w-8 h-8" />
      </div>

      {/* TODO: skeleton 적용 안되고 있음 */}
      <div className="hidden lg:block">
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default BrandBox;
