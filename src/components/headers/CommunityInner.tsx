import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseUrl , endpointPrefix } from '@/lib/fetcher'
import { Button } from '@nextui-org/react';
import { Image } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { communityType } from '@/types/communitytypes';
import { CalendarIcon, CountdownTimerIcon, PersonIcon, VideoIcon } from '@radix-ui/react-icons';

interface JoinType {
  userUUid: string;
}

function CommunityInner( { communityId, communitycontents }: { communityId : string, communitycontents: communityType} ) {

  const router = useRouter()
  const queryClient = useQueryClient();
  const session = useSession();
  const [ joinCheck, setJoinCheck ] = React.useState(false);
  const path = usePathname()
  const locale = path.split('/')[1]

  console.log(communitycontents?.profileImage.split('.').find((item) => item === 'webp'));

  const avatarImage = communitycontents?.profileImage.split('.').find((item) => item === 'webp') === 'webp' ? 'https://i.pinimg.com/originals/d6/a0/1f/d6a01f07a283fdf690f29edbdef7c458.png' : communitycontents?.profileImage

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

  // const joinhistoryMutation = useMutation<any, any, JoinType>(() => {
  //   return fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/users/me/join-history`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(session.user.uuid),
  //   }).then((res) => res.json());
  //   }, {
  //     onSuccess: (data) => {
  //       if (data.joined) {
  //         setJoinCheck(true);
  //       }
  //       // router.push(`/${locale}/tube/${communityId}`)
  //     },
  //     onError: (error) => {
  //       console.error('Error joining community:', error);
  //     },
  //   });

  //   useEffect(())
  //   useEffect(() => {
  //     if (session.user && session.data.user.uuid) {
  //       fetchJoinHistory()
  //         .then(data => {
  //           if (data.joined) {
  //             setJoinCheck(true);
  //           } else {
  //             setJoinCheck(false);
  //           }
  //         })
  //         .catch(error => {
  //           console.error('Error fetching join history:', error);
  //         });
  //     }
  //   }, [session.user, communityId]);



  //커뮤니티 정보 조회  
  // const fetchCommunity = async () => {
  //   const res = await fetch(`${baseUrl}${endpointPrefix}/communities/${communityId}/info`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  // })
  //   if (!res.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   return res.json()
  // };
  
  // const {
  //   data: communitycontents,
  //   isLoading: isLoadingCommunity,
  //   isError: isErrorCommunity,
  // } = useQuery(['communitycontents', communityId], fetchCommunity);

  // useEffect(() => {
  //   if (session.user && session.data.user.uuid) {
  //     joinhistoryMutation.mutate({ userUUid: session.data.user.uuid });
  //   }
  // }, [session.user, communityId]);
  
  // if (isLoadingCommunity || isLoading ) {
  //   return <span>Loading...</span>;
  // }
  // // 에러 상태 처리
  // if (isErrorCommunity || isError ) {
  //   return <span>Error!</span>;
  // }

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
            <div className='flex justify-center items-end rounded-full w-[150px] h-[150px] overflow-hidden bg-[#ffffff66] border-2 border-dashed border-slate-300 animate-bounce'>
              <Image src={avatarImage} alt='creator' width={120} height={120} />
            </div>
            <div className='flex flex-col gap-3 ml-5 relative -top-[30px]'>
              <p className='text-2xl ml-7 text-white flex items-center gap-2'>{communitycontents.communityName} <VideoIcon width={20} height={20}/> </p>
              <div className='flex items-start gap-2 ml-5 text-white w-fit px-4 py-2 rounded-[1.5rem] border border-slate-300'>
                <PersonIcon />
                <p className='text-[0.75rem] pr-2'>{communitycontents.communityMemberCount} members</p>
                <CountdownTimerIcon />
                <p className='text-[0.75rem]'>{communitycontents.createdDate}</p>
              </div>
            </div>
            <div>

            </div>
          </div>
          <div className='flex justify-end items-center w-3/5 h-[300px] bg-slate-400'>

          </div>
        </div>
    }
    </>
  )
}

export default CommunityInner;

{/* <div
className='flex absolute w-full h-[500px]  justify-center items-end mb-10 blur-sm -z-10'
style={{backgroundImage: `${communitycontents.bannerImage}`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
/> */}

{/* <div className='flex pt-3 flex-col gap-unit-md relative z-10'>
          <div className='flex items-center justify-center gap-unit-xl'>
          <Image src={avatarImage} alt='creator' width={200} height={200} />
          <div className='w-[15%] flex-col gap-3 hidden sm:flex text-white'>
            <p className='text-xl font-semiBold'>{communitycontents.communityName}</p>
            <p>{communitycontents.communityMemberCount} Members</p>
            <p>{communitycontents.createdDate}</p>
          
              
              {joinCheck === true ? (
                <Button radius='full' size='lg' color='success' disabled>
                  Joined
                </Button>
              ) : (
                <Button radius='full' size='lg' color='primary' onClick={handleJoinClick}>
                  Join
                </Button>
              )}
          </div>

          <div className='w-[50%] flex-col gap-3 hidden md:flex'>
            <div className='flex flex-col gap-unit-md'>
              <h2 className='text-xl font-bold'>About</h2>
            </div>

            <div className='flex flex-row items-center gap-unit-md'>
              <p className='text-base font-sans'>{communitycontents.description}</p>
            </div>
          </div>
        </div>
      </div> */}