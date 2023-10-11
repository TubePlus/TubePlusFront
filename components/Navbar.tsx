'use client';
import Image from 'next/image';
import {
    Navbar as NextNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Input,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Dropdown,
} from '@nextui-org/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { usePathname } from 'next/navigation';
import { DotsHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Navbar = () => {
    const pathname = usePathname();
    return (
        <NextNavbar
            isBordered
            className="backdrop-blur bg-zinc-900/0"
            height={'3rem'}>
            <NavbarBrand as={Link} href={'/'}>
                <Image
                    alt="logo"
                    src="/images/tubePlus_logo.png"
                    width={32}
                    height={32}
                />
                <p className="font-bold text-zinc-800 dark:text-zinc-200 ml-1 md:hidden">
                    TubePlus
                </p>
            </NavbarBrand>
            {pathname.startsWith('/dev') ? (
                <>
                    <NavbarContent>
                        <NavbarItem>
                            <Input
                                fullWidth
                                variant="faded"
                                startContent={
                                    <MagnifyingGlassIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                        </NavbarItem>
                    </NavbarContent>

                    <NavbarContent as={'div'} justify="end">
                        <NavbarItem>
                            <Button as={Link} href="/dev/login">
                                Log In
                            </Button>
                        </NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly>
                                    <DotsHorizontalIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu closeOnSelect={false}>
                                <DropdownItem endContent={<ThemeSwitcher />}>
                                    Dark Mode
                                </DropdownItem>
                                <DropdownItem>User Settings</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                </>
            ) : (
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ThemeSwitcher />
                    </NavbarItem>
                </NavbarContent>
            )}
        </NextNavbar>
    );
};

export default Navbar;
