'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Button,
  Textarea,
  User,
  Spinner,
} from '@nextui-org/react';
import {
  BookmarkIcon,
  ChatBubbleIcon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
} from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { baseUrl , endpointPrefix, getUserByUuid } from '@/lib/fetcher';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import UserInfo from '@/components/post/UserInfo';
import { queryClient } from '@/app/[locale]/providers';

  interface ServerResponse {
    data: PostType;
    message: string;
    code: string;
  }
  
  interface PostType {
    authorUuid: string;
    contents: string;
    title: string;
    userVoteId: number | null;
    voteCount: number;
    withImage: boolean;
    commentsCount: number;
  }

interface CommentPost {
  postingId: number;
  parentId?: number;
  commenterUuid: string;
  contents: string;
}

interface userInfo {
  bio: string;
  category: string;
  darkMode: boolean;
  email: string;
  isCreator: boolean;
  link: string;
  locale: string;
  profileImage: string;
  role: string;
  username: string;
  uuid: string;
  youtubeHandler: string;
}

interface CommentProps {
  id: number; // 댓글 ID
  postingId: number; // 게시물 ID
  viewInfo: {
    content: string;  // API 정의서와 실제 들어오는 데이터가 달라 추가한 타입
    parentId: number | null;
    hasChild: boolean | null;
    commenterUuid: string;
  };
}

interface CommentsResponse {
  data: CommentProps[];
  message: string;
  code: string;
}

interface Reply extends CommentProps {}

interface Replies {
  [key: number]: Reply[];
}




function Comments() {

  const session = useSession();
  const path = usePathname()
  const postingId = Number(path.split('/')[6])
  const Uuid = session.data?.user?.uuid as string;
  const [ commentContents , setCommentContents ] = useState('' as string);
  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const [isCommentView, setCommentView] = useState<{ [key: number]: boolean }>({}); // 대댓글 보기 상태를 저장하는 상태
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [replyContents, setReplyContents] = useState('' as string);
  const [replies, setReplies] = useState<Replies>({}); // 대댓글 데이터를 저장하는 상태
  
  
  // 댓글 작성하는 API
  const { data : commentSubmit , mutate : commentMutate } = useMutation<any, any, CommentPost>((commentPost) => {
      return fetch(
        `https://tubeplus1.duckdns.org/api/v1/board-service/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentPost),
        }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments']); // 댓글 작성 성공 시 쿼리를 다시 불러옵니다.
      }
    }
  );

  // 대댓글 작성하는 API
  const { data : replySubmit , mutate : replyMutate } = useMutation<any, any, CommentPost>((replyPost) => {
    return fetch(
      `https://tubeplus1.duckdns.org/api/v1/board-service/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyPost),
      }).then((res) => res.json());
    },
    {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']); // 대댓글 작성 성공 시 쿼리를 다시 불러옵니다.
    }
    }
  );

    // 게시물 조회하는 API
    const fetchPostContents = async () => {
      const res = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/postings/${postingId}?user-uuid=${Uuid}`,
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
      data : postcontents,
      error : isErrorPost,
      isLoading : isLoadingPost,
    } = useQuery(['posts', postingId], fetchPostContents);


    // 댓글 조회하는 API
    const fetchComments = async () => {
      let url = `https://tubeplus1.duckdns.org/api/v1/board-service/comments?posting-id=${postingId}`;
      if (parentId) {
        url += `&parent-id=${parentId}`;
      }
    
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    };
    
    const {
      data: comments,
      isLoading: isLoadingComments,
      isError: isErrorComments,
    } = useQuery(['comments', parentId], fetchComments, {
      refetchOnWindowFocus: false, //창에 포커스가 들어올때 쿼리를 다시 실행x
    });

    
    // 대댓글 조회하는 API
    const fetchReplies = async (parentId: number, postingId: number): Promise<Reply[]> => {
      const response = await fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/comments?posting-id=${postingId}&parent-id=${parentId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    };
    

  const variants = ['flat', 'faded', 'bordered', 'underlined'];
  const postStyle = {
    margin: '0 50px', // 좌우 여백을 50px로 설정
  };

  if (isLoadingPost) {
    return <Spinner size='lg'/>;
  }

  if (isErrorPost) {
    return <span>Error!</span>;
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContents(e.target.value);
  }

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContents(e.target.value);
  }

  // 댓글 작성 함수
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentPost: CommentPost = {
      postingId: postingId,
      parentId: parentId ? parentId : undefined,
      commenterUuid: Uuid,
      contents: commentContents,
    };
    commentMutate(commentPost);
    setCommentContents(''); // 댓글 제출 후 내용 초기화
    setParentId(undefined); // 댓글 제출 후 parentId 초기화
    setParentCommentId(null); // 대댓글 작성 폼 숨기기
    }

    // 대댓글 작성 함수
    const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const replyPost: CommentPost = {
        postingId: postingId,
        parentId: parentCommentId !== null ? parentCommentId : undefined,
        commenterUuid: Uuid,
        contents: replyContents,
      };
      // 서버에 대댓글 작성 요청
      replyMutate(replyPost);
      setReplyContents(''); // 대댓글 제출 후 내용 초기화
      setParentCommentId(null); // 대댓글 작성 폼 숨기기
    };

    // 대댓글 작성 버튼 클릭 핸들러
    const handleReplyButtonClick = (commentId: number) => {
      // 현재 선택된 대댓글 작성 대상과 같은 경우에는 대댓글 작성 폼을 숨깁니다.
      if (parentCommentId === commentId) {
        setParentCommentId(null); // 대댓글 작성 폼을 숨기기
      } else {
        setParentCommentId(commentId); // 새로운 대댓글 작성 폼을 보여주기
      }
    };

  // 'View Comments' 버튼 클릭 핸들러
  const handleViewRepliesClick = async (commentId: number, postingId: number) => {
    try {
      const fetchedReplies = await fetchReplies(commentId, postingId);
      setReplies(prevReplies => ({ ...prevReplies, [commentId]: fetchedReplies }));
      setCommentView(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };  

  return (
    <>
    { postcontents && (
      <div className=" h-full pl-40 pt-10 pb-5">
      
      {/* TODO: 게시물 컴포넌트는 키값을 통해 불러오는식으로만 구성할지 페이지에 전체 코드를 구성할지 여부 결정 */}
      <Card style={postStyle}>

      <CardHeader>
        <div className='flex flex-nowrap w-full gap-[700px]'>
        <div className='flex whitespace-nowrap gap-5'>

          <UserInfo authorUuid={ postcontents.data.authorUuid } />
          <p className='font-semibold'> {postcontents.data.title} </p>

        </div>

              <div className="flex flex-nowrap items-center gap-4">
                <button>
                  <ThickArrowUpIcon className="w-8 h-8" />
                </button>
                  <b>{postcontents.data.voteCount}</b>
                <button>
                  <ThickArrowDownIcon className="w-8 h-8" />
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody className="h-[500px]">

            <div className="flex h-[50%] flex-nowrap gap-4 pl-3 pt-3" dangerouslySetInnerHTML={{__html:postcontents.data.contents}}>
            </div>

          </CardBody>

          <CardFooter>
            <div className="border-t-2 w-full pl-3 pb-1">
              <div className="flex pt-5 flex-nowrap gap-x-6">
                <ChatBubbleIcon className="w-8 h-8" />
                <span className='font-semibold'> {postcontents.data.commentsCount} Comments </span>

                {/* <BookmarkIcon className="w-8 h-8" />
                <span className='font-semibold'> BookMark Count </span> */}
              </div>
            </div>
          </CardFooter>
          
          {/* 댓글 작성 컴포넌트 */}

          <form onSubmit={handleSubmit}>

          <div className="flex flex-nowrap pt-5 pl-5 pr-5 border-t-5">
            <div className="flex flex-nowrap gap-x-2">
              <Avatar src={session.data?.user.image ?? ''} />
              <div className="w-full grid grid-cols-12 gap-4">
                {/* {variants.map((variant) => ( */}
                <Textarea
                  // key={variant}
                  variant={'underlined'}
                  label={`${session.data?.user.username}`}
                  labelPlacement="outside"
                  placeholder="Enter your Comments"
                  className="col-span-10 pl-1 md:col-span-6 pb-5 mb-6 md:mb-0"
                  name='contents'
                  value={commentContents}
                  onChange={handleCommentChange}
                ></Textarea>

                <div className="pt-6 pr-5">

                  <Button color="primary" type='submit'>Comments</Button>
                </div>
              </div>
            </div>
          </div>

          </form>

          {/* 댓글 내용 표시 */}
          {comments && (
            comments.data.map((comment: CommentProps) => (
              <div key={comment.id} className="pl-10 pt-7 pr-6 pb-5 gap-y-7">
                {/* 댓글 내용 */}


                <UserInfo authorUuid={comment.viewInfo.commenterUuid}/>
                
                <Textarea
                  isReadOnly
                  variant="bordered"
                  value={`${comment.viewInfo.content}`}
                  className="max-w-full pb-3"
                />

                  {/* 대댓글 작성 버튼 */}
                  
                  <Button variant='light' onClick={() => handleReplyButtonClick(comment.id)}>
                    {parentCommentId === comment.id ? 'Cancel Reply' : 'Reply'}
                  </Button>
                  
                  {/* 대댓글 작성 폼 */}
                  {parentCommentId === comment.id && (
                    <form onSubmit={handleReplySubmit}>
                      <div className='flex flex-nowrap'>
                      <Textarea
                        variant="underlined"
                        placeholder="Enter your Reply"
                        className="col-span-10 pl-1 md:col-span-6 mb-6 md:mb-0"
                        name='contents'
                        value={replyContents}
                        onChange={handleReplyChange}
                      />
                      <Button color="primary" type='submit'>Submit Reply</Button>
                      </div>
                    </form>
                  )}

                {/* 대댓글 버튼 및 내용 */}
                  {comment.viewInfo.hasChild === true && (
                    <div className="pl-7 pb-5">
                    <Button
                      onClick={() => handleViewRepliesClick(comment.id, comment.postingId)}
                      color="primary"
                      variant="light"
                      size="sm"
                    >
                      {isCommentView[comment.id] ? 'Hide Comments' : 'View Comments'}
                    </Button>
                  </div>
                  )}

                    {/* {isCommentView && parentId === comment.id && (
                      comments.data.map((reply : CommentProps) => ( */}
                      {isCommentView[comment.id] && replies[comment.id] && replies[comment.id].map((reply: Reply) => (
                        <div key={reply.id} className="pl-10 pt-3">
                        <UserInfo authorUuid={comment.viewInfo.commenterUuid}/>
                        <Textarea
                          isReadOnly
                          variant="bordered"
                          value={reply.viewInfo.content}
                          className="max-w-full"
                        />
                      </div>
                    ))}
              </div>
            ))
          )}
        </Card>
      </div>
    )}
  </>
  );
}
export default Comments;