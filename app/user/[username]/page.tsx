import { memebers } from '@/data/members';
import { getAuthSession } from '@/lib/auth';
import { Card } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { useSession } from 'next-auth/react';

interface UserPageProps {
  params: {
    username: string;
  };
}

// for test
export interface ItemProps {
  githubName: string;
  avatar: string;
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params;
  const data = memebers;

  const { data: session } = await useSession();
  return (
    <>
      <p>{username}</p>
      <p>{session?.user.username ?? 404}</p>

      {data.map(
        (
          item: ItemProps,
          index, // for test
        ) => (
          <Card key={index}>
            <Avatar src={item.avatar} name={item.githubName} />
          </Card>
        ),
      )}
    </>
  );
}
