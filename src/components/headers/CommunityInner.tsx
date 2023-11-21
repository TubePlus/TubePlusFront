import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'
import { Button } from '@nextui-org/react';
import {Image} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


interface communityType {
  communityId: number
  bannerImage: string
  ownerUuid: string
  profileImage: string
  youtubeName: string
  communityName: string
  description: string
  communityMemberCount: number
  createdDate: string
  updatedDate: string
}

interface JoinType {
  userUUid: string;
}

function CommunityInner( { communityId }: { communityId : Number} ) {

  const router = useRouter()
  const queryClient = useQueryClient();
  const session = useSession();

  const joinCommunityMutation = useMutation<any, any, JoinType>(() => {
    return fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/users/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session.data?.user.uuid),
    }).then((res) => res.json());
  }, {
    onSuccess: () => {
      // 요청이 성공적으로 완료되면 캐시를 무효화하거나, 필요한 추가적인 액션을 수행합니다.
      // queryClient.invalidateQueries(['postings']);
      router.push(`/tube/${communityId}`);
    },
    onError: (error) => {
      console.error('Error joining community:', error);
    },
  });

  // const joinhistoryMutation = useMutation<any, any, JoinType>(() => {
  //   return fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/users/me/join-history`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(session.data?.user.uuid),
  //   }).then((res) => res.json());
  //   }, {
  //     onSuccess: () => {
  //       router.push(`/tube/${communityId}`)
  //     },
  //     onError: (error) => {
  //       console.error('Error joining community:', error);
  //     },
  //   });
  
  const fetchCommunity = async () => {
    const res = await fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/info`, {
      headers: {
        'Content-Type': 'application/json',
      }
  })
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json()
  };
  
  const {
    data: communitycontents,
    isLoading: isLoadingCommunity,
    isError: isErrorCommunity,
  } = useQuery(['communitycontents', communityId], fetchCommunity);
  
  if (isLoadingCommunity) {
    return <span>Loading...</span>;
  }
  // 에러 상태 처리
  if (isErrorCommunity) {
    return <span>Error!</span>;
  }

  const handleJoinClick = () => {
    if ( session.data?.user && session.data.user.uuid ) {
      joinCommunityMutation.mutate({ userUUid: session.data.user.uuid });
    }
    else
      console.error("세션 없음")
  };

  return (
    <>
      <div
        className='flex absolute w-full h-[500px]  justify-center items-end mb-10 blur-sm -z-10'
        style={{backgroundImage: `${communitycontents.data?.bannerImage}`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
        />
        <div className='grid mx-auto max-w-[1524px] pl-5 pr-3 pt-4 pb-3 min-h-[200px]'>
        <div className='flex w-full'>
          <Image src={communitycontents.data?.bannerImage}/>
        </div>
        <div className='flex pt-3 flex-col gap-unit-md'>
          <div className='flex items-center justify-center gap-unit-xl'>

          <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center bg-white'>
            <Image src={communitycontents.data?.profileImage} alt='creator' width={200} height={200} />
          </div>
            
          <div className='flex w-[15%] flex-col gap-3'>
            <div className='text-2xl font-bold'>{communitycontents.data?.communityName}</div>
            <div className='text-base font-bold'>{communitycontents.data?.communityMemberCount} Members</div>
            <div className='text-base'>{communitycontents.data?.createdDate}</div>
            <div className='a'>

              <Button radius='full' size='lg' color='primary' onClick={handleJoinClick}>
                Join
              </Button>

            </div>
          </div>

          <div className='flex w-[50%] flex-col gap-3'>
            <div className='flex flex-col gap-unit-md'>
              <h2 className='text-xl font-bold'>About</h2>
            </div>

            <div className='flex flex-row items-center gap-unit-md'>
              <p className='text-base font-sans'>{communitycontents.data?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CommunityInner;