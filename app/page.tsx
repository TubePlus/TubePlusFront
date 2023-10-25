import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import MainTop from '@/components/mainpage/MainTop';
import MainBottom from '@/components/mainpage/MainBottom';
import { Desktop , Tablet, Mobile } from "../components/Responsive";

export default function Home() {
  return (
    <>
        <div
        className={`desktop:col-start-4 desktop:col-end-13
                    tablet:col-start-2 tablet:col-end-9
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col gap-y-10 pt-4
                    scrollbar-thin`}
      >
        <MainTop />
        <MainBottom />
        </div>

      <Sidebar
        className={`desktop:block desktop:col-span-3
                    tablet:block tablet:col-span-1 tablet:min-w-[60px]
                  `}
      >
        <MainSidebar />
      </Sidebar>

    </>
  );
}
