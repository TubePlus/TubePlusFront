'use client';
import React, { useEffect, useState } from 'react';
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
import { useMutation, useQuery } from '@tanstack/react-query';
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
  const [ contents , setContents ] = useState<PostType[] | null>(null);;

  const [verified, setVerified] = useState({
    isJoined: false,
    isUnJoined: false
  });

  const [verifiedCreator, setVerifiedCreator] = useState({
    isMaster: false,
    isNotMaster: false
  });

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
  const fetchPostContainer = async () => {
    const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=BOARD_ID&view-type-req=FEED&boardId=${boardId}&feedSize=3`,
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
} = useQuery(['postType'], fetchPostContainer);

useEffect(() => {
  if (postContainer && postContainer.data && postContainer.data.feedPostingData) {
    setContents(postContainer.data.fedPostingData.data);
  }
}, [postContainer]);

useEffect(() => {
  if (isSuccess) {
    const postData = postContainer.data.fedPostingData?.data;
    if (postData) {
      setContents(postData);
    }
  }
}, [isSuccess]);

if (isLoading) return <Spinner size='lg' />;
if (error) return <div>Error fetching data</div>;

  const isJoined = 
    (session.data?.user && session.data.user.uuid) ? 
    (verified.isJoined) : true;
  const isMaster =
    (session.data?.user && session.data.user.uuid) ?
    (verifiedCreator.isMaster) : true;

  const joinCheck: verifiedProps = {
    userUuid: session.data?.user.uuid ?? '',
  };

  console.log("게시물 형식1번:", postContainer.data.fedPostingData.data)
  console.log("게시물 형식2번:", postContainer)
  console.log("게시물 형식3번:", contents)
  console.log("테스트",)

  if (contents === null) {
    return <Spinner size='lg' />;
  }
  
  return (
    <>
    <div className={`${isJoined || isMaster ? '' : 'blurred'}`}>

      {contents && contents.length > 0 && contents.map(( item: PostType ) => (
        
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
              <Link href={`${locale}/tube/${communityId}/${boardId}/posting/${item.id}`}>

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

    </div>
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
