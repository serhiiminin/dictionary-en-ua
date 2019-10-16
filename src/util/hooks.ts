import { useState, useEffect } from 'react';

interface Res {
  error: Error | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
type DataApi = [Res, Function];

const useDataApi = (handler: Function): DataApi => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Error | null>(null);
  const [params, setParams] = useState<Error | null>(null);

  useEffect(() => {
    if (params) {
      const fetchData = async (): Promise<void> => {
        setError(null);
        setLoading(true);
        try {
          const result = await handler(params);
          setData(result);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [params]);

  return [{ data, error, loading }, setParams];
};

export { useDataApi };
