'use client';

import OverviewTableCard from '@/components/OverviewTableCard';
import { getPostsByUuid } from '@/lib/fetcher';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { useQuery } from '@tanstack/react-query';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@nextui-org/image';
import { Spinner } from '@nextui-org/spinner';
import { LgValue, MdValue, SmValue } from '@/components/Responsive';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

const myPostColumns = [
  // { key: 'id', label: 'Id' },
  { key: 'title', label: 'Title' },
  { key: 'boardId', label: 'Board' }, //TODO: boardName으로 대체
  { key: 'contents', label: 'Content' },
  { key: 'voteCounts', label: 'Votes' },
  { key: 'createdAt', label: 'Created' },
  // { key: 'updatedAt', label: 'Last Updated' },
  { key: 'actions', label: 'Actions' },
];

interface TrendingsCardProps {
  id: string;
  title: string;
  contents?: string; // post
  boardId?: string; // post
  voteCounts?: number; // post
  createdAt: string;
  updatedAt: string;
}

export default function MyCommunityPage() {
  const isMd = MdValue();
  const isLg = LgValue();

  const {
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
    data: myPosts,
    refetch: postsRefetch,
  } = useQuery(['my-posts-all'], () => {
    // return getPostsByUuid(user?.uuid as string);
    return getPostsByUuid('7a424347-b903-4abb-b97b-90ece0821e6f');
  });

  return (
    <>
      <Swiper // NOTE: seperate component ?
        className="relative mb-6"
        slidesPerView={isLg ? 5 : isMd ? 4 : 3}
        spaceBetween={16}
        loop
      >
        {!isPostsError &&
          myPosts.map((post: TrendingsCardProps) => (
            <SwiperSlide key={post.id}>
              <Card
                classNames={{
                  base: 'border border-zinc-400/50 h-[360px]',
                }}
              >
                {!isPostsLoading ? (
                  <>
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <p className="text-tiny text-white/60 uppercase font-bold">
                        New
                      </p>
                      <h4 className="text-black font-medium text-2xl">
                        Acme camera
                      </h4>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt="Card example background"
                      className="z-0 w-auto h-full scale-125 -translate-y-6 object-cover"
                      src="https://nextui.org/images/card-example-6.jpeg"
                    />
                  </>
                ) : (
                  <div className="flex justify-center w-[210px] h-[302px]">
                    <Spinner color="default" />
                  </div>
                )}
                {!isPostsLoading ? (
                  <CardFooter className="absolute bg-white/80 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                      <p className="text-black text-tiny">Available soon.</p>
                      <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    <Button
                      className="dark:text-default-50 bg-transparent hover:bg-transparent/10 fade-in-50"
                      radius="full"
                      size="sm"
                      isIconOnly
                    >
                      <DotsVerticalIcon />
                    </Button>
                  </CardFooter>
                ) : (
                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-center">
                    <Spinner color="default" />
                  </CardFooter>
                )}
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>

      <div
        // TODO: grid 변경 필요
        className={`lg:col-start-4   lg:col-end-13  lg:pl-0 
      md:col-start-4   md:col-end-9   md:pl-0 
      sm:col-span-full
      xs:col-span-full
      flex flex-col gap-y-10 gap-unit-md z-0 scrollbar-thin`}
      >
        <OverviewTableCard
          cardTitle="My Communities"
          cardLink=""
          isError={isPostsError}
          isLoading={isPostsLoading}
          tableColumns={myPostColumns}
          tableRows={myPosts}
        />

        <OverviewTableCard
          cardTitle="Top Posts"
          cardLink=""
          isError={isPostsError}
          isLoading={isPostsLoading}
          tableColumns={myPostColumns}
          tableRows={myPosts}
        />
      </div>
    </>
  );
}
