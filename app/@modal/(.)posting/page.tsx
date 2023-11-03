import React from 'react'
import Post from '@/components/Post'

const PostModalPage = () => {
  return (
    <div className='z-50 backdrop-blur-sm backdrop-saturate-150 bg-overlay/10 w-screen h-screen fixed inset-0'>
      <div className='z-50 flex '>

        <Post/>

      </div>
    </div>
  )
}

export default PostModalPage