import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';

export default function TubePlusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="-ml-4 z-20
          lg:col-span-3
          md:col-span-1 md:min-w-[60px]"
      >
        <Sidebar //TODO: sidebar
          className={`md:bg-transparent x:bg-zinc-50 dark:x:bg-zinc-900`}
        >
          <MainSidebar isRoot />
        </Sidebar>
      </div>

      <section
        className={`lg:col-start-4 lg:col-end-13  lg:pl-0 
                    md:col-start-2 md:col-end-11  md:pl-0
                    x:col-span-full
                    overflow-y-auto pb-10
                    flex flex-col gap-y-10 gap-unit-md pt-4 
                    scrollbar-thin min-h-screen`}
      >
        {children}
      </section>
    </>
  );
}
