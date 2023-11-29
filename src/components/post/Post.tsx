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


  interface PostContentsType {
    authorUuid: string;
    voteCount: number;
    contents: string;
    title: string;
    userVoteId: number;
    withImage: boolean;
  }

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
  

  //react-intersection-observer를 위한 설정
  const { ref, inView} = useInView();

  useEffect(() => {
    // alert('inView : ' + inView);
    if (inView === true && hasNextPage == true) {
      fetchNextPage().then((res) => {

      })
    }   
  }, [inView]);



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
    // onError: () => {
    //   setVerified({ isJoined: false, isUnJoined: true })
    // }
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



  // 무한스크롤을 구현하기 위해 한단계 더 감싸진 배열형식의 게시물 Container
  const fetchPostContainer = async ({ pageParam = 0 }) => {
    const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=BOARD_ID&view-type-req=FEED&boardId=${boardId}&feedSize=5`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  if (!res.ok) {
    throw new Error('조회할 게시물이 없습니다.');
  }
  
  return res.json();
  };

  // cursorId=${pageParam}

  const {
    data: postContainer,
    error,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['postType'], fetchPostContainer, {
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextFeed ? lastPage.lastCursoredId : undefined;
    },
  });


   // 모든 페이지 데이터를 하나의 배열로 병합
  useEffect(() => {
    if (postContainer?.pages) {
      const allPosts = postContainer.pages.flatMap(page => page.data.fedPostingData.data as PostType[]);
      setPosts(allPosts);
    }
  }, [postContainer]);

  // Intersection Observer를 사용하여 무한 스크롤 구현
  const observerRef = useRef<HTMLDivElement>(null); // 타입 정의

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log('Fetching next page');
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // 보다 민감하게 반응하도록 threshold 조정
      }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasNextPage, fetchNextPage]);
  

  useEffect(() => {
    if (postContainer?.pages[0].data.fedPostingData.data) {
      setPosts(postContainer.pages[0].data.fedPostingData.data);
    }
  }, [postContainer]);



  if (isLoading) return <Spinner size='lg' />
  if (error) {
  // error 객체의 타입을 'any'로 단언
  const serverError = error as any;
  // 타입 단언을 통해 error 객체의 내부 속성에 접근
  const serverResponse: ServerResponse = serverError.response?.data || serverError;
  if (serverResponse?.message === "해당 자원이 존재하지 않습니다.") {
    return <div>조회할 게시물이 없습니다.</div>;
  }

  return <div className='font-semibold'>  No posts to display , {serverResponse?.message || '알 수 없는 오류'}</div>;
  }

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

                      {/* <BookmarkIcon className="w-8 h-8"/>
                      BookMark */}
                    </div>
                  </div>
                </CardFooter>
              </Link>
              
              {/* </div> */}
            </Card>
            <div ref={ref} />
          </div>
          
          ))}
      </div> 

    </>
  );
};

export default Post;