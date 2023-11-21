"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import CommunityInner from './CommunityInner'


function CommunityHeader( ) {

    const path = usePathname()
    const communityId = Number(path.split('/')[2])

    if(path.split('/')[1] !== 'tube' || path.split('/')[1] === undefined || (path.split('/')[1] === 'tube'&& path.split('/')[4] === 'posting' )) return null;

  return (

    <div className='w-full h-[50%] bg-slate-200'>
      
      <div className='relative w-full h-[500px] flex justify-center items-end mb-10'>

        {/* <div className='overlay absolute inset-0 bg-black opacity-25'></div> */}

        <CommunityInner communityId={communityId}/>
      </div>

    </div>
  )
}
export default CommunityHeader