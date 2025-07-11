import { useEffect, useState } from 'react';
import { getDictByDictKey } from '@/apis/dict';

/**
 * 获取枚举值
 * @param dictKeys
 * @returns
 */
const useDict = (dictKeys: string[] = []) => {
  const [dictMap, setdictMap] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (Array.isArray(dictKeys) && dictKeys.length) {
      getDictByDictKey(dictKeys).then((res: any) => {
        if (res.success) {
          Object.keys(res.data).forEach((key) => {
            sessionStorage[`dict_${key}`] = JSON.stringify(res.data[key]);
          });
          setdictMap(res.data);
        }
      });
    }
  }, [...dictKeys]);

  return {
    dictMap
  };
};

export default useDict;
