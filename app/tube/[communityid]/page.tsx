'use client'
import Post from '@/components/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'


interface communityType {
  communityId: string
  communityBanner: string
  title: string
  description: string
  communityImage: string
  createdAt: string
  isJoined: boolean
  communitySize: number
}

const fetchCommunity = async (communityId: string) => {
  const res = await fetch(`https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/tube/${communityId}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
};

function Tube({ params } : { params : { communityid : string }}) {
  
  const {
    data : communitycontents,
    isLoading : isLoadingCommunity,
    isError : isErrorCommunity,
  } = useQuery (['communitycontents', params.communityid] , () => fetchCommunity(params.communityid));

  if (isLoadingCommunity) {
    return <span>Loading...</span>
  }

  if (isErrorCommunity) {
    return <span>Error!</span>
  }

  return (
    <>
      <div className=
                  {`desktop:col-start-2 desktop:col-end-12
                    tablet:col-start-1 tablet:col-end-10
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col pt-4
                    scrollbar-thin`}>
      
        <div className='flex w-full'>
          <Image
            style={{ objectFit: 'cover', height : '300px', width : '1500px' }}
            src={communitycontents.communityBanner}
            alt='Banner'
          />
        </div>

        <div>



        <div>
          <div className='flex flex-col gap-unit-md'>
            <div className='flex flex-row items-center gap-unit-md'>
              
              
              <h1 className='text-3xl font-bold'>{communitycontents.title}</h1>
              <button className='flex items-center justify-center w-20 h-10 text-white bg-blue-500 rounded-md'>Join</button>
            </div>
            <div className='flex flex-row items-center gap-unit-md'>
              <p className='text-xl font-bold'>{communitycontents.communitySize} Members</p>
            </div>
          </div>
        </div>
      
        <div className='flex flex-col gap-unit-md'>
        <div className='flex flex-row items-center gap-unit-md'>
          <h2 className='text-2xl font-bold'>About</h2>
        </div>
        <div className='flex flex-row items-center gap-unit-md'>
          <p className='text-xl font-bold'>{communitycontents.description}</p>
        </div>
        </div>


        </div>
      

        <div>
            <Post />
        </div>
      </div>
    </> 
  )
}

export default Tube