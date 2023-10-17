'use client';
import { MobileValue } from '../Responsive';
import useGlobalState from '@/hooks/use-global-state';

const Sidebar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // TODO: mounted Skeleton 추가 필요?
  const isMobile = MobileValue(); // for Rerender this component
  const [isOpen, setIsOpen] = useGlobalState('sidebarStatus');

  return isMobile ? (
    <>
      <div
        className={`${className}
                    ${
                      isOpen
                        ? 'mobileL:left-0 mobileM:!left-0'
                        : 'mobileL:-left-full mobileM:!-left-full'
                    } duration-300 mobileM:absolute
                    min-w-[250px] overflow-hidden order-first isolate
                    border-r border-solid border-divider dark:border-zinc-200/20
                    bg-zinc-100 dark:bg-zinc-800 z-50
                    `}
      >
        {children}
      </div>

      <div
        className={`${
          isOpen ? 'absolute w-full h-full bg-black opacity-30' : 'opacity-0'
        } duration-300 z-40`}
        onClick={() => setIsOpen(!isOpen)}
      />
    </>
  ) : (
    <div
      className={`${className} overflow-hidden order-first isolate border-r border-solid border-divider dark:border-zinc-200/20 bg-zinc-100 dark:bg-zinc-800`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
