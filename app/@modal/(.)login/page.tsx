import SignIn from '@/components/SignIn';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Divider } from '@nextui-org/divider';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import { memebers } from '@/data/members';
import BackButton from '@/components/BackButton';

const LogInModalPage = () => {
  return (
    <div>
      <div className="z-50 backdrop-blur-sm backdrop-saturate-150 bg-overlay/10 w-screen h-screen fixed inset-0" />
      <div className="z-50 flex w-screen h-[100dvh] fixed inset-0 items-center justify-center max-w-xl gap-20 mx-auto">
        <Card
          classNames={{
            base: 'bg-white dark:bg-zinc-800 mx-auto border border-zinc-300/20',
          }}
          shadow="lg"
          isBlurred
        >
          <CardHeader>
            <div className="justify-start w-full">
              <BackButton name="Home" icon={<ChevronLeftIcon />} />
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <SignIn />
          </CardBody>

          <Divider />
          <CardFooter>
            <p>
              Wellcom to tubePlus! This Project created by{' '}
              {memebers.map((mem, index) => (
                <Chip
                  as={Link}
                  variant="flat"
                  classNames={{
                    base: 'duration-200 hover:-translate-y-1',
                    content: 'text-xs flex items-center gap-1',
                  }}
                  size="sm"
                  key={index}
                  href={`https://github.com/${mem.githubName}`}
                >
                  <Avatar
                    className="h-unit-lg w-unit-lg"
                    name={mem.githubName}
                    src={mem.avatar}
                  />
                  {mem.githubName}
                </Chip>
              ))}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LogInModalPage;
