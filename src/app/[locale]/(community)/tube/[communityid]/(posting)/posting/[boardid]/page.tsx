import React from 'react';
import Posting from './upload-post';

export default function PostingPage({ params: { boardId } } : { params: { boardId: number };}) {
    return (
    <>
      <section className="min-h-screen">
        <Posting boardId={boardId} />
      </section>
    </>
  );
}