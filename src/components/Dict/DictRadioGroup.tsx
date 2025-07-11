import React from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd/lib/radio';
import { DictItem } from './declare';
import jsonParse from '@/utils/jsonParse';

const RadioGroup = Radio.Group;

export interface DictRadioGroupProps extends RadioGroupProps {
  dictkey: string;
  filterkeys?: string[];
}

const DictRadioGroup: React.FC<DictRadioGroupProps> = (props) => {
  const { dictkey, filterkeys, ...rest } = props;
  let items: DictItem[] = jsonParse(sessionStorage[`dict_${dictkey}`]) || [];

  if (filterkeys) {
    items = items.filter((item) => filterkeys.includes(item.itemKey));
  }

  const options = items.map((item: DictItem) => ({
    label: item.itemName,
    value: item.itemKey
  }));

  return <RadioGroup {...rest} options={options} />;
};

export default DictRadioGroup;
