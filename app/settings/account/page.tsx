'use client'

import React from 'react'
import { Button, Chip, Input } from '@nextui-org/react'
import { TrashIcon } from '@radix-ui/react-icons'
import { Select, SelectItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

//Todo : 카테고리 데이터 패칭
const animals = [
  {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", value: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", value: "elephant", description: "The largest land animal"},
  {label: "Lion", value: "lion", description: "The king of the jungle"},
  {label: "Tiger", value: "tiger", description: "The largest cat species"},
  {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", value: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    value: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
];

const languages = [
  {label: "English", value: "en", description: "English"},
  {label: "Korean", value: "ko", description: "한국어"},
]

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];


function Page() {

  const { data: session } = useSession()

  return (
    <div>
      
      <div className='pt-5 flex w-full flex-wrap gap-4'>
          <h1 className='pl-3 text-3xl'>Account Settings</h1>
          <br/>
          <h2 className='pt-2 pl-3 border-b-2 w-full border-black text-xl'>Account Preferences</h2>
        
        <div className='w-full'>

          <div className='flex flex-nowrap w-full justify-between'>
            <h5 className='pl-2 pt-2 pb-10 text-gray-400'>Email Address</h5>
            { session ? <p>{session.user.email}</p> : <p>Loading...</p> }
            <Chip color='success' className='text-white'>Authenticated</Chip>
          </div>
            

          <div className='flex flex-nowrap gap-12'>
            <h5 className='pl-2 whitespace-nowrap text-gray-400'> Display Language </h5>
            <Select
              label="Select a Language"
              placeholder="Select a language"
              // description="언어를 선택해주세요."
              defaultSelectedKeys={[""]}
              className="w-[200px]"
              color='primary'
            >
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}    
            </Select>
          </div>

        </div>
      </div>

      <div className='flex flex-nowrap pt-28'>
        <div className='pt-5 flex w-full flex-wrap gap-4'>
            <h2 className='pl-3 border-b-2 w-full border-black text-xl'>Profile Preferences</h2>

        <div className='whitespace-normal'>
          <div className='flex flex-nowrap gap-5'>
            <h5 className='pl-2 pt-2 pb-10 text-gray-400'>Display Name(Optional)</h5>
            <Input placeholder="Display Name" className='w-[200px]'/>
          </div>

          <div className='flex flex-nowrap gap-5'>
            <h5 className='pl-2 text-gray-400'> About(Optional) </h5>
            <Input size='lg' placeholder="About" description='200 Characters remaining.' className='w-[200px]'/>
          </div>
        </div>

        </div>
      </div>

      <div className='flex flex-nowrap pt-28'>
        <div className='pt-5 flex w-full flex-wrap gap-4'>
            <h2 className='pl-3 border-b-2 w-full border-black text-xl'>Creator Registration</h2>
          <div className='flex flex-nowrap gap-5 items-center'>

            <Select
              label="Creator Category"
              placeholder="Select a category"
              description="크리에이터 등록을 위한 카테고리를 선택해주세요."
              defaultSelectedKeys={[""]}
              className="max-w-xs"
              color='primary'
            >
              {animals.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
            <Button color='primary' className='mt-1'>Register</Button>

          </div>
        </div>
      </div>

      <div className='flex flex-nowrap pt-28 pb-20'>
        <div className='pt-5 flex w-full flex-wrap gap-4'>
            <h2 className='pl-3 border-b-2 w-full border-black text-xl'>Delete Account</h2>
          <div className='pl-2'>
            <Button startContent={<TrashIcon/>} color='danger' className='mt-1'>Delete Account</Button>
          </div>
        </div>
      </div>

    
    </div>
  )
}
export default Page