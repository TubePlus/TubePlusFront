"use client"
import { usePathname } from 'next/navigation'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'
import React, { useEffect } from 'react'
import CommunityInner from './CommunityInner'
import { useQuery } from '@tanstack/react-query'


function CommunityHeader( ) {

    const path = usePathname()
    const communityId = (path||'').split('/')[3]

    const fetchCommunity = async () => {
      const res = await fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/info`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        const data = await res.json()
        return data.data
      }

    const {
      data: communitycontents,
      isLoading: isLoadingCommunity,
      isError: isErrorCommunity,
    } = useQuery(['communitycontents', communityId], fetchCommunity);

    if((path||'').split('/')[2] !== 'tube' || (path||'').split('/')[2] === undefined || ((path||'').split('/')[2] === 'tube'&& (path||'').split('/')[5] === 'posting' )) return null;

  return (
    <div className='w-full h-[350px] bg-black relative'>
      <CommunityInner communitycontents={communitycontents} communityId={communityId} />
      {
        communitycontents &&
        <div 
          className='w-full bg-red h-[350px] blur-sm opacity-50 absolute top-0 left-0 z-0' 
          style={{ 
            backgroundImage: `url(${communitycontents.bannerImage})`, 
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      }
    </div>
  )
}
export default CommunityHeader