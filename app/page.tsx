import MainSidebar from '@/components/sidebar/MainSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import { ItemProps } from './user/[username]/page';
import { Avatar } from '@nextui-org/avatar';
import { memebers } from '@/data/members';
import { Card } from '@nextui-org/card';

export default function Home() {
  const data = memebers; // for Fetch Data Test
  return (
    <>
      <div
        className={`desktop:col-start-4 desktop:col-end-13
                    tablet:col-start-2 tablet:col-end-11
                    mobileL:col-span-full mobileM:col-span-full gap-unit-md
                    flex flex-col pt-4
                    scrollbar-thin`}
      >
        {data.map(
          // for Fetch Data Test
          (item: ItemProps, index) => (
            <Card className="min-h-[150px]" key={index}>
              <Avatar src={item.avatar} name={item.githubName} />
            </Card>
          ),
        )}
      </div>

      <Sidebar
        className={`desktop:block desktop:col-span-3
                    tablet:block tablet:col-span-1 tablet:min-w-[60px]
                  `}
      >
        <MainSidebar />
      </Sidebar>
    </>
  );
}
