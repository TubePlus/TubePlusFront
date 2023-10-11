'use client';
import { Button, ButtonGroup, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function BoilerMiniNav() {
    return (
        <>
            <ButtonGroup className="mt-10" variant="ghost">
                <Button
                    as={Link}
                    href="https://www.notion.so/TubePlus-9183790a57494cacbfe6164f9929b0ad?pvs=4">
                    About
                </Button>
                <Button
                    as={Link}
                    href="https://github.com/TubePlus/TubePlusFront">
                    Github
                </Button>

                <Tooltip
                    content={
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">
                                Development Page
                            </div>
                            <div className="text-tiny">
                                개발 페이지로 이동합니다.
                            </div>
                        </div>
                    }>
                    <Button as={Link} href="/dev">
                        Dev
                    </Button>
                </Tooltip>
            </ButtonGroup>
            <ThemeSwitcher />
        </>
    );
}
