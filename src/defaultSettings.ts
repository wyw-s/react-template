import pkg from '../package.json';

const defaultSettings = {
  // 需要同步修改 webpack.config.js 中的 primary-color
  primaryColor: pkg.config.primaryColor
};

export const comPrefixCls = 'rt';

export default defaultSettings;
