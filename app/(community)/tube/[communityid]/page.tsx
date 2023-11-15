'use client'
import Post from '@/components/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image , Card , Button } from '@nextui-org/react'
import BoardTabBar from '@/components/BoardTabBar'
import SideBlock from '@/components/SideBlock'
import { baseUrl , endpointPrefix, getBoardById } from '@/lib/fetcher'
import Link from 'next/link'

interface communityType {
  communityId: string
  communityBanner: string
  title: string
  communityImage: string
  createdAt: string
  isJoined: boolean
  communitySize: number

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

interface boardType {
  boardId: string;
  boardName: string;
  boardType: string;
  boardDescription: string;
  visible: boolean;
  limitTime: string;
  erase?: boolean;
} 

interface TabsProps {
  activeTab: string;
}

const fetchCommunity = async (communityId: string) => {
  const res = await fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/info`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
};

// const fetchBoard = async (boardId: string) => {
//   const res = await fetch(`${baseUrl}${endpointPrefix}/boards/${boardId}/`)
//   if (!res.ok) {
//     throw new Error('Network response was not ok')
//   }
//   return res.json()
// };


function Tube({ params } : { params : { communityid : string }}) {
  
  const {
    data : communitycontents,
    isLoading : isLoadingCommunity,
    isError : isErrorCommunity,
  } = useQuery (['communitycontents', params.communityid] , () => fetchCommunity(params.communityid));

  // const {
  //   data : boardcontents,
  //   isLoading : isLoadingBoard,
  //   isError : isErrorBoard,
  // } = useQuery (['boardcontents', params.communityid] , () => getBoardById(params.communityid));



  if (isLoadingCommunity) {
    return <span>Loading...</span>;
  }
  // 에러 상태 처리
  if (isErrorCommunity) {
    return <span>Error!</span>;
  }
  
  console.log(communitycontents)

  const bgImage = `url(${communitycontents.data.bannerImage})`

  return (
    <>
        
        <div className='flex flex-row flex-nowrap gap-5'>
        {/* TODO: 게시판 아이디값을 통해 해당 게시판에 속해있는 게시물만 표시 할 수 있도록 포스트 컴포넌트에 커뮤니티아이디와 게시판아이디를 넘겨줄 예정 */}
          { 
          <div className='flex col-start-1 col-end-7'>
          <div className='flex flex-col pt-4 pb-16 pr-1 gap-6'>
            <Post/>
          </div>
          </div>
          }
          
          <div className='flex flex-col pt-32 gap-5 whitespace-nowrap'> 
            <SideBlock communityid={communitycontents.data.communityId} />
          </div>

        </div>
      </>
     
  )
}

export default Tube