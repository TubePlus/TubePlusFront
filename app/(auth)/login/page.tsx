import SignIn from '@/components/SignIn';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Chip } from '@nextui-org/chip';
import Link from 'next/link';
import { Avatar } from '@nextui-org/avatar';
import { memebers } from '@/data/members';

const LogInPage = () => {
    return (
        <div className="absolute inset-0">
            <div className="flex flex-col items-center justify-center h-full max-w-xl gap-20 mx-auto">
                <Card
                    classNames={{ base: 'bg-white dark:bg-zinc-700' }}
                    shadow="none">
                    <CardHeader>
                        <div className="justify-start w-full">
                            <Button
                                as={Link}
                                className="pl-0"
                                variant="light"
                                startContent={
                                    <ChevronLeftIcon className="w-4 h-4 mr-2" />
                                }
                                href={'/'}>
                                Home
                            </Button>
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
                                        content:
                                            'text-xs flex items-center gap-1',
                                    }}
                                    size="sm"
                                    key={index}
                                    href={`https://github.com/${mem.githubName}`}>
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

export default LogInPage;
