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


function CustomSlider({data}: {data: slidebanner[]}) {
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

          {
            data.map((item:slidebanner) => (
              <SwiperSlide key={item.id}>
                <div className='w-full h-[auto]'>
                <Link href={item.url}>

                <Image
                  src={`/images/${item.imgUrl}`}
                  alt={`/images/${item.imgAlt}`}
                  width={1920}
                  height={500}
                  priority
                />

                </Link>
                </div>

              </SwiperSlide>
            ))
          }
      </Swiper>
  )
}

export default CustomSlider