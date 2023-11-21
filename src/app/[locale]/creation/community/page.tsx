'use client'

import SimpleCard from '@/components/SimpleCard'
import { Button, CardHeader, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrl, endpointPrefix } from '@/lib/fetcher';

interface CommunityData {
  communityName: string;
  description: string;
  token: string;
  ownerUuid: string;
}

interface CreateCommunityCheckType {
  userUuid: string;
}


export default function CommunityCreation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [communityName, setCommunityName] = useState('' as string);
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDuplicateCheckComplete, setIsDuplicateCheckComplete] = useState(false);

  const createCommunityCheckMutation = useMutation<any, any, CreateCommunityCheckType>(() => {
    return fetch('https://tubeplus.duckdns.org/api/v1/communities/users/me/creator-community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCommunityCheck),
    }).then((res) => res.json());
  }, {
    onSuccess: () => {
      router.push(`/`);
    }
  }
  );

  const createCommunityCheck: CreateCommunityCheckType = {
    userUuid: session?.user.uuid as string,
  };

  useEffect(() => {
    if (session?.user?.uuid) {
      createCommunityCheckMutation.mutate({ userUuid: session.user.uuid });
    }
  }, [session?.user?.uuid]); // 의존성 배열에 session.user.uuid를 추가
    
    // useMutation 훅은 컴포넌트의 최상단으로 이동되어야 합니다.
  const createCommunityMutation = useMutation<any, any, CommunityData>((newCommunity) => {
    return fetch(`${baseUrl}${endpointPrefix}/communities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 필요하다면, 인증 토큰 등의 추가적인 헤더를 여기에 추가
      },
      body: JSON.stringify(newCommunity),
            
    }).then((res) => res.json());
  }, {
    retry: 1,
    onSuccess: () => {
      // 요청이 성공적으로 완료되면 캐시를 무효화하거나, 필요한 추가적인 액션을 수행합니다.
      queryClient.invalidateQueries(['communities']);
      // router.push(`/`);
    },
    onError: (error) => {
      // 에러 처리 로직을 작성합니다.
      console.error('Error creating community:', error);
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      if (!session || (session.user && session.user.is_creator)) {
        router.push('/');
      }
    }
    setIsInvalid(false);
    setInvalidMsg('');
    setIsDuplicateCheckComplete(false);
  }, [session, status, router, communityName]);

  // useEffect(() => {
  // }, );
  // 이 부분에서 세션 상태에 따른 렌더링을 처리합니다.
  if (!session || (session.user && session.user.is_creator)) {
    return <div>Unauthorized</div>;
  }

  // 이벤트 핸들러는 여기에 정의됩니다.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCommunity: CommunityData = {
      communityName: formData.get('CommunityName') as string,
      description: formData.get('CommunityDescription') as string,
      token: session.user.token as string,
      ownerUuid: session.user.uuid as string,
    };
    createCommunityMutation.mutate(newCommunity);
  };

  const checkDuplicateName = (communityName : string) => {
    setIsLoading(true);
    fetch(`${baseUrl}${endpointPrefix}/communities/${communityName}/duplicate`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setIsLoading(false);
      if (data.code === 'S001') {
        setIsInvalid(false);
        setIsDuplicateCheckComplete(true);
        console.log('중복검사완료');
      } else {
        setIsInvalid(true);
        setIsDuplicateCheckComplete(false);
        setInvalidMsg(`${communityName}은 중복되거나 유효하지 않습니다!`);
      }
    })
    .catch(error => {
      setIsLoading(false);
      alert(`${error}\n API is not working...`);
    });
  };

  // 중복 검사 버튼 클릭 이벤트 핸들러
  const handleDuplicateCheck = () => {
    if (!communityName) {
      setIsInvalid(true);
      setInvalidMsg(`커뮤니티 이름을 다시 입력해주세요.`);
      return;
    }
    checkDuplicateName(communityName);
  };

  return (
    <>
      
      <section className="flex flex-col gap-8 min-h-[800px]">
    
        <SimpleCard classNames={{ card: '!p-0' }}>

        <form onSubmit={handleSubmit}>

        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h1 className="px-2 font-bold">Create Community</h1>
        </CardHeader>
        
        <div className="px-6 pb-6 flex flex-col gap-2 border-b-1 border-default-300">
          <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            <div className="md:inline x:hidden"> Name </div>
            <div className="pt-3 pb-5 font-light"> Community names cannot be changed. </div>
          </h5>
          <div className="grid grid-cols-5 flex-row gap-8 w-full text-sm pb-7">
            <Input
              className='col-span-2'
              isClearable size='lg'
              type='text'
              name="CommunityName"
              variant={'underlined'}
              placeholder=" Enter your CommunityTitle"
              onChange={(e) => setCommunityName(e.target.value)}
            />
              <Button
                onClick={handleDuplicateCheck}
                size='md'
                className='col-span-1'
                color={isDuplicateCheckComplete ? 'success' : 'primary'}
              >
              <span className="md:inline x:hidden"> Duplicate </span> check
            </Button>
          </div>
          
          <div className="grid grid-cols-5 flex-row gap-16 pt-10 items-center w-full text-sm">
            <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="md:inline xs:hidden"> Description </span>
            </h5>
          </div>
          <div className="grid grid-cols-5 flex-row gap-16 items-center w-full text-sm pb-10">
            <Input
              className='col-span-6'
              isClearable size='lg'
              // type="CommunityDescription"
              type="text" // 입력 필드 유형을 텍스트로 설정
              name="CommunityDescription" // FormData가 이 값을 찾을 수 있도록 name 속성 설정
              variant={'underlined'}
              placeholder="Enter your CommunityDescription" />
          </div>
        </div>

        <div className='grid grid-cols-5 gap-4 bg-default-100 p-7'>
          <Button onClick={() => window.history.back()} color='secondary'>
            Cancel
          </Button>

          <Button type='submit' color='primary'>
            Create <span className="md:inline xs:hidden"> Community </span>
          </Button>
        </div>

        </form>

        </SimpleCard>
    
      </section>
    </>
  )
}