import React from 'react';
import { Select, SelectProps } from 'antd';
import { DictItem } from './declare';
import jsonParse from '@/utils/jsonParse';

const { Option } = Select;

export interface DictSelectProps extends SelectProps {
  dictkey: string;
  type?: 'text';
  filterkeys?: string[];
  valueInLabel?: boolean;
  disabledKeys?: string[] | ((arg0: DictItem['itemKey'], arg1: DictItem, arg2: DictItem[], arg3: number) => boolean);
}

const DictSelect: React.FC<DictSelectProps> = (props) => {
  const { type, defaultValue, style, dictkey, filterkeys, valueInLabel, disabledKeys = [] } = props;

  const genDsiabled = (items: DictItem[], idx: number) => {
    const item = items[idx];
    return Array.isArray(disabledKeys)
      ? disabledKeys.includes(item.itemKey)
      : disabledKeys(item.itemKey, item, items, idx);
  };

  let items: DictItem[] = jsonParse(sessionStorage[`dict_${dictkey}`]) || [];

  if (!items) {
    if (type === 'text') {
      return <span />;
    }
    return <Select {...props} />;
  }

  if (filterkeys) {
    items = items.filter((item) => filterkeys.includes(item.itemKey));
  }

  if (type === 'text') {
    if (!defaultValue) return <span />;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.itemKey === defaultValue) {
        return (
          <span data-itemkey={item.itemKey} style={style}>
            {item.itemName}
          </span>
        );
      }
    }
    return <span />;
  }

  return (
    <Select dropdownMatchSelectWidth={false} optionFilterProp="children" {...props}>
      {items.map((item: DictItem, idx) => (
        <Option key={item.itemKey} value={item.itemKey} disabled={genDsiabled(items, idx)}>
          {valueInLabel && `${item.itemKey} - `}
          {item.itemName}
        </Option>
      ))}
    </Select>
  );
};

export default DictSelect;
