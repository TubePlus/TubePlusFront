'use client';
import { useEffect, useState } from 'react';
import { Md, MdValue, Sm, SmValue, X } from '../Responsive';
import useGlobalState from '@/hooks/use-global-state';

const Sidebar = ({
  children,
  className,
  isMobileOnly = false,
}: {
  children: React.ReactNode;
  className?: string;
  isMobileOnly?: boolean;
}) => {
  // TODO: mounted Skeleton 추가 필요?

  const [isOpen, setIsOpen] = useGlobalState('sidebarStatus');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      {!MdValue() && (
        <X>
          <div
            className={`${className} fixed !top-[3rem] inset-0 isolate
                    sm:w-[60%] x:w-[100%]
                    border-r border-solid border-divider
                    overflow-hidden order-first z-50 duration-300
                    ${isOpen ? 'left-0' : '-left-full'}
                    `}
          >
            {children}
          </div>

          <div // sidebar background
            className={`${
              isOpen ? 'absolute w-full h-full opacity-30' : 'hidden opacity-0'
            } duration-300 z-40 bg-black`}
            onClick={handleSidebar}
          />
        </X>
      )}

      {!isMobileOnly ? (
        <Md>
          <div
            className={`${className} sticky top-[3rem] overflow-hidden order-first
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
