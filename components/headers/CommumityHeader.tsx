"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Image, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'


interface communityType {
  communityId: string
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

const fetchCommunity = async (communityId: string) => {
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


function CommumityHeader({ params } : { params : { communityId : string} }) {

    const {
      data : communitycontents,
      isLoading : isLoadingCommunity,
      isError : isErrorCommunity,
    } = useQuery (['communitycontents', params.communityId] , () => fetchCommunity(params.communityId))
    
    if (isLoadingCommunity) {
      return <span>Loading...</span>;
    }

    // 에러 상태 처리
    if (isErrorCommunity) {
      return <span>Error!</span>;
    }

    const path = usePathname()
    console.log(path)
    if(path.split('/')[1] !== 'tube') return null




    const bgImage = `url(${communitycontents.data.bannerImage})`

  return (

    <div className='w-full h-[600px] bg-black'> 

      <div className='relative w-full h-[500px] flex justify-center items-end mb-10'>
        <div className='flex absolute w-full h-[500px]  justify-center items-end mb-10 blur-sm -z-10' style={{backgroundImage: bgImage, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}/>
        <div className='grid mx-auto max-w-[1524px] pl-5 pr-3 pt-4 pb-3 min-h-[200px]'>
          <div className='flex w-full'>
            <Image src={bgImage}/>
          </div>
          <div className='flex flex-col gap-unit-md'>
            <div className='flex flex-row items-center gap-unit-xl'>

            <div className='w-[200px] h-[200px] rounded-3xl overflow-hidden flex justify-center items-center bg-white'>
              <Image src={communitycontents.data.profileImage} alt='creator' width={200} height={200} />
            </div>
              
            <div className='flex w-[15%] flex-col gap-3'>
              <div className='text-3xl font-bold'>{communitycontents.data.communityName}</div>
              <div className='text-xl font-bold'>{communitycontents.data.communityMemberCount} Members</div>
              <div className='text-xl'>{communitycontents.data.createdDate}</div>
              <div className='a'>
              <Button radius='full' size='lg' color='primary'>Join</Button>
              </div>
            </div>

            <div className='flex w-[50%] flex-col gap-3'>
              <div className='flex flex-col gap-unit-md'>
                <h2 className='text-2xl font-bold'>About</h2>
              </div>

              <div className='flex flex-row items-center gap-unit-md'>
                <p className='text-xl'>{communitycontents.data.description}</p>
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

export default CommumityHeader