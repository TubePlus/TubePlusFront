'use client'; // TODO: client for skeleton, push event and SSE fetching
import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { BellIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from '@nextui-org/react';

const pushTestDatas = [
  //TODO: eventSource 사용해서 sse 구현하기
  {
    uuid: 0,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
  {
    uuid: 1,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
  {
    uuid: 2,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
  {
    uuid: 3,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
  {
    uuid: 4,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
  {
    uuid: 5,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
  {
    uuid: 6,
    alarm_title: 'test alarm',
    alarm_content: 'this is test',
    autor_name: 'admin',
  },
];

const UserPushBox = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <>
      <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly radius="full">
              <BellIcon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Push Alarms">
            {pushTestDatas.map(item => (
              <DropdownItem key={item.uuid}>
                <div className="flex flex-col">
                  {item.alarm_title}
                  <small className="line-clamp-1">{item.alarm_content}</small>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </>
  ) : (
    <div>
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
};

export default UserPushBox;
