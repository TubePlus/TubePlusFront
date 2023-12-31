import React from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
import MainSidebar from '@/components/sidebar/MainSidebar';
import SubNavbar from '@/components/navbar/SubNavbar';
import SimpleCard from '@/components/SimpleCard';
import SummaryCard from './summary_card';

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

export default function SettingsLayout({
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
    {
      id: 4,
      label: 'Community',
      href: `/settings/community`,
      forCreator: true,
    },
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
        className=" pb-8 mt-12
                    lg:col-span-9
                    md:col-span-7
                    sm:col-span-full
                    x:col-span-full"
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
          <SummaryCard />
        </div>
      </div>
    </>
  );
}
