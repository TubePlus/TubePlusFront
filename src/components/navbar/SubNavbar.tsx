'use client';

import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { useParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface DirProps {
  id: number;
  label: string;
  href: string;
  forCreator?: boolean;
}

const SubNavbar = ({ dir }: { dir: DirProps[] }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <NextNavbar
      className="sticky top-0 bg-default/80
              col-span-full w-full"
      classNames={{ base: 'min-w-[360px]', wrapper: 'px-4 max-w-[1524px]' }}
      isBordered
      isBlurred
      height={'2.25rem'}
    >
      <NavbarContent as={'div'} justify="center" className="w-full gap-4">
        {dir.map((link: DirProps) =>
          !session?.user.is_creator && !link.forCreator ? (
            <NavbarItem key={link.id}>
              <Link
                className={`text-sm ${
                  link.label === 'Overview'
                    ? link.href === pathname
                      ? 'font-semibold text-default-foreground dark:text-default-900'
                      : 'text-default-500'
                    : pathname.startsWith(link.href)
                    ? 'font-semibold text-default-foreground dark:text-default-900'
                    : 'text-default-500'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </NavbarItem>
          ) : !session?.user.is_creator && link.forCreator ? ( //TODO: session 느낌표 제거
            <NavbarItem key={link.id}>
              <Link
                className={`text-sm ${
                  link.label === 'Overview'
                    ? link.href === pathname
                      ? 'font-semibold text-default-foreground dark:text-default-900'
                      : 'text-default-500'
                    : pathname.startsWith(link.href)
                    ? 'font-semibold text-default-foreground dark:text-default-900'
                    : 'text-default-500'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </NavbarItem>
          ) : null,
        )}
      </NavbarContent>
    </NextNavbar>
  );
};

export default SubNavbar;
