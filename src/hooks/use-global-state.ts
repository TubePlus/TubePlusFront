import { queryClient } from '@/app/[locale]/providers';
import { useQuery } from '@tanstack/react-query';

const useGlobalState = (key: string, initialData: any = null) => {
  const query = useQuery([key], () => initialData, {
    enabled: false,
    keepPreviousData: true,
    initialData,
  });
  const setData = (value: any) => queryClient.setQueriesData([key], value);

  return [query.data, setData];
};
export default useGlobalState;
