import React from 'react';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import SimpleCard from '@/components/SimpleCard';
import Posting from './upload-post';

export default function PostingPage({
  params: { boardId },
}: {
  params: { boardId: number };
}) {
  return (
    <>
      <section className="min-h-screen">
        <Posting boardId={boardId} />
      </section>

      {/* <SimpleCard>hello</SimpleCard> */}
    </>
  );
}
