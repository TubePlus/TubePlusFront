import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { Key } from 'react';
import {
  DotsVerticalIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { User } from '@nextui-org/user';

const renderCell = (row: any, columnKey: Key) => {
  type Rows = (typeof row)[0];
  const cellValue = row[columnKey as keyof Rows];

  switch (columnKey) {
    case 'title':
      return <div className="whitespace-nowrap">{row.title}</div>;

    case 'boardId':
      return <div>{row.boardId}</div>;

    case 'contents':
      return (
        <div>
          <span className="max-w-lg overflow-hidden text-ellipsis line-clamp-2">
            {row.contents}
          </span>
        </div>
      );

    case 'voteCounts':
      return <div className="text-center">{row.voteCounts}</div>;

    case 'createdAt':
      return (
        <div className="text-default-900/60 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="md:table-cell x:hidden">
            {datetimeFormatter(row.createdAt)}
          </span>
          <span className="md:hidden x:table-cell">
            {datetimeFormatter(row.createdAt).split(' ')[0]}
          </span>
        </div>
      );

    case 'actions':
      return (
        <>
          <div
            className="relative justify-center items-center
                    lg:hidden
                    x:flex"
          >
            <Dropdown
              classNames={{
                base: ['db-default-50 dark:bg-default min-w-[100px]'],
              }}
            >
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <DotsVerticalIcon />
                </Button>
              </DropdownTrigger>

              <DropdownMenu itemClasses={{ title: 'text-xs' }}>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div
            className="relative items-center gap-2
                                      lg:flex
                                      x:hidden
                      "
          >
            <Tooltip content="Details">
              <span className="text-lgcursor-pointer active:opacity-50">
                <EyeOpenIcon // TODO: Post 상태(display/hide)에 따라 다르게 표시
                />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg cursor-pointer active:opacity-50">
                <Pencil2Icon // 편집
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <TrashIcon // 삭제
                />
              </span>
            </Tooltip>
          </div>
        </>
      );

    default:
      return cellValue;
    // return null;
  }
};

function datetimeFormatter(originalDate: string) {
  const date = new Date(originalDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
}

export { renderCell, datetimeFormatter };
