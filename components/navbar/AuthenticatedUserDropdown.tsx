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
import { Md, Sm, SmValue } from '../Responsive';
import { Avatar, Skeleton, useSkeleton } from '@nextui-org/react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { data: session } = useSession(); //TODO: session 정보가 확인 되면, userInfo fetching 데이터로 세션을 수정. next-auth 내 profile(), signIn을 수정하거나 세션 갱신할 것.

  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            <Avatar
              as="button"
              className="md:hidden x:flex transition-transform"
              src={session?.user.image!}
              color="secondary"
              size="sm"
            />
          </Suspense>

          <User
            as="button"
            className="md:flex x:hidden transition-transform box-border"
            avatarProps={{
              src: session?.user.image!,
              isBordered: true,
              color: 'secondary',
              size: 'sm',
            }}
            name={session?.user.name}
            description={session?.user.email}
          />
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="User Dropdown Menu" variant="faded">
        <DropdownSection
          title={'User'}
          showDivider
          aria-label="User Items Section"
        >
          {userItems.map(item => (
            <DropdownItem
              key={item.key}
              onClick={() =>
                router.push(
                  item.key === 'profile'
                    ? item.href + `/${session?.user.username}`
                    : item.href,
                )
              }
            >
              {item.label}
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
            onClick={e => {
              e.preventDefault();
            }}
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
