import React, { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import getCePrefixCls from '@/utils/getCePrefixCls';
import './index.less';

const prefixCls = getCePrefixCls('link');

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'disabled' | 'className' | 'onClick' | 'style'> {
  /**
   * 目前内置四种类型
   */
  type?: 'primary' | 'success' | 'error' | 'warning';
  /**
   * 鼠标悬浮是否显示下划线
   */
  underline?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义icon
   */
  icon?: React.ReactNode;
  /**
   * 修改link样式
   */
  className?: string;
  /**
   * 文字链接点击时触发；禁用状态下不触发；
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  /**
   * 是否开启溢出隐藏
   */
  ellipsis?: boolean;
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
}

const Link = (props: React.PropsWithChildren<LinkProps>) => {
  const { children, icon, type, underline, disabled, className, ellipsis, onClick, ...rest } = props;

  return (
    <a
      {...rest}
      onClick={(e) => {
        if (disabled) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-underline`]: !disabled && underline,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-ellipsis`]: ellipsis
      })}
    >
      {icon && <span className={`${prefixCls}-icon`}>{icon}</span>}
      <span
        className={classNames(`${prefixCls}-inner`, {
          [`${prefixCls}-inner-ellipsis`]: ellipsis
        })}
      >
        {children}
      </span>
    </a>
  );
};

export default Link;
