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
  Divider,
} from '@nextui-org/react';
import {
  BookmarkIcon,
  ChatBubbleIcon,
  HamburgerMenuIcon,
  ImageIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface verifiedProps {
  userUuid: string;
}

interface PostType {
  id: number;
  authorUuid: string;
  voteCounts: number;
  title: string;
  withImage: boolean;
}

interface PostContainerType {
  data: {
    pagedPostingData: {
      content: PostType[];
    };
  };
}

interface PostListProps {
  authorUuid: string;
  voteCounts: number;
  constents: string;
  title: string;
  boardId: number;
  isVoted: boolean;
  avatar: string;
  authorName: string;
  createdAt: string;
  withImage: boolean;
  id: string;
}

const PostList = ( {communityId , boardId} : {communityId:number , boardId:number} ) => {
  const session = useSession();

  const [postList, setPostList] = useState<PostType[]>([]);

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
    

  // const { data : postcontents , isLoading : isLoading , error : iserror } = useQuery<PostContainerType>(['communityList'], () => {
  //   return fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings?boardId=${boardId}&pin=true&search-type-req=BOARD_ID&view-type-req=PAGE`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  // }).then((res) => res.json());
  // });

  // // 모든 페이지 데이터를 하나의 배열로 병합
  // useEffect(() => {
  //   if (postcontents?.data?.pagedPostingData?.content) {
  //     setPostList(postList.concat(postcontents.data.pagedPostingData.content));
  //   }
  // }, [postcontents]);

  const fetchPosts = async () => {
    const res = await fetch(
      'https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/post',
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
    error : isError,
    isLoading,
  } = useQuery(['posts'], fetchPosts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

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

  console.log(postcontents)

  return (
    <>
      <div className={`${isJoined || isMaster ? '' : 'blurred'}`}>
  
        <Card>
          <div className=''>
            {postcontents &&
              postcontents.map((item: PostListProps) => (
                <div key={item.id} className='p-3 col-span-10 gap-5 justify-between'>
                  <div className='flex justify-between items-center pt-2 pb-2'> 
                  <div className='flex pl-4 gap-5'>
                    <div>
                    <strong>{item.title}</strong>
                    <p>{item.authorName}</p>
                    </div>
                    &nbsp; &nbsp; { item.withImage ===  true ? <ImageIcon /> : null }
                    {/* &nbsp; &nbsp; <ImageIcon /> */}
                  </div>
                  <div className='pr-5'>
                    <p>Favorite Count : <strong> {item.voteCounts} </strong> </p>
                  </div>
                  </div>
                  <Divider />
                </div>
                
              ))}
          </div>
        </Card>
  
      </div>
    </>
  );
  
};

export default PostList;