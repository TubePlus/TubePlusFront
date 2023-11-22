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
  withImage: boolean;
  pinned: boolean;
}

interface verifiedProps {
  userUuid: string;
}

const PostList = ( {communityId , boardId} : {communityId:number , boardId:number} ) => {
  const session = useSession();

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

  return (
    <>
      <div className={`${isJoined || isMaster ? '' : 'blurred'}`}>
  
        <Card>
          <div className=''>
            {postcontents &&
              postcontents.map((item: PostType) => (
                <div key={item.id} className='p-3 col-span-10 gap-5 justify-between'>
                  <div className='flex justify-between'> 
                  <div className='flex gap-5'>
                    <strong>{item.title}</strong>
                    <p>{item.authorName}</p>
                    <ImageIcon />
                  </div>
                  <div className='pr-5'>
                    <p>Favorite : {item.voteCounts}</p>
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