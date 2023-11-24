import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import SidebarR from './sidebar_r';

export default function CommunityLayout({
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

      {children}

      <div
        className="col-span-3 pt-2 w-full
                    md:block x:hidden
      "
      >
        <SidebarR />
      </div>
    </>
  );
}
