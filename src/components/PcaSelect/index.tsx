/**
 * 省市区选择组件
 */
import { useMemo } from 'react';
import { Cascader } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';
import type { CascaderProps } from 'antd';
import Pcadata from './pcadata';

interface PcaItem {
  code: string;
  name: string;
  children?: PcaItem[];
}

export type PcaSelectProps = CascaderProps<DefaultOptionType> & {
  /** 地区级别, 可选值`123`, 1省、2省市、3省市区，默认值：3 */
  level?: '1' | '2' | '3';
  /** 类型, 可选值`text` */
  type?: 'text';
  /** 只显示需要的省的code */
  filterProvinceCodes?: string[];
  // 多选模式下使用，默认为 、
  separator?: string;
};

const pcadata = Pcadata as PcaItem[];

const getPcaText = (code: string): string => {
  if (!code) return '';

  let pcaItem: PcaItem;
  const loop = (data: PcaItem[]) => {
    data.forEach((item) => {
      if (item.code === code) {
        pcaItem = item;
        return;
      }

      if (item.children) {
        loop(item.children);
      }
    });
  };

  loop(pcadata);

  // @ts-ignore
  return pcaItem?.name ?? '';
};

const PcaSelect: React.FC<PcaSelectProps> = (props) => {
  const { type, filterProvinceCodes, level = '3', defaultValue, separator = '、', ...restProps } = props;

  const getOptions = (filterKeys?: string[]): any[] => {
    let provinceCode: string = '';
    let cityCode: string;
    let areaCode: string;
    if (Array.isArray(filterKeys) && filterKeys.length) {
      [provinceCode, cityCode, areaCode] = filterKeys;
    }
    // 只能选择省份
    if (level === '1') {
      if (provinceCode) {
        return pcadata
          .filter((item: PcaItem) => item.code === provinceCode)
          .map((item) => ({ ...item, children: null }));
      }

      return (pcadata as PcaItem[]).map((item) => ({
        ...item,
        children: null
      }));
    }

    // 只能选择省和市
    if (level === '2') {
      if (provinceCode) {
        return (pcadata as PcaItem[])
          .filter((item: PcaItem) => item.code === provinceCode)
          .map((province) => {
            const pca = { ...province };
            if (Array.isArray(pca.children)) {
              if (cityCode) {
                // @ts-ignore
                pca.children = pca.children
                  .filter((city) => city.code === cityCode)
                  .map((city) => ({ ...city, children: null }));
              }

              return pca;
            }

            return pca;
          });
      }

      return (pcadata as PcaItem[]).map((item) => {
        const pca = { ...item };
        if (Array.isArray(item.children)) {
          // @ts-ignore
          pca.children = item.children.map((city) => ({
            ...city,
            children: null
          }));
        }

        return pca;
      });
    }

    // 选择省市区
    if (level === '3') {
      if (provinceCode) {
        return (pcadata as PcaItem[])
          .filter((item: PcaItem) => item.code === provinceCode)
          .map((province) => {
            const pca = { ...province };
            if (Array.isArray(pca.children)) {
              if (cityCode) pca.children = pca.children.filter((city) => city.code === cityCode);
              if (Array.isArray(pca.children[0]?.children)) {
                if (areaCode) pca.children[0]?.children.filter((area) => area.code === areaCode);
              }
            }

            return pca;
          });
      }

      return pcadata as PcaItem[];
    }
    return [];
  };

  const renderText = (value?: string | string[]): string => {
    if (!value) return '';

    if (typeof value === 'string') {
      return getPcaText(value as string);
    }

    if (!Array.isArray(value)) return '';
    const [provinceCode, cityCode, areaCode] = value as string[];
    const text = [getPcaText(provinceCode), getPcaText(cityCode), getPcaText(areaCode)].filter(Boolean);
    return text.join('');
  };

  const options = useMemo(() => getOptions(filterProvinceCodes), [filterProvinceCodes]);

  if (type === 'text') {
    if (props.multiple) {
      // 多选的情况下，只取最后一级
      const list =
        defaultValue?.map((item) => {
          if (Array.isArray(item)) {
            // @ts-ignore
            return getPcaText(item[item.length - 1]);
          }

          // @ts-ignore
          return getPcaText(item);
        }) || [];

      const text = list.join(separator);

      return (
        <span style={restProps.style} className={restProps.className}>
          {text}
        </span>
      );
    }

    return (
      <span style={restProps.style} className={restProps.className}>
        {renderText(defaultValue as string[])}
      </span>
    );
  }

  return (
    <Cascader
      placeholder="请选择地区"
      defaultValue={defaultValue}
      {...restProps}
      options={options}
      fieldNames={{
        label: 'name',
        value: 'code'
      }}
    />
  );
};

PcaSelect.displayName = 'PcaSelect';

export default PcaSelect;
