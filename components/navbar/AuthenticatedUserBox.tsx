import {
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from '@nextui-org/dropdown';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import {
  BellIcon,
  BookmarkIcon,
  ExitIcon,
  FileTextIcon,
  GlobeIcon,
  IdCardIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { User } from '@nextui-org/user';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { DesktopValue } from '../Responsive';

const userItems = [
  {
    key: 'profile',
    label: 'Profile',
    href: '/user',
  },
  {
    key: 'user-setting',
    label: 'User Setting',
    href: '/settings/account',
  },
];
const etcItems = [
  {
    key: 'explore',
    label: 'Explore',
    icon: GlobeIcon,
    href: '/explore',
  },
  {
    key: 'bookmarks',
    label: 'Bookmarks',
    icon: BookmarkIcon,
    href: '/user/bookmarks',
  },
  {
    key: 'my-community',
    label: 'My Community',
    icon: StarIcon,
    href: '/user/community',
  },
  {
    key: 'terms-policies',
    label: 'Terms & Policies',
    icon: IdCardIcon,
    href: '/user/terms-policies',
  },
  {
    key: 'user-agreements',
    label: 'User Agreements',
    icon: FileTextIcon,
    href: '/user/agreements',
  },
];

const AuthenticatedUserBox = ({ session }: { session: Session }) => {
  return (
    <NavbarContent justify="end" className="">
      <NavbarItem>
        <Button isIconOnly>
          <BellIcon />
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <User
              as="button"
              className="transition-transform"
              avatarProps={{
                src: session.user.image!,
                isBordered: true,
                color: 'secondary',
                size: 'sm',
              }}
              name={DesktopValue() ? session?.user.name : null}
              description={DesktopValue() ? session?.user.email : null}
            />
          </DropdownTrigger>

          <DropdownMenu closeOnSelect={false} variant="faded">
            <DropdownSection
              title={'User'}
              showDivider
              aria-label="Dynamic Actions"
            >
              {userItems.map(item => (
                <DropdownItem key={item.key}>{item.label}</DropdownItem>
              ))}
            </DropdownSection>

            <DropdownSection title={'Theme'} showDivider>
              <DropdownItem endContent={<ThemeSwitcher type="toggle" />}>
                Dark Mode
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              {etcItems.map(item => {
                const IconComponent = item.icon;
                return (
                  <DropdownItem key={item.key} startContent={<IconComponent />}>
                    {item.label}
                  </DropdownItem>
                );
              })}
            </DropdownSection>

            <DropdownSection>
              <DropdownItem
                key="log-out"
                startContent={<ExitIcon />}
                onClick={event => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `${window.location.origin}/login`,
                  });
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </NavbarContent>
  );
};

export default AuthenticatedUserBox;
