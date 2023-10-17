import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <>
      <div
        className={`desktop:col-start-4 desktop:col-end-13
                    tablet:col-start-2 tablet:col-end-11
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col pt-4
                    scrollbar-thin`}
      >
        This is Homepage...
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
