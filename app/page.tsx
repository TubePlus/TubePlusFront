import { Desktop, Mobile, Tablet } from '@/components/Responsive';
import MainSidebar from '@/components/sidebar/MainSidebar';
import dynamic from 'next/dynamic';

import Sidebar from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <>
      <Tablet>
        <div className="col-start-5 col-end-11 gap-unit-md flex flex-col pt-4">
          This is Homepage...
        </div>

        <Sidebar>
          <MainSidebar />
        </Sidebar>
      </Tablet>

      <Mobile>
        <div className="col-span-full gap-unit-md flex flex-col pt-4">
          This is Homepage...
        </div>
      </Mobile>
    </>
  );
}
