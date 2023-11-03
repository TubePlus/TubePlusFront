'use client';

import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { useParams, usePathname } from 'next/navigation';

interface UserPageProps {
  params: {
    username: string;
  };
}

const SubNavbar = () => {
  const params = useParams();
  const pathname = usePathname();

  const dir = [
    { id: 1, name: 'Overview', path: `/user/${params.username}` },
    { id: 2, name: 'History', path: `/user/${params.username}/history` },
    { id: 3, name: 'Comments', path: `/user/${params.username}/comments` },
    { id: 4, name: 'Report', path: `/user/${params.username}/report` },
  ];

  return (
    <NextNavbar
      className="sticky top-0 bg-default/50
              col-span-full w-full"
      classNames={{ base: 'min-w-[360px]', wrapper: 'px-4 max-w-[1524px]' }}
      isBordered
      isBlurred
      height={'2.25rem'}
    >
      <NavbarContent as={'div'} justify="center" className="w-full gap-4">
        {dir.map(link => (
          <NavbarItem key={link.id}>
            <Link
              className={`text-sm ${
                pathname === link.path ? 'text-default-900' : 'text-default-500'
              }`}
              href={link.path}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </NextNavbar>
  );
};

export default SubNavbar;
