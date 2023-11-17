import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { Card, Divider } from '@nextui-org/react';

interface TabsProps {
  communityId: number;
  boardContents: any;
}

const BoardTabsBar = ({ communityId, boardContents }: TabsProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex whitespace-nowrap text-xl font-semibold'>
        {boardContents?.data?.map((board: any, index: number) => (
          <Card>
          <li
            key={board.id}
            className={`flex items-center justify-center min-w-max
            ${pathname === `/tube/${communityId}/${board.id}` ? 'bg-blue-300 text-black rounded-lg' : 'text-gray-500'}
            hover:bg-blue-200 overflow-auto ${index !== 0 ? 'border-l border-gray-600' : ''} py-2`}
          >
            <div className={`flex justify-between items-center w-full ${pathname === `/tube/${communityId}/${board.id}` ? 'px-5' : 'px-3'}`}>

              <Link href={`/tube/${communityId}/${board.id}`}>{board.boardName}</Link>
            </div>
          </li>
          <Divider/>
          </Card>
        ))}
      </ul>
    </nav>
  );
};

export default BoardTabsBar;