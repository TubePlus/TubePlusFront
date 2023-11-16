"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { Image, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'


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


function CommunityHeader( ) {

    const path = usePathname()
    const communityId = Number(path.split('/')[2])
      
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
    
    // TODO : SPINNER 
    if (isLoadingCommunity) {
      return <span>Loading...</span>;
    }

    // 에러 상태 처리
    if (isErrorCommunity) {
      return <span>Error!</span>;
    }

    if(path.split('/')[1] !== 'tube' || path.split('/')[4] === 'posting' ) return null

    console.log(path)
    console.log("커뮤니티데이터",communitycontents)

  return (

    <div className='w-full h-[50%] bg-zinc-200'>

      <div className='relative w-full h-[500px] flex justify-center items-end mb-10'>
        <div className='flex absolute w-full h-[500px]  justify-center items-end mb-10 blur-sm -z-10' style={{backgroundImage: `${communitycontents.data?.bannerImage}`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}/>
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

    </div>
    <main
        className={`relative grid mx-auto max-w-[1524px] px-4 scrollbar-thin
                    lg:gap-[.8rem]  lg:grid-cols-12
                    md:gap-unit-md  md:grid-cols-10
                    sm:gap-unit-sm  sm:grid-cols-8
                    x:gap-unit-xs   x:grid-cols-4
                    `}
        >
        <div className='grid
                      desktop:col-start-1 desktop:col-end-12
                      tablet:col-start-1 tablet:col-end-10
                      mobileL:col-span-full mobileM:col-span-full
                      gap-unit-md'>

        </div>
      </main>
    
    </div>
  )
}
export default CommunityHeader