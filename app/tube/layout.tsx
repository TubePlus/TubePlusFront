'use client'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { MenuTabBar } from '@/types/menutabbar';
import { communitytabmenubar } from '../../data/tabmenubar'

export default function SettingLayout({children}: {children: ReactNode}) {

  const pathName = usePathname()

  return (
    <div className='col-start-1 col-end-12'>
        <ul className="flex fixed w-[1400px] whitespace-nowrap">
          {
            communitytabmenubar.map((item: MenuTabBar) => (
              <li key={item.id} className={ pathName === `/tube/${item.link}` ? 'settings-tab active' : 'settings-tab'}>
                <Link href={`/tube/${item.link}`} className={`pt-[12px] pb-[12px] ${pathName === `/tube/${item.link}` ? 'active-link' : ''}`}>{item.name}</Link>
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