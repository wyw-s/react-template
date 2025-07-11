/**
 * @Author wangyw26123
 * @Description 处理表格的columns数据
 * @Date Created in 2023-05-09 10:05:20
 * @Modifed By 2023-05-09 10:05:20
 */
import type { TableProps } from 'antd';

const useColumns = <RecordType = any>(
  columns: TableProps<RecordType>['columns']
): { columns: TableProps<RecordType>['columns']; x: number } => {
  const _columns = columns?.map((item) => ({
    ellipsis: true,
    ...item,
    width: item.width ?? 200
  }));

  const countTableWidth = (list?: any[]): number => {
    let width = 0;

    if (!list || list.length < 0) return 0;

    for (let i = 0; i < list.length; i += 1) {
      width += list[i].width || 200;
    }

    return width;
  };

  return {
    columns: _columns,
    x: countTableWidth(_columns)
  };
};

export default useColumns;
