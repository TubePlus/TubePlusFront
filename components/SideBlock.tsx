import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from '@nextui-org/react'
import React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query';

interface RulesType {
  order: 1;
  sideId: string;
  sideType: 'image link' | 'dropdown';
  title: string;
  imageLink: {
    imageUrl: string;
    link: string;
  };
  dropDown:{
    sideId: number;
    toggleTitle: string;
    toggleContent: string;
    order: number;
  }[];
}

interface SideBlockProps {
  communityid: string;
}


const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


const SideBlock = ( { communityid } : SideBlockProps ) => {

  
// console.log('커뮤니티 아이디:', communityid)

//   const fetchSideBlock = async () => {
//     const res = await fetch(`https://tubeplus.duckdns.org/api/v1/communities/${communityid}/side/r`)
//     return res.json()
//   };

//   const {
//     data : sideblockcontents,
//     isLoading : isLoadingRules,
//     isError : isErrorRules,
//   } = useQuery (['rulescontents'] , fetchSideBlock);
  
//   console.log('사이드블록:', sideblockcontents)

//   if (isLoadingRules) {
//     return <span>Loading...</span>;
//   }
//   if (isErrorRules) {
//     return <span>Error!</span>;
//   }

  return (
    <>
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
    


    <div>
      <Card className='p-3'>
        <p className='font-bold text-xl'>
          Rules
        </p>
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
          </AccordionItem>
        </Accordion>
      </Card>
    </div>

    </>
  )
}

export default SideBlock