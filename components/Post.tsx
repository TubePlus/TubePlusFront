'use client'
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Chip, Button } from "@nextui-org/react"
import { BookmarkIcon, ChatBubbleIcon, ThickArrowDownIcon, ThickArrowUpIcon } from '@radix-ui/react-icons'
import { post as PostType } from '@/types/post'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

const fetchPosts = async () => {
  const res = await fetch('https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/post', {
    method : 'GET',
    headers : { 'Content-Type' : 'application/json'}
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}


const Post = () => {
  const { data: postcontents, error, isLoading } = useQuery(['posts'], fetchPosts);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching data</div>

  return (
    <>
    <div className='flex gap-3 flex-nowrap pt-10'>
      <Button>
        <Chip color='default'> Popular </Chip>
      </Button>

      <Button>
        <Chip color='default'> Hot </Chip>
      </Button>

      <Button>
        <Chip color='default'> Favorite </Chip>
      </Button>
    </div>

    {postcontents && postcontents.map((item:PostType) => (
        <div key={item.id}>
      <Card>
        <CardHeader>
        <div className='flex flex-nowrap gap-[700px]'>
        <div className='flex flex-nowrap gap-4'>
        <Avatar src={item.avatar} />
          <Chip color='default'> {item.authorName} </Chip>
          <Chip color='default'> {item.title} </Chip>
        </div>

        <div className='flex flex-nowrap items-center gap-4'>
          <button>
          <ThickArrowUpIcon className='w-8 h-8' />
          </button>
            <b>{item.voteCounts}</b>
          <button>
          <ThickArrowDownIcon className='w-8 h-8' />
          </button>
        </div>

        </div>
        </CardHeader>
        <Link href={`/tube///posting/${item.id}`}>
      <CardBody>
          <div className='flex flex-nowrap gap-4 overflow-hidden'>
            {item.contents}
          </div>
      </CardBody>

      <CardFooter>
        <div className='border-t-2 w-full'>
          <div className='flex pt-5 flex-nowrap gap-x-2'>
          <ChatBubbleIcon className='w-8 h-8' />
          <Chip color='default'> Comment </Chip>

          <BookmarkIcon className='w-8 h-8' />
          <Chip color='default'> BookMark </Chip>
          </div>
        </div>
      </CardFooter>
        </Link>
      </Card>
      </div>
      ))}
      
    </>
  )
}
export default Post