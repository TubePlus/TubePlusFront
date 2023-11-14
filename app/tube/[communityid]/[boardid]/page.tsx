'use client'
import Post from '@/components/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image , Card , Button } from '@nextui-org/react'
import BoardTabBar from '@/components/BoardTabBar'
import SideBlock from '@/components/SideBlock'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'

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

//TODO: 게시판, 게시물, 댓글 API 요청 URL 숨기기
const fetchBoard = async (boardId: string) => {
  const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/boards/${boardId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
})

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
};


function Tube({ params } : { params : { communityid : string, boardid : string }}) {
  
  const {
    data : communitycontents,
    isLoading : isLoadingCommunity,
    isError : isErrorCommunity,
  } = useQuery (['communitycontents', params.communityid] , () => fetchCommunity(params.communityid));

  const {
    data : boardcontents,
    isLoading : isLoadingBoard,
    isError : isErrorBoard,
  } = useQuery (['boardcontents', params.boardid] , () => fetchBoard(params.boardid));
  if (isLoadingCommunity || isLoadingBoard) {
    return <span>Loading...</span>;
  }
  // 에러 상태 처리
  if (isErrorCommunity || isErrorBoard) {
    return <span>Error!</span>;
  }

  console.log(boardcontents)
  console.log(communitycontents)

  const bgImage = `url(${communitycontents.data.bannerImage})`

  return (
    <>
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
              <div className=''>
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
                        


        {/* 중단부 게시판 컴포넌트 */}
        <div className='w-full border-b-3 border-black'>
        {
          boardcontents !== 'undefined' && communitycontents !== 'undefined' ?
          <BoardTabBar communityId={communitycontents.data.communityId} boardContents={boardcontents} />
          : null
        }
        </div>
        

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

      </div>
      </main>
    </> 
  )
}

export default Tube