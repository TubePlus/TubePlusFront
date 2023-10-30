'use client'
import React from "react";
import { communitydata } from "@/data/communitydata";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { FrameIcon } from "@radix-ui/react-icons";

export default function CommunityRecommend() {

  const [isFollowed, setIsFollowed] = React.useState(false);

  return communitydata.map((item)=>( // TODO: fetch communitydata here
    
    <Card className="max-w-[340px]" key={item.id}>
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={item.creatorimg} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{item.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{item.creatorname} &nbsp; &nbsp;</h5>
          </div>
        </div>
        
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)} // TODO: onPress fetch here
        >
          {isFollowed ? "Joined" : "Join"}
        </Button>

      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <div className="flex text-center gap-3">
          {item.tag} &nbsp; {item.tag2} &nbsp; <FrameIcon />
        </div>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{item.favorite}</p>
          <p className=" text-default-400 text-small">Favorite</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{item.Joined}</p>
          <p className="text-default-400 text-small">Joined</p>
        </div>
      </CardFooter>
    </Card>

  ))
}
