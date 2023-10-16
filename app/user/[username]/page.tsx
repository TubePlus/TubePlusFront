import { getAuthSession } from '@/lib/auth';

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = params;

  const session = await getAuthSession();
  return (
    <>
      <p>{username}</p>
      <p>{session?.user.username ?? 404}</p>
    </>
  );
}
