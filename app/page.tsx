import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';

import MainTop from '@/components/mainpage/MainTop';
import MainBottom from '@/components/mainpage/MainBottom';
import { Chip } from '@nextui-org/chip';
import CommunityRecommend from '@/components/CommunityRecommend';
import Post from '@/components/Post';
// import React , { useRef } from 'react'; Todo: 페이지 중간에 있는 community 컴포넌트로 이동하는 기능

export default function Home() {
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

      <div
        className={`lg:col-start-4 lg:col-end-13  lg:pl-0 
                    md:col-start-2 md:col-end-11  md:pl-0
                    x:col-span-full
                    overflow-y-auto
                    flex flex-col gap-y-10 gap-unit-md pt-4 
                    scrollbar-thin`}
      >
        <MainTop />
        <MainBottom />

        <div>
          <Chip color="default">Trending Today</Chip>
          <div className="flex flex-row pt-4 gap-6">
            <CommunityRecommend />
          </div>

          <div className="flex flex-col pt-4 pb-16 pr-1 gap-6">
            <Post />
          </div>
        </div>
      </div>
    </>
  );
}
