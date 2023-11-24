'use client';

import { Card, CardHeader } from '@nextui-org/card';
import { cn } from '@nextui-org/system-rsc';
import { Skeleton } from '@nextui-org/skeleton';
import { User } from '@nextui-org/user';
import { useQuery } from '@tanstack/react-query';
import {
  getRandomCommunity,
  getUserByUuid,
  isVerified,
  joinCommunity,
} from '@/lib/fetcher';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { Image } from '@nextui-org/image';
import { datetimeFormatter } from '@/hooks/use-render-cell';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import Swal from 'sweetalert2';

export default function CommunityPage() {
  const { data: session } = useSession();

  const {
    data: randomCoumunity,
    isLoading: radomCommunityIsLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery(['randomCommunities'], getRandomCommunity, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="col-span-6 pt-2">
        {/* Image Here, Actually MockAPI here All resources */}
        {/* <Skeleton className="min-h-[240px] w-full" /> */}

        <article className="flex flex-col">
          <div className="pt-4 flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl overflow-hidden text-ellipsis">
                Random Communities
              </h1>

              <p className="text-ellipsis line-clamp-3">
                Find Communities you want to join Here
              </p>
            </div>
          </div>

          <div className="my-8 flex justify-between">
            <p className="text-xl break-all">10 Random Communities</p>

            <Button onClick={() => refetch()}>
              {isRefetching ? <Spinner /> : 'Reload'}
            </Button>
            {/* 페이지 url 대신 컴포넌트만 리로드 */}
          </div>

          <div className="my-4 flex flex-col gap-2">
            {radomCommunityIsLoading ? (
              <div className="flex justify-center min-h-[300px]">
                <Spinner />
              </div>
            ) : !isError ? (
              randomCoumunity.data.map((community: any) => (
                <CommunityCard
                  key={community.id}
                  uuid={session?.user?.uuid as string}
                  community={community}
                />
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

type CommunityCardProps = {
  id: number;
  communityName: string;
  communityMemberCount: number;

  ownerUuid: string;
  youtubeName: string;
  description: string;

  profileImage: string;
  bannerImage: string;

  createdDate: string;
  updatedDate: string;
};

const CommunityCard = ({
  uuid,
  community,
}: {
  uuid: string;
  community: CommunityCardProps;
}) => {
  const { data, isLoading, isError, error } = useQuery(
    ['community-owner'],
    () => {
      return getUserByUuid(community.ownerUuid);
    },
  );

  const { data: isJoined } = useQuery(['community-joined'], () => {
    return isVerified(uuid, community.id);
  });

  const handleJoin = async (communityId: number) => {
    const res = await joinCommunity(uuid, communityId);

    // if (res) { // response error(void)
    //   Swal.fire({
    //     icon: 'success',
    //     title: '커뮤니티 가입 성공',
    //     text: `${community.communityName}에 가입되었습니다.`,
    //   });
    // } else
    //   Swal.fire({
    //     icon: 'error',
    //     title: '커뮤니티 가입 실패',
    //     text: `${community.communityName}(이)가 존재하지 않거나 가입할 수 없습니다.`,
    //   });
  };

  return community ? (
    <Tooltip
      placement="top"
      delay={800}
      shadow="lg"
      classNames={{
        base: ['bg-default-50 dark:bg-default-300 py-4'],
      }}
      content={
        <div className="w-[500px] flex flex-col gap-2">
          <Image
            removeWrapper
            classNames={{
              img: 'h-[160px] object-cover',
            }}
            alt={community.communityName}
            src={community.bannerImage}
          />

          <div className="my-1">
            <p className="text-ellipsis line-clamp-2">
              {community.description}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-1 m-1 p-1 border border-default-200 rounded-xl">
            <div className="col-span-2 w-full flex justify-center items-center">
              {!isError ? (
                '크리에이터 정보 없음'
              ) : !isLoading ? (
                <User
                  avatarProps={{ src: data.data?.profileImage }}
                  name={data?.data?.username}
                />
              ) : (
                <Spinner />
              )}
            </div>

            <div className="col-span-1 flex flex-col gap-2 justify-start items-center">
              <span>커뮤니티 회원</span>
              <span className="pb-1">{community.communityMemberCount}</span>
            </div>

            <div className="col-span-1 flex flex-col gap-2 justify-start items-center">
              <span>커뮤니티 생성</span>
              <span className="pb-1">
                {datetimeFormatter(community.createdDate).replace(
                  /\s\d{2}:\d{2}/,
                  '',
                )}
              </span>
            </div>

            <div className="col-span-1 flex flex-col gap-2 justify-start  items-center">
              <span>최근 업데이트</span>
              <span className="pb-1">
                {datetimeFormatter(community.updatedDate).replace(
                  /\s\d{2}:\d{2}/,
                  '',
                )}
              </span>
            </div>
          </div>

          {isJoined?.data === true ? (
            <Button className="rounded-full">가입됨</Button>
          ) : (
            <Button
              className="rounded-full bg-red-600 text-white"
              onClick={() => handleJoin(community.id)}
            >
              가입
            </Button>
          )}
        </div>
      }
    >
      <Card
        className={cn(
          'shadow-none border-1',
          isJoined?.data === true ? 'bg-red-600' : '',
        )}
        isPressable
      >
        <CardHeader
          className="grid md:grid-cols-5 x:grid-cols-3 gap-2"
          as={Link}
          href={`/tube/${community.id}`}
        >
          <div className="md:col-span-4 x:col-span-2 flex justify-start gap-2">
            <User
              classNames={{
                base: 'max-w-[200px] justify-start',
                name: [
                  'w-[110px] text-start whitespace-nowrap text-ellipsis overflow-hidden',
                  'md:block x:hidden',
                ],
                description: ['md:block x:hidden'],
              }}
              avatarProps={{
                src: community.profileImage,
              }}
              name={community.communityName}
              description={community.youtubeName}
            />

            <h1 className="flex justify-between items-center text-start w-full overflow-hidden">
              <span
                className="md:w-[330px] x:max-w-[200px]
                              whitespace-nowrap text-ellipsis overflow-hidden"
              >
                {community.communityName}
              </span>

              <small className="text-red-800 dark:text-red-500 italic pr-2">
                ({community.communityMemberCount})
              </small>
            </h1>
          </div>

          <small className="w-[120px] md:block x:hidden">
            {datetimeFormatter(community.createdDate)}
          </small>
          <small className="md:hidden x:w-[110px]">
            {datetimeFormatter(community.createdDate).replace(
              /\s\d{2}:\d{2}/,
              '',
            )}
          </small>
        </CardHeader>
      </Card>
    </Tooltip>
  ) : (
    <Skeleton className="min-h-[240px] w-full" />
  );
};
