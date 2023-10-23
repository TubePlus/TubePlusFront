'use client'
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Chip, Button } from "@nextui-org/react"
import { BookmarkIcon, ChatBubbleIcon, ThickArrowDownIcon, ThickArrowUpIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'
import { post } from '@/types/post'

const dummydata = [
  {
    id: 1,
    authoruuid: 'dgjdskgd3k',
    authorname: '사람임',
    title: '첫번째글',
  },
  {
    id: 2,
    authoruuid: 'dgjdskgd3k43',
    authorname: '사람임2',
    title: '두번째글',
  },
  {
    id: 3,
    authoruuid: 'dgjdskg432d3k43',
    authorname: '사람임3',
    title: '세번째글',
  }, 
]
// {data}: {data: post[] | null}
const Post = () => {
  // const [post , setPost] = useState([]); // TODO: 게시물 데이터 저장

  // const fetchPost = () => {
  //   //API 호출
  // }

  // useEffect(() => {
  //   fetchPost();
  // }, [])

  const data = dummydata;
  return (
    <>
    <div className='flex gap-5 flex-nowrap pt-10 pb-4'>
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

    {data && data.map((item:post) => (
        <div key={item.id}>
    <Card>
      <CardHeader>
        <div className='flex flex-nowrap gap-[700px]'>

        <div className='flex flex-nowrap gap-4'>
        <Avatar />
          <Chip color='default'> {item.authorname} </Chip>
          <Chip color='default'> description </Chip>
        </div>

        <div className='flex flex-nowrap gap-4'>
          <button>
          <ThickArrowUpIcon className='w-8 h-8' />
          </button>
          <Chip color='default'> favorite </Chip>
          <button>
          <ThickArrowDownIcon className='w-8 h-8' />
          </button>
        </div>

        </div>
      </CardHeader>

        <CardBody>
          <div className='flex flex-nowrap gap-4'>

          <div className='flex flex-nowrap gap-4'>

            <Chip color='default' className='w-[100px] h-[88px]'> {item.title} POSTING </Chip>

          </div>


          </div>
        </CardBody>


      <CardFooter>
        <div className='border-t-3 w-full'>
          <div className='flex pt-5 flex-nowrap gap-x-2'>
          <ChatBubbleIcon className='w-8 h-8' />
          <Chip color='default'> Comment </Chip>

          <BookmarkIcon className='w-8 h-8' />
          <Chip color='default'> BookMark </Chip>
          </div>
        </div>
      </CardFooter>
      </Card>
      </div>
      ))}
    </>
  )
}

export default Post