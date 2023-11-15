"use client"
import { usePathname } from 'next/navigation'
import React from 'react'


function CommumityHeader() {

    const path = usePathname()
    console.log(path)
    if(path.split('/')[1] !== 'tube') return null
  return (
    <div className='w-full h-[600px] bg-black' >  </div>
  )
}

export default CommumityHeader