/**
 * @Author wangyw26123
 * @Description 表格查询hook
 * @Date Created in 2023-05-04 18:00:47
 * @Modifed By 2023-05-04 18:00:47
 */
import { useMemo, useRef } from 'react';
import { useAntdTable, useMemoizedFn } from 'ahooks';
import { isEmpty } from 'lodash-es';
import type { PaginationProps } from 'antd';
import type { AntdTableOptions, Data, Service, AntdTableResult } from 'ahooks/lib/useAntdTable/types';
import { defaultPagination } from './config';

interface optionsProps {
  beforeQuery?: (params: any) => any;
  params?: any;
  pagination?: PaginationProps;
}

const useQueryTableData = <TData extends Data>(
  service: (body: any) => Promise<unknown>,
  options: AntdTableOptions<TData, any> & optionsProps = {}
): AntdTableResult<TData, any> & { query: (params?: any) => void } => {
  const { beforeQuery, defaultParams, defaultPageSize, refreshDeps, pagination, ...rest } = options;
  // 默认分页信息
  const paginationProps: any = useRef({
    ...defaultPagination,
    ...(pagination && typeof pagination === 'object' ? pagination : {})
  });

  // 请求参数处理
  const getTableData = useMemo<Service<any, any>>(() => {
    return ({ current, pageSize }, formData): Promise<any> => {
      let queryParmas = {
        pageIndex: current,
        pageSize: pageSize ?? (paginationProps.current.defaultPageSize || defaultPagination.defaultPageSize),
        ...(!isEmpty(formData) ? formData : {})
      };

      // 调用转换方法
      if (beforeQuery && typeof beforeQuery === 'function') {
        queryParmas = beforeQuery(queryParmas);
      }

      return new Promise((resolve) => {
        service(queryParmas).then((res: any) => {
          if (res.success) {
            const data = Array.isArray(res.data?.list) ? res.data?.list : [];
            resolve({ list: data, total: res.data?.total || 0 });
          } else {
            resolve({ list: [], total: 0 });
          }
        });
      });
    };
  }, [service, beforeQuery]);

  // 发送请求
  const { tableProps, ...other } = useAntdTable(getTableData, {
    defaultParams: (defaultParams as any) || [
      { current: 1, pageSize: paginationProps.current.defaultPageSize || defaultPagination.defaultPageSize }
    ],
    defaultPageSize: paginationProps.current.defaultPageSize || defaultPagination.defaultPageSize,
    ...rest
  });

  const { pagination: paginationData, ..._tableProps } = tableProps;
  // 分页属性合并
  const _pagination = useMemo(() => {
    return { ...paginationProps.current, ...paginationData };
  }, [paginationData]);

  // 搜索
  const query = (params?: any) => {
    other?.run?.({ ...(other?.params?.[0] ?? {}), ...params, current: 1 });
  };

  return {
    tableProps: {
      ..._tableProps,
      pagination: _pagination
    },
    query: useMemoizedFn(query),
    ...other
  };
};

export default useQueryTableData;
