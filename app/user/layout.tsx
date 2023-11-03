import SubNavbar from '@/components/navbar/SubNavbar';
import MyPageSidebar from '@/app/user/[username]/sidebar';
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-[3rem] left-0 w-full z-20">
        <SubNavbar />
      </div>

      <div
        className="relative mt-12
                  md:col-span-3
                  sm:col-span-3
                  x:col-span-full"
      >
        <div className="sticky top-[6.08rem] mb-8">
          <MyPageSidebar />
        </div>
      </div>

      <div
        className="lg:col-span-9
                    md:col-span-7
                    sm:col-span-5   sm:mt-12
                    x:col-span-full x:mt-0"
      >
        {children}
      </div>
    </>
  );
}
