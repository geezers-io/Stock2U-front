import { useEffect, useState } from 'react';
import { useCustomToast } from '@/hooks/useCustomToast';
import tryCatch from '@/utils/tryCatch';

interface UseFetchOptions<T> {
  initialValues: Awaited<T>;
  errorFn?: (err: unknown) => void;
}

const useFetch = <T extends unknown>(
  key: string | string[] | number[],
  fetch: () => T,
  options?: UseFetchOptions<T>,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Awaited<T> | null>(() => {
    if (options && options.initialValues) {
      return options.initialValues as Awaited<T>;
    }
    return null;
  });
  const { error } = useCustomToast();

  const refetch = async () => {
    setLoading(true);

    await tryCatch({
      tryFn: async () => {
        const data = await fetch();
        setData(data);
      },
      catchFn: err => {
        if (options && options?.errorFn) {
          options.errorFn(err);
        } else {
          error(err);
        }
        return err;
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    loading,
    data,
    refetch,
    mutate: setData,
  };
};

export default useFetch;
