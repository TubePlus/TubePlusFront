import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import React, { FC } from 'react';

const LogInModalPage: FC = () => {
    return (
        <div className="fixed inset-0 z-10 bg-zinc-900/20"><div className="container flex items-center h-full max-w-lg mx-auto">this is modal</div></div>
    );
};

export default LogInModalPage;
