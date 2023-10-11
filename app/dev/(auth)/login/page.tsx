import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

const LogInPage = () => {
    return (
        <div className="absolute inset-0">
            <div className="flex flex-col items-center justify-center h-full max-w-2xl gap-20 mx-auto">
                <Button
                    as={Link}
                    startContent={<ChevronLeftIcon className="w-4 h-4 mr-2" />}
                    href={'/'}>
                    Back to Dev main
                </Button>
            </div>
        </div>
    );
};

export default LogInPage;
