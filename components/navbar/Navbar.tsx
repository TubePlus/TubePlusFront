import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Desktop, Mobile } from '../Responsive';
import { Skeleton } from '@nextui-org/skeleton';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import AuthenticatedUserBox from './AuthenticatedUserBox';
import BrandBox from './BrandBox';
import { getAuthSession } from '@/lib/auth';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <NextNavbar
      className="dark:bg-zinc-800"
      classNames={{ base: 'min-w-[365px]', wrapper: 'max-w-[1524px]' }}
      isBordered
      isBlurred
      height={'3rem'}
    >
      <Mobile>
        <p>true</p>
      </Mobile>

      <BrandBox />

      <NavbarContent className="flex-grow-[2] !basis-80">
        <NavbarItem className="min-w-[150px] w-full mx-unit-lg">
          <Input
            variant="bordered"
            fullWidth
            placeholder="Search TubePlus"
            startContent={
              <MagnifyingGlassIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </NavbarItem>
      </NavbarContent>

      {/* TODO: 아래 코드를 컴포넌트로 분리해야 될까? */}
      {session?.user ? (
        <Suspense
          fallback={
            <div className="max-w-[300px] flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="inline-flex flex-col items-start gap-2">
                <Skeleton className="h-3 w-40 rounded-lg" />
                <Skeleton className="h-3 w-40 rounded-lg" />
              </div>
            </div>
          }
        >
          <AuthenticatedUserBox session={session} />
        </Suspense>
      ) : (
        <NavbarContent as={'div'} justify="end" className="w-fit !flex-grow-0">
          <NavbarItem>
            <Button as={Link} href="/login">
              Log In
            </Button>
          </NavbarItem>

          <Suspense
            fallback={
              <div>
                <Skeleton className="flex rounded-lg w-20 h-10" />
              </div>
            }
          >
            <Desktop>
              <NavbarItem>
                <Button as={Link} href="/signup">
                  Sign up
                </Button>
              </NavbarItem>
            </Desktop>
          </Suspense>

          <ThemeSwitcher type="button" />
        </NavbarContent>
      )}
    </NextNavbar>
  );
};

export default Navbar;
