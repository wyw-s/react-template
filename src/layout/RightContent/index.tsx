import React from 'react';
import { Space } from 'antd';
import styles from './index.module.less';
import AvatarDropdown from './AvatarDropdown';
import defaultSettings from '@/defaultSettings';

const GlobalHeaderRight = () => {
  const { navTheme, layout, headerTheme } = defaultSettings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || (layout === 'mix' && headerTheme !== 'light')) {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <AvatarDropdown />
    </Space>
  );
};

export default GlobalHeaderRight;
