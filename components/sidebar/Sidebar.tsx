import { Desktop, Mobile, Tablet } from '../Responsive';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: 기본 스타일을 정의하고 반응형을 내부에 정의
    // <div
    //         className={`relative block overflow-y-auto order-first isolate border-r border-solid border-divider dark:border-zinc-200/20 ${
    //             isDesktop
    //                 ? 'col-span-3'
    //                 : isTablet
    //                 ? 'col-span-4'
    //                 : isMobile
    //                 ? '!fixed !left-full'
    //                 : ''
    //         } `}></div>
    <>
      <Desktop>
        <div className="col-span-3">{children}</div>
      </Desktop>
      <Tablet>
        <div className="col-span-4">{children}</div>
      </Tablet>
      <Mobile>
        <div className="!fixed left-full">{children}</div>
      </Mobile>
    </>
  );
};

export default Sidebar;
