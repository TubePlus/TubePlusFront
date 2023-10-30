'use client';
import { searchCreator } from '@/lib/fetcher';
import { DBUserProps } from '@/types/next-auth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const QuickResultQuery = ({
  selectValue,
  searchValue,
}: {
  selectValue: string;
  searchValue: string;
}) => {
  // TODO: searchValue의 값에 실시간으로 반응해야 함
  // 현재 첫번째 값만 받아 요청하고 있음...
  const { isLoading, isError, error, data } = useQuery(['search-creator'], () =>
    searchCreator(searchValue),
  );

  return (
    <>
      <p>
        {selectValue} | {searchValue}
      </p>
      {!isError ? (
        data &&
        data.map((result: DBUserProps) => (
          <p key={result.id}>{result.username}</p>
        ))
      ) : (
        <>
          <div>
            <h3 className="font-bold text-danger">Error</h3>
            <p className="text-sm text-danger">{Object(error)}</p>
          </div>
        </>
      )}
    </>
  );
};

export default QuickResultQuery;
