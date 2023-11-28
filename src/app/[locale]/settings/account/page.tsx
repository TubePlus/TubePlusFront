'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Avatar } from '@nextui-org/avatar';
import { Chip } from '@nextui-org/chip';
import { CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Selection } from '@nextui-org/table';
import { useSession } from 'next-auth/react';
import { communityCategory } from '@/data/sidebar';
import SimpleCard from '@/components/SimpleCard';
import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';
import useGlobalState from '@/hooks/use-global-state';
import DefaultPreference from './default-preferences';
import ProfilePreference from './profile-preferences';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '@/lib/fetcher';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const communityInfo = [
  { id: 1, title: 'Category', value: '엔터테인먼트' },
  { id: 2, title: 'Members', value: '105' },
  { id: 3, title: 'Boards', value: '10' },
  { id: 4, title: 'Posts', value: '2201' },
  { id: 5, title: 'Created', value: '2023-11-03' },
];

export default function AccountPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [user, setUser] = useGlobalState('/settings');
  const t = useTranslations('User');

  useEffect(() => {
    // TODO: getUser infomation not from session
    if (!user && session) {
      setUser({
        default: {
          email: session.user.email,
          role: session.user.role,
        },

        editable: {
          uuid: session.user.uuid, // edit info user table address
          username: session.user.username,
          profileImage: session.user.image,
          locale: session.user.locale,
          bio: session.user.bio,
        },
      });
    }
  }, [session, setUser]);

  const [category, setCategory] = useState<Selection>(new Set([]));

  const userRole =
    session?.user.role == 'ADMIN'
      ? session.user.role
      : session?.user.is_creator
      ? 'CREATOR'
      : session?.user.role;

  const {
    mutate: deleteUserMutate,
    isLoading,
    data: newSession,
    isError,
    error,
    isSuccess,
  } = useMutation(deleteUser);

  const handleCommunityGen = (category: string) => {
    if (category) {
      router.push(`/creation/community?category=${category}`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '커뮤니티 카테고리를 선택해주세요.',
      });
    }
  };

  const handleDelUser = () => {
    deleteUserMutate(session?.user.uuid as string);

    if (isSuccess) {
      //TODO 삭제 완료 시 로그아웃
      window.confirm('User has been deleted');
      update();
      window.location.href = '/';
    }
  };

  return (
    <section className="flex flex-col gap-8 min-h-[800px]">
      <SimpleCard classNames={{ card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">{t('account-preference')}</h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col gap-2 items-center border-b-1 border-default-300">
          <div className="grid grid-cols-5 flex-row gap-16 w-full text-sm">
            <h5 className="col-span-1 font-semibold whitespace-nowrap">
              {t('email')}
            </h5>

            <div className="col-span-4 flex justify-between">
              {session ? (
                <p className="pl-1">{session.user.email}</p>
              ) : (
                <p>Loading...</p>
              )}
              <Chip
                className={`text-[.6rem] flex items-center ${
                  userRole === 'CREATOR' || 'ADMIN'
                    ? 'bg-red-600 text-white'
                    : 'border-success-600'
                }`}
                variant={
                  userRole === 'CREATOR' || 'ADMIN' ? 'solid' : 'bordered'
                }
              >
                {userRole}
              </Chip>
            </div>
          </div>

          <div className="grid grid-cols-5 flex-row gap-16 items-center w-full text-sm">
            <h5 className="col-span-1 min-w-unit-24 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {t('display-language')}
            </h5>

            <div className="col-span-4 flex justify-between">
              <DefaultPreference
              // Email
              // Display Language
              />
            </div>
          </div>
        </div>

        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">{t('profile-preference')}</h2>
        </CardHeader>
        <ProfilePreference
        // Profile Image
        // Username
        // Bio
        />
      </SimpleCard>

      {!session?.user.is_creator ? (
        <SimpleCard classNames={{ card: '!p-0' }}>
          <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
            <h2 className="px-2">{t('creator-registration')}</h2>
          </CardHeader>

          <div className="px-6 pb-6 flex flex-col gap-2 items-between border-b-1 border-default-300">
            <p className="text-sm">{t('creator-registration-description')}</p>
            <div className="grid grid-cols-4 flex-row items-start md:gap-8 x:gap-4 w-full text-sm">
              <Select
                classNames={{
                  base: 'col-span-3 !w-full',
                }}
                label="Community Category"
                description="Select a category for the community"
                selectedKeys={category}
                onSelectionChange={setCategory}
                selectionMode="single"
                className="w-[200px]"
                variant="bordered"
              >
                {communityCategory.map(cate => (
                  <SelectItem key={cate.code} value={cate.code}>
                    {cate.code}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex h-14 items-center w-full">
                <Button
                  className="flex justify-center items-center
                            w-full h-2/3
                            text-base text-default-foreground hover:text-default-50
                            bg-default-200 hover:bg-default-800 duration-200
                            rounded-xl"
                  onClick={() => handleCommunityGen(Object.values(category)[0])}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </SimpleCard>
      ) : (
        <SimpleCard classNames={{ card: '!p-0' }}>
          <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
            <h2 className="px-2">{t('my-community')}</h2>
          </CardHeader>
          <div className="px-6 pb-6 flex flex-col gap-2 items-between border-b-1 border-default-300">
            <div className="flex flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-2">
                <Avatar src={''} alt={'Community avatar'} size="lg" />

                <div className="flex flex-col gap-1">
                  <h3>{t('community-name')}</h3>
                  <p className="text-sm font-light line-clamp-3">
                    {t('community-description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                {communityInfo.map(info => (
                  <dl
                    key={info.id}
                    className="flex flex-col gap-2 min-w-[80px]"
                  >
                    <dt>{info.title}</dt>
                    <dd className="text-tiny">{info.value}</dd>
                  </dl>
                ))}
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
            {t('account-delete')}
          </h2>
        </CardHeader>
        <div className="px-6 pb-6 grid grid-cols-4 gap-8 items-center">
          <p className="col-span-3 text-justify md:text-sm x:text-xs">
            {t('account-delete-description')}
          </p>
          <Button
            className="opacity-60 hover:opacity-100"
            color="danger"
            variant="ghost"
            onClick={handleDelUser}
          >
            <span>{t('delete-button')}</span>
          </Button>
        </div>
      </SimpleCard>
    </section>
  );
}
