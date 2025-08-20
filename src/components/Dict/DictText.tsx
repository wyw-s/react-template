import React from 'react';
import { DictItem } from './declare';
import jsonParse from '@/utils/jsonParse';

export type DictTextProps = {
  dictkey: string;
  defaultValue?: string | string[];
};

const DictText = (props: DictTextProps) => {
  const { defaultValue, dictkey } = props;
  const items: DictItem[] = jsonParse(sessionStorage[`dict_${dictkey}`]) || [];

  if (!defaultValue) return <React.Fragment>-</React.Fragment>;

  const names: string[] = [];
  if (Array.isArray(defaultValue)) {
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (defaultValue.includes(item.itemKey)) {
        names.push(item.itemName);
      }
    }
  } else {
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.itemKey === defaultValue) {
        names.push(item.itemName);
      }
    }
  }

  return <React.Fragment>{names.join('、')}</React.Fragment>;
};

export default DictText;
