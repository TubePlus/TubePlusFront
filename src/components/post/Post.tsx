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
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import PostContents from './PostContents';
import UserInfo from './UserInfo';


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
    pinned: boolean;
    title: string;
    withImage: boolean;
  }



  interface verifiedProps {
    userUuid: string;
  }


const Post = ( { communityId , boardId } : { communityId:number , boardId:number } ) => {
  const session = useSession();
  const path = usePathname();
  const locale = path.split('/')[1];

  const observerRef = useRef(null);
  
  const [ contents , setContents ] = useState<PostType[] | null>(null);

  const [ posts, setPosts ] = useState([]);

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
    onError: () => {
      setVerified({ isJoined: false, isUnJoined: true })
    }
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

  // 한단계 더 감싸진 배열형식의 리스트
  const fetchPostContainer = async ({ pageParam = 0 }) => {
    const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=BOARD_ID&view-type-req=FEED&boardId=${boardId}&feedSize=3&cursor=${pageParam}`,
    {                       
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  
  return res.json();
};

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

// 스크롤 핸들러
const handleScroll = () => {
  // 스크롤 위치 확인 및 fetchNextPage 호출 로직
  if (hasNextPage) {
    // 다음 페이지가 있으면 fetchNextPage 호출
    fetchNextPage();
  }
};

// useEffect에서 스크롤 이벤트 핸들러 부착 및 해제
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [hasNextPage]);


useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage) {
      // 감시 대상 요소가 뷰포트에 들어오면 추가 데이터 로드
      fetchNextPage();
    }
  });

  if (observerRef.current) {
    observer.observe(observerRef.current);
  }

  return () => {
    if (observerRef.current) {
      observer.unobserve(observerRef.current);
    }
  };
}, [hasNextPage, fetchNextPage]);

// useEffect(() => {
//   if (postContainer && postContainer && postContainer.data.feedPostingData) {
//     setContents(postContainer.data.fedPostingData.data);
//   }
// }, [postContainer]);

// useEffect(() => {
//   if (isSuccess) {
//     const postData = postContainer.data.fedPostingData?.data;
//     if (postData) {
//       setContents(postData);
//     }
//   }
// }, [isSuccess]);

useEffect(() => {
  if (postContainer?.pages[0].data.fedPostingData.data) {
    setPosts(postContainer.pages[0].data.fedPostingData.data);
  }
}, [postContainer]);

if (posts.length === 0) {
  return <Spinner size='lg' />;
}

if (isLoading) return <Spinner size='lg' />
if (error) return <div>Error fetching data</div>;

  console.log("게시물 데이터 : ", postContainer?.pages[0].data.fedPostingData.data)

  return (
    <>
    <div onScroll={handleScroll} className={`${isJoined || isMaster ? '' : 'blurred'}`}>

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
                    <div className="flex pt-5 flex-nowrap gap-x-2">
                      <ChatBubbleIcon className="w-8 h-8"/>
                      Comment

                      <BookmarkIcon className="w-8 h-8" />
                      BookMark
                    </div>
                  </div>
                </CardFooter>
              </Link>
            </Card>

          </div>
          ))}

        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Read More</button>
        )}

    </div>
    <div ref={observerRef} />
    </>
  );
};

export default Post;

// mock type
// interface PostType {
//   id: number;
//   isVoted: boolean;
//   boardId: number;
//   title: string;
//   contents: string;
//   voteCounts: number;
//   authorUuid: string;
//   authorName: string;
//   avatar: string;
// }


  // 'https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/post' mock api 주소
  // `https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=BOARD_ID&view-type-req=FEED&boardId=${boardId}&feedSize=3` 한단계 더 감싸진 배열형식의 리스트 백 주소
  // `https://tubeplus1.duckdns.org/api/v1/board-service/postings/{id}?user_uuid={사용자 uuid}` 리스트의 id값을 이용해서 조회하는 콘텐츠 데이터 패칭 주소

  // 리스트의 id값을 이용해서 조회하는 데이터 패칭
  // const fetchPosts = async () => {
  //   const res = await fetch('https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/post',
  //     {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );
  //   if (!res.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return res.json();
  // };

  // const {
  //   data: postcontents,
  //   error,
  //   isLoading,
  // } = useQuery(['posts'], fetchPosts);
