import SimpleCard from '@/components/SimpleCard';
import { CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Switch } from '@nextui-org/switch';

export default function CommuSettingsPage() {
  // check is_creator, has_community...

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
          <div className="flex gap-4 flex-wrap">
            <div className="grid grid-cols-2 gap-4 w-full text-sm items-center py-2">
              <span>Community Owner</span>
              <Input
                className="max-w-[200px]"
                isReadOnly
                type="text"
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full text-sm items-center py-2">
              <span>Community Name</span>
              <Input
                className="max-w-[200px]"
                isReadOnly
                type="text"
                variant="bordered"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 w-full text-sm items-center py-2">
            <span>Community Name</span>
            <Switch size="sm" />
          </div>
        </div>
      </SimpleCard>
    </section>
  );
}
