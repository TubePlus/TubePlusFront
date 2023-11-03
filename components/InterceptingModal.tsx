'use client';

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Kbd } from '@nextui-org/kbd';
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Cross1Icon } from '@radix-ui/react-icons';

// TODO: Card -> Modal 로 수정. event 관리
const InterceptingModal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    onOpen();
  }, []);

  const handleOpenChange = () => {
    onOpenChange();
    router.back();
  };

  const onEscDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', onEscDown);
    return () => document.removeEventListener('keydown', onEscDown);
  }, [onEscDown]);

  return (
    <Modal
      classNames={{ closeButton: 'flex gap-2 items-center' }}
      size="lg"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={handleOpenChange}
      closeButton={
        <div>
          <Kbd className="md:flex x:hidden" keys={['escape']}>
            ESC
          </Kbd>
          <Cross1Icon />
        </div>
      }
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>{pathname}</ModalHeader>
            {children}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InterceptingModal;
