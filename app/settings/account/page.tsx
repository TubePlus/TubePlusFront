'use client';

import React, { ChangeEvent, useState } from 'react';
import { Avatar } from '@nextui-org/avatar';
import { Chip } from '@nextui-org/chip';
import { CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { useSession } from 'next-auth/react';
import { languages } from '@/data/sidebar';
import SimpleCard from '@/components/SimpleCard';
import Link from 'next/link';

const communityCategory = [
  { code: 'MOVIE', label: '영화/애니메이션' },
  { code: 'CAR', label: '자동차' },
  { code: 'MUSIC', label: '음악' },
  { code: 'ANIMAL', label: '반려동물/동물' },
  { code: 'SPORTS', label: '스포츠' },
  { code: 'TRAVEL', label: '여행/이벤트' },
  { code: 'GAME', label: '게임' },
  { code: 'BLOG', label: '인물/블로그' },
  { code: 'COMEDY', label: '코미디' },
  { code: 'ENTERTAINMENT', label: '엔터테인먼트' },
  { code: 'NEWS', label: '뉴스/정치' },
  { code: 'STYLE', label: '노하우/스타일' },
  { code: 'EDUCATION', label: '교육' },
  { code: 'SCIENCE', label: '과학기술' },
];

export default function AccountPage() {
  const { data: session } = useSession();
  const userLang = languages.find(lang =>
    lang.locale.includes(session?.user.locale as string),
  );

  const [selectedLangValue, setSelectedLangValue] = useState<
    (typeof languages)[0]
  >(userLang!);
  const [category, setCategory] = useState<string[]>();
  const [bio, setBio] = useState('');

  const userRole =
    session?.user.role == 'ADMIN'
      ? session.user.role
      : session?.user.is_creator
      ? 'CREATOR'
      : session?.user.role;

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find(lang =>
      lang.name.includes(e.target.value),
    );

    if (selectedLanguage) {
      setSelectedLangValue(selectedLanguage);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value.split(','));
  };

  return (
    <section className="flex flex-col gap-8 min-h-[800px]">
      <SimpleCard classNames={{ card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">Account Preferences</h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col gap-2 items-center border-b-1 border-default-300">
          <div className="grid grid-cols-5 flex-row gap-16 w-full text-sm">
            <h5 className="col-span-1 font-semibold whitespace-nowrap">
              Email
            </h5>

            <div className="col-span-4 flex justify-between">
              {session ? (
                <p className="pl-1">{session.user.email}</p>
              ) : (
                <p>Loading...</p>
              )}
              <Chip
                className="text-[.6rem] "
                color={
                  userRole === 'MEMBER'
                    ? 'success'
                    : userRole === 'ADMIN'
                    ? 'danger'
                    : 'warning'
                }
                variant="bordered"
              >
                {userRole}
              </Chip>
            </div>
          </div>

          <div className="grid grid-cols-5 flex-row gap-16 items-center w-full text-sm">
            <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="md:inline x:hidden">Display</span> Language
            </h5>

            <div className="col-span-4 flex justify-between">
              <Select
                classNames={{ trigger: 'h-[28px]', innerWrapper: 'py-0' }}
                // userLang.name의 타입이 string | undefined 여서 확정적이지 않을 경우의 타입에러 발생
                defaultSelectedKeys={[userLang?.name || '한국어']}
                value={selectedLangValue?.name}
                onChange={handleSelectionChange}
                selectionMode="single"
                className="w-[200px]"
                variant="bordered"
                disallowEmptySelection
                startContent={
                  <span>
                    <Avatar
                      alt={selectedLangValue?.name || userLang?.name}
                      className="h-6 w-6"
                      isBordered={
                        selectedLangValue?.locale.includes('ja' || 'ko')
                          ? true
                          : false
                      }
                      src={selectedLangValue?.src || userLang?.src}
                    />
                  </span>
                }
              >
                {languages.map(lang => (
                  <SelectItem
                    key={lang.name}
                    value={lang.locale}
                    startContent={
                      <Avatar
                        alt={lang.name}
                        className="w-6 h-6"
                        src={lang.src}
                      />
                    }
                  >
                    {lang.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">Profile Preferences</h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col gap-2 items-center border-b-1 border-default-300">
          <div className="grid grid-cols-4 flex-row items-center gap-10 w-full text-sm">
            <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="md:inline x:hidden">Display Name(</span>
              Username
              <span className="md:inline x:hidden">)</span>
            </h5>

            <div className="col-span-2 flex justify-between">
              <Input
                isReadOnly
                type="text"
                variant="bordered"
                value={session?.user.username}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 flex-row items-center gap-10 w-full text-sm">
            <h5 className="col-span-1 font-semibold whitespace-nowrap">
              About(Bio)
            </h5>

            <div className="relative col-span-3 flex flex-col">
              <Textarea
                classNames={{ input: 'mb-4' }}
                // isReadOnly
                minRows={2}
                variant="bordered"
                value={bio || 'Add a bio'}
                onValueChange={setBio}
                isInvalid={bio.length > 255}
              />
              <p className="absolute right-2 bottom-1 text-default-500 text-small">
                {bio.length}/255
              </p>
            </div>
          </div>
        </div>
      </SimpleCard>

      {!session?.user.is_creator && (
        <SimpleCard classNames={{ card: '!p-0' }}>
          <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
            <h2 className="px-2">Creator Registration</h2>
          </CardHeader>

          <div className="px-6 pb-6 flex flex-col gap-2 items-between border-b-1 border-default-300">
            <p className="text-sm">
              Are you already a creator, or do you want to be a creator? Start
              by creating a community on TubePlus!
            </p>
            <div className="grid grid-cols-4 flex-row items-start md:gap-2 x:gap-4 w-full text-sm">
              <Select
                classNames={{
                  base: 'col-span-3 !w-full',
                }}
                label="Community Category"
                description="Select a category for the community"
                selectedKeys={category}
                onChange={handleCategoryChange}
                selectionMode="single"
                className="w-[200px]"
                variant="bordered"
              >
                {communityCategory.map(cate => (
                  <SelectItem key={cate.code} value={cate.label}>
                    {cate.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex h-14 items-center w-full">
                <Link
                  className="flex justify-center items-center
                            w-full h-2/3
                            text-base text-default-foreground hover:text-default-50
                            bg-default-200 hover:bg-default-800 duration-200
                            rounded-xl"
                  href={{
                    pathname: '/settings/community/new',
                    query: {
                      category: category,
                    },
                  }}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </SimpleCard>
      )}

      <SimpleCard
        classNames={{
          base: '!border-danger-300',
          card: '!p-0',
        }}
      >
        <CardHeader className="px-4 py-2 bg-danger-200 border-b-1 border-danger-300 rounded-none mb-4">
          <h2 className="px-2 text-danger-600 font-semibold text-xl">
            Delete account
          </h2>
        </CardHeader>
        <div className="px-6 pb-6 grid grid-cols-4 gap-2 items-center">
          <p className="col-span-3 text-justify md:text-sm x:text-xs">
            If you press the Delete button, your account will be completely
            removed from the tubePlus. Even if your account is deleted from
            tubePlus, it will not be deleted from YouTube.
          </p>
          <Button
            className="opacity-60 hover:opacity-100"
            color="danger"
            variant="ghost"
          >
            Delete
            <span className="sm:inline x:hidden"> your account</span>
          </Button>
        </div>
      </SimpleCard>
    </section>
  );
}
