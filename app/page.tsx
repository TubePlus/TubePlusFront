import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';

import MainTop from '@/components/mainpage/MainTop';
import MainBottom from '@/components/mainpage/MainBottom';
import { Desktop , Tablet, Mobile } from "../components/Responsive";
import { Chip } from '@nextui-org/chip' 
import CommunityRecommend from '@/components/CommunityRecommend'
import Post from '@/components/Post'
// import React , { useRef } from 'react'; Todo: 페이지 중간에 있는 community 컴포넌트로 이동하는 기능

export default function Home() {
  const data = memebers; // for Fetch Data Test
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

        <div>
          <Chip color="default">Trending Today</Chip>
        <div className='flex flex-row pt-4 gap-6'>
          <CommunityRecommend />
        </div>

        <div className='flex flex-col pt-4 pb-16 pr-1 gap-6'>
          <Post />
        </div>
        </div>
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
