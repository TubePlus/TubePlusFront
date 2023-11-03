import Post from '@/components/Post';
import React from 'react';

function page() {
  return (
    <>
      <div
        className={`lg:col-start-2  lg:col-end-12
                    md:col-start-1  md:col-end-10
                    sm:col-span-full
                    xs:col-span-full
                    flex flex-col gap-unit-md pt-4
                    scrollbar-thin`}
      >
        <Post />
      </div>
    </>
  );
}

export default page;
