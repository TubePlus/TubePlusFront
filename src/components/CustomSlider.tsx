'use client'
import React from 'react'
import Image from 'next/image';
import { Swiper , SwiperSlide } from 'swiper/react'
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { Slidebanner } from '@/types/banner';


function CustomSlider({data}: {data: Slidebanner[] | null}) {
  console.log('props data:', data)

  return (
    <Swiper
      className='swiper relative w-full h-[auto]'
      effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 100,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
      >
      {data && data.map((item:Slidebanner) => (
        <div key={item.id}>
          <SwiperSlide>
            <div className='w-full h-[auto]'>
              <Link href={item.url}>
                <Image
                  // src={item.imgUrl} Memo: 데이터패칭 받을때 사용할 경로
                  // alt={item.imgAlt}
                  src={`/images/${item.imgUrl}`}
                  alt={`/images/${item.imgAlt}`}
                  width={1240}
                  height={400}
                  priority
                />
              </Link>
            </div>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  )
}
export default CustomSlider