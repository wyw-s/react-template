import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import { DictItem } from './declare';
import jsonParse from '@/utils/jsonParse';

const CheckboxGroup = Checkbox.Group;

export interface DictCheckboxGroupProps extends CheckboxGroupProps {
  dictkey: string;
  filterkeys?: string[];
}

const DictCheckboxGroup: React.FC<DictCheckboxGroupProps> = (props) => {
  const { dictkey, filterkeys, ...rest } = props;
  let items: DictItem[] = jsonParse(sessionStorage[`dict_${dictkey}`]) || [];

  if (filterkeys) {
    items = items.filter((item) => filterkeys.includes(item.itemKey));
  }

  const options = items.map((item: DictItem) => ({
    label: item.itemName,
    value: item.itemKey
  }));

  return <CheckboxGroup {...rest} options={options} />;
};

export default DictCheckboxGroup;
