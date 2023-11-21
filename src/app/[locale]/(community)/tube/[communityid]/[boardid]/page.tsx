'use client'

import Post from '@/components/Post'
import React, { use, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image , Card , Button, Link, Chip, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown } from '@nextui-org/react'
import BoardTabBar from '@/components/BoardTabBar'
import SideBlock from '@/components/SideBlock'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'
import SubNavbar from '@/components/navbar/SubNavbar'
import { usePathname } from 'next/navigation'
import PostList from '@/components/PostList'
import { HamburgerMenuIcon, ViewHorizontalIcon } from '@radix-ui/react-icons'

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

interface boardType {
  boardId: number;
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

interface DirItem {
  id: number;
  label: string;
  href: string;
}

//TODO: 게시판, 게시물, 댓글 API 요청 URL 숨기기

function Tube() {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  
  const path = usePathname()
  const communityId = Number(path.split('/')[2]) as number
  const boardId = Number(path.split('/')[3])
  

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
    data : communitycontents,
    isLoading : isLoadingCommunity,
    isError : isErrorCommunity,
  } = useQuery (['communitycontents', communityId] , fetchCommunity);
  
  const fetchBoard = async () => {
    const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/boards?community-id=${communityId}&board-search-type=ACCESSIBLE`, {
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
    data : boardcontents,
    isLoading : isLoadingBoard,
    isError : isErrorBoard,
  } = useQuery (['boardcontents', boardId] , fetchBoard);

  if (isLoadingCommunity || isLoadingBoard) {
    return <span>Loading...</span>;
  }
  // 에러 상태 처리
  if (isErrorCommunity || isErrorBoard) {
    return <span>Error!</span>;
  }

  console.log("보드데이터", boardcontents)
  console.log("커뮤니티데이터", communitycontents)
  console.log("아이디:", boardId)

  return (
    <>      
        {/* <div className='flex flex-row flex-nowrap gap-5'> */}

        {/* TODO: 게시판 아이디값을 통해 해당 게시판에 속해있는 게시물만 표시 할 수 있도록 포스트 컴포넌트에 커뮤니티아이디와 게시판아이디를 넘겨줄 예정 */}
        
          {/* <div className='grid col-start-1 col-end-10'> */}
          <div className='col-span-9 pt-4 pb-16 pr-1 gap-6'>

            <div className='flex flex-wrap gap-5 pb-10'>
              <Button color='default'>
                <Link href={`/creation/board/${communityId}`} color='foreground'>게시판 추가</Link>
              </Button>
            

            {/* 중단부 게시판 컴포넌트 */}
            <div className='w-full'>
            {
              boardcontents !== undefined && communitycontents !== undefined ?
              <BoardTabBar communityId={communityId} boardContents={boardcontents} />
              : null
            }
            </div>
            </div>
            
            <div className='flex justify-between pt-3 pb-5'> 

              <div className="flex gap-3 flex-nowrap">
                <Button>
                  <Chip color="default"> Newest </Chip>
                </Button>

                <Button>
                  <Chip color="default"> Oldest </Chip>
                </Button>

                <Button color="primary" >
                  <Link className='hover:text-white' color='foreground' href={`/creation/posting/${boardId}`}> Posting </Link>
                </Button>

              </div>

              <div>
                
                  
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat" 
                    className="capitalize"
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  <DropdownItem key="Compact">
                    <HamburgerMenuIcon className="w-6 h-6"/>
                    
                  </DropdownItem>
                  <DropdownItem key="Card">
                    <ViewHorizontalIcon className='w-6 h-6'/>
                  </DropdownItem>
                  
                </DropdownMenu>
              </Dropdown>


              </div>

              </div>

              
              <Post communityId={communitycontents.data.communityId} boardId={boardId} />
              
            {/* <PostList communityId={communitycontents.data.communityId} boardId={boardId} /> */}
          </div>
          {/* </div> */}
          
          <div className='col-span-3 flex flex-col pt-32 gap-5 whitespace-nowrap'> 
            <SideBlock communityid={communitycontents.data.communityId} />
          </div>

        {/* </div> */}
    </>
  )
}

export default Tube