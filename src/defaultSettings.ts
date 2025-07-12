import type { ProSettings } from '@ant-design/pro-layout';
import pkg from '../package.json';

const defaultSettings: Partial<ProSettings> = {
  // 需要同步修改 webpack.config.js 中的 primary-color
  primaryColor: pkg.config.primaryColor,
  navTheme: 'dark',
  headerTheme: 'dark',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '商城管理后台',
  splitMenus: false,
  headerRender: undefined
};

export const comPrefixCls = 'rt';

export default defaultSettings;
