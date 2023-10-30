import SignIn from '@/components/SignIn';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Divider } from '@nextui-org/divider';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import { memebers } from '@/data/members';
import InterceptingModal from '@/components/InterceptingModal';

const LogInModalPage = () => {
  return (
    <InterceptingModal>
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
    </InterceptingModal>
  );
};

export default LogInModalPage;
