'use client'
import React from 'react'
import CustomSlider from '@/components/CustomSlider';
import { Chip } from '@nextui-org/chip';

const dummydata = [
  {
    id: 1,
    url: '/',
    imgUrl: '1.jpg',
    imgAlt: '1',
  },
  {
    id: 2,
    url: '/',
    imgUrl: '2.jpg',
    imgAlt: '2',
  },
  {
    id: 3,
    url: '/',
    imgUrl: '3.jpg',
    imgAlt: '3',
  }
]

const MainTop = () => {
  return (
    <>
          <div className='w-full h-20 flex flex-wrap gap-y-2 '>
            
            <Chip color="default" className=''>Recommend Creator</Chip>

            <CustomSlider data={dummydata} />

          </div>
    </>
  )
}
export default MainTop