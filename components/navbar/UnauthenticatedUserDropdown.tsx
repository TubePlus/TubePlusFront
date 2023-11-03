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
import { Sm, Md, X } from '../Responsive';
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
      href: '/login_m',
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
      <Md>
        <NavbarItem>
          <Button
            variant="light"
            className="text-default-600 hover:text-default-900"
            as={Link}
            href={'/login'}
          >
            Log In
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            variant="light"
            className="text-default-600 hover:text-default-900"
            as={Link}
            href="/join"
          >
            Join Us
          </Button>
        </NavbarItem>

        <ThemeSwitcher type="button" />
      </Md>

      <NavbarItem>
        <X>
          <Dropdown
            size="sm"
            classNames={{ base: 'bg-default-100' }}
            trigger="longPress"
          >
            <DropdownTrigger>
              <Button
                radius="full"
                className="text-default-600 hover:text-default-900"
                variant="light"
                isIconOnly
              >
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
                    className="text-default-600 hover:text-default-900"
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
        </X>
      </NavbarItem>
    </>
  ) : (
    <>
      <div className="sm:hidden md:flex gap-2">
        <Skeleton className="w-20 h-10 rounded-xl" />
        <Skeleton className="w-20 h-10 rounded-xl" />
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>

      <div className="sm:flex md:hidden"></div>
    </>
  );
};
export default UnauthenticatedUserDropdown;
