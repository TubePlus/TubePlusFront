import SimpleCard from '@/components/SimpleCard';
import { Card, CardHeader } from '@nextui-org/card';
import { User } from '@nextui-org/user';
import { Skeleton } from '@nextui-org/skeleton';

export default function PaPage() {
  return (
    <>
      <div className="col-span-6 pt-2">
        {/* Image Here, Actually MockAPI here All resources */}
        <Skeleton className="min-h-[240px] w-full" />

        <article className="flex flex-col">
          <div className="pt-4 flex justify-between">
            <div className="flex flex-col w-full">
              <div className="flex gap-2 justify-between items-end">
                <h1 className="font-bold text-4xl overflow-hidden text-ellipsis">
                  Policies and Agreements
                </h1>
                <span className="pb-1 text-sm tracking-wide text-end italic translate-y-1">
                  2023/11/22 Wed
                </span>
              </div>

              <p className="text-ellipsis line-clamp-3">
                You know what? This is not help center... Actually, We’re the
                peopel who need to get help!
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              repellat cum inventore velit quis ut maxime quisquam? Laboriosam
              voluptate quos aperiam, sequi temporibus dignissimos quo deleniti,
              molestias, omnis rem accusantium?
            </div>

            <div className="py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              repellat cum inventore velit quis ut maxime quisquam? Laboriosam
              voluptate quos aperiam, sequi temporibus dignissimos quo deleniti,
              molestias, omnis rem accusantium?
            </div>

            <div className="py-2 break-all">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              repellat cum inventore velit quis ut maxime quisquam? Laboriosam
              voluptate quos aperiam, sequi temporibus dignissimos quo deleniti,
              molestias, omnis rem accusantium? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Illo obcaecati incidunt quia natus
              eius quidem esse architecto animi! Nemo voluptates iste autem?
              Ipsum dignissimos ad sapiente, eaque ratione eligendi molestiae.
            </div>

            <div className="py-2">
              <Skeleton className="min-h-[300px] w-full" />
            </div>

            <div className="py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              nobis eveniet a sapiente. Voluptates libero sed quod debitis
              consequuntur expedita facere a facilis ipsam? Placeat iure ab
              soluta vitae reprehenderit!
            </div>

            <div className="py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              nobis eveniet a sapiente. Voluptates libero sed quod debitis
              consequuntur expedita facere a facilis ipsam? Placeat iure ab
              soluta vitae reprehenderit! Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Minus molestias maiores eveniet
              pariatur quis ad inventore minima laborum dignissimos deserunt
              consectetur impedit, consequuntur corporis enim quos recusandae,
              sapiente, voluptates tempora! Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Molestiae harum odio exercitationem
              vel ducimus impedit culpa optio accusantium in ratione? Hic eius
              laudantium harum amet magnam possimus voluptate dignissimos
              maiores?
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
