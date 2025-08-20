import './index.less';
import React, { PropsWithChildren } from 'react';
import { getCePrefixCls } from '@/utils/util';

export interface ClassificationProps {
  title: React.ReactNode;
}

const Classification = (props: PropsWithChildren<ClassificationProps>) => {
  const { title, children } = props;
  const prefix = getCePrefixCls('classification');

  return (
    <div className={prefix}>
      <div className={`${prefix}-title`}>{title}</div>
      <div className={`${prefix}-content`}>{children}</div>
    </div>
  );
};

export default Classification;
