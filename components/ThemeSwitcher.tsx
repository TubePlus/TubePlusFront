'use client';
import { Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false); // hydration error 방지
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <Switch
            isSelected={theme === 'light'}
            onChange={() =>
                theme === 'light' ? setTheme('dark') : setTheme('light')
            }
            startContent={<SunIcon />}
            endContent={<MoonIcon />}>
            {pathname !== '/dev' ? (
                <div className="text-sm">
                    <p>System: {systemTheme}</p>
                    <p>Theme: {theme}</p>
                </div>
            ) : null}
        </Switch>
    );
};
