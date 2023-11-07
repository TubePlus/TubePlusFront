'use client'
import { Switch } from '@nextui-org/react'
import React from 'react'

function Page() {
  return (
    <div>
      <div className='pt-5 flex w-full flex-wrap gap-4'>
          <h1 className='pl-3 text-3xl'>Nofitication Settings</h1>
          <br/>
          <h2 className='pt-2 pl-3 border-b-2 w-full border-black text-xl'>Activity</h2>
        <div className='flex w-[30%] justify-between'>
          <h5 className='pl-2 pt-2 pb-10 text-gray-400'>Community Alert</h5>
          <Switch className='pb-5' defaultSelected aria-label="Automatic updates"/>
        </div>
      </div>
    </div>
  )
}

export default Page