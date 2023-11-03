import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import BrandBox from './BrandBox';
import SearchBox from './SearchBox';
import UserPushBox from './UserPushBox';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import UnauthenticatedUserDropdown from './UnauthenticatedUserDropdown';
import { getAuthSession } from '@/lib/auth';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <NextNavbar
      className="border-b border-zinc-500/50 z-30
              bg-zinc-50 dark:bg-zinc-900"
      classNames={{ base: 'min-w-[360px]', wrapper: 'px-4 max-w-[1524px]' }}
      isBordered
      isBlurred
      height={'3rem'}
    >
      <BrandBox />

      <NavbarContent
        className="basis-[750px] md:flex x:hidden"
        justify="center"
      >
        <NavbarItem className="w-full max-w-[600px]">
          <SearchBox type="input" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        as={'div'}
        justify="end"
        className="w-fit !flex-grow-0 gap-2"
      >
        <NavbarItem className="md:hidden x:flex">
          <SearchBox type="button" />
        </NavbarItem>

        {session?.user ? (
          <>
            <UserPushBox />
            <NavbarItem>
              <AuthenticatedUserDropdown />
              {/* UserDropdown은 재사용 여지가 있어 NavItem을 포함하지 않음 */}
            </NavbarItem>
          </>
        ) : (
          <>
            <UnauthenticatedUserDropdown />
            {/* UnauthenticatedUserDropdownd은 NavItem을 포함 */}
          </>
        )}
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
