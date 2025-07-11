import * as React from 'react';
import classnames from 'classnames';
import CSSMotion from 'rc-motion';
import Portal from '@rc-component/portal';
import { CloseOutlined } from '@ant-design/icons';
import type { PreviewProps } from './Preview';

type OperationsProps = Pick<PreviewProps, 'getContainer' | 'prefixCls' | 'rootClassName' | 'onClose'> & {
  visible?: boolean;
  maskTransitionName?: string;
};

const Operations: React.FC<OperationsProps> = (props) => {
  const { visible, maskTransitionName, getContainer, prefixCls, rootClassName, onClose } = props;
  const toolClassName = `${prefixCls}-operations-operation`;
  const tools = [
    {
      icon: <CloseOutlined />,
      onClick: onClose,
      type: 'close'
    }
  ];

  const operations = (
    <>
      <ul className={`${prefixCls}-operations`}>
        {tools.map(({ icon, onClick, type }) => (
          <li
            className={classnames(toolClassName, {
              [`${prefixCls}-operations-operation-${type}`]: true
            })}
            onClick={onClick}
            key={type}
          >
            {React.cloneElement<{ className?: string }>(icon, { className: `${prefixCls}-operations-icon` })}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <CSSMotion visible={visible} motionName={maskTransitionName}>
      {({ className, style }) => (
        <Portal open getContainer={getContainer ?? document.body}>
          <div className={classnames(`${prefixCls}-operations-wrapper`, className, rootClassName)} style={style}>
            {operations}
          </div>
        </Portal>
      )}
    </CSSMotion>
  );
};

export default Operations;
