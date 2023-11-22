import { Card, CardHeader } from '@nextui-org/card';
import { cn } from '@nextui-org/system-rsc';
import { Skeleton } from '@nextui-org/skeleton';
import { User } from '@nextui-org/user';

export default function CommunityPage() {
  return (
    <>
      <div className="col-span-6 pt-2">
        {/* Image Here, Actually MockAPI here All resources */}
        {/* <Skeleton className="min-h-[240px] w-full" /> */}

        <article className="flex flex-col">
          <div className="pt-4 flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl overflow-hidden text-ellipsis">
                Random Communities
              </h1>

              <p className="text-ellipsis line-clamp-3">
                Find Communities you want to join Here
              </p>
            </div>
          </div>

          <div className="my-8 break-all">
            <Card
              classNames={{
                base: 'border border-default-200 hover:border-default-500',
              }}
              shadow="none"
            >
              <CardHeader className="flex gap-2">
                <User
                  classNames={{ base: 'w-[200px]' }}
                  name="Random User"
                  description="Random User"
                  avatarProps={{ src: 'https://i.pravatar.cc/300' }}
                />

                <div className="w-full grid grid-cols-4 gap-2">
                  <span className="text-sm tracking-wide text-end italic translate-y-1">
                    Enterainment
                  </span>

                  <span>1,305</span>
                </div>
              </CardHeader>
            </Card>
          </div>
        </article>
      </div>

      <div
        className="col-span-3 pt-2 w-full
                    md:block x:hidden
      "
      >
        <Card
          className="sticky top-[5.55rem] z-[100]
                        x:border border-default-300 shadow-none"
          shadow="none"
        >
          <CardHeader>
            <h2>More About Aces!</h2>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
