'use client'
import Post from '@/components/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image , Card , Button } from '@nextui-org/react'
import BoardTabBar from '@/components/BoardTabBar'
import SideBlock from '@/components/SideBlock'

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
      <div className='grid
                      desktop:col-start-1 desktop:col-end-12
                      tablet:col-start-1 tablet:col-end-10
                      mobileL:col-span-full mobileM:col-span-full
                      gap-unit-md'>
      
        <div className='flex w-full pt-5'>
          <Image
            style={{ objectFit: 'cover', height : '300px', width : '1500px' }}
            src={communitycontents.communityBanner}
            alt='Banner'
          />
        </div>

        <Card>

        <div className='col-start-1 mr-5 pl-5 pr-3 pt-4 pb-3 min-h-[200px]'>
          <div className='flex flex-col gap-unit-md'>
            <div className='flex flex-row items-center gap-unit-xl '>
              <Image src={communitycontents.communityImage} alt='creator' width='350px' height='100px' />
                
              <div className='flex w-[40%] flex-col gap-3'>
                <div className='text-3xl font-bold'>{communitycontents.title}</div>
                <div className='text-xl font-bold'>{communitycontents.communitySize} Members</div>
                <div className='text-xl'>{communitycontents.createdAt}</div>
                <div className=''>
                <Button radius='full' size='lg' color='primary'>Join</Button>
                </div>
              </div>

              <div className='flex w-[50%] flex-col gap-3'>
                <div className='flex flex-col gap-unit-md'>
                  <h2 className='text-2xl font-bold'>About</h2>
                </div>

                <div className='flex flex-row items-center gap-unit-md'>
                  <p className='text-xl'>{communitycontents.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </Card>
        
        <div className='w-full border-b-3 border-black'>
        {
          boardcontents !== 'undefined' && communitycontents !== 'undefined' ?
          <BoardTabBar communityId={communitycontents.communityId} boardContents={boardcontents} />
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
            <SideBlock communityid={communitycontents.communityId} />
          </div>

        </div>

      </div>
    </> 
  )
}

export default Tube