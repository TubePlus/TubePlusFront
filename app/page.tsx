import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import { MainBanner, SuggestedCreator } from '@/app/main-slider';
import CreatorRanking from '@/app/creator-ranking';
import MainShorts from './main-shorts';
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div
        className="-ml-4 z-20
          lg:col-span-3
          md:col-span-1 md:min-w-[60px]"
      >
        <Sidebar //TODO: sidebar
          className={`md:bg-transparent x:bg-zinc-50 dark:x:bg-zinc-900`}
        >
          <MainSidebar isRoot />
        </Sidebar>
      </div>

      <section
        className={`lg:col-start-4 lg:col-end-13  lg:pl-0 
                    md:col-start-2 md:col-end-11  md:pl-0
                    x:col-span-full
                    overflow-y-auto pb-10
                    flex flex-col gap-y-10 gap-unit-md pt-4 
                    scrollbar-thin min-h-screen`}
      >
        {/* banner */}
        <MainBanner />

        {/* recommended creator: ranking */}
        <CreatorRanking />

        {/* 인기 급상승 동영상 */}
        <MainShorts />

        {/* TODO: figma 참고 */}
        {/* Static Contents */}
        <section className="grid grid-cols-5 gap-2 mt-4">
          <div className="sm:col-span-2 x:col-span-full flex sm:flex-col gap-4 x:flex-col-reverse">
            <FlatCard
              title={
                <div className="flex items-center gap-2">
                  <Avatar name="TubePlus" size="md" src={''} />
                  <div className="flex flex-col gap-0">
                    <span className="text-ellipsis line-clamp-1">
                      TubePlus Team
                    </span>
                    <i className="text-tiny text-default-500">@tubePlusTeam</i>
                  </div>
                </div>
              }
              titleLink={{ name: 'SEE DETAIL', href: '' }}
            >
              <FlatCardTubePlusTeamBody />
            </FlatCard>

            <FlatCard
              className=""
              title={`Related Creator`}
              titleLink={{ name: 'SEE MORE', href: '' }}
            >
              <div className="p-2 pt-0">
                <div className="p-2 flex items-center gap-2 justify-between border rounded-xl">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src=""
                      alt="Related User"
                      size="lg"
                      name="Related User"
                    />
                    <div className="flex flex-col ga-0">
                      <span className="text-sm">Related User</span>
                      <span className="text-[11px]">@relatedUser</span>
                    </div>
                  </div>

                  <Button
                    className="bg-primary-300 hover:bg-primary-500"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </FlatCard>
          </div>

          <div className="sm:col-span-3 x:col-span-full">
            <FlatCard
              className="h-full justify-between"
              title={'Releases Available'}
              titleLink={{ name: 'SEE ALL', href: '' }}
            >
              <FlatCardRelease />
              <FlatCardRelease />
              <FlatCardRelease />
              <FlatCardRelease />
            </FlatCard>
          </div>
        </section>

        <section>
          <h2 className="text-xl mb-4">Suggested Creator</h2>
          <SuggestedCreator />
        </section>
      </section>
    </>
  );
}

const FlatCard = ({
  title,
  titleLink,
  className,
  children,
}: {
  title: string | React.ReactNode;
  titleLink?: { name: string; href: string };
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card
      className={`${className} border border-default-200 group`}
      shadow="none"
    >
      <CardHeader className="flex justify-between">
        {title && typeof title == 'string' ? (
          <h2 className="flex items-center gap-2">{title}</h2>
        ) : (
          <>{title}</>
        )}

        {titleLink && (
          <Button
            as={Link}
            href={titleLink.href}
            className="text-tiny border border-default-300"
            variant="light"
            size="sm"
          >
            {titleLink.name}
          </Button>
        )}
      </CardHeader>

      {children}
    </Card>
  );
};

const FlatCardTubePlusTeamBody = () => {
  return (
    <>
      <CardBody className="p-0 min-h-50 overflow-hidden">
        <Image
          className="rounded-none scale-105 group-hover:scale-110 object-cover"
          src={
            'https://storage.cloud.google.com/tubeplus-bucket/dummy/tubePlus-team.png'
          }
          alt={'tubePlus team'}
          removeWrapper
        />
      </CardBody>
      <CardFooter className="flex-col gap-2">
        <div className="w-full flex items-center justify-between text-default-800">
          <h3>Welcome to TubePlus!</h3>
          <i className="text-tiny text-default-500">2023/11/08 Wed</i>
        </div>

        <p className="text-small text-ellipsis line-clamp-3 break-all text-justify text-default-400 group-hover:text-default-600 duration-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </CardFooter>
    </>
  );
};

const FlatCardRelease = () => {
  return (
    <div className="flex gap-2 p-2 pt-0 group">
      <div className="w-48 h-full overflow-hidden rounded-lg">
        <Image
          className="scale-105 hover:scale-110"
          src="https://storage.cloud.google.com/tubeplus-bucket/dummy/spharos3rd.png"
          alt=""
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div className="w-full flex gap-1 justify-between">
            <h2 className="">New Members!</h2>

            <i className="text-[11px] text-default-600">2023/11/10 Fri</i>
          </div>
        </div>

        <p className="text-small text-ellipsis line-clamp-3 break-all text-justify text-default-400 group-hover:text-default-600 duration-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};
