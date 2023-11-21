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
import { LgValue, MdValue, SmValue } from '@/components/Responsive';
import { Button } from '@nextui-org/button';
import { useLocale, useTranslations } from 'next-intl';

interface Banner {
  id: string;
  url: string;
  imgUrl: string;
  imgAlt: string;
}

const MainBanner = () => {
  const t = useTranslations('Home');
  const locale = useLocale();

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
        grabCursor
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

const suggestedCreator = [
  {
    href: '',
    name: '이리오너라',
    category: 'official',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested_7.webp',
    date: '2023/11/08',
  },
  {
    href: '',
    name: '와칸다',
    category: 'GAME',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested_2.webp',
    date: '2023/11/10',
  },
  {
    href: '',
    name: 'tubePlus team',
    category: 'official',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested_3.webp',
    date: '2023/11/10',
  },
  {
    href: '',
    name: '나뭇잎마을 대장',
    category: 'official',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested_4',
    date: '2023/11/10',
  },
  {
    href: '',
    name: '럴수럴수이럴수가',
    category: 'official',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested_5.webp',
    date: '2023/11/10',
  },
  {
    href: '',
    name: '홍길동',
    category: 'official',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested-1.svg',
    date: '2023/11/10',
  },
  {
    href: '',
    name: '경제1타',
    category: 'official',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    src: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/suggested_6.webp',
    date: '2023/11/10',
  },
];

const SuggestedCreator = () => {
  const t = useTranslations('Home');
  const isSm = SmValue();
  const isMd = MdValue();
  const isLg = LgValue();
  return (
    <Swiper
      className="w-full"
      slidesPerView={isLg ? 5 : isMd ? 4 : isSm ? 3 : 1}
      spaceBetween={8}
      autoplay={{ delay: 3000 }}
      grabCursor
    >
      {suggestedCreator.map(c => (
        <SwiperSlide
          key={c.name}
          className="border rounded-lg overflow-hidden group flex flex-col gap-1 justify-between h-full min-h-[210px]"
        >
          <div className="overflow-hidden">
            <Image
              classNames={{
                wrapper: 'overflow-hidden rounded-none',
                img: 'h-32 object-cover group-hover:scale-105 rounded-none',
              }}
              // removeWrapper
              src={c.src}
              alt=""
            />
          </div>

          <div className="px-2 h-full">
            <div className="flex justify-between">
              <span className="max-w-[120px] text-ellipsis whitespace-nowrap overflow-hidden">
                {c.name}
              </span>
              <span className="text-[11px]">{c.date}</span>
            </div>
            <p className="text-tiny text-ellipsis line-clamp-2">
              {c.description}
            </p>

            <Button
              className="my-4 hover:bg-primary-600 hover:text-primary-foreground"
              as={Link}
              href={c.href}
              fullWidth
              size="sm"
            >
              {t('see-more')}
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { MainBanner, SuggestedCreator };
