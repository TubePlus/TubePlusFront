'use client'
import React, { ReactNode } from 'react'
import { settingtabmenubar } from '../../data/tabmenubar'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { MenuTabBar } from '@/types/menutabbar';


export default function SettingLayout({children}: {children: ReactNode}) {

  const pathName = usePathname()

  return (
    <div className='col-start-1 col-end-12 h-screen'>
        <ul className="flex fixed w-[1400px] whitespace-nowrap">
          {
            settingtabmenubar.map((item: MenuTabBar) => (
              <li key={item.id} className={ pathName === `/settings${item.link}` ? 'settings-tab active' : 'settings-tab'}>
                <Link href={`/settings${item.link}`} className={`pt-[12px] pb-[12px] ${pathName === `/settings${item.link}` ? 'active-link' : ''}`}>{item.name}</Link>
              </li>
            ))
          }
        </ul>
        <div className='pt-5'>
      {children}
      </div>
    </div>
  )
}