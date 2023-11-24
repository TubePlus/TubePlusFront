import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import MainShorts from './main-shorts';
import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { MainBanner, SuggestedCreator } from './main-slider';
import CreatorRanking from './creator-ranking';
import { useTranslations } from 'next-intl';

type Props = {
  params: { locale: string };
};

const releasePostLIst = [
  {
    title: 'New Members!1',
    img: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/spharos3rd.png',
    href: '',
    createdAt: '2023/10/21 Fri',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'New Members! 2',
    img: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/spharos3rd.png',
    href: '',
    createdAt: '2023/11/10 Fri',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'New Members! 3',
    img: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/spharos3rd.png',
    href: '',
    createdAt: '2023/11/10 Fri',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'New Members! 4',
    img: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/spharos3rd.png',
    href: '',
    createdAt: '2023/11/10 Fri',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'New Members! 5',
    img: 'https://storage.cloud.google.com/tubeplus-bucket/dummy/spharos3rd.png',
    href: '',
    createdAt: '2023/11/10 Fri',
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export default function Home({ params: { locale } }: Props) {
  const t = useTranslations('Home');
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
              className="bg-default-100"
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
              titleLink={{
                name: t('see-details'),
                href: 'https://www.notion.so/0a89d8b8f2594072bebc7c0613cade3b',
              }}
            >
              <FlatCardTubePlusTeamBody />
            </FlatCard>

            <FlatCard
              className="bg-default-100"
              title={t('related-creator')}
              titleLink={{ name: t('see-more'), href: '/community' }}
            >
              <div className="p-2 pt-0">
                <div
                  className="p-2 flex items-center gap-2 justify-between
                                border border-default-300 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      src=""
                      alt="Related User"
                      size="lg"
                      name="Related User"
                    />
                    <div className="flex flex-col ga-0">
                      <span className="text-sm">Related Creator</span>
                      <span className="text-[11px]">@relatedUser</span>
                    </div>
                  </div>

                  <Button
                    className="bg-primary-300 hover:bg-primary-500"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    {t('join')}
                  </Button>
                </div>
              </div>
            </FlatCard>
          </div>

          <div className="sm:col-span-3 x:col-span-full">
            <FlatCard
              className="h-full justify-between bg-default-100"
              title={t('releases-accessible')}
              titleLink={{ name: t('see-all'), href: '' }}
            >
              {/** //TODO: map 사용해서 데이터 표시 */}
              {releasePostLIst.map(post => (
                <ReleasesPost key={post.title} post={post} />
              ))}
            </FlatCard>
          </div>
        </section>

        <section>
          <h2 className="text-xl mb-4">{t('suggested-creator')}</h2>
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
  const t = useTranslations('Card');
  return (
    <>
      <CardBody
        as={Link}
        className="p-0 min-h-50 overflow-hidden"
        href={'https://www.notion.so/0a89d8b8f2594072bebc7c0613cade3b'}
      >
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
          <h3>{t('welcome-to-tubeplus')}</h3>
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

type ReleasePost = {
  title: string;
  img: string;
  href: string;
  createdAt: string;
  contents: string;
};

const ReleasesPost = ({ post }: { post: ReleasePost }) => {
  return (
    <Link className="flex gap-2 p-2 pt-0 group/release" href={post.href}>
      <div className="w-48 h-full overflow-hidden rounded-lg">
        <Image
          className="scale-105 group-hover/release:scale-110"
          src={post.img}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div className="w-full flex gap-1 justify-between">
            <h2 className="text-default-400 group-hover/release:text-default-800 duration-200">
              {post.title}
            </h2>

            <i className="text-[11px] text-default-400 group-hover/release:text-default-800 duration-200">
              {post.createdAt}
            </i>
          </div>
        </div>

        <p className="text-small text-ellipsis line-clamp-3 break-all text-justify text-default-400 group-hover/release:text-default-600 duration-300">
          {post.contents}
        </p>
      </div>
    </Link>
  );
};
