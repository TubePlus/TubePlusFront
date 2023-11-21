import SignIn from '@/components/SignIn';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const LogInPage = () => {
  return (
    <div
      className="relative col-span-full
                  flex justify-center h-[calc(100vh-3rem)]"
    >
      <div className="flex flex-col items-center justify-center">
        <Card
          className="max-w-lg"
          classNames={{ base: 'border border-default' }}
          shadow="none"
        >
          <CardHeader className="justify-between">
            <Button size="sm">
              <ArrowLeftIcon />

              <h2>Home</h2>
            </Button>
          </CardHeader>
          <CardBody>
            <SignIn />
          </CardBody>

          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LogInPage;
