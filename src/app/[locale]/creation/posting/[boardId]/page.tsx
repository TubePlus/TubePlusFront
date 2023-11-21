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

/**
 * @note  CreatePostingButton
 * @param boardName string
 * @returns
 */
const CreatePostingButton = (boardName: string) => {
  return (
    <div>
      <Button as={Link} href={`creation/posting/${boardName}/`}>
        Write Post
      </Button>
    </div>
  );
};

export { CreatePostingButton };
