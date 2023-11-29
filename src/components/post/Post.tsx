'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Button,
  Spinner,
} from '@nextui-org/react';
import {
  BookmarkIcon,
  ChatBubbleIcon,
  HamburgerMenuIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import PostContents from './PostContents';
import UserInfo from './UserInfo';
import { useInView } from "react-intersection-observer";

  interface PostContainerType {
    data: any[];
    lastCursoredId: number;
    hasNextFeed: boolean;
  }

  type PostType = {
    id: number;
    authorUuid: string;
    voteCount: number;
    commentsCount: number;
    title: string;
    withImage: boolean;
  }

  interface verifiedProps {
    userUuid: string;
  }
  
  // 서버 응답 타입 정의
  interface ServerResponse {
    message: string;
    status: string;
    errors: any[];
    code: string;
  }

  // 컴포넌트의 타입 정의
  interface PostProps {
    communityId: number;
    boardId: number;
  }

const Post = ( { communityId , boardId } : { communityId:number , boardId:number } ) => {
  const session = useSession();
  const path = usePathname();
  const locale = (path||'').split('/')[1];

  const [ contents , setContents ] = useState<PostType[] | null>(null);
  const [ posts, setPosts ] = useState<PostType[]>([]);
  const { ref , inView } = useInView({
    threshold: 0.5,
  });
  
  // TODO : join 과 master 체크 추가 확인 필요
  const [verified, setVerified] = useState({
    isJoined: false,
    isUnJoined: false
  });

  const [verifiedCreator, setVerifiedCreator] = useState({
    isMaster: false,
    isNotMaster: false
  });

const isJoined = 
  (session.data?.user && session.data.user.uuid) ? 
  (verified.isJoined) : true;
const isMaster =
  (session.data?.user && session.data.user.uuid) ?
  (verifiedCreator.isMaster) : true;

const joinCheck: verifiedProps = {
  userUuid: session.data?.user.uuid ?? '',
};

  const fetchVerifiedMutation = useMutation<any, any, verifiedProps>(() => {
    return fetch(`https://tubeplus.duckdns.org/api/v1/communities/${communityId}/verified`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joinCheck),
    }).then((res) => res.json());
  }, {
    retry: 1,
    onSuccess: () => {
      setVerified({ isJoined: true, isUnJoined: false })
    },
  });
  
  const fetchVerifiedCreatorMutation = useMutation<any, any, verifiedProps>(() => {
    return fetch('https://tubeplus.duckdns.org/api/v1/communities/users/me/creator-community-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(joinCheck),
      }).then((res) => res.json());
    }, {
      retry: 1,
      onSuccess: () => {
        setVerifiedCreator({ isMaster: true, isNotMaster: false })
      },
      onError: () => {
        setVerifiedCreator({ isMaster: false, isNotMaster: true })
      }
    });

    useEffect(() => {
    if (session.data?.user && session.data.user.uuid) {
      fetchVerifiedMutation.mutate({ userUuid: session.data.user.uuid });
      fetchVerifiedCreatorMutation.mutate({ userUuid: session.data.user.uuid });
    }
  }, [session.data?.user, communityId]);


  const getPostContainer = async ({ pageParam = '' }) => {
    const queryParams = pageParam ? `&cursorId=${pageParam}` : ''; // 페이지 파라미터가 있으면 cursorId를 추가합니다.
  
    const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=BOARD_ID&view-type-req=FEED&boardId=${boardId}&feedSize=3${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!res.ok) {
      throw new Error('조회할 게시물이 없습니다.');
    }
  
    return res.json();
  };

  const {
    data: postContainer,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn: ({ pageParam = '' }) => getPostContainer({ pageParam }), // 페이지 파라미터를 queryFn에 전달합니다.
    getNextPageParam: (lastPage) => {
      return lastPage.data.fedPostingData.lastCursoredId; // 다음 페이지를 요청할 때 마지막 ID를 반환합니다.
    },
  });
  
    // 모든 데이터 저장
    useEffect(() => {
      if (postContainer?.pages) {
        const allPosts = postContainer.pages.flatMap(page => page.data.fedPostingData.data as PostType[]);
        setPosts(allPosts);
      }
    }, [postContainer]);
  
    // 스크롤이 끝에 도달하면 다음 페이지를 불러오는 패칭
    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        
        fetchNextPage();
      
      }
    }, [inView, fetchNextPage, hasNextPage]);
  

  return (
    <>
    <div className={`${isJoined || isMaster ? '' : 'blurred'}`}>
        { posts && posts.map(( item : PostType )  => (
          <div key={item.id} className='mb-7'>
            <Card>
              <CardHeader>
                <div className="flex flex-nowrap justify-between w-full">
                  <div className="flex whitespace-nowrap gap-5">

                    <UserInfo authorUuid={item.authorUuid} />
                    <span className='font-semibold'> {item.title} </span>
                  </div>

                  <div className="flex flex-nowrap items-center gap-4">
                    <button>
                      <ThickArrowUpIcon className="w-8 h-8" />
                    </button>
                      <b>{item.voteCount}</b>
                    <button>
                      <ThickArrowDownIcon className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <Link href={`/${locale}/tube/${communityId}/${boardId}/posting/${item.id}`}>

                <CardBody>
                  <PostContents postId={item.id}/>
                </CardBody>
                
                <CardFooter>
                  <div className="border-t-1 w-full">
                    <div className="flex pl-3 pt-5 pb-1 flex-nowrap gap-x-2">
                      <ChatBubbleIcon className="w-8 h-8"/>
                      {item.commentsCount} Comments
                    </div>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          </div>
          ))}
      <div ref={ref} />
      </div>
    </>
  );
};

export default Post;