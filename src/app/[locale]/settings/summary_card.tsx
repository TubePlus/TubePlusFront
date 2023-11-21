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
import { useEffect } from 'react';

const SummaryCard = () => {
  const { data: session, update } = useSession();
  // TODO: get user infomation
  const [user, setUser] = useGlobalState('/settings');

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
          username: session.user.username || '',
          profileImage: session.user.image || '',
          locale: session.user.locale || 'en',
          bio: session.user.bio || '', // NOTE: no bio in user session
        },
      });
    }
  }, [data, session?.user, setUser, user]);

  const handleRemove = () => {
    console.log('remove');
  };

  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(updateAUser);

  const handleUpdate = () => {
    const updateUser = {
      uuid: user?.editable.uuid,
      username: user?.editable.username,
      profileImage: user?.editable.profileImage,
      locale: user?.editable.language,
      bio: user?.editable.bio,
    };
    mutate(updateUser);

    if (isSuccess) {
      console.log(updateUser);
      console.log('success');
      update();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <SimpleCard title="Settings Summary">
        <ul className="px-2 space-y-1">
          <li className="flex items-center gap-2">
            Email:
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
            Username:
            <Chip size="sm" onClose={handleRemove}>
              {user?.editable.username || session?.user.username}
            </Chip>
          </li>

          {user?.editable.locale && (
            <li className="flex items-center gap-2">
              Language:
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
              About(bio):
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