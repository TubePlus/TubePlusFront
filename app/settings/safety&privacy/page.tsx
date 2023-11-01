'use client'

import { Switch } from '@nextui-org/react'
import React from 'react'

function page() {
  return (
    <div>

      <div className='pt-5 flex w-full flex-wrap gap-4'>
        <h1 className='pl-3 text-3xl'>Safety & Privacy</h1>
          <h5 className='pl-2 pt-2 pb-10 text-gray-400'>
            Manage how we use data to personalize your Reddit experience, and control how other redditors interact with you. To learn more, visit our Privacy & Security FAQs.
          </h5>
        <br/>
        <h2 className='pt-2 pl-3 border-b-2 w-full border-black text-xl'>Privacy</h2>
      </div>

        <h5 className='flex pl-2 pt-2 pb-10 w-full justify-between text-gray-400'> Personalized ads based on your activities <Switch defaultSelected aria-label="Automatic updates"/> </h5>
        <h5 className='flex w-full justify-between pl-2 text-gray-400'> Personalize recommendations based on your activities with our partners <Switch defaultSelected aria-label="Automatic updates"/> </h5>
    
    </div>
  )
}

export default page