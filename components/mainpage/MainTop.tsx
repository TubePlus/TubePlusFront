'use client'
import React from 'react'
import CustomSlider from '@/components/CustomSlider';
import { useState , useEffect } from 'react';
import { slidebanner } from '@/types/banner';

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
  const [banner , setBanner] = useState<slidebanner[] | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try { 
        const response = await fetch('https://652c497bd0d1df5273ef56a5.mockapi.io/api/v1/banner' , {
      method : 'GET',
      headers : { 'Content-Type' : 'application/json'}
    })
    if (response.ok) {
      const data = await response.json()
      console.log('Success fecting data:', data)
      setBanner(data)
    }
    } catch (error) {
      console.error('Error fecting data:', error)
    }
  }
    fetchBanner();
  }
  , [])

  console.log('f d:' , banner)

  if (banner === null) {
    return null; // 데이터가 로딩 중일 때 렌더링을 방지
  }
  
  return (
    <>
        <div className='pt-5'>
          <CustomSlider data={dummydata} />
        </div>
    </>
  )
}
export default MainTop