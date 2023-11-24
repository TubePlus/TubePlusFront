'use client';

import SimpleCard from '@/components/SimpleCard';
import { languages } from '@/data/sidebar';
import useGlobalState from '@/hooks/use-global-state';
import { getUserByUuid, updateAUser } from '@/lib/fetcher';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const SummaryCard = () => {
  const { data: session, update } = useSession();
  // TODO: get user infomation
  const [user, setUser] = useGlobalState('/settings');
  const t = useTranslations('User');

  const { data } = useQuery(['me'], async () => {
    if (user?.uuid) {
      const data = await getUserByUuid(user?.uuid as string);
      return data;
    }
    return null;
  });

  useEffect(() => {
    if (!user && session?.user) {
      setUser({
        default: {
          email: session.user.email,
          role: session.user.role,
        },

        editable: {
          uuid: session.user.uuid, // edit info user table address
          username: session.user.username || user.editable.username,
          profileImage: session.user.image || user.editable.profileImage,
          locale: session.user.locale || user.editable.locale,
          bio: session.user.bio || user?.editable.bio || '', // NOTE: no bio in user session
        },
      });
    }
  }, [data, session?.user, setUser, user]);

  const handleRemove = () => {
    console.log('remove');
  };

  const {
    mutate,
    isLoading,
    data: newSession,
    isError,
    error,
    isSuccess,
  } = useMutation(updateAUser);

  const handleUpdate = () => {
    const updateUser = {
      uuid: user?.editable.uuid,
      username: user?.editable.username,
      profileImage: user?.editable.profileImage,
      locale: user?.editable.locale || session?.user.locale || 'en',
      bio: user?.editable.bio,
    };
    console.log(updateUser);
    mutate(updateUser);

    if (isSuccess) {
      console.log(updateUser);
      console.log('success/newSession: ', newSession);
      // update();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <SimpleCard title={t('settings-summary')}>
        <ul className="px-2 space-y-1">
          <li className="flex items-center gap-2">
            {t('email')}:
            <Chip
              classNames={{
                base: 'overflow-hidden',
                content: 'text-ellipsis line-clamp-1',
              }}
              size="sm"
              onClose={handleRemove}
            >
              {session?.user.email}
            </Chip>
          </li>

          <li className="flex items-center gap-2">
            {t('username')}:
            <Chip size="sm" onClose={handleRemove}>
              {user?.editable.username || session?.user.username}
            </Chip>
          </li>

          {user?.editable.locale && (
            <li className="flex items-center gap-2">
              {t('language')}:
              <Chip size="sm" onClose={handleRemove}>
                {
                  languages.find(lang =>
                    lang.locale.includes(user.editable.locale),
                  )?.name
                }
              </Chip>
            </li>
          )}

          {user?.editable.bio && (
            <li className="flex items-center gap-2">
              {t('about')}:
              <Chip
                size="sm"
                classNames={{
                  base: 'text-ellipsis line-clamp-1',
                  content: 'text-ellipsis line-clamp-1',
                }}
                onClose={handleRemove}
              >
                {user.editable.bio}
              </Chip>
            </li>
          )}
        </ul>
      </SimpleCard>

      <Button
        className={
          'text-success-foreground border border-success-500 hover:bg-success-600'
        }
        color="success"
        fullWidth
        onClick={handleUpdate}
      >
        {isError ? (
          <span>{Object.values(error as string)}</span>
        ) : isLoading ? (
          <Spinner color="default" />
        ) : isSuccess ? (
          'Profile Updated'
        ) : (
          'Update Profile'
        )}
      </Button>
    </div>
  );
};

export default SummaryCard;
