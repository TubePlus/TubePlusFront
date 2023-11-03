import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface TabsProps {
  communityId: string;
}

const CommunityTabsBar = ({ communityId }: TabsProps) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li className={pathname === `/tube/${communityId}/overview` ? 'active' : ''}>
          <Link href={`/community/${communityId}/overview`}>Overview</Link>
        </li>
        <li className={pathname === `/community/${communityId}/members` ? 'active' : ''}>
          <Link href={`/community/${communityId}/members`}>Members</Link>
        </li>
        <li className={pathname === `/community/${communityId}/settings` ? 'active' : ''}>
          <Link href={`/community/${communityId}/settings`}>Settings</Link>
        </li>
        {/* 필요에 따라 여기에 더 많은 탭을 추가할 수 있습니다. */}
      </ul>
    </nav>
  );
};

export default CommunityTabsBar;
