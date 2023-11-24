'use client';
import { Card, CardHeader } from '@nextui-org/card';
import { cn } from '@nextui-org/system-rsc';
import { Skeleton } from '@nextui-org/skeleton';
import { User } from '@nextui-org/user';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Spinner } from '@nextui-org/spinner';
import { getAllLatestPosts, getUserByUuid } from '@/lib/fetcher';
import { CheckIcon, ImageIcon } from '@radix-ui/react-icons';
import { Tooltip } from '@nextui-org/react';

export default function LatestPostPage() {
  const t = useTranslations();

  const { data, isLoading, isError, error } = useQuery(
    ['allLatestPosts'],
    getAllLatestPosts,
  );

  return (
    <>
      <div className="col-span-6 pt-2">
        {/* Image Here, Actually MockAPI here All resources */}
        {/* <Skeleton className="min-h-[240px] w-full" /> */}

        <article className="flex flex-col">
          <div className="pt-4 flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl overflow-hidden text-ellipsis">
                {t('Latest Posts')}
              </h1>

              <p className="text-ellipsis line-clamp-3">
                {t('Find Communities you want to join by Posts Here')}
              </p>
            </div>
          </div>

          <div className="my-8 break-all">
            <Card
              classNames={{
                base: 'border border-default-200 hover:border-default-500',
              }}
              shadow="none"
            >
              <CardHeader className="flex gap-2">
                <User
                  classNames={{ base: 'w-[200px]' }}
                  name="Random User"
                  description="Random User"
                  avatarProps={{ src: 'https://i.pravatar.cc/300' }}
                />

                <div className="w-full grid grid-cols-4 gap-2">
                  <span className="text-sm tracking-wide text-end italic translate-y-1">
                    Enterainment
                  </span>

                  <span>1,305</span>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="my-4 flex flex-col gap-2">
            {isLoading ? (
              <div className="flex justify-center min-h-[300px]">
                <Spinner />
              </div>
            ) : !isError ? (
              data.data.pagedPostingData.content.map((post: PostCardProps) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <></>
            )}
          </div>
        </article>
      </div>
    </>
  );
}

type PostCardProps = {
  id: number;
  title: string;
  authorUuid: string;
  pinned: boolean;
  voteCount: number;
  withImage: boolean;
};
const PostCard = ({ post }: { post: PostCardProps }) => {
  const { data, isLoading, isError, error } = useQuery(['post-user'], () => {
    return getUserByUuid(post.authorUuid);
  });

  // console.log(data);

  //TODO: 카드 디자인 수정
  return (
    <Card className={cn('shadow-none border-1')} isPressable>
      <CardHeader className="flex justify-between">
        <div className="flex justify-start">
          <User
            classNames={{ base: 'min-w-[180px] justify-start' }}
            name={isLoading ? <Skeleton /> : data.data.username}
            description={isLoading ? <Skeleton /> : data.data.youtubeHandler}
            avatarProps={{ src: data?.data?.profileImage }}
          />
          <h1 className="flex gap-2 items-center text-lg">
            {post.title} {post.withImage ? <ImageIcon /> : ''}
          </h1>
        </div>
        <Tooltip content={`Upvoted ${post.voteCount}`}>
          <p className="flex gap-2">
            <CheckIcon />
            {post.voteCount}
          </p>
        </Tooltip>
      </CardHeader>
    </Card>
  );
};
