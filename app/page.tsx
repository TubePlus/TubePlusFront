import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import MainSlider from '@/app/main_slider';
import CreatorRanking from '@/app/creator_ranking';
import { Card } from '@nextui-org/card';
import MainShorts from './main_shorts';

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
        <MainSlider />

        {/* recommended creator: ranking */}
        <CreatorRanking />

        {/* <div>
          <Chip color="default">Trending Today</Chip>
          <div className="flex flex-wrap pt-4 gap-6">
            <CommunityRecommend />
          </div>

          <div className="flex flex-col pt-4 pb-16 pr-1 gap-6">
            <Post />
          </div>
        </div> */}

        <MainShorts />

        {/* TODO: figma 참고 */}
        <section className="grid grid-cols-5">
          <div className="sm:col-span-2 x:col-span-full flex felx-col gap-4">
            <Card>hello</Card>
          </div>
          <div className="sm:col-span-3 x:col-span-full">
            <Card>h2llo</Card>
          </div>
        </section>
      </section>
    </>
  );
}
