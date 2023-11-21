'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from '@nextui-org/button';
import useGlobalState from '@/hooks/use-global-state';

const SidebarHamburgerButton = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useGlobalState('sidebarStatus', false);

  return (
    <>
      <Button
        className={`${className}`}
        radius="full"
        variant="light"
        isIconOnly
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerMenuIcon className="w-5 h-5" />
      </Button>
    </>
  );
};

export default SidebarHamburgerButton;
