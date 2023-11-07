import React from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
import MainSidebar from '@/components/sidebar/MainSidebar';
import SubNavbar from '@/components/navbar/SubNavbar';
import SimpleCard from '@/components/SimpleCard';

interface UserPageProps {
  username: string;
}

const settingtabmenubar = [
  {
    id: 1,
    name: 'Account',
    link: '/account',
  },
  {
    id: 2,
    name: 'Notification',
    link: '/notification',
  },
  {
    id: 3,
    name: 'Safety & Privacy',
    link: '/safety-privacy',
  },
];

export default function SettingLayout({
  params,
  children,
}: {
  params: UserPageProps;
  children: React.ReactNode;
}) {
  const dir = [
    { id: 1, label: 'Account', href: `/settings/account` },
    { id: 2, label: 'Notification', href: `/settings/notification` },
    {
      id: 3,
      label: 'Safety & Privacy',
      href: `/settings/safety-privacy`,
    },
  ];

  return (
    <>
      <Sidebar className={`x:bg-zinc-50 dark:x:bg-zinc-900`} isDrawerOnly>
        <MainSidebar />
      </Sidebar>

      <div className="fixed top-[3rem] left-0 w-full z-20">
        <SubNavbar dir={dir} />
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

      <div
        className="relative mt-12
                  md:col-span-3
                  sm:col-span-full
                  x:col-span-full"
      >
        <div className="sticky top-[6.08rem] mb-8">
          <SimpleCard title="Settings Summary">
            <span className="px-2">My Settings...</span>
          </SimpleCard>
        </div>
      </div>
    </>
  );
}
