import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/table';
import { Spinner } from '@nextui-org/spinner';

interface TableColumnProps {
  key: string;
  label: string;
}

interface OverviewCardProps {
  id: string;
  title: string;
  contents?: string; // post
  boardId?: string; // post
  voteCounts?: number; // post
  createdAt: string;
  updatedAt: string;
}

/**
 *
 * @warning nextui의 테이블과 결합도가 생겨 폐기합니다.
 * @warning SimpleCard 컴포넌트 사용을 고려해주세요.
 * @returns
 */
const OverviewTableCard = ({
  cardTitle,
  cardLink,
  tableColumns,
  tableRows,
  isLoading,
  isError,
  error,
  renderCell = getKeyValue,
}: {
  cardTitle: string;
  cardLink: string;
  tableColumns: TableColumnProps[];
  tableRows: any[];
  isLoading: boolean;
  isError: boolean;
  error?: any;
  renderCell?: any;
}) => {
  return !isError ? (
    <Card className="p-4 gap-5 border border-zinc-400/50">
      <CardHeader className="p-0 justify-between">
        <h2 className="px-2">{cardTitle}</h2>
        <Button
          as={Link}
          href={cardLink}
          className="bg-content3/0 hover:bg-content3"
          size="sm"
          variant="flat"
          isIconOnly
        >
          <ExternalLinkIcon />
        </Button>
      </CardHeader>

      <CardBody className="p-0 h-full">
        {isLoading ? (
          <Spinner size="lg" color="default" />
        ) : (
          <Table
            classNames={{}}
            checkboxesProps={{ classNames: { wrapper: 'mx-auto' } }}
            selectionMode="multiple"
            removeWrapper
          >
            <TableHeader
              className="" // background
              columns={tableColumns}
            >
              {(column: { key: string; label: string }) => (
                <TableColumn
                  className={`${
                    column.key === 'contents' || column.key === 'voteCounts'
                      ? 'sm:table-cell x:hidden'
                      : ''
                  }`}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody>
              {tableRows.map(row => (
                <TableRow key={row.key}>
                  {columnKey => (
                    <TableCell
                      className={`text-xs ${
                        columnKey === 'contents' || columnKey === 'voteCounts'
                          ? 'sm:table-cell x:hidden'
                          : ''
                      }`}
                    >
                      {renderCell(row, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
    </Card>
  ) : (
    <Card className="p-4 gap-5 border border-zinc-400/50">
      <CardBody className="p-0 h-full">Error!</CardBody>
    </Card>
  );
};

export default OverviewTableCard;
