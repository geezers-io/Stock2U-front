import { useSearchParams } from 'react-router-dom';

export function useSearchParamsObject() {
  const [searchParams, setSearchParams] = useSearchParams();

  return [paramsToObject(searchParams), setSearchParams] as const;
}

function paramsToObject(searchParams: URLSearchParams) {
  function entriesToObject(entries: IterableIterator<[string, string]>): Record<string, string | undefined> {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }

  return entriesToObject(searchParams.entries());
}
