
import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'
import { Button, Spinner } from '@nextui-org/react';
import { Image } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { communityType } from '@/types/communitytypes';
import { CalendarIcon, CountdownTimerIcon, EnterIcon, InfoCircledIcon, PersonIcon, VideoIcon } from '@radix-ui/react-icons';
import NextImage from "next/image";

interface JoinType {
  userUUid: string;
}

function CommunityInner( { communityId, communitycontents }: { communityId : string, communitycontents: communityType} ) {

  const router = useRouter()
  const queryClient = useQueryClient();
  const session = useSession();
  const [ joinCheck, setJoinCheck ] = React.useState(false);
  const path = usePathname()
  const locale = (path||'').split('/')[1]

  const avatarImage = communitycontents?.profileImage.split('.').find((item) => item === 'webp') === 'webp' ? 'https://cdn-icons-png.flaticon.com/512/1057/1057086.png' : communitycontents?.profileImage

  // 해당 커뮤니티 가입 이력 조회

  const { mutate: joinHistory, isLoading, isError } = useMutation<any, any, JoinType>(() => {
    return fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/users/me/join-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userUuid: session.data?.user.uuid }),
    }).then((res) => res.json());
  }, {
    onSuccess: (data) => {
      setJoinCheck(data.joinHistoryExists) ;
    }
  });

  // 커뮤니티 가입 요청
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
      setJoinCheck(true);
      alert('가입되었습니다.');
      router.push(`/${locale}/tube/${communityId}`);
    },
    onError: (error) => {
      console.error('Error joining community:', error);
    },
  });
  
  // 의존성 배열 3가지중하나라도 변경될때 실행
  useEffect(() => {
    if (session.data?.user && session.data.user.uuid) {
      joinHistory({ userUUid: session.data.user.uuid });
    }
  }, [session.data?.user, communityId, joinHistory]);

  const joinhistoryMutation = useMutation<any, any, JoinType>(() => {
    return fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/users/me/join-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session.data?.user.uuid),
    }).then((res) => res.json());
    }, {
      onSuccess: (data) => {
        if (data.joined) {
          setJoinCheck(true);
        }
        // router.push(`/${locale}/tube/${communityId}`)
      },
      onError: (error) => {
        console.error('Error joining community:', error);
      },
    });


  // const handleJoinClick = () => {
  //   if (session.user && session.data.user.uuid) {
  //     joinCommunityMutation.mutate({ userUUid: session.data.user.uuid });
  //     setJoinCheck(true);
  //   } else {
  //     console.error("세션 없음");
  //   }
  // };

  //join버튼 핸들러
  const handleJoinClick = () => {
    if (session.data?.user && session.data.user.uuid) {
      joinCommunityMutation.mutate({ userUUid: session.data.user.uuid });
    } else {
      console.error("세션 없음");
    }
  };

  return (
    <>
    { communitycontents && 
      
        <div className='
          flex justify-between items-center relative z-10 top-10 min-w-[360px] max-w-[1524px] m-auto px-4'>
          <div className='flex justify-start items-center w-2/5 h-[300px]'>
            <div className='flex justify-center items-end rounded-full w-[150px] h-[150px] overflow-hidden bg-[#ffffff66] border-2 border-dashed border-slate-300 bounce-twice '>
              <Image src={avatarImage} alt='creator'/>
            </div>
            <div className='flex flex-col gap-3 ml-5 relative -top-[16px]'>
              <p className='text-2xl ml-7 text-white flex items-center gap-2'>{communitycontents.communityName} <VideoIcon width={20} height={20}/> </p>
              <div className='flex items-start gap-2 ml-5 text-white w-fit px-4 py-2 rounded-[1.5rem] border border-slate-300'>
                <PersonIcon />
                <p className='text-[0.85rem] pr-2'>{communitycontents.communityMemberCount} members</p>
                <CountdownTimerIcon />
                <p className='text-[0.85rem]'>{communitycontents.createdDate}</p>
              </div>
              
              {joinCheck === true ? (
                <div className='pl-5 w-[32px]'>
                <Button radius='full' size='lg' color='success' disabled>
                  <EnterIcon /> Joined
                </Button>
                </div>
              ) : (
                <div className='pl-5 w-[32px]'>
                <Button radius='full' size='lg' color='secondary' onClick={handleJoinClick}>
                  <EnterIcon width={10} height={10}  /> Join
                </Button>
                </div>
              )}
            </div>
          
          </div>
          <div className='flex justify-center items-center w-3/5 h-[300px] text-white'>

          <div className='flex-col gap-3 hidden md:flex'>
            <div className='flex flex-col gap-unit-md pb-5'>
              <h2 className='flex flex-nowrap gap-3 text-base'> <InfoCircledIcon width={20} height={20}/> About </h2>
            </div>

            <div className='flex flex-row items-center gap-unit-md'>
              <p className='text-base font-sans'>{communitycontents.description}</p>
            </div>
            </div>

          </div>
        </div>
    }
    </>
  )
}

export default CommunityInner;