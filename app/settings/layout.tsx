'use client'
import React, { ReactNode } from 'react'
import { settingtabmenubar } from '../../data/tabmenubar'
import { usePathname } from 'next/navigation';
import Link from 'next/link'

interface MenuTabBar {
  id: number;
  name: string;
  link: string;
}

export default function settingLayout({children}: {children: ReactNode}) {

  const pathName = usePathname()

  return (
    <div className='col-start-2 col-end-12'>
    <div className="top-[56px] opacity-[1]">
        
      <div className="flex w-full overflow-auto pt-5">
        
        <ul className="scrollbar flex w-full whitespace-nowrap overflow-x-auto [-ms-overflow-style:none;]">
          {
            settingtabmenubar.map((item: MenuTabBar) => (
              <li key={item.id} className={ pathName === `/settings${item.link}` ? 'settings-tab active' : 'settings-tab'}>
                <Link href={`/settings${item.link}`} className={`pt-[12px] pb-[12px] ${pathName === `/settings${item.link}` ? 'active-link' : ''}`}>{item.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
      {children}
    </div>
    </div>
  )
}