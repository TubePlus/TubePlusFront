'use client';

import SimpleCard from '@/components/SimpleCard';
import { CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Textarea } from '@nextui-org/input';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Switch } from '@nextui-org/switch';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import { Divider } from '@nextui-org/divider';
import { Select, SelectItem } from '@nextui-org/select';
import { Tooltip } from '@nextui-org/tooltip';
import { communityCategory } from '@/data/sidebar';

export default function CommuSettingsPage() {
  const { data: session } = useSession();
  const [bio, setBio] = useState(''); // 초기값 가져오기
  const [category, setCategory] = useState<string[]>();
  // check is_creator, has_community...

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value.split(','));
  };

  return (
    <section className="flex flex-col gap-8 ">
      <div className="">
        <h2 className="px-2 text-lg">Community Setting</h2>
        <p className="px-2 text-sm">
          The tubePlus community is designed to compatible with YouTube, but
          operates independently.
        </p>
      </div>

      <SimpleCard classNames={{ card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">General</h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col gap-2 items-between border-b-1 border-default-300">
          <div className="grid grid-cols-4 gap-4 w-full text-sm items-center py-2">
            <span className="col-span-1 line-clamp-1 text-ellipsis">
              <s className="sm:inline x:hidden no-underline">Community</s> Owner
            </span>
            <div className="col-span-3 flex flex-wrap">
              <span className="font-semibold">{session?.user.username}</span>
              <i className="overflow-hidden line-clamp-1">
                ({session?.user.email})
              </i>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 w-full text-sm items-center py-2">
            <span className="col-span-1 line-clamp-1 text-ellipsis">
              <s className="sm:inline x:hidden no-underline">Community</s> Name
            </span>
            <Input
              className="col-span-2 w-60"
              isReadOnly
              value={'Add community name...'} // TODO: 내 community 불러오기
              type="text"
              variant="bordered"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 w-full text-sm items-center py-2">
            <span className="col-span-1 line-clamp-1 text-ellipsis">
              <s className="sm:inline x:hidden no-underline">Community</s> Bio
            </span>
            <div className="relative col-span-3 flex flex-col">
              <Textarea
                classNames={{ input: 'mb-4' }}
                // isReadOnly
                minRows={2}
                variant="bordered"
                value={bio || 'Add a bio...'}
                onValueChange={setBio}
                isInvalid={bio.length > 255}
              />
              <p className="absolute right-2 bottom-1 text-default-500 text-small">
                {bio.length}/255
              </p>
            </div>
          </div>

          {/* <Divider /> */}

          {/* <Switch size="sm" /> */}
        </div>

        <CardHeader className="px-4 py-2 bg-default-200 border-b-1 border-default-300 rounded-none mb-4">
          <h2 className="px-2">Preference</h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col gap-2 items-between border-b-1 border-default-300">
          <div className="grid grid-cols-4 gap-4 w-full text-sm py-2">
            <span className="font-semibold col-span-1 line-clamp-1 text-ellipsis">
              <s className="sm:inline x:hidden no-underline">Community</s>{' '}
              Category
            </span>
            <div className="col-span-3 flex-col">
              <Select
                classNames={{
                  base: 'col-span-3 !w-full',
                }}
                label="Community Category"
                description="Select a category for the community"
                selectedKeys={category}
                onChange={handleCategoryChange}
                selectionMode="single"
                className="w-[200px]"
                variant="bordered"
              >
                {communityCategory.map(cate => (
                  <SelectItem key={cate.code} value={cate.label}>
                    {cate.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 w-full text-sm py-2">
            <span className="font-semibold col-span-1 line-clamp-1 text-ellipsis">
              <s className="sm:inline x:hidden no-underline">Community</s>{' '}
              Banner
            </span>
            <div className="col-span-3 flex-col">
              <ButtonGroup className="h-10 w-full">
                <Button
                  className="justify-start"
                  fullWidth
                  variant="bordered"
                  disabled
                  disableAnimation
                >
                  {'file name...'}
                </Button>
                <Button>Edit</Button>
              </ButtonGroup>
              <p className="text-xs p-1 text-justify">
                Upload an image to customize your community’s banner preview.
                Images should be at least 640×320px (1280×640px for best
                display).
              </p>
            </div>
          </div>
        </div>
      </SimpleCard>

      <SimpleCard classNames={{ base: '!border-[#FF0000]', card: '!p-0' }}>
        <CardHeader className="px-4 py-2 bg-[#FF0000] border-b-1 border-[#FF0000] rounded-none mb-4">
          <h2 className="px-2 text-white">
            Youtube{' '}
            <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Youtube API</div>
                  <div className="text-tiny">
                    TubePlus uses the{' '}
                    <a
                      className="underline hover:font-medium"
                      href="https://console.cloud.google.com/apis/library/youtube.googleapis.com"
                    >
                      YouTube API
                    </a>
                    . You must register the YouTube API to create a community.
                  </div>
                </div>
              }
            >
              <small className="italic">*required</small>
            </Tooltip>
          </h2>
        </CardHeader>

        <div className="px-6 pb-6 flex flex-col gap-2 items-between border-b-1 border-default-300">
          <div className="grid grid-cols-5 items-center flex-row gap-2 w-full text-sm">
            <h5 className="col-span-1 font-semibold whitespace-nowrap">
              API KEY
            </h5>
            <div className="col-span-3 flex flex-col gap-2">
              <p className="text-tiny text-justify line-clamp-3">
                YouTube API key is required to create a community of TubePlus.
                See{' '}
                <a
                  className="underline text-primary italic hover:font-medium"
                  href="https://console.cloud.google.com/apis/library/youtube.googleapis.com"
                >
                  this link
                </a>{' '}
                to learn more about YouTube APIs.
              </p>
              <Input
                type="text"
                variant="bordered"
                value={'Add Your Youtube API Key...'}
              />
            </div>

            <Button className="col-span-1" fullWidth>
              Submit
            </Button>
          </div>
        </div>
      </SimpleCard>
    </section>
  );
}
