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
import { Slidebanner } from '@/types/banner';


function CustomSlider({data}: {data: Slidebanner[] | null}) {
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
        disableOnInteraction: true,
      }}
      navigation={
        {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
      loop={true}
      autoHeight={true}
      spaceBetween={0}
      slidesPerView={1}
      keyboard={true}
      mousewheel={true}
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}



      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
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