'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { ThemeSwitcher } from '../ThemeSwitcher';
import {
  BookmarkIcon,
  ExitIcon,
  FileTextIcon,
  GlobeIcon,
  IdCardIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { signOut, useSession } from 'next-auth/react';
import { User } from '@nextui-org/user';
import { MobileValue } from '../Responsive';
import { Avatar, Skeleton, useSkeleton } from '@nextui-org/react';
import { Suspense } from 'react';
import Link from 'next/link';

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

const AuthenticatedUserDropdown = () => {
  const isMobile = MobileValue();
  const { data: session } = useSession();

  return (
    <Dropdown>
      <DropdownTrigger>
        {isMobile ? (
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            <Avatar
              as="button"
              className="flex transition-transform"
              src={session?.user.image!}
              color="secondary"
              size="sm"
            />
          </Suspense>
        ) : (
          <User
            as="button"
            className="transition-transform flex box-border"
            avatarProps={{
              src: session?.user.image!,
              isBordered: true,
              color: 'secondary',
              size: 'sm',
            }}
            name={session?.user.name}
            description={session?.user.email}
          />
        )}
      </DropdownTrigger>

      <DropdownMenu
        aria-label="User Dropdown Menu"
        variant="faded"
        closeOnSelect={false}
      >
        <DropdownSection
          title={'User'}
          showDivider
          aria-label="User Items Section"
        >
          {userItems.map(item => (
            <DropdownItem key={item.key}>
              <Link
                href={
                  item.key === 'profile'
                    ? item.href + `/${session?.user.username}`
                    : item.href
                }
              >
                {item.label}
              </Link>
            </DropdownItem>
          ))}
        </DropdownSection>

        <DropdownSection
          title={'Theme'}
          showDivider
          aria-label="User Theme Section"
        >
          <DropdownItem
            endContent={<ThemeSwitcher type="toggle" />}
            closeOnSelect={false}
          >
            Dark Mode
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider aria-label="Etc. Section">
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
  );
};

export default AuthenticatedUserDropdown;
