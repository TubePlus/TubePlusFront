import React from 'react'
import Posting from '@/components/Posting'

function PostingPage({params: {boardId}} : {params: {boardId: number}}) {

  return (
    <div>
      <Posting boardId={boardId}/>
    </div>
  )


}
export default PostingPage