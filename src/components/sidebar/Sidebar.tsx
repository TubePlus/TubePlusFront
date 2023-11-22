'use client';
import { useEffect, useState } from 'react';
import { Md, MdValue, Sm, SmValue, X } from '../Responsive';
import useGlobalState from '@/hooks/use-global-state';

const Sidebar = ({
  children,
  className,
  isDrawerOnly = false,
}: {
  children: React.ReactNode;
  className?: string;
  isDrawerOnly?: boolean;
}) => {
  const [isOpen, setIsOpen] = useGlobalState('sidebarStatus');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  }, []);
  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      {(!MdValue() || isDrawerOnly) && (
        <>
          <div
            className={`${className} fixed !top-[5rem] inset-0 isolate
                    lg:w-[30%] md:w-[40%] sm:w-[60%] x:w-[100%]
                    border-r border-solid border-divider
                    overflow-hidden order-first z-[25] duration-300
                    ${isOpen ? 'left-0' : '-left-full'}
                    `}
          >
            {children}
          </div>

          <div // sidebar background
            className={`${
              isOpen
                ? 'fixed left-0 w-full h-full min-h-screen opacity-30'
                : 'hidden opacity-0'
            } duration-300 z-[24] bg-black`}
            onClick={handleSidebar}
          />
        </>
      )}

      {!isDrawerOnly ? (
        <Md>
          <div
            className={`${className} sticky top-[5rem] overflow-hidden order-first
                  isolate w-full h-[calc(100vh-3rem)]
                  border-r border-solid border-divider
                  
                  ${!mounted ? 'sm:hidden' : ''}`}
          >
            {children}
          </div>
        </Md>
      ) : null}
    </>
  );
};

export default Sidebar;
