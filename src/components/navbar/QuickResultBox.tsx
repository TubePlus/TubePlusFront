import { getAllBoards, getAllPosts, getAllUsers } from '@/lib/fetcher';
import { DBUserProps } from '@/types/next-auth';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spacer,
  Spinner,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { Key } from 'react';
import QuickResultQuery from './QuickResultQuery';

type Selection = 'all' | Set<Key>; // same with @nextui-org/react
interface ResultProps {
  id: number;
  name: string;
  username?: string;
  type: string;
  descriptoin: string;
  email?: string;
  image?: string;
  visible?: boolean;
  limit?: string;
  erase?: boolean;
  is_oted?: boolean;
  voted_count?: boolean;
}

// TODO: fetch here Search Results
export const QuickResultBox = ({
  searchValue,
  selectValue,
}: {
  searchValue?: string;
  selectValue: Selection;
}) => {
  const displaySelectValue = Array.from(selectValue).join('');

  const { isLoading, isError, error, data } = useQuery(
    [`search-${displaySelectValue}`],
    displaySelectValue === 'creator'
      ? getAllUsers
      : displaySelectValue === 'board'
      ? getAllBoards
      : getAllPosts,
  );

  return (
    // TODO: isLoading 대응
    <div className="relative w-full">
      <div className="hidden group-focus-within:block duration-200">
        <div
          className="absolute flex flex-col w-full z-[999]
                      bg-zinc-100 dark:bg-zinc-800
                      min-h-[150px] max-h-60
                      shadow-medium overflow-y-auto"
        >
          <div className="flex flex-col justify-center gap-2 whitespace-break-spaces px-5 py-2">
            {searchValue ? (
              <>
                <p className="flex text-[12px]">
                  Search for{' '}
                  <span className="inline-block max-w-[100px] truncate">
                    &quot;{searchValue}&quot;
                  </span>{' '}
                  in{' '}
                  <b>
                    &quot;
                    {displaySelectValue.charAt(0).toUpperCase() +
                      displaySelectValue.slice(1)}
                    &quot;
                  </b>
                </p>
                <QuickResultQuery
                  selectValue={displaySelectValue}
                  searchValue={searchValue}
                />
              </>
            ) : !isError ? (
              Array.isArray(data) ? (
                data.map((row: ResultProps) => (
                  <Card
                    key={row.id}
                    isPressable
                    shadow="none"
                    onPress={
                      () => console.log('item pressed') // useRouter()
                    }
                  >
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        {displaySelectValue === 'creator' && (
                          <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={row.image}
                          />
                        )}
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <p className="flex text-small leading-none text-default-600">
                            <span className="font-semibold">{row.name}</span>
                            <Spacer />
                            <span className="text-zinc-600">
                              {row.username}
                            </span>
                          </p>
                          <p className="text-small tracking-tight text-default-400">
                            <span>{row.email}</span>
                          </p>
                        </div>
                      </div>
                      <Button
                        className={row.id ? '' : ''}
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={'solid'} // 가입 여부에 따라 변경: bordered
                        //   onPress={() => setIsFollowed(!isFollowed)}
                      >
                        {
                          'Follow' // 가입 여부에 따라 변경
                        }
                      </Button>
                    </CardHeader>
                    <CardBody></CardBody>
                  </Card>
                ))
              ) : (
                <div className="flex">{data}</div>
              )
            ) : (
              <>
                <h3>Error</h3>
                <p>
                  {
                    Object(error) // 문제발생 여지: Error Type이 명확하지 않음
                  }
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
