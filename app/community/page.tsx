import Sidebar from '@/components/sidebar/Sidebar'
import MainSidebar from '@/components/sidebar/MainSidebar'
import React from 'react'
import { Chip } from '@nextui-org/chip'
import CommunityRecommend from '@/components/CommunityRecommend'

function page() {
  return (
    <>
      <div
        className={`desktop:col-start-4 desktop:col-end-13
                    tablet:col-start-2 tablet:col-end-11
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col pt-4
                    scrollbar-thin`}
      >
        
        <Chip color="default">Trending Today</Chip>

        <div className='flex flex-row gap-6'>
        <CommunityRecommend />
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
  )
}

export default page