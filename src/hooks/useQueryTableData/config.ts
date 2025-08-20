import type { TablePaginationConfig } from 'antd';

// 默认分页配置
export const defaultPagination: TablePaginationConfig = {
  size: 'default',
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`,
  defaultPageSize: 10,
  position: ['bottomRight'],
  pageSizeOptions: [10, 20, 50, 100],
  total: 0
};
