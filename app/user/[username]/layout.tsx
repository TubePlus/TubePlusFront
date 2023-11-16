import SubNavbar from '@/components/navbar/SubNavbar';
import UserCard from '@/app/user/[username]/user_card';
import Sidebar from '@/components/sidebar/Sidebar';
import MainSidebar from '@/components/sidebar/MainSidebar';

interface UserPageProps {
  username: string;
}

export default function UserLayout({
  params,
  children,
}: {
  params: UserPageProps;
  children: React.ReactNode;
}) {
  const { username } = params;

  // FIXME: Access by User Role
  // useEffect(() => {
  //   if (!user) {
  //     alert('접근 권한이 없습니다!');
  //     redirect('/');
  //   }
  // }, [user]);

  const dir = [
    { id: 1, label: 'Overview', href: `/user/${params.username}` },
    { id: 2, label: 'History', href: `/user/${params.username}/history` },
    { id: 3, label: 'Comments', href: `/user/${params.username}/comments` },
    { id: 4, label: 'Favorites', href: `/user/${params.username}/favorites` },
    { id: 4, label: 'Report', href: `/user/${params.username}/report` },
  ];

  return (
    <>
      <Sidebar className={`x:bg-zinc-50 dark:x:bg-zinc-900`} isDrawerOnly>
        <MainSidebar />
      </Sidebar>

      <div className="fixed top-[5rem] left-0 w-full z-20">
        <SubNavbar dir={dir} />
      </div>

      <div
        className="relative mt-12
                  md:col-span-3
                  sm:col-span-full
                  x:col-span-full"
      >
        <div className="sticky top-[6.08rem] mb-8">
          <UserCard />
        </div>
      </div>

      <div
        className=" pb-8
                    lg:col-span-9
                    md:col-span-7     md:mt-12
                    sm:col-span-full
                    x:col-span-full   x:mt-0"
      >
        {children}
      </div>
    </>
  );
}
