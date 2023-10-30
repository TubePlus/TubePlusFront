import { queryClient } from '@/app/providers';
import { useQuery } from '@tanstack/react-query';

const useGlobalState = (key: string, initialData: any = null) => {
  const query = useQuery([key], () => initialData, {
    enabled: false,
    initialData,
  });
  const setData = (value: any) => queryClient.setQueriesData([key], value);

  return [query.data, setData];
};
export default useGlobalState;