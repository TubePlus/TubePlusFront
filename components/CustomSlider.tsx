'use client'
import React from 'react'
import Image from 'next/image';
import { Swiper , SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { slidebanner } from '@/types/banner';


function CustomSlider({data}: {data: slidebanner[] | null}) {
  console.log('props data:', data)

  return (
    <Swiper
      className='swiper relative w-full h-[auto]'
      modules={[Scrollbar, Pagination, Navigation]}
      pagination={{ 
        clickable: true,
        type: 'fraction'
      }}
      scrollbar={{
        draggable: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true
      }}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data && data.map((item:slidebanner) => (
        <div key={item.id}>
          <SwiperSlide>
            <div className='w-full h-[auto]'>
              <Link href={item.url}>
                <Image
                  // src={item.imgUrl}
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