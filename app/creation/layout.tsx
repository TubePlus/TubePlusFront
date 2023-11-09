import MainSidebar from '@/components/sidebar/MainSidebar'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

export default function CreationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar className={`x:bg-zinc-50 dark:x:bg-zinc-900`} isDrawerOnly>
        <MainSidebar />
      </Sidebar>

      <div
        className="
                  lg:col-span-10 lg:col-start-2
                  md:col-span-7 md:mt-12
                  sm:col-span-full
                  x:col-span-full x:mt-0"
      >
        {children}
      </div>
    </>
  )
}