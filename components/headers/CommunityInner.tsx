import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'
import { Button } from '@nextui-org/react';
import {Image} from "@nextui-org/react";


interface communityType {
  communityId: number
  bannerImage: string
  ownerUuid: string
  profileImage: string
  youtubeName: string
  communityName: string
  description: string
  communityMemberCount: number
  createdDate: string
  updatedDate: string
}


function CommunityInner( { communityId }: { communityId : Number} ) {
  
  const fetchCommunity = async () => {
    const res = await fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/info`, {
      headers: {
        'Content-Type': 'application/json',
      }
  })
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json()
  };
  
  const {
    data: communitycontents,
    isLoading: isLoadingCommunity,
    isError: isErrorCommunity,
  } = useQuery(['communitycontents', communityId], fetchCommunity);
  

  if (isLoadingCommunity) {
    return <span>Loading...</span>;
  }
 
  // 에러 상태 처리
  if (isErrorCommunity) {
    return <span>Error!</span>;
  }

  return (
    <>
      <div
        className='flex absolute w-full h-[500px]  justify-center items-end mb-10 blur-sm -z-10'
        style={{backgroundImage: `${communitycontents.data?.bannerImage}`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
        />
        <div className='grid mx-auto max-w-[1524px] pl-5 pr-3 pt-4 pb-3 min-h-[200px]'>
        <div className='flex w-full'>
          <Image src={communitycontents.data?.bannerImage}/>
        </div>
        <div className='flex pt-3 flex-col gap-unit-md'>
          <div className='flex items-center justify-center gap-unit-xl'>

          <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center bg-white'>
            <Image src={communitycontents.data?.profileImage} alt='creator' width={200} height={200} />
          </div>
            
          <div className='flex w-[15%] flex-col gap-3'>
            <div className='text-3xl font-bold'>{communitycontents.data?.communityName}</div>
            <div className='text-xl font-bold'>{communitycontents.data?.communityMemberCount} Members</div>
            <div className='text-xl'>{communitycontents.data?.createdDate}</div>
            <div className='a'>
            <Button radius='full' size='lg' color='primary'>Join</Button>
            </div>
          </div>

          <div className='flex w-[50%] flex-col gap-3'>
            <div className='flex flex-col gap-unit-md'>
              <h2 className='text-2xl font-bold'>About</h2>
            </div>

            <div className='flex flex-row items-center gap-unit-md'>
              <p className='text-xl'>{communitycontents.data?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CommunityInner;