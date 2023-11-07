'use client';

import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { useParams, usePathname } from 'next/navigation';

interface DirProps {
  id: number;
  label: string;
  href: string;
}

const SubNavbar = ({ dir }: { dir: DirProps[] }) => {
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
        {dir.map((link: DirProps) => (
          <NavbarItem key={link.id}>
            <Link
              className={`text-sm ${
                pathname === link.href
                  ? 'font-semibold text-default-foreground dark:text-default-900'
                  : 'text-default-500'
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </NextNavbar>
  );
};

export default SubNavbar;
