'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import {
  DotsHorizontalIcon,
  EnterIcon,
  EnvelopeClosedIcon,
  VideoIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import { Mobile, Tablet } from '../Responsive';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { NavbarItem } from '@nextui-org/navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UnauthenticatedUserDropdown = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    console.log('UnauthenticatedUserDropdown mounted');
  }, []);

  const items = [
    {
      key: 'join',
      label: 'Log In/Sign Up',
      icon: EnterIcon,
      href: '/login-no-modal',
    },
    {
      key: 'about',
      label: 'About TubePlus',
      icon: VideoIcon,
      href: 'https://www.notion.so/About-TubePlus-9183790a57494cacbfe6164f9929b0ad?pvs=4',
    },
    {
      key: 'contact',
      label: 'Contact TubePlus',
      icon: EnvelopeClosedIcon,
      href: '/', // TODO: Contact Page를 별도로 만들던지(mailto), notion Page를 별도로 만들던지..
    },
  ];

  return mounted ? (
    <>
      <Tablet>
        <NavbarItem>
          <Button as={Link} href={'/login'}>
            Log In
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button as={Link} href="/signup">
            Sign up
          </Button>
        </NavbarItem>

        <ThemeSwitcher type="button" />
      </Tablet>

      <NavbarItem>
        <Mobile>
          <Dropdown size="sm">
            <DropdownTrigger>
              <Button className="bg-default-200" isIconOnly>
                <DotsHorizontalIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              closeOnSelect={false}
              aria-label="Unathenticated User Dropdown"
            >
              <DropdownSection>
                {items.map(item => (
                  <DropdownItem
                    key={item.key}
                    as={Link}
                    href={item.href || ''}
                    startContent={<item.icon />}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownSection>

              <DropdownSection title={'Theme'}>
                <DropdownItem endContent={<ThemeSwitcher type="toggle" />}>
                  Dark Mode
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </Mobile>
      </NavbarItem>
    </>
  ) : (
    <>
      <div className="mobileM:hidden tablet:flex gap-2">
        <Skeleton className="w-20 h-10 rounded-xl" />
        <Skeleton className="w-20 h-10 rounded-xl" />
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>

      <div className="mobileM:flex tablet:hidden">
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>
    </>
  );
};

export default UnauthenticatedUserDropdown;
