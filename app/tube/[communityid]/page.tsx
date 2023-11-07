'use client'
import Post from '@/components/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image , Card , Button } from '@nextui-org/react'
import CommunityTabBar from '@/components/CommunityTabBar'
import SideBlock from '@/components/SideBlock'
import Rules from '@/components/Rules'

interface communityType {
  communityId: string
  communityBanner: string
  title: string
  description: string
  communityImage: string
  createdAt: string
  isJoined: boolean
  communitySize: number
}

interface TabsProps {
  activeTab: string;
}

const fetchCommunity = async (communityId: string) => {
  const res = await fetch(`https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/tube/${communityId}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
};

const fetchBoard = async (communityId: string) => {
  const res = await fetch(`https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/tube/${communityId}/boards`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
};




function Tube({ params } : { params : { communityid : string }}) {
  
  const {
    data : communitycontents,
    isLoading : isLoadingCommunity,
    isError : isErrorCommunity,
  } = useQuery (['communitycontents', params.communityid] , () => fetchCommunity(params.communityid));

  const {
    data : boardcontents,
    isLoading : isLoadingBoard,
    isError : isErrorBoard,
  } = useQuery (['boardcontents', params.communityid] , () => fetchBoard(params.communityid));
  if (isLoadingCommunity || isLoadingBoard) {
    return <span>Loading...</span>;
  }
  // 에러 상태 처리
  if (isErrorCommunity || isErrorBoard) {
    return <span>Error!</span>;
  }
  console.log(boardcontents)
  console.log(communitycontents)
  
  return (
    <>
      <div className=
                  {`desktop:col-start-2 desktop:col-end-12
                    tablet:col-start-1 tablet:col-end-10
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col pt-4
                    scrollbar-thin`}>
      
        <div className='flex w-full'>
          <Image
            style={{ objectFit: 'cover', height : '300px', width : '1500px' }}
            src={communitycontents.communityBanner}
            alt='Banner'
          />
        </div>

        <div className='col-start-1 pl-3 pr-3 pt-4 pb-1 min-h-[200px]'>
          <div className='flex flex-col gap-unit-md'>
            <div className='flex flex-row items-center gap-unit-md'>
              <Image src={communitycontents.communityImage} alt='creator' width='350px' height='100px' />
                <div>
                  <h1 className='text-3xl font-bold whitespace-nowrap'>{communitycontents.title}</h1>
                  <p className='text-xl font-bold whitespace-nowrap'>{communitycontents.communitySize} Members</p>
                  <p className='text-xl whitespace-nowrap'>{communitycontents.createdAt}</p>
                </div>
                <div className='pl-5 pr-5'>
                  <Button color='primary'>Join</Button>
                </div>
              <div className='flex flex-col gap-unit-md'>
                <div className='flex flex-row items-center gap-unit-md'>
                  <h2 className='text-2xl font-bold'>About</h2>
                </div>

                <div className='flex flex-row items-center gap-unit-md'>
                  <p className='text-xl'>{communitycontents.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='w-full border-b-4 border-black'>
        {
          boardcontents !== 'undefined' && communitycontents !== 'undefined' ?
          <CommunityTabBar communityId={communitycontents.communityId} boardContents={boardcontents} />
          : null
        }
        </div>
        
        <div className='flex flex-row flex-nowrap gap-5'>

          <div className='flex col-start-1 col-end-7'>
          <div className='flex flex-col pt-4 pb-16 pr-1 gap-6'>
            <Post/>
          </div>
          </div>

          <div className='flex flex-col pt-32 gap-5 whitespace-nowrap'> 
            <SideBlock/>
            <Rules/>
          </div>

        </div>

        </div>
    </> 
  )
}

export default Tube