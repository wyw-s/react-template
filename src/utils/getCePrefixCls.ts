import { comPrefixCls } from '@/defaultSettings';
/**
 * 项目公共组件前缀 react-element 首字母
 *
 * @param suffixCls
 * @param customizePrefixCls
 */
const getCePrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${comPrefixCls}-${suffixCls}` : comPrefixCls;
};

export default getCePrefixCls;
