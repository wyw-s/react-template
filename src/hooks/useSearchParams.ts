/**
 * @Author wangyw26123
 * @Description url query 参数解析
 * @Date Created in 2023-05-01 12:32:23
 * @Modifed By 2023-05-01 12:32:23
 */
import { useMemo } from 'react';
import qs, { ParsedQuery } from 'query-string';

/**
 * url query 参数解析
 * @example
 * import { useQueryString } from '@yr/util';
 *
 * const Demo = () => {
 *   const queryString = useQueryString();
 *
 *   render <div>{queryString.type}</div>;
 * }
 */
export function useSearchParams<T>() {
  return useMemo(() => {
    const search = location.search.slice(1);
    return qs.parse(search) ?? {};
  }, [location.search]) as T & ParsedQuery;
}
