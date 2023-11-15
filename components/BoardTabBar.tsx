import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface TabsProps {
  communityId: string;
  boardContents: any;
}

const BoardTabsBar = ({ communityId, boardContents }: TabsProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className='flex w-full gap-10 whitespace-nowrap text-[24px] font-bold '>
        {boardContents && boardContents.data.map((board: any) => (
        <li key={board.id} className={pathname === `/tube/${communityId}/${board.id}` ? 'bg-zinc-300 text-black rounded-lg' : 'text-gray-500'}>
          <Link href={`/tube/${communityId}/${board.id}`}>{board.boardName}</Link>
        </li>
        ))}
      </ul>
    </nav>
  );
};

export default BoardTabsBar;
