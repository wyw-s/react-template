import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import getCePrefixCls from '@/utils/getCePrefixCls';
import './index.less';

interface FormItemTooltipProps {
  description: React.ReactNode;
  value?: any;
  onChange?: any;
  fileList?: any;
  id?: any;
}

const FormItemTooltip: React.FC<PropsWithChildren<FormItemTooltipProps>> = (props) => {
  const { children, description, value, onChange, fileList, id } = props;
  const prefix = getCePrefixCls('form-item-tooltip');
  const newFileList = fileList ? { fileList } : {};

  return (
    <div className={classNames(prefix)}>
      <div className={classNames(`${prefix}-tooltip`)}>{description}</div>
      {/* 克隆子组件并显式传递 value 和 onChange */}
      {/* @ts-ignore */}
      {React.Children.map(children, (child) => React.cloneElement(child, { value, onChange, id, ...newFileList }))}
    </div>
  );
};

export default FormItemTooltip;
