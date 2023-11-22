'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react';

interface PostType {
  authorUuid: string;
  voteCount: number;
  contents: string;
  title: string;
  userVoteId: number;
  withImage: boolean;
  }

function PostContents( { postId } : { postId : number } ) {
  const session = useSession();
  const Uuid = session.data?.user?.uuid

  const fetchPostContents = async () => {
    const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings/${postId}?user-uuid=${Uuid}`,
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
  } = useQuery(['posts'], fetchPostContents);


  console.log("게시물 아이디", postId)
  console.log('게시물 컨텐츠 :', postcontents)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const postContents = postcontents && postcontents.data.contents

  return (
    <div className="flex flex-nowrap gap-4 overflow-hidden" dangerouslySetInnerHTML={{__html:postContents}}>
    </div>
  )
}

export default PostContents