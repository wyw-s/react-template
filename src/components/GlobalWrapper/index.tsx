import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import defaultSettings from '@/defaultSettings';
import useDeploy from '@/hooks/useDeploy';

const GlobalWrapper: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  useDeploy();
  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: defaultSettings.primaryColor
      }
    });
  }, []);

  return children;
};

export default GlobalWrapper;
