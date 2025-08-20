/**
 * 获取组件类名前缀
 *
 * @param suffixCls
 * @param customizePrefixCls
 */
const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `rt-${suffixCls}` : 'rt';
};

export default getPrefixCls;
