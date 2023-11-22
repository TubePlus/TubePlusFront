'use client'

import SimpleCard from '@/components/SimpleCard'
import React, { use } from 'react'
import { Button, CardHeader, Input } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/select'
import { ChangeEvent } from 'react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseUrl, endpointPrefix } from '@/lib/fetcher'
import { usePathname, useRouter } from 'next/navigation'

// * TODO: 크리에이터만 가능하게 권한 체크
// * limitTime 빼곤 null이면 안됨

interface BoardData {
  communityId: number;
  boardName: string;
  boardType: string;
  boardDescription: string;
  limitDateTime: string;
}

const boardType = [
  {
    name: 'NORMAL',
    description: '일반 게시판',
  },
  {
    name: 'MEMBER',
    description: '멤버십 게시판',
  }
]

// TODO: COMMUNITYID를 받아와야함
export default function BoardCreation({communityId}: {communityId: number}) {

  const path = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = path.split('/')[1];

  const createBoardMutation = useMutation<any, any, BoardData>((newBoard) => {
    return fetch(`https://tubeplus1.duckdns.org/api/v1/board-service/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 필요하다면, 인증 토큰 등의 추가적인 헤더를 여기에 추가
      },
      body: JSON.stringify(newBoard),
    }).then((res) => res.json());
  }, {
    onSuccess: () => {
      // 요청이 성공적으로 완료되면 캐시를 무효화하거나, 필요한 추가적인 액션을 수행합니다.
      queryClient.invalidateQueries(['boards']);
      router.push(`/${locale}/tube/${communityId}`);
    },
    onError: (error) => {
      // 에러 처리 로직을 작성합니다.
      console.error('Error creating board:', error);
    },
  });


  const [selectedBoardType, setSelectedBoardType] = useState(boardType[0].name);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoardType(e.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    // 사용자가 입력한 분을 정수로 변환
    const limitTimeInMinutes = parseInt(formData.get('Limit Date Time') as string, 10);
    
    // 현재 시간에 사용자가 입력한 분을 더하고 ISO 형식으로 변환
    let limitDateTime = '';
    if (!isNaN(limitTimeInMinutes)) {
      const currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + limitTimeInMinutes);
      limitDateTime = currentDate.toISOString();
    }
  
    const newBoard: BoardData = {
      communityId: communityId,
      boardName: formData.get('BoardName') as string,
      boardType: selectedBoardType,
      boardDescription: formData.get('BoardDescription') as string,
      limitDateTime: limitDateTime, // 계산된 시간을 사용
    };
    createBoardMutation.mutate(newBoard);
  }



  return (
    
    <section className="flex flex-col gap-8 min-h-[800px]">
    
    <SimpleCard classNames={{ card: '!p-0' }}>

      <form onSubmit={handleSubmit}>

    <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
      <h1 className="px-2 font-bold">Create Board</h1>
    </CardHeader>
    
    <div className="px-6 pb-6 flex flex-col gap-2">
      <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
        <div className="md:inline"> Name </div>
        <div className="pt-3 pb-5 font-light"> Board names cannot be changed. </div>
      </h5>
      <div className="grid grid-cols-5 flex-row gap-8 w-full text-sm pb-7">
        <Input
          className='col-span-2'
          isClearable size='lg'
          type='text'
          name="BoardName"
          variant={'underlined'}
          placeholder="Enter your BoardTitle"
        />
        {/* TODO: 게시판 이름 중복체크 할지 여부, 한다면 커뮤니티 중복체크 로직 사용 */}
        {/* <Button className='col-span-1' size='md' color='primary'>
          <span className="md:inline x:hidden"> Duplicate </span> check
        </Button> */}
      </div>

        <div className="grid grid-cols-5 flex-row gap-8 w-full text-sm pb-7">
          <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="md:inline"> BoardType </span>
          </h5>
          <Select
            classNames={{ trigger: 'h-[28px]', innerWrapper: 'py-0' }}            
            onChange={handleSelectionChange}
            value={selectedBoardType}
            selectionMode="single"
            className="w-[200px]"
            variant="bordered"
            disallowEmptySelection
          >
            {boardType.map((type) => (
              <SelectItem
                key={type.name}
                value={type.name}
              >
                {type.description}
              </SelectItem>
            ))}
          </Select>
        </div>

      </div>
      
      <div className="grid grid-cols-5 flex-row gap-16 pt-10 items-center w-full text-sm">
        <h5 className="pl-5 col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="md:inline"> Description </span>
        </h5>
      </div>
      <div className="grid grid-cols-5 pl-5 pr-20 flex-row gap-16 items-center w-full text-sm pb-10">
        <Input
          className='col-span-6'
          isClearable size='lg'
          type="text" // 입력 필드 유형을 텍스트로 설정
          name="BoardDescription" // FormData가 이 값을 찾을 수 있도록 name 속성 설정
          variant={'underlined'}
          placeholder="Enter your BoardDescription" />

        <div className='grid col-span-2 gap-3'>
          <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="md:inline"> Limit Date Time (Minute) </span>
          </h5>
          <Input
          className='col-span-6'
          isClearable size='lg'
          type="text" // 입력 필드 유형을 텍스트로 설정
          name="Limit Date Time" // FormData가 이 값을 찾을 수 있도록 name 속성 설정
          variant={'underlined'}
          placeholder="Enter your Limit Time (Minute)" />

        </div>
      </div>

    <div className='grid grid-cols-5 gap-4 bg-default-100 p-7'>
      <Button onClick={() => window.history.back()} color='secondary'>
        Cancel
      </Button>

      <Button type='submit' color='primary'>
        Create <span className="md:inline x:hidden"> Board </span>
      </Button>
      </div>

      </form>

    </SimpleCard>

    </section>
  )
}