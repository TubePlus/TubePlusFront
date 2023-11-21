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

interface PostType {
  id: number;
  isVoted: boolean;
  boardId: number;
  title: string;
  contents: string;
  voteCounts: number;
  authorUuid: string;
  authorName: string;
  avatar: string;
}

interface verifiedProps {
  userUuid: string;
}


const Post = ( {communityId , boardId} : {communityId:number , boardId:number} ) => {
  const session = useSession();
  const path = usePathname();
  const locale = path.split('/')[1];

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

  // 'https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/post' mock api 주소
  // `https://tubeplus1.duckdns.org/api/v1/board-service/postings?search-type-req=BOARD_ID&view-type-req=FEED&boardId=${boardId}&feedSize=3` 백 주소
  const fetchPosts = async () => {
    const res = await fetch('https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/post',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  };

  const {
    data: postcontents,
    error,
    isLoading,
  } = useQuery(['posts'], fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const isJoined = 
    (session.data?.user && session.data.user.uuid) ? 
    (verified.isJoined) : true;
  const isMaster =
    (session.data?.user && session.data.user.uuid) ?
    (verifiedCreator.isMaster) : true;

  console.log(isJoined, isMaster);

  const joinCheck: verifiedProps = {
    userUuid: session.data?.user.uuid ?? '',
  };

  console.log("게시물 내용:",[postcontents])
  console.log(Array.isArray(postcontents))
  console.log(session)

  return (
    <>
    <div className={`${isJoined || isMaster ? '' : 'blurred'}`}>


      {/* <div className='flex justify-between pt-3'> 

      <div className="flex gap-3 flex-nowrap">
        <Button>
          <Chip color="default"> New </Chip>
        </Button>

        <Button>
          <Chip color="default"> Old </Chip>
        </Button>
      </div>

      <div>
        <Button>
          <HamburgerMenuIcon className="w-8 h-8"/>
          
        </Button>
      </div>

      </div> */}

      {postcontents &&
        postcontents.map((item: PostType) => (
          <div key={item.id} className='mb-7'>
            <Card>
              <CardHeader>
                <div className="flex flex-nowrap justify-between w-full">
                  <div className="flex whitespace-nowrap gap-5">
                    <Avatar src={item.avatar} />
                      <span className='font-semibold'> {item.authorName} </span>
                      <span className='font-semibold'> {item.title} </span>
                  </div>

                  <div className="flex flex-nowrap items-center gap-4">
                    <button>
                      <ThickArrowUpIcon className="w-8 h-8" />
                    </button>
                      <b>{item.voteCounts}</b>
                    <button>
                      <ThickArrowDownIcon className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <Link href={`${locale}/tube/${communityId}/${boardId}/posting/${item.id}`}>
                <CardBody>
                  <div className="flex flex-nowrap gap-4 overflow-hidden">
                    {item.contents}
                  </div>
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
