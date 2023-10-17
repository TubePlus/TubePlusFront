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
      className="bg-zinc-100 dark:bg-zinc-800 z-[999]"
      classNames={{ base: 'min-w-[360px]', wrapper: 'px-4 max-w-[1524px]' }}
      isBordered
      isBlurred
      height={'3rem'}
    >
      <BrandBox />

      <NavbarContent
        className="basis-[750px] tablet:flex mobileL:hidden mobileM:hidden"
        justify="center"
      >
        <NavbarItem className="w-full">
          <SearchBox type="input" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        as={'div'}
        justify="end"
        className="w-fit !flex-grow-0 gap-2"
      >
        <NavbarItem className="tablet:hidden mobileL:flex">
          <SearchBox type="button" />
        </NavbarItem>
        {/* TODO: 아래 코드를 컴포넌트로 분리해야 될까? */}
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
