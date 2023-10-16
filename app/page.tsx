import { Desktop, Mobile, Tablet } from '@/components/Responsive';
import dynamic from 'next/dynamic';

const MainSidebar = dynamic(() => import('@/components/sidebar/MainSidebar'), {
  loading: () => <p>loading...</p>,
});

export default function Home() {
  return (
    <>
      <Desktop>
        <div className="col-start-4 col-end-13 gap-unit-md flex flex-col pt-4">
          This is Homepage...
        </div>
      </Desktop>

      <Tablet>
        <div className="col-start-5 col-end-11 gap-unit-md flex flex-col pt-4">
          This is Homepage...
        </div>
      </Tablet>

      <Mobile>
        <div className="col-span-full gap-unit-md flex flex-col pt-4">
          This is Homepage...
        </div>
      </Mobile>

      <MainSidebar />
    </>
  );
}
