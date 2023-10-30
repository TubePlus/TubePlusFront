import Post from '@/components/Post'
import React from 'react'


function page() {
  return (
    <>
      <div
        className={`desktop:col-start-2 desktop:col-end-12
                    tablet:col-start-1 tablet:col-end-10
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col pt-4
                    scrollbar-thin`}
      >
      
      <Post />
      
      </div>
    </> 
  )
}

export default page