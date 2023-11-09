'use client'
import SimpleCard from '@/components/SimpleCard'
import { Button, CardHeader, Input } from '@nextui-org/react'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function CommunityCreation() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 인증이 완료되었고, 세션이 없거나 사용자가 is_creator가 true인 경우 홈 화면으로 리다이렉션
    if (status === 'authenticated' && (!session || (session.user && session.user.is_creator))) {
      router.push('/');
    }
  }, [session, status, router]);
  
  // 로딩 상태 또는 세션이 없거나 유저가 is_creator인 경우에 로딩 UI 표시
  if (status === 'loading' || !session || (session.user && session.user.is_creator)) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <section className="flex flex-col gap-8 min-h-[800px]">
    
        <SimpleCard classNames={{ card: '!p-0' }}>

        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h1 className="px-2 font-bold">Create Community</h1>
        </CardHeader>
        
        <div className="px-6 pb-6 flex flex-col gap-2 border-b-1 border-default-300">
          <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            <div className="md:inline x:hidden"> Name </div>
            <div className="pt-3 pb-5 font-light"> Community names cannot be changed. </div>
          </h5>
          <div className="grid grid-cols-5 flex-row gap-8 w-full text-sm pb-7">
            <Input className='col-span-2' isClearable size='lg' type="CommunityTitle" variant={'underlined'} placeholder="Enter your CommunityTitle" />
            <Button className='col-span-1' size='md' color='primary'> <span className="md:inline x:hidden"> Duplicate </span> check</Button>
          </div>
          

          <div className="grid grid-cols-5 flex-row gap-16 pt-10 items-center w-full text-sm">
            <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="md:inline x:hidden"> Description </span>
            </h5>
          </div>
          <div className="grid grid-cols-5 flex-row gap-16 items-center w-full text-sm pb-10">
            <Input className='col-span-6' isClearable size='lg' type="CommunityDescription" variant={'underlined'} placeholder="Enter your CommunityDescription" />
          </div>
        </div>

        <div className='grid grid-cols-5 gap-4 bg-default-100 p-7'>
          <Button onClick={() => window.history.back()} color='secondary'>
            Cancel
          </Button>

          <Button color='primary'>
            Create Community
          </Button>
        </div>

        </SimpleCard>
    
      </section>
    </>
  )
}

export default CommunityCreation