import BoardCreateForm from '@/components/pages/BoardCreateForm'
import React from 'react'

function BoardCreation({ params: { communityId }} : { params: { communityId : number }}) {
  return (
    <div>
      <BoardCreateForm communityId={communityId} />
    </div>
  )
}

export default BoardCreation