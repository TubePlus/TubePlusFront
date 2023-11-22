import { Card, CardHeader } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { User } from '@nextui-org/user';

type Props = {
  params: { locale: string };
};
export default function TeamPage({ params: { locale } }: Props) {
  return (
    <div className="col-span-6 pt-2">
      {/* Image Here, Actually MockAPI here All resources */}
      <Skeleton className="min-h-[240px] w-full" />

      <article className="flex flex-col">
        <div className="pt-4 flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex gap-2 justify-between items-end">
              <h1 className="font-bold text-4xl overflow-hidden text-ellipsis">
                Team Aces
              </h1>
              <span className="pb-1 text-sm tracking-wide text-end italic translate-y-1">
                2023/11/22 Wed
              </span>
            </div>

            <p className="text-ellipsis line-clamp-3">
              Welcome to TubePlus! We’re Team Aces!
            </p>
          </div>
        </div>

        <Card
          classNames={{
            base: [
              'mt-2',
              'border border-default-200 hover:border-default-500',
            ],
          }}
          shadow="none"
        >
          <CardHeader className="flex gap-2">
            <User
              name="Random User"
              description="Random User"
              avatarProps={{ src: 'https://i.pravatar.cc/300' }}
            />
          </CardHeader>
        </Card>

        <div className="my-8 break-all">
          <div className="py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            repellendus sequi, vero reprehenderit consequuntur cum, nemo quasi
            aut id nesciunt architecto fugit adipisci beatae asperiores ad
            eveniet hic commodi nisi.
          </div>
        </div>
      </article>
    </div>
  );
}
