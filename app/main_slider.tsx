'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { Slidebanner } from '@/types/banner';
import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { useQuery } from '@tanstack/react-query';
import { getSlides } from '@/lib/fetcher';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Image } from '@nextui-org/image';
import Link from 'next/link';

interface Banner {
  id: string;
  url: string;
  imgUrl: string;
  imgAlt: string;
}

const MainBanner = () => {
  const [banner, setBanner] = useState<Slidebanner[] | null>(null);

  const { data, isLoading, isError, error } = useQuery(
    ['main-slider'],
    getSlides,
  );

  return !isError ? (
    !isLoading ? (
      <Swiper
        className="md:h-[320px] sm:h-[280px] x:h-[180px] w-full rounded-2xl"
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop
      >
        {data.map((s: Banner) => (
          <SwiperSlide key={s.id} className="w-full rounded-2xl">
            <Link href={s.url}>
              <Image
                classNames={{
                  img: 'h-full object-cover hover:scale-105 rounded-none',
                }}
                removeWrapper
                alt={s.imgAlt}
                src={s.imgUrl}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <Skeleton className="md:h-[320px] sm:h-[280px] x:h-[180px] w-full rounded-2xl" />
    )
  ) : (
    <Card
      className="flex items-center justify-center border md:h-[320px] sm:h-[280px] x:h-[180px] w-full text-danger text-lg"
      shadow="none"
    >
      {Object(error)}error!
    </Card>
  );
};
export default MainBanner;
