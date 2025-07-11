import * as React from 'react';
import type { FormProps, FormInstance } from 'antd';

/** 表单元素类型枚举 */
export enum EnumQueryFilterItemType {
  input = 'input',
  dictSelect = 'dictSelect',
  datePicker = 'datePicker',
  rangePicker = 'rangePicker',
  pcaSelect = 'pcaSelect',
  component = 'component'
}

/** 头部左侧内容-扩展信息 */
export interface SearchItem {
  /** Hidden元素标签 */
  label?: string;
  /** 提示文字 */
  placeholder?: string;
  /** 状态, 获取字段key值 */
  key: string;
  /** 状态文本 tab 关键状态筛选信息 show 直接展示的筛选条件 hidden 隐藏的筛选条件 */
  position: 'tab' | 'show' | 'hidden';
  /** 表单元素类型 */
  type: keyof typeof EnumQueryFilterItemType;
  /** 数据字典值 */
  dictkey?: string;
  [key: string]: any;
}

export interface QueryFilterProps {
  /** 筛选条件列表 */
  searchItems?: SearchItem[];
  /** Form */
  formProps?: FormProps;
  /** Tab选择回调函数 */
  selectValue?: (a: any) => void;
  /** Form实例 */
  form: FormInstance;
  /** 扩展的表单元素 */
  extFormItemList?: React.ReactNode;
  /** 头部右侧,右边操作按钮 */
  extAction?: React.ReactNode;
  /** 组件按钮配置可隐藏 */
  hideButton?: boolean;
  /** 数据查询 */
  handleSearch?: (e?: any) => void;
  /** 查询重置 */
  handleReset?: () => void;
  /** Placeholder是否隐藏前缀 */
  placeholderWithoutPrefix?: boolean;
  /** 去重查询开关 */
  deduplication?: boolean;
  /** 去重查询 Checkbox.onChange */
  deduplicationQuery?: (e: any) => {};
  /** ContentStyle */
  contentStyle?: object;
  /** 是否显示label */
  showLabel?: boolean;
}

export interface QueryFilterState {
  /** 搜索切换 */
  toggle: boolean;
  /** 提示框的数据 */
  tooltipData: {
    [key: string]: any;
  };
}
