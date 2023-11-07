import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from '@nextui-org/react'
import React from 'react'

const SideBlock = () => {
  return (
    <>
      {/* <Card className='p-3'>
        <p className='font-bold text-xl'>
          Channel
        </p>


      </Card> */}

      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className='font-bold text-xl'>Channel</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className='flex'>
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <p>Make beautiful websites regardless of your design experience.</p>
        <Button color='primary'>Join</Button>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
    </>
  )
}

export default SideBlock